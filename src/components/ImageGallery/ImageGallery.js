import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import picsAPI from '../services/Pixabay-api';
import LoaderPics from '../Loader/Loader';
export default class ImageGallery extends Component {
  state = {
    pictures: [],
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const nextRequest = this.props.request;

    if (prevRequest !== nextRequest) {
      this.setState({ status: 'pending' });

      picsAPI
        .fetchPictures(nextRequest)
        .then(obj => {
          this.setState({ pictures: obj.hits, status: 'resolved' });
          console.log(obj.hits);
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  render() {
    // const { request } = this.props;
    const { pictures, status } = this.state;

    if (status === 'idle') {
      return <div> There will be pictures for you request...</div>;
    }
    if (status === 'pending') {
      return <LoaderPics />;
    }
    // if (status === Status.REJECTED) {
    //   return <PokemonErrorView message={error.message} />;
    // }
    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {pictures.map(pic => (
            <ImageGalleryItem key={pic.id} pic={pic} />
          ))}
        </ul>
      );
    }
  }
}
