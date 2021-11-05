import PropTypes from 'prop-types';
import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  static propsType = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  openModal = e => {
    const { largeImageURL, tags } = this.props.pic;
    // this.setState({ largeImageURL: largeImageURL, tags: tags });

    this.props.onClick({ largeImageURL, tags });
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
