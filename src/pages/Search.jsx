import React from 'react';

class Search extends React.Component {
  state = {
    searchArtist: '',
    buttonSearchDisabled: true,
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

  render() {
    const {
      searchArtist,
      buttonSearchDisabled,
    } = this.state;
    return (
      <div data-testid="page-search">
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
            // onClick={ }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
