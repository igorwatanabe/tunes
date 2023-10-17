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
            <form className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <input
                type="text"
                name="searchArtist"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                 focus:ring-2
                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={ searchArtist }
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                onChange={ this.onInputChange }
              />
              <button
                data-testid="search-artist-button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
                text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={ buttonSearchDisabled }
                onClick={ () => this.onClickPesquisar(searchArtist) }
              >
                Procurar
              </button>
              <h2>{ artist }</h2>
              { album.length === 0 ? <p>{noAlbum}</p>
                : (
                  <ul className="divide-y divide-gray-100">
                    { album.map((results, index) => (
                      <li key={ index } className="flex justify-between gap-x-6 py-5">
                        <img src={ results.artworkUrl100 } alt="album" />
                        { results.collectionName }

                        <Link
                          to={ `/album/${results.collectionId
                          }` }
                          data-testid={ `link-to-album-${results.collectionId}` }
                        >
                          Acesse
                        </Link>
                      </li>))}
                  </ul>
                ) }
            </form>
          )}
      </div>
    );
  }
}
export default Search;
