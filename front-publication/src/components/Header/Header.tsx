import React from 'react';
import './style.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className='main-title'>Publication Editor</h1>
      <ul className='main-menu'>
        <li className='main-item'><a className='main-link' href="/">View</a></li>
        <li className='main-item'><a className='main-link' href="/create">Create</a></li>
      </ul>
    </header>
  );
};

export default Header;
