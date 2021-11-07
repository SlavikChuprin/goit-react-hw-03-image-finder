import { Component } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import picsAPI from './components/services/Pixabay-api';
import LoaderPics from './components/Loader';
import Button from './components/Button/';
import Modal from './components/Modal';
import NotFound from './components/NotFound';

class App extends Component {
  state = {
    request: '',
    idArray: [],
    webformatURL: [],
    largeImageURL: [],
    numOfpic: null,
  };
  submitData = request => {
    this.setState({ request });
  };
  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.request;
    const nextRequest = this.state.request;

    if (prevRequest !== nextRequest) {
      picsAPI
        .fetchPictures(nextRequest, 1)
        .then(res => {
          if (res.total === 0) {
            this.setState({
              request: nextRequest,
              status: 'rejected',
            });
            console.log(res);
            return;
          }
          return res;
        })
        .then(res => {
          console.log(res);
          res.hits.map(({ id, webformatURL, largeImageURL }) =>
            this.setState(prevState => ({
              idArray: [...prevState.idArray, id],
              webformatURL: [...prevState.webformatURL, webformatURL],
              largeImageURL: [...prevState.largeImageURL, largeImageURL],
              status: 'resolved',
              page: 1,
            })),
          );
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

  onModalToggle = id => {
    this.setState(({ showModal, idArray }) => ({
      showModal: !showModal,
      numOfpic: idArray.indexOf(id),
    }));
  };
  render() {
    const {
      status,
      request,
      idArray,
      webformatURL,
      showModal,
      largeImageURL,
      numOfpic,
    } = this.state;

    let area;

    if (status === 'idle') {
      area = <div> There will be pictures for you request...</div>;
    }
    if (status === 'pending') {
      area = <LoaderPics />;
    }
    if (status === 'rejected') {
      area = <NotFound request={request} />;
    }
    if (status === 'resolved') {
      area = (
        <ImageGallery
          props={{ request, idArray, webformatURL }}
          onModalToggle={this.onModalToggle}
        >
          <Button onPageChange={this.onPageChange} />
          {showModal && (
            <Modal
              pic={largeImageURL[numOfpic]}
              tag={request}
              onClose={this.onModalToggle}
            />
          )}
        </ImageGallery>
      );
    }
    return (
      <div className="App">
        <Searchbar onSubmit={this.submitData} />
        {area}
      </div>
    );
  }
}

export default App;
