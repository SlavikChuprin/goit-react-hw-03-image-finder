import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import picsAPI from '../services/Pixabay-api';
import LoaderPics from '../Loader';
import Button from '../Button/';
import Modal from '../Modal';
import NotFound from '../NotFound';
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
    request: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const nextRequest = this.props.request;

    if (prevRequest !== nextRequest) {
      picsAPI
        .fetchPictures(nextRequest, 1)
        .then(res => {
          if (res.total === 0) {
            this.setState({
              request: nextRequest,
              status: 'rejected',
            });

            return;
          }
          return res;
        })
        .then(obj => {
          this.setState({
            pictures: obj.hits,
            status: 'resolved',
            page: 1,
          });
          console.log(obj);
        })
        .catch(error => {
          this.setState({ request: nextRequest, status: 'rejected' });
        });
    }
  }
  onPageChange = () => {
    const request = this.props.request;

    this.setState(({ page }) => ({ page: page + 1 }));
    console.log(this.state.page);
    const { page } = this.state;
    this.setState({ status: 'pending' });

    picsAPI
      .fetchPictures(request, page)
      .then(obj => {
        this.setState({
          pictures: [...this.state.pictures, ...obj.hits],
          status: 'resolved',
        });
        console.log(this.state);
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onModalToggle = data => {
    this.setState(({ showModal, dataForModal }) => ({
      showModal: !showModal,
      dataForModal: data,
    }));
  };

  render() {
    const { pictures, status, request, showModal, dataForModal } = this.state;

    if (status === 'idle') {
      return <div> There will be pictures for you request...</div>;
    }
    if (status === 'pending') {
      return <LoaderPics />;
    }

    if (status === 'rejected') {
      return <NotFound request={request} />;
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
