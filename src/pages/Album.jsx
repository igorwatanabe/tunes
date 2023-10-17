import PropTypes from 'prop-types';
import React from 'react';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    songsAlbum: [],
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    const songs = await getMusics(id);
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
        { songsAlbum.map((element, index) => (
          (element.wrapperType === 'collection')
            ? (
              <div key={ index }>
                <img src={ element.artworkUrl100 } alt="album" className="mx-auto" />
                <p
                  data-testid="album-name"
                  className="flex justify-center"
                >
                  { element.collectionName }
                </p>
                <p
                  data-testid="artist-name"
                  className="flex justify-center"
                >
                  { element.artistName }

                </p>
              </div>
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
