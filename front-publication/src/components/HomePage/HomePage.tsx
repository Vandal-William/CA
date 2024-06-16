import React, { useEffect, useState } from 'react';
import './style.css';
import publication from '../../selectors/publication';
import PublicationData from '../../interface/PublicationData';
import Card from '../Card/Card';
import category from '../../selectors/category';
import CategoryData from '../../interface/CategoryData';

const HomePage: React.FC = () => {
  const [data, setData] = useState<PublicationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);
  const [pageButtonsToShow] = useState<number>(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await publication.fetchAll();
        const allCategories = await category.fetchAll();
        setCategories(allCategories);
        setData(result);
      } catch (error) {
        setError('Erreur lors de la récupération des données');
        console.error('Erreur lors de la récupération des publications :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await publication.search(searchTerm, selectedCategory);
      setData(result);
      setCurrentPage(1); // Reset to the first page after search
    } catch (error) {
      setError('Erreur lors de la recherche des publications');
      console.error('Erreur lors de la recherche des publications :', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageButtons = () => {
    const pageNumbers = [];

    const startPage = Math.max(1, currentPage - Math.floor(pageButtonsToShow / 2));
    const endPage = Math.min(totalPages, startPage + pageButtonsToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => paginate(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homePage">
      <div className='cards'>
        <div className="pagination">
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>
            Première
          </button>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Précédent
          </button>
          {renderPageButtons()}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Suivant
          </button>
          <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
            Dernière
          </button>
        </div>

        <div className='card-container'>
          {currentItems.map((document: PublicationData) => (
            <Card key={document._id} title={document.title} imageUrl={document.cover} viewUrl={`/publications/${document._id}`} />
          ))}
        </div>

      </div>
     
      <div className="leftPanel">
        <form id="searchForm" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            id="searchInput"
            placeholder="Search publication"
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <select id="categorySelect" aria-label="Select category" value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
