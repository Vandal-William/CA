import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Editor from '../Editor/Editor';
import './style.css'
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import ImportPage from '../ImportPage/ImportPage';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="app">
        <Routes>
          
          <Route path="/" Component={HomePage} />
          <Route path="/create" Component={Editor} />
          <Route path="/import" Component={ImportPage} />

        </Routes>
      </main>
    </>
  );
};

export default App;