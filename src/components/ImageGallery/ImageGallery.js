import PropTypes from 'prop-types';
import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
// import LoaderPics from '../Loader';
// import Button from '../Button/';
// import Modal from '../Modal';
// import NotFound from '../NotFound';

export default class ImageGallery extends Component {
  static propsType = {
    request: PropTypes.string.isRequired,
    id: PropTypes.arrayOf(PropTypes.number.isRequired),
    webformatURL: PropTypes.arrayOf(PropTypes.string.isRequired),
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { request, idArray, webformatURL } = this.props.props;
    const { onModalToggle, children } = this.props;
    return (
      <ul className="ImageGallery">
        {idArray.map((id, i) => (
          <ImageGalleryItem
            key={id}
            id={id}
            tag={request}
            pic={webformatURL[i]}
            onClick={onModalToggle}
          />
        ))}
        {children}
      </ul>
    );
  }
}
