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
    status: 'idle',
    request: '',
    idArray: [],
    webformatURL: [],
    largeImageURL: [],
    numOfpic: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.request;
    const nextRequest = this.state.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest) {
      this.setState({
        idArray: [],
        webformatURL: [],
        largeImageURL: [],
        page: 1,
      });
      this.fetchPic(nextRequest, nextPage);
      console.log('я сработал 1');
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      console.log(nextPage);
      console.log('я сработал 2');

      this.fetchPic(nextRequest, nextPage);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
  fetchPic = (name, page) => {
    this.setState({ status: 'pending' });
    picsAPI
      .fetchPictures(name, page)
      .then(res => {
        if (res.total === 0) {
          this.setState({
            request: name,
            status: 'rejected',
          });
          console.log(res);
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
          })),
        );
      })
      .catch(error => {
        this.setState({ request: name, status: 'rejected' });
      });
  };
  submitData = request => {
    this.setState({ request });
  };
  onPageChange = () => {
    this.setState(({ page }) => ({ page: page + 1, status: 'pending' }));
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
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
        <div>
          <ImageGallery
            props={{ request, idArray, webformatURL }}
            onModalToggle={this.onModalToggle}
          ></ImageGallery>
          <Button onClick={this.onPageChange} />
          {showModal && (
            <Modal
              pic={largeImageURL[numOfpic]}
              tag={request}
              onClose={this.onModalToggle}
            />
          )}
        </div>
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
