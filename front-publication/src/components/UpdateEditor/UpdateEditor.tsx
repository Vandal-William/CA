/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import './style.css';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from "@editorjs/simple-image";
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Checklist from '@editorjs/checklist';
import LinkTool from '@editorjs/link';
import PrintTemplate from '../PrintTemplate/PrintTemplate';
import PreviewModal from '../PreviewModal/PreviewModal';
import publication from '../../selectors/publication';
import UnsplashModal from '../UnsplashModal/UnsplashModal';
import { useParams } from 'react-router-dom';

const UpdateEditor: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorJS | null>(null);
  const [data, setData] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [cover, setCover] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const result = await publication.fetchOne(id);
          setData(result);
          setTitle(result.title);
          setCover(result.cover);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la publication :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!loading) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4],
              defaultLevel: 1,
            },
          },
          image: {
            class: SimpleImage,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool,
            inlineToolbar: true,
          },
        },
        autofocus: true,
        placeholder: 'Let`s write an awesome story!',
        inlineToolbar: true,
        data: data,
        onChange: () => {
          editorRef.current?.save().then((outputData) => {
            setData(outputData);
          }).catch((error) => {
            console.log('Saving failed: ', error);
          });
        },
        onReady: () => {
          editorRef.current = editor;
        },
      });

      return () => {
        if (editorRef.current && typeof editorRef.current.destroy === 'function') {
          editorRef.current.destroy();
        }
        editorRef.current = null;
      };
    }
  }, [loading]);

  if (loading) {
    return <div style={{ zIndex: '1' }} className="loading">Loading...</div>;
  }

  if (!data) {
    return <div className="error">Erreur lors de la récupération des données</div>;
  }

  const handleClickSave = async () => {
    if (data && id) {
      publication.update(id, data, title, cover);
    }
  };

  const handlePrint = () => {
    const printContents = previewRef.current?.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow && printContents) {
      const printTemplate = ReactDOMServer.renderToStaticMarkup(
        <PrintTemplate content={printContents} />
      );
      printWindow.document.write(printTemplate);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCover(event.target.value);
  };

  return (
    <div className='editor-container'>
      <div className='editor-side-panel'>
        <h2 className='panel-title'>Update a publication</h2>
        <input
          className='title-input'
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a publication's title"
        />
        <ul className='sub-menu_button'>
          <input onChange={handleCoverChange} value={cover} className='title-input' type="text" placeholder="Link of unsplash's cover" readOnly />
          <button onClick={() => setIsModalOpen(true)} className='link-button'>Change cover in Unsplash</button>
          <li onClick={handleClickSave} className='link-button'>Update</li>
          <li onClick={handlePrint} className='link-button'>Print</li>
        </ul>
      </div>
      <div id="editorjs" className="editorjs" />
      <PreviewModal data={data} previewRef={previewRef} />
      {isModalOpen && <UnsplashModal onClose={() => setIsModalOpen(false)} onSelect={(path) => {
        setCover(path);
        setIsModalOpen(false);
      }} />}
    </div>
  );
};

export default UpdateEditor;
