import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Editor from '../Management/Editor/Editor';
import './style.css'
import Header from '../Header/Header';
import Publications from '../Management/Publications/Publications';
import PublicationsHome from '../Management/PublicationsHome/PublicationsHome';
import Oneview from '../Management/OneView/Oneview';
import UpdateEditor from '../Management/UpdateEditor/UpdateEditor';
import Dashboard from '../Management/Dashboard/Dashboard';
import Categories from '../Management/Categories/Categories';
import Subscriptions from '../Management/Subscriptions/Subscriptions';

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
          <Route path="/subscriptions" Component={Subscriptions} />

        </Routes>
      </main>
    </>
  );
};

export default App;