import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class BlockTunes {
  @Prop({ type: [String] })
  footnotes?: string[];
}

class BlockFile {
  @Prop({ type: String })
  url?: string;

  @Prop({ type: Number })
  size?: number;

  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  extension?: string;
}

class BlockMeta {
  @Prop({ type: String })
  title?: string;

  @Prop({ type: String })
  site_name?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: BlockFile })
  image?: BlockFile;
}

class BlockMetaItem {
  @Prop({ type: String })
  text?: string;

  @Prop({ type: Boolean })
  checked?: boolean;
}

class BlockData {
  @Prop({ type: String })
  text?: string;

  @Prop({ type: Number })
  level?: number;

  @Prop({ type: String })
  type?: string;

  @Prop({ type: [String] })
  items?: string[];

  @Prop({ type: BlockFile })
  file?: BlockFile;

  @Prop({ type: Boolean })
  withBorder?: boolean;

  @Prop({ type: Boolean })
  withBackground?: boolean;

  @Prop({ type: Boolean })
  stretched?: boolean;

  @Prop({ type: String })
  caption?: string;

  @Prop({ type: String })
  link?: string;

  @Prop({ type: BlockMeta })
  meta?: BlockMeta;

  @Prop({ type: [BlockMetaItem] })
  checklist?: BlockMetaItem[];

  @Prop({ type: String })
  alignment?: string;
}

class Block {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: BlockData })
  data: BlockData;

  @Prop({ type: BlockTunes })
  tunes?: BlockTunes;
}

@Schema()
export class Publication extends Document {
  @Prop({ type: Number, required: true })
  time: number;

  @Prop({ type: [Block], required: true })
  blocks: Block[];
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
