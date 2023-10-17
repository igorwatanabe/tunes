import React from 'react';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    favoriteList: [],
  };

  componentDidMount() {
    this.retrievingList();
  }

  retrievingList = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteList = await getFavoriteSongs();

    this.setState({
      isLoading: false,
      favoriteList,
    });
  };

  render() {
    const { isLoading, favoriteList } = this.state;

    return (
      <div data-testid="page-favorites">
        { isLoading ? <Loading />
          : (
            favoriteList.map((song) => (
              <MusicCard
                key={ song.trackId }
                previewUrl={ song.previewUrl }
                trackName={ song.trackName }
                trackId={ song.trackId }
                refreshFavorites={ this.retrievingList }
              />
            ))
          )}
      </div>
    );
  }
}
export default Favorites;
