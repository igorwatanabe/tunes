import { Checkbox } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import React from 'react';
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
      <main className="flex justify-around gap-x-6 py-5">
        {isLoading ? <h2><Loading /></h2>
          : (
            <div className="flex items-center divide-y divide-gray-100">
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
              </audio>

              <label htmlFor="favorite">
                <Checkbox
                  type="checkbox"
                  name="favorite"
                  id="favorite"
                  className="h-6 w-6 text-indigo-600 "
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.onInputChange }
                  checked={ favorite }
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656
                        5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  defaultChecked
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
