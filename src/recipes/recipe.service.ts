import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { CreateRecipeDto, UpdateRecipeDto } from './recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly repository: Repository<RecipeEntity>,
  ) { }

  async getAll(): Promise<RecipeEntity[]> {
    return this.repository.find();
  }

  async insert(dto: CreateRecipeDto): Promise<void> {
    this.repository.insert(dto);
  }

  async update(id: string, dto: UpdateRecipeDto): Promise<void> {
    this.repository.update({ id }, dto);
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }
}
