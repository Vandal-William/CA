import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Editor from '../Publication-Management/Editor/Editor';
import './style.css'
import Header from '../Header/Header';
import Publications from '../Publication-Management/Publications/Publications';
import PublicationsHome from '../Publication-Management/PublicationsHome/PublicationsHome';
import Oneview from '../Publication-Management/OneView/Oneview';
import UpdateEditor from '../Publication-Management/UpdateEditor/UpdateEditor';
import Dashboard from '../Publication-Management/Dashboard/Dashboard';
import Categories from '../Publication-Management/Categories/Categories'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="app">
        <Routes>
          
          <Route path="/" Component={Dashboard} />
          <Route path="/publications" Component={PublicationsHome} />
          <Route path="/publications/views" Component={Publications} />
          <Route path="/publications/create" Component={Editor} />
          <Route path="/publications/:id" Component={Oneview} />
          <Route path="/publications/update/:id" Component={UpdateEditor} />
          <Route path="/categories" Component={Categories} />

        </Routes>
      </main>
    </>
  );
};

export default App;