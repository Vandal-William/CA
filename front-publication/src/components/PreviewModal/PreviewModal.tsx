/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import './style.css';

interface PreviewModalProps {
  data: OutputData | null | undefined;
  previewRef : React.RefObject<HTMLDivElement>
}

const PreviewModal: React.FC<PreviewModalProps> = ({ data, previewRef }) => {
    
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className='preview-content' ref={previewRef}>
          {data && data.blocks.map((block: any, index: number) => (
            <div key={index}>
              {block.type === 'header' && (
                <>
                  {block.data.level === 1 && <h1>{block.data.text}</h1>}
                  {block.data.level === 2 && <h2>{block.data.text}</h2>}
                  {block.data.level === 3 && <h3>{block.data.text}</h3>}
                  {block.data.level === 4 && <h4>{block.data.text}</h4>}
                </>
              )}
              {block.type === 'paragraph' && <p>{block.data.text}</p>}
              {block.type === 'image' && <img style={{width: '100%'}} src={block.data.url} alt={block.data.caption}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
