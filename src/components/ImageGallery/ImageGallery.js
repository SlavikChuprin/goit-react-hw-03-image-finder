import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import picsAPI from '../services/Pixabay-api';
import LoaderPics from '../Loader';
import Button from '../Button/';
import Modal from '../Modal';
export default class ImageGallery extends Component {
  static propsType = {
    request: PropTypes.string.isRequired,
  };

  state = {
    pictures: [],
    status: 'idle',
    showModal: false,
    page: 1,
    dataForModal: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const nextRequest = this.props.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest) {
      picsAPI
        .fetchPictures(nextRequest, 1)
        .then(obj => {
          this.setState({
            pictures: obj.hits,
            status: 'resolved',
            page: 1,
          });
          console.log(obj);
        })
        .catch(error => {
          this.setState({ error: error, status: 'rejected' });
        });
    }
    if (prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      picsAPI
        .fetchPictures(nextRequest, nextPage)
        .then(obj => {
          this.setState({
            pictures: [...this.state.pictures, ...obj.hits],
            status: 'resolved',
          });
          console.log(this.state);
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  onPageChange = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    console.log(this.state.page);
  };

  onModalToggle = data => {
    this.setState(({ showModal, dataForModal }) => ({
      showModal: !showModal,
      dataForModal: data,
    }));
  };

  render() {
    const { pictures, status, error, showModal, dataForModal } = this.state;

    if (status === 'idle') {
      return <div> There will be pictures for you request...</div>;
    }
    if (status === 'pending') {
      return <LoaderPics />;
    }

    if (status === 'rejected') {
      return <div> {error} </div>;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className="ImageGallery">
            {pictures.map(pic => (
              <ImageGalleryItem
                key={uuidv4()}
                pic={pic}
                onClick={this.onModalToggle}
              />
            ))}
          </ul>
          <Button onPageChange={this.onPageChange} />
          {showModal && (
            <Modal pic={dataForModal} onClose={this.onModalToggle} />
          )}
        </div>
      );
    }
  }
}
