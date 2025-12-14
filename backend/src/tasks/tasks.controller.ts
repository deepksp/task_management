import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';

import { TasksService } from './tasks.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //get all task list
  @Get()
  getAllTasks() {
    return this.tasksService.getAllTaks();
  }

  //get task by id

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  //crdeate new task
  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto) {
    const { ...taskDetails } = CreateTaskDto;
    return this.tasksService.createTask(taskDetails);
  }

  //update task by id
  @Patch(':id')
  updateTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  //delete task by id
  @Delete(':id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delteTask(id);
  }
}
