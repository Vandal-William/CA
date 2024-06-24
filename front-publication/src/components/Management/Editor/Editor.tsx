/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import './style.css';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from "@editorjs/simple-image";
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Checklist from '@editorjs/checklist';
import LinkTool from '@editorjs/link';
import PrintTemplate from '../../Management/PrintTemplate/PrintTemplate';
import PreviewModal from '../../Management/PreviewModal/PreviewModal';
import publication from '../../../selectors/publication/publication';
import UnsplashModal from '../UnsplashModal/UnsplashModal';
import category from '../../../selectors/publication/category';
import {CategoryData} from '../../../interface/publication/CategoryData';

const Editor: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorJS | null>(null);
  const [data, setData] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [cover, setCover] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>();
  const [cat, setCat] = useState<string>('');
  const [summary, setSummary] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await category.fetchAll();
        setCategories(result);
        
      } catch (error) {
        console.error('Erreur lors de la récupération de la publication :', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
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
      onChange: () => {
        editorRef.current?.save().then((outputData: OutputData) => {
          setData(outputData);
        }).catch((error: any) => {
          console.log('Saving failed: ', error);
        });
      }
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
      }
      editorRef.current = null;
    };
  }, []);

  const handleClickSave = async() => {
    if(data && title && cat){
      publication.create(data, title, cover, summary, cat);
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

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCat(event.target.value);
  };

  const handleChangeSummary = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(event.target.value);
  };


  return (
    <>
    <a className='return-link' href="/publications"> Back to menu </a>
    <div className='editor-container'>
      <div className='editor-side-panel'>
        <h2 className='panel-title'>Create a publication</h2>
        <input
          className='title-input'
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a publication's title"
        />
        <ul className='sub-menu_button'>
          <textarea name="summary" onChange={handleChangeSummary} value={summary} placeholder="write a publication's summary" className='summary-input'></textarea>
          <select onChange={handleChangeCategory} value={cat} className='category-select' name="categories">
            <option value="choose">Choose a category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          <input onChange={handleCoverChange} value={cover} className='title-input' type="text" placeholder="Link of unsplash's cover" readOnly/>
          <button onClick={() => setIsModalOpen(true)} className='link-button'>Search cover in Unsplash</button>
          <li onClick={handleClickSave} className='link-button'>Save</li>
          <li onClick={handlePrint} className='link-button'>Print</li>
        </ul>
      </div>
      <div id="editorjs" className="editorjs" />
      <PreviewModal data={data} previewRef={previewRef}/>
      {isModalOpen && <UnsplashModal onClose={() => setIsModalOpen(false)} onSelect={(path) => {
        setCover(path);
        setIsModalOpen(false);
      }} />}
    </div>
    </>
  );
};

export default Editor;
