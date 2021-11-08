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
    pics: [],
    // idArray: [],
    // webformatURL: [],
    // largeImageURL: [],
    picForModal: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.request;
    const nextRequest = this.state.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest) {
      this.setState({
        // idArray: [],
        // webformatURL: [],
        // largeImageURL: [],
        pics: [],
        page: 1,
      });
      this.fetchPic();
      console.log('я сработал 1');
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      console.log(nextPage);
      console.log('я сработал 2');

      this.fetchPic();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
  fetchPic = ({ request, page } = this.state) => {
    this.setState({ status: 'pending' });
    picsAPI
      .fetchPictures(request, page)
      .then(res => {
        if (res.total === 0) {
          this.setState({
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
            // idArray: [...prevState.idArray, id],
            // webformatURL: [...prevState.webformatURL, webformatURL],
            // largeImageURL: [...prevState.largeImageURL, largeImageURL],
            pics: [...prevState.pics, { id, webformatURL, largeImageURL }],
            status: 'resolved',
          })),
        );
      })
      .catch(error => {
        this.setState({ status: 'rejected' });
      });
  };
  submitData = request => {
    this.setState({ request });
  };
  onPageChange = e => {
    e.preventDefault();
    this.setState(({ page }) => ({ page: page + 1, status: 'pending' }));
  };

  onModalToggle = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onClickLargeImage = id => {
    this.setState(({ pics }) => ({
      picForModal: pics.find(pic => (pic.id = id)).largeImageURL,
    }));
    this.onModalToggle();
  };

  render() {
    const {
      status,
      request,
      // idArray,
      // webformatURL,
      // largeImageURL,
      showModal,
      pics,
      picForModal,
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
            pics={pics}
            tag={request}
            onClickForModal={this.onClickLargeImage}
          />
          <Button onClick={this.onPageChange} />
        </div>
      );
    }
    return (
      <div className="App">
        <Searchbar onSubmit={this.submitData} />
        {area}

        {showModal && (
          <Modal pic={picForModal} tag={request} onClose={this.onModalToggle} />
        )}
      </div>
    );
  }
}

export default App;
