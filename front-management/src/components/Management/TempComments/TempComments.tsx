import React, { useState, useEffect } from 'react';
import publication from '../../../selectors/publication';
import user from '../../../selectors/user';
import PublicationData from '../../../interface/PublicationData';
import { TempCommentData, TempCommentCreateData } from '../../../interface/TempCommentData';
import { UserData } from '../../../interface/UserData';
import { format, toZonedTime } from 'date-fns-tz';
import { fr } from 'date-fns/locale';
import './style.css'

interface TempCommentsProps {
  tempComments: TempCommentData[];
  handleCreateComment: (id: string, data: TempCommentCreateData) => void;
  handleDeleteTempComment: (id: string) => void;
}

const TempComments: React.FC<TempCommentsProps> = ({ tempComments, handleCreateComment, handleDeleteTempComment }) => {
  const [publications, setPublications] = useState<PublicationData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tempCommentPerPage = 3;
  const totalPages = Math.ceil(tempComments.length / tempCommentPerPage);
  const maxPageButtons = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allPublications = await publication.fetchAll();
        const allUsers = await user.fetchAll();
        setPublications(allPublications);
        setUsers(allUsers);
      } catch (error) {
        console.error('Erreur lors de la récupération des categories :', error);
      }
    };

    fetchCategories();
  }, []);

 

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const currentTempComments = tempComments.slice(
    (currentPage - 1) * tempCommentPerPage,
    currentPage * tempCommentPerPage
  );

  const getPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, currentPage + Math.floor(maxPageButtons / 2));

    if (startPage > 1) {
      buttons.push(<button key="start" onClick={() => handleChangePage(1)}>1</button>);
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleChangePage(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2">...</span>);
      }
      buttons.push(<button key="end" onClick={() => handleChangePage(totalPages)}>{totalPages}</button>);
    }

    return buttons;
  }
  return (
    <div className="CategoryManager">

      <div className="categories-container">
        {currentTempComments.map(tempComment => (
          <div key={tempComment.id} className="category-card">
           {publications
           .filter(OnePublication => OnePublication._id === tempComment.publicationId )
           .map(pub => (
            <>
              <div className="category-header">
                <div className='comment-header'>
                  <h2><a href={`/publications/${pub._id}`}>{pub.title}</a></h2>
                  <span className='user-link-comment'>
                    {format(
                      toZonedTime(
                        new Date(tempComment.createdAt), 'Europe/Paris'), 
                        "PPPP à HH:mm:ss", 
                        { locale: fr }
                    )}
                  </span>
                </div>
                {users
                .filter(user => user.id === tempComment.userId)
                .map(u =>
                  <span><a className='user-link-comment' href="#">{u.name}</a></span>
                )}
              </div>
              <div className="category-body">
                  <p>{tempComment.content}</p>
              </div>
              <div className="category-footer">
                  <button className='btn-category' onClick={() => handleCreateComment(tempComment.id, { content: tempComment.content, userId: tempComment.userId, publicationId: pub._id })}>Validate</button>
                  <button className='btn-category' onClick={() => handleDeleteTempComment(tempComment.id)}>Delete</button>
              </div>
            </>
           ))}           
              
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handleChangePage(1)}
          disabled={currentPage === 1}
        >
          Premier
        </button>
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        {getPaginationButtons()}
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
        <button
          onClick={() => handleChangePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Dernier
        </button>
      </div>
    </div>
  );
};

export default TempComments;
