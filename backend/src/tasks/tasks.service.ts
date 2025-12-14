import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/typeorm/entities/Task';
import { CreateTaskParams, UpdateTaskParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskReprository: Repository<Task>,
  ) {}

  getAllTaks() {
    return this.taskReprository.find();
  }

  async getTaskById(id: number) {
    const task = await this.taskReprository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task ID ${id} not found`);
    }
    return task;
  }

  createTask(taskDetails: CreateTaskParams) {
    const newTask = this.taskReprository.create({
      ...taskDetails,
      createdAt: new Date(),
    });
    return this.taskReprository.save(newTask);
  }

  async updateTask(id: number, updateTaskDetails: UpdateTaskParams) {
    const result = await this.taskReprository.update(
      { id },
      { ...updateTaskDetails },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return {
      message: 'Task updated successfully',
    };
  }

  async delteTask(id: number) {
    const result = await this.taskReprository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return {
      message: 'Task deleted successfully',
    };
  }
}
