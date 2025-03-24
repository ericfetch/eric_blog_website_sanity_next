'use client';
import './index.css';
import Image from 'next/image';
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
        <Image src={image} alt="" width={400} height={400} />
        <button className="close-viewer-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default ImageViewer; 