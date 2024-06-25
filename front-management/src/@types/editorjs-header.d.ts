/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@editorjs/header' {
  
  interface Data {
    text: string;
    level: number;
  }

  interface HeaderData {
    type: string;
    data : Data;
  }

  class Header {
    constructor(config: any);
    render(): HTMLElement;
    save(blockContent: HTMLElement): HeaderData;
    validate(savedData: HeaderData): boolean;
  }

  export default Header;
}