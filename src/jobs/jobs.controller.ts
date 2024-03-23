import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }


  @Post()
  @ResponseMessage('Create a new job')
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @Public()
  @ResponseMessage('Fetch jobs with pagination')
  async findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return await this.jobsService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Fetch job by id')
  async findOne(@Param('id') id: string) {
    return await this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update a job')
  async update(@Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() loginUser: IUser) {
    return await this.jobsService.update(id, updateJobDto, loginUser);
  }


  @Delete(':id')
  @ResponseMessage('Delete a job')
  remove(@Param('id') id: string, @User() loginUser: IUser) {
    return this.jobsService.remove(id, loginUser);
  }
}
