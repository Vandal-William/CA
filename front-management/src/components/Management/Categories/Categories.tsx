import React, { useState, useEffect } from 'react';
import category from '../../../selectors/category';
import { CategoryData, CreateCategoryData } from '../../../interface/CategoryData';
import './style.css';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState<CreateCategoryData>({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 3;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);
  const maxPageButtons = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await category.fetchAll();
        setCategories(allCategories);
      } catch (error) {
        console.error('Erreur lors de la récupération des categories :', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      if (newCategory) {
        await category.create(newCategory);
        setNewCategory({ name: '', description: '' });
        setIsAdding(false);
        const allCategories = await category.fetchAll();
        setCategories(allCategories);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la categorie :', error);
    }
  };

  const handleEditCategory = async (id: string) => {
    if (editingCategory) {
      try {
        const updatedCategory = await category.update(id, editingCategory);
        setCategories(categories.map(cat => (cat._id === id ? updatedCategory : cat)));
        setEditingCategory(null);
      } catch (error) {
        console.error(`Erreur lors de la mise à jour de la categorie avec l'ID ${id} :`, error);
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await category.delete(id);
      setCategories(categories.filter(cat => cat._id !== id));
      if(categories.length === 3 || categories.length < 3){
        // 
      }
    } catch (error) {
      console.error(`Erreur lors de la suppression de la categorie avec l'ID ${id} :`, error);
    }
  };
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const currentCategories = categories.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
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
      <button className='btn-category main-btn' onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? 'Cancel' : 'Add a Category'}
      </button>

      {isAdding && (
        <div className="form-container">
          <input 
            className='input-category'
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <textarea
            className='textarea-category'
            placeholder="Category Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          />
          <button className='btn-category' onClick={handleCreateCategory}>Create</button>
        </div>
      )}

      <div className="categories-container">
        {currentCategories.map(category => (
          <div key={category._id} className="category-card">
            {editingCategory?._id === category._id ? (
              <>
              <div className="category-header">
                <input
                  className='input-category'
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                />
              </div>
              <div className="category-body">
                <textarea
                  className='textarea-category'
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                />
              </div>
              <div className="category-footer">
                <button className='btn-category' onClick={() => handleEditCategory(category._id)}>Save</button>
                <button className='btn-category' onClick={() => setEditingCategory(null)}>Cancel</button>
              </div>
              </>
            ) : (
              <>
                <div className="category-header">
                  <h2>{category.name}</h2>
                </div>
                <div className="category-body">
                  <p>{category.description}</p>
                </div>
                <div className="category-footer">
                  <button className='btn-category' onClick={() => setEditingCategory(category)}>Edit</button>
                  <button className='btn-category' onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                </div>
              </>
            )}
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

export default CategoryManager;
