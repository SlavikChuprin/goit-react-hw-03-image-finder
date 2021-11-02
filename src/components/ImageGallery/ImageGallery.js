import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import picsAPI from '../services/Pixabay-api';
import LoaderPics from '../Loader';
import Button from '../Button/';
export default class ImageGallery extends Component {
  state = {
    pictures: [],
    status: 'idle',
    error: null,
    page: 1,
    pageDefault: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const nextRequest = this.props.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest) {
      picsAPI
        .fetchPictures(nextRequest, this.state.pageDefault)
        .then(obj => {
          this.setState({ pictures: obj.hits, status: 'resolved' });
          console.log(obj);
          return obj;
        })
        .then(obj => {
          if (obj.total === 0) {
            return this.setState({ status: 'notFound' });
          }
        })

        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      picsAPI
        .fetchPictures(nextRequest, nextPage)
        .then(obj => {
          this.setState({ pictures: obj.hits, status: 'resolved' });
          console.log(obj);
          return obj;
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  onPageChange = page => {
    this.setState({ page });
  };

  render() {
    // const { request } = this.props;
    const { pictures, status, error } = this.state;
    const { request } = this.props;
    if (status === 'idle') {
      return <div> There will be pictures for you request...</div>;
    }
    if (status === 'pending') {
      return <LoaderPics />;
    }
    if (status === 'notfound') {
      return <div>We did't find pictures for request {request}</div>;
    }
    if (status === 'rejected') {
      return <div>We have a problem {error}</div>;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className="ImageGallery">
            {pictures.map(pic => (
              <ImageGalleryItem key={pic.pageURL} pic={pic} />
            ))}
          </ul>
          <Button onPageChange={this.onPageChange} />
        </div>
      );
    }
  }
}
