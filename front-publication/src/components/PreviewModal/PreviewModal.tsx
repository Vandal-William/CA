/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import './style.css';

interface PreviewModalProps {
  data: OutputData | null | undefined;
  previewRef: React.RefObject<HTMLDivElement>;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ data, previewRef }) => {
  if (!data || !data.blocks) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className='preview-content' ref={previewRef}>
          {data.blocks.map((block: any) => (
            <div key={block.id}>
              {renderBlock(block)}
            </div>
          ))}
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
      <img style={{ width: '100%' }} src={block.data.file.url} alt={block.data.caption} />
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

export default PreviewModal;
