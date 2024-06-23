import React, { useState } from 'react';
import './style.css';
import UnsplashData from '../../../interface/publication/UnsplashData';
import Unsplash from '../../../selectors/publication/unsplashApi';

interface UnsplashModalProps {
  onClose: () => void;
  onSelect: (path: string) => void;
}

const UnsplashModal: React.FC<UnsplashModalProps> = ({ onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<UnsplashData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await Unsplash.searchPhoto(query);
      setPhotos(results);
    } catch (error) {
      console.error('Erreur lors de la recherche des photos :', error);
    }
    setLoading(false);
  };

  return (
    <div className="unsplash-modal">
      <div className="unsplash-modal-header">
        <h1 className="unsplash-title">Unsplash</h1>
        <button className="unsplash-close-button" onClick={onClose}>×</button>
      </div>
      <div className="unsplash-search-bar">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Rechercher une image..." 
          className="unsplash-input"
        />
        <button className="unsplash-search-button" onClick={handleSearch}>Envoyer</button>
      </div>
      {loading ? (
        <div className="unsplash-loader"></div>
      ) : (
        <div className="unsplash-image-grid">
          {photos.map((photo, index) => (
            <img 
              key={index} 
              src={photo.path} 
              alt={photo.name} 
              className="unsplash-image-item" 
              onClick={() => onSelect(photo.path)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnsplashModal;
