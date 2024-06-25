import React from 'react';
import { TempCommentData } from '../../interface/TempCommentData';
import './style.css';

interface HeaderProps {
  tempComments: TempCommentData[];
}

const Header: React.FC<HeaderProps> = ({ tempComments }) => {
  
  return (
    <header className="header">
      <h1 className='main-title'>Site Management</h1>
      <ul className='main-menu'>
        <li className='main-item'><a className='main-link' href="/">Dashboard</a></li>
        <li className='main-item'><a className='main-link' href="/publications">Publications</a></li>
        <li className='main-item'><a className='main-link' href="/categories">Categories</a></li>
        <li className='main-item'><a className='main-link' href="/subscriptions">Subscriptions</a></li>
        <li className='main-item'><a className='main-link' href="/temp-comments">Comments</a>(<span>{tempComments ? tempComments.length : '0'}</span>)</li>
      </ul>
    </header>
  );
};

export default Header;
