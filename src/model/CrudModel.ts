// src/models/CrudModel.ts
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export interface CrudOperations<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  update(id: string, update: UpdateQuery<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  find(query: FilterQuery<T>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findBy(query: FilterQuery<T>): Promise<T | null>;
  findAll(query?: FilterQuery<T>): Promise<T[]>;
}

export abstract class CrudModel<T extends Document> implements CrudOperations<T> {
  constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const document = await this.model.findByIdAndUpdate(id, data, { new: true });
    return document ? document : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  async find(query: FilterQuery<T>): Promise<T[]> {
    return this.model.find(query);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findBy(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async findAll(filter?: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filter || {});
  }
}
