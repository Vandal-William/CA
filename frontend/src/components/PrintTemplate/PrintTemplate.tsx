import React from 'react';

interface PrintTemplateProps {
  content: string;
}

const PrintTemplate: React.FC<PrintTemplateProps> = ({ content }) => {
  return (
    <html>
      <head>
        <title>Print Preview</title>
        <style>
          {`
            body { font-family: Arial, sans-serif; }
            @page { size: auto; margin: 0mm; }
            body { margin: 10mm; }
            header, footer, svg 
            .modal-header, 
            .modal-footer,
            .ce-toolbar
            .ce-conversion-toolbar
            .codex-editor-overlay
            { display: none !important; }
          `}
        </style>
      </head>
      <body dangerouslySetInnerHTML={{ __html: content }} />
    </html>
  );
};

export default PrintTemplate;
