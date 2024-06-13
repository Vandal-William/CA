/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import './style.css';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from "@editorjs/simple-image";
import Paragraph from '@editorjs/paragraph';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import Checklist from '@editorjs/checklist';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import PrintTemplate from '../PrintTemplate/PrintTemplate';
import PreviewModal from '../PreviewModal/PreviewModal';

const Editor: React.FC = () => {

  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorJS | null>(null);
  const [data, setData] = useState<OutputData | null | undefined>();

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
        code: {
          class: CodeTool,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
        },
        delimiter: {
          class: Delimiter,
          inlineToolbar: true,
        },
        alert: {
          class: Alert,
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
        embed: {
          class: Embed,
          inlineToolbar: true,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
      },
      autofocus: true,
      placeholder: 'Let`s write an awesome story!',
      inlineToolbar: true,
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
      }
      editorRef.current = null;
    };
  }, []);

  const handleClickSave = () => {
    editorRef.current?.save().then((outputData: OutputData) => {
      console.log('Article data: ', outputData);
    }).catch((error: any) => {
      console.log('Saving failed: ', error);
    });
   
  };

  const handlePrint = () => {
    editorRef.current?.save().then((outputData: OutputData) => {
      setData(outputData);
      if (data){
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

      }
    }).catch((error: any) => {
      console.log('Saving failed: ', error);
    });
  };

  return (
    <>
      <div className='sub-menu-pdf'>
        <input className='title-input' type="text" name="title" placeholder="Enter a publication's title " />
        <ul className='sub-menu_button'>
          <input className='input-file' type="file" id="file-input"/>
          <label className='link-button' htmlFor="file-input">Choose a publication's cover</label>
          <li onClick={handleClickSave} className='link-button'>Save</li>
          <li onClick={handlePrint} className='link-button'>Print</li>
        </ul>
      </div>
      <div id="editorjs" style={{ border: '1px solid #eaeaea', width: '60%', padding: '10px', height: '50vh', overflow: 'auto' }} />
     <PreviewModal data={data} previewRef={previewRef}/>
    </>
  );
};

export default Editor;
