import React from 'react';
import './style.css';

interface CardProps {
  title: string;
  imageUrl: string | undefined;
  viewUrl: string;
}

const Card: React.FC<CardProps> = ({ title, imageUrl, viewUrl }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-content">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card-footer">
        <a style={{textDecoration:"none"}} href={viewUrl}>View</a>
      </div>
    </div>
  );
};

export default Card;
