import { Component } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    request: '',
  };
  submitData = request => {
    this.setState({ request });
  };

  render() {
    const { request } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.submitData} />
        <ImageGallery request={request} />
      </div>
    );
  }
}

export default App;
