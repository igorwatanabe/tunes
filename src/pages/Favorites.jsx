import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    favoriteList: [],
  };

  componentDidMount() {
    this.retrievingList();
    console.log('didMountFavo');
  }

  componentDidUpdate() {
    console.log('didUpFavo');
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

  // refreshFavorites = async (newFavoritesSongs) => {
  //   console.log('FAV');
  //   console.log(newFavoritesSongs);
  //   this.setState({
  //     favoriteList: newFavoritesSongs,
  //   });
  // };

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
