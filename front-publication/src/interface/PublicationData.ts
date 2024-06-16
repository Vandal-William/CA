interface PublicationData {
  _id: string;
  title: string;
  cover?: string;
  categoryId: string;
  summary?: string;
  readonly time: number;
  readonly blocks: {
    id: string;
    type: string;
    data: {
      text?: string;
      level?: number;
      type?: string;
      items?: string[];
      file?: {
        url: string;
        size?: number;
        name?: string;
        extension?: string;
      };
      withBorder?: boolean;
      withBackground?: boolean;
      stretched?: boolean;
      caption?: string;
      link?: string;
      meta?: {
        title?: string;
        site_name?: string;
        description?: string;
        image?: {
          url?: string;
          size?: number;
          name?: string;
          extension?: string;
        };
      };
      checklist?: {
        text?: string;
        checked?: boolean;
      }[];
      alignment?: string;
    };
    tunes?: {
      footnotes?: string[];
    };
  }[];
}

export default PublicationData;

  