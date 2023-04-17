import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    songsAlbum: [],
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    console.log(this.props);
    const songs = await getMusics(id);
    console.log(songs);
    this.setState({
      songsAlbum: [...songs],
    });
  }

  render() {
    const {
      songsAlbum,
    } = this.state;
    return (
      <div data-testid="page-album">
        {console.log(songsAlbum)}
        { songsAlbum.map((element, index) => (
          (element.wrapperType === 'collection')
            ? (
              <>
                <p data-testid="artist-name" key={ index }>{ element.artistName }</p>
                <p data-testid="album-name" key={ index }>{ element.collectionName }</p>
              </>
            ) : (
              <MusicCard
                key={ index }
                previewUrl={ element.previewUrl }
                trackName={ element.trackName }
                trackId={ element.trackId }
              />
            ))) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
