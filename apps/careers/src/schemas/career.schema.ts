import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Career extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  careerId: string;

  @Prop({ required: true })
  postedAt: Date;

  @Prop({ required: false })
  location?: string;

  @Prop({ required: false })
  url?: string;

  @Prop({ required: false })
  salary?: number;

  @Prop({ required: false })
  categories?: string[];
}

export const CareerSchema = SchemaFactory.createForClass(Career);
