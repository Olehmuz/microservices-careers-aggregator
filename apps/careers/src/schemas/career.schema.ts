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

  @Prop()
  location: string;

  @Prop()
  url: string;

  @Prop()
  salary: number;

  @Prop()
  careerId: string;
}

export const CareerSchema = SchemaFactory.createForClass(Career);
