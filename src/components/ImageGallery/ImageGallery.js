import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ pics, tag, onClickForModal }) => {
  return (
    <ul className="ImageGallery">
      {pics.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          tag={tag}
          pic={webformatURL}
          onClick={onClickForModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propsType = {
  request: PropTypes.string.isRequired,
  id: PropTypes.arrayOf(PropTypes.number.isRequired),
  webformatURL: PropTypes.arrayOf(PropTypes.string.isRequired),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
