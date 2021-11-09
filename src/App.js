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
    pics: [],
    picForModal: '',
    page: 1,
    isLoading: false,
    isError: false,
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.request;
    const nextRequest = this.state.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest) {
      this.fetchPic();
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchPic();
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }
  fetchPic = ({ request, page } = this.state) => {
    this.setState({ isLoading: true });
    picsAPI
      .fetchPictures(request, page)
      .then(res => {
        if (res.total === 0) {
          this.setState({
            isError: true,
          });
        }
        return res;
      })
      .then(res => {
        res.hits.map(({ id, webformatURL, largeImageURL }) =>
          this.setState(prevState => ({
            pics: [...prevState.pics, { id, webformatURL, largeImageURL }],
          })),
        );
      })
      .catch(error => {
        this.setState({ error: error });
      })
      .finally(() => this.setState({ isLoading: false }));
  };
  submitData = request => {
    this.setState({ request, pics: [], page: 1 });
  };
  onPageChange = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onModalToggle = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onClickLargeImage = id => {
    this.setState(({ pics }) => ({
      picForModal: pics.find(pic => pic.id === id).largeImageURL,
    }));
    this.onModalToggle();
  };

  render() {
    const { request, showModal, pics, picForModal, isLoading, isError } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.submitData} />
        {request === '' && (
          <div> There will be pictures for you request...</div>
        )}

        {isLoading && <LoaderPics />}

        {isError && <NotFound request={request} />}
        {pics.length !== 0 && (
          <div>
            <ImageGallery
              pics={pics}
              tag={request}
              onClickForModal={this.onClickLargeImage}
            />
            <Button onClick={this.onPageChange} />
          </div>
        )}
        {showModal && (
          <Modal pic={picForModal} tag={request} onClose={this.onModalToggle} />
        )}
      </div>
    );
  }
}

export default App;
