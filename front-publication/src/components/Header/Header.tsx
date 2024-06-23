import React from 'react';
import './style.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className='main-title'>Site Management</h1>
      <ul className='main-menu'>
        <li className='main-item'><a className='main-link' href="/">Dashboard</a></li>
        <li className='main-item'><a className='main-link' href="/publications">Publications</a></li>
        <li className='main-item'><a className='main-link' href="/categories">Categories</a></li>
        <li className='main-item'><a className='main-link' href="#">Subscriptions</a></li>
        <li className='main-item'><a className='main-link' href="#">Comments</a></li>
      </ul>
    </header>
  );
};

export default Header;
