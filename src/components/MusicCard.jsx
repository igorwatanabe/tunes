import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    favorite: false,
    // favoriteList: [],
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const favorites = await getFavoriteSongs();
    const { trackId } = this.props;
    this.setState({
      isLoading: false,
      // favoriteList: [...favorites],
      favorite: favorites.some((song) => song.trackId === trackId),
    });
    console.log('mount');
    console.log(getFavoriteSongs());
  }

  onInputChange = (event) => {
    const { trackId } = this.props;
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
      isLoading: true,
    }, async () => {
      await addSong(trackId);
      this.setState({
        isLoading: false,
      });
    });
  };

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
                {/* O seu navegador não suporta o elemento{" "} */}
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

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
