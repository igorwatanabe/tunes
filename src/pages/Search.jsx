import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    searchArtist: '',
    buttonSearchDisabled: true,
    isLoading: false,
    artist: '',
    album: [],
    noAlbum: 'Nenhum álbum foi encontrado',
  };

  validation = () => {
    const {
      searchArtist,
    } = this.state;

    const numberTwo = 2;
    const minLengthName = searchArtist.length >= numberTwo;

    this.setState({
      buttonSearchDisabled: !(
        minLengthName
      ),
    });
  };

  onInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.validation);
  };

  onClickPesquisar = async (nomeDigitado) => {
    this.setState({
      searchArtist: '',
      isLoading: true, // altera no state, para aparecer o Carregando...
    }, async () => {
      const albuns = await searchAlbumsAPI(nomeDigitado);
      this.setState({
        isLoading: false,
        artist: `Resultado de álbuns de: ${nomeDigitado}`,
        album: [...albuns],
      });
    });
  };

  render() {
    const {
      searchArtist,
      buttonSearchDisabled,
      isLoading,
      artist,
      album,
      noAlbum,
    } = this.state;

    return (
      <div data-testid="page-search">
        {isLoading ? <h2><Loading /></h2>
          : (
            <form>
              <input
                type="text"
                name="searchArtist"
                value={ searchArtist }
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                onChange={ this.onInputChange }
              />
              <button
                data-testid="search-artist-button"
                disabled={ buttonSearchDisabled }
                onClick={ () => this.onClickPesquisar(searchArtist) }
              >
                Procurar
              </button>
              <h2>{ artist }</h2>
              { album.length === 0 ? <p>{noAlbum}</p>
                : (
                  <>
                    { album.map((results) => (
                      <p key={ results.artistId }>
                        { results.collectionName }
                        <Link
                          to={ `/album/${results.collectionId
                          }` }
                          data-testid={ `link-to-album-${results.collectionId}` }
                        >
                          Link
                        </Link>
                      </p>))}
                    {console.log(album)}
                  </>
                ) }
            </form>
          )}
      </div>
    );
  }
}
export default Search;
