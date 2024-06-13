/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@editorjs/paragraph' {
  
  interface Data {
    text: string;
  }

  interface ParagraphData {
    type: string;
    data : Data;
  }

  class Paragraph {
    constructor(config: any);
    render(): HTMLElement;
    save(blockContent: HTMLElement): ParagraphData;
    validate(savedData: ParagraphData): boolean;
  }
  export default Paragraph;
}