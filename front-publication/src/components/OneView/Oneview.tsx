/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PublicationData from '../../interface/PublicationData';
import publication from '../../selectors/publication';
import './style.css';

const Oneview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PublicationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const result = await publication.fetchOne(id);
          setData(result);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la publication :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!data) {
    return <div className="error">Erreur lors de la récupération des données</div>;
  }
  
  const handleDelete = async() => {
    if(id){
      await publication.delete(id);
      navigate('/');
    }
  }

  return (
    <div className="oneview-container">
      <div className="oneview-content">
        {data.blocks.map((block: any) => (
          <div key={block.id} className="block">
            {renderBlock(block)}
          </div>
        ))}
      </div>
      <div className="sidebar">
        <h3>{data.title}</h3>
        <img src={data.cover} alt="Publication cover" className="sidebar-image" />
        <div className="sidebar-footer">
          <a href={`/publications/update/${data._id}`} className="btn btn-edit">Edit</a>
          <button onClick={handleDelete} className="btn btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
};

const renderBlock = (block: any) => {
  switch (block.type) {
    case 'header':
      return renderHeader(block);
    case 'paragraph':
      return renderParagraph(block);
    case 'list':
      return renderList(block);
    case 'attaches':
      return renderAttaches(block);
    case 'image':
      return renderImage(block);
    case 'linkTool':
      return renderLinkTool(block);
    case 'checklist':
      return renderChecklist(block);
    case 'quote':
      return renderQuote(block);
    default:
      return null;
  }
};

const renderHeader = (block: any) => {
  return (
    <>
      {block.data.level === 1 && <h1>{block.data.text}</h1>}
      {block.data.level === 2 && <h2>{block.data.text}</h2>}
      {block.data.level === 3 && <h3>{block.data.text}</h3>}
      {block.data.level === 4 && <h4>{block.data.text}</h4>}
    </>
  );
};

const renderParagraph = (block: any) => {
  return <p>{block.data.text}</p>;
};

const renderList = (block: any) => {
  return (
    <ul>
      {block.data.items.map((item: string, itemIndex: number) => (
        <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  );
};

const renderAttaches = (block: any) => {
  return (
    <div>
      <a href={block.data.file.url} download>
        {block.data.title || block.data.file.name}
      </a> ({block.data.file.size} bytes)
    </div>
  );
};

const renderImage = (block: any) => {
  return (
    <figure>
      <img className="image" src={block.data.url} alt={block.data.caption} />
      {block.data.caption && <figcaption>{block.data.caption}</figcaption>}
    </figure>
  );
};

const renderLinkTool = (block: any) => {
  return (
    <div>
      <h3>{block.data.meta?.title}</h3>
      <p>{block.data.meta?.description}</p>
      <a href={block.data.link} target="_blank" rel="noopener noreferrer">{block.data.link}</a>
    </div>
  );
};

const renderChecklist = (block: any) => {
  return (
    <ul>
      {block.data.checklist?.map((item: any, index: number) => (
        <li key={index}>
          <input type="checkbox" checked={item.checked} disabled />
          <label>{item.text}</label>
        </li>
      ))}
    </ul>
  );
};

const renderQuote = (block: any) => {
  return (
    <figure>
      <blockquote>{block.data.text}</blockquote>
      {block.data.caption && <figcaption>{block.data.caption}</figcaption>}
    </figure>
  );
};

export default Oneview;
