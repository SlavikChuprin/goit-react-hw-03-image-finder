export default function ImageGalleryItem({ pic: { id, previewURL, tags } }) {
  return (
    <li className="ImageGalleryItem">
      <img src={previewURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}
