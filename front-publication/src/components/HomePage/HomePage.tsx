import React, { useEffect, useState } from 'react';
import './style.css';
import publication from '../../selectors/publication';
import PublicationData from '../../interface/PublicationData';
import Card from '../Card/Card';

const HomePage: React.FC = () => {
  const [data, setData] = useState<PublicationData[]>([]); // Remplacez 'any' par 'PublicationData[]' si vous avez une interface définie
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await publication.fetchAll();
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

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homePage">
     
      {data.map((document: PublicationData) => (
          <Card key={document._id} title={document.title} imageUrl={document.cover} viewUrl={`/publications/${document._id}`} />
      ))}
      
    </div>
  );
};

export default HomePage;
