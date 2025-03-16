'use client';
import './index.css';
interface ImageViewerProps {
  image: string;
}

const ImageViewer = ({ image }: ImageViewerProps) => {
    const onClose = () => {
        console.log('close');
    }
    return (
        <div className="image-viewer" style={{display: 'none'}}>
            <div className="image-viewer-content">
        <img src={image} alt="" />
        <button className="close-viewer-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default ImageViewer; 