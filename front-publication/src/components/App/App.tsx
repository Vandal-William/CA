import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Editor from '../Editor/Editor';
import './style.css'
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Oneview from '../OneView/Oneview';
import UpdateEditor from '../UpdateEditor/UpdateEditor';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="app">
        <Routes>
          
          <Route path="/" Component={HomePage} />
          <Route path="/create" Component={Editor} />
          <Route path="/publications/:id" Component={Oneview} />
          <Route path="/publications/update/:id" Component={UpdateEditor} />

        </Routes>
      </main>
    </>
  );
};

export default App;