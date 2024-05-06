import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    try {
      const createdDocument = new this.model({
        ...document,
        _id: new Types.ObjectId(),
      });
      return (
        await createdDocument.save(options)
      ).toJSON() as unknown as TDocument;
    } catch (error) {
      this.logger.error('Failed to create document', error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    try {
      const document = await this.model.findOne(
        filterQuery,
        {},
        { lean: true },
      );

      if (!document) {
        this.logger.warn('Document not found with filterQuery', filterQuery);
        throw new NotFoundException('Document not found.');
      }

      return document;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to find document', error);
      throw new BadRequestException(error);
    }
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    try {
      const document = await this.model.findOneAndUpdate(filterQuery, update, {
        lean: true,
        new: true,
      });

      if (!document) {
        this.logger.warn(`Document not found with filterQuery:`, filterQuery);
        throw new NotFoundException('Document not found.');
      }

      return document;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Failed to update document', error);
      throw new BadRequestException(error);
    }
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ): Promise<TDocument> {
    try {
      return this.model.findOneAndUpdate(filterQuery, document, {
        lean: true,
        upsert: true,
        new: true,
      });
    } catch (error) {
      this.logger.error('Failed to upsert document', error);
      throw new InternalServerErrorException(error);
    }
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    try {
      return this.model.find(filterQuery, {}, { lean: true });
    } catch (error) {
      this.logger.error('Failed to find document', error);
      throw new BadRequestException(error);
    }
  }

  async delete(filterQuery: FilterQuery<TDocument>) {
    try {
      const result = await this.model.deleteOne(filterQuery);
      if (result.deletedCount === 0) {
        throw new NotFoundException('Document not found.');
      }
      return result;
    } catch (error) {
      this.logger.error('Failed to delete document', error);
      throw new InternalServerErrorException(error);
    }
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
