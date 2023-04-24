import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    favorite: false,
  };

  async componentDidMount() {
    console.log('didMount');
    this.setState({
      isLoading: true,
    });
    const favorites = await getFavoriteSongs();
    const { trackId } = this.props;
    this.setState({
      isLoading: false,
      favorite: favorites.some((song) => song.trackId === trackId),
    });
  }

  async componentDidUpdate() {
    console.log('didUpdate');
    // this.funcaoAtualizar();
  }

  onInputChange = async (event) => {
    const { props } = this;
    const { refreshFavorites } = props;
    const { favorite } = this.state;
    console.log(props);
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
      isLoading: true,
    });
    if (favorite) {
      await removeSong(props);
      this.setState({
        isLoading: false,
      });
    } else {
      await addSong(props);
      this.setState({
        isLoading: false,
      });
    }
    refreshFavorites();
  };

  // funcaoAtualizar = async () => {
  //   const { refreshFavorites } = this.props;
  //   const newFavoritesSongs = await getFavoriteSongs();
  //   refreshFavorites(newFavoritesSongs);
  // };

  render() {
    const {
      isLoading,
      favorite,
    } = this.state;

    const {
      trackName,
      trackId,
      previewUrl,
    } = this.props;

    return (
      <main>
        {isLoading ? <h2><Loading /></h2>
          : (
            <div>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
              </audio>

              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  name="favorite"
                  id="favorite"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.onInputChange }
                  checked={ favorite }
                />
              </label>
            </div>
          )}
      </main>
    );
  }
}

MusicCard.defaultProps = {
  refreshFavorites: () => {},
};

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  refreshFavorites: PropTypes.func,
};

export default MusicCard;
