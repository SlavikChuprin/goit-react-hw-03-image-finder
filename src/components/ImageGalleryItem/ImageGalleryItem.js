// import PropTypes from 'prop-types';
import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    largeImageURL: '',
    tags: '',
  };

  openModal = () => {
    const { largeImageURL, tags } = this.props.pic;

    this.setState({
      largeImageURL,
      tags,
    });

    this.props.onClick(this.state);
  };
  render() {
    const { webformatURL, tags } = this.props.pic;
    return (
      <li className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={this.openModal}
        />
      </li>
    );
  }
}

// ImageGalleryItem.propsType = {
//   webformatURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
// };
