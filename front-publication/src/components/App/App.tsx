import React, { useState, useEffect } from 'react';
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
import TempComments from '../Management/TempComments/TempComments';
import tempComment from '../../selectors/tempComment';
import { TempCommentData, TempCommentCreateData } from '../../interface/TempCommentData';

const App: React.FC = () => {

  const [tempComments, setTempComments] = useState<TempCommentData[]>([]);

  useEffect(() => {
    const fetchTempComments = async () => {
      try {
        const allTempComments = await tempComment.fetchAll();
        setTempComments(allTempComments);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires temporaires :', error);
      }
    };

    fetchTempComments();
  }, []);

  const handleCreateComment = async (id : string, data : TempCommentCreateData) => {
    try {
      
      await tempComment.create(data);
      await handleDeleteTempComment(id);
      const allTempComments = await tempComment.fetchAll();
      setTempComments(allTempComments);
      
    } catch (error) {
      console.error('Erreur lors de la création de la categorie :', error);
    }
  };

  const handleDeleteTempComment = async (id: string) => {
    try {
      await tempComment.delete(id);
      setTempComments(tempComments.filter(cat => cat.id !== id));
    } catch (error) {
      console.error(`Erreur lors de la suppression de la categorie avec l'ID ${id} :`, error);
    }
  };
 

  return (
    <>
      <Header tempComments={tempComments}/>
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
          <Route path="/temp-comments" element={<TempComments  tempComments={tempComments} handleCreateComment={handleCreateComment} handleDeleteTempComment={handleDeleteTempComment}/>} />

        </Routes>
      </main>
    </>
  );
};

export default App;