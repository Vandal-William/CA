import React from 'react';
import './style.css';
import View from '../../../assets/images/view.jpg'
import Edit from '../../../assets/images/edit.jpg'

const PublicationsHome: React.FC = () => {
  return (
    <div className="PublicationsHome">
      <a href='/publications/views' className="PublicationsHome-card">
        <img src={View} alt="view" className="PublicationsHome-card-image" />
        <div className="PublicationsHome-card-text">
          <h2>Manage publications</h2>
          <p>View all prublication, view one pupblication, update and delete publication</p>
        </div>
      </a>
      <a href='/publications/create' className="PublicationsHome-card reverse">
        <img src={Edit} alt="Edit" className="PublicationsHome-card-image" />
        <div className="PublicationsHome-card-text text-reverse">
          <h2>Add publication</h2>
          <p>Create a new publication in your database</p>
        </div>
      </a>
    </div>
  );
};

export default PublicationsHome;
