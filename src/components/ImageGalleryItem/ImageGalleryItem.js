import PropTypes from 'prop-types';
import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  static propsType = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  // state = {
  //   key: null,
  // };
  openModal = e => {
    const { id } = this.props;
    // this.setState({ key });

    this.props.onClick(id);
  };
  render() {
    const { id, tag, pic } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img
          id={id}
          src={pic}
          alt={tag}
          className="ImageGalleryItem-image"
          onClick={this.openModal}
        />
      </li>
    );
  }
}
