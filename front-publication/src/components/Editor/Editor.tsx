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
import PrintTemplate from '../PrintTemplate/PrintTemplate';
import PreviewModal from '../PreviewModal/PreviewModal';
import publication from '../../selectors/publication';
import UnsplashModal from '../UnsplashModal/UnsplashModal';

const Editor: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorJS | null>(null);
  const [data, setData] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [cover, setCover] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    //let filePath;
    if(data && title){
      // filePath = await publication.uploadFile(cover);
      publication.create(data, title, cover);
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
    // if (event.target.files && event.target.files.length > 0) {
    //   setCover(event.target.files[0]);
    // }
  };


  return (
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
          {/* <input onChange={handleCoverChange} className='input-file' type="file" id="file-input"/>
          <label className='link-button' htmlFor="file-input">Choose a publication's cover</label> */}
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
  );
};

export default Editor;
