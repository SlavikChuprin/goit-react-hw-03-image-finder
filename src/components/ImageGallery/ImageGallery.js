import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ImageGalleryItem from '../ImageGalleryItem';
import picsAPI from '../services/Pixabay-api';
import LoaderPics from '../Loader';
import Button from '../Button/';
import Modal from '../Modal';
export default class ImageGallery extends Component {
  state = {
    pictures: [],
    status: 'idle',
    page: 1,
    bigPicData: {},
    showModal: false,
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
          this.setState({ pictures: obj.hits, status: 'resolved' });
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
          const newPicsArray = [...this.state.pictures, ...obj.hits];
          this.setState({ pictures: newPicsArray, status: 'resolved' });
          console.log(this.state.pictures);
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  onPageChange = page => {
    this.setState({ page });
  };
  dataForModalToggle = bigPicData => {
    console.log(bigPicData);
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      dataForModal: bigPicData,
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
      return <h1> {error} </h1>;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className="ImageGallery">
            {pictures.map(pic => (
              <ImageGalleryItem
                key={uuidv4()}
                pic={pic}
                onClick={this.dataForModalToggle}
              />
            ))}
          </ul>
          <Button onPageChange={this.onPageChange} />
          {showModal && (
            <Modal pic={dataForModal} onClose={this.dataForModalToggle} />
          )}
        </div>
      );
    }
  }
}
