import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) { }

  async getAll(): Promise<CategoryEntity[]> {
    return this.repository.find();
  }

  async insert(dto: CreateCategoryDto): Promise<void> {
    this.repository.insert(dto);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<void> {
    this.repository.update({ id }, dto);
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }
}
