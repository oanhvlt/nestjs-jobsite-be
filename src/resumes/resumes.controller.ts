import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Post()
  @ResponseMessage('Create a new resume')
  create(@Body() createUserCvDto: CreateUserCvDto, @User() loginUser: IUser) {
    return this.resumesService.create(createUserCvDto, loginUser);
  }

  @Post('by-user') //use Post để không bị trùng endpoint Get(':id')
  @ResponseMessage('Get resumes by User')
  getResumeByUser(@User() user: IUser) {
    return this.resumesService.findByUser(user);
  }

  @Get()
  @ResponseMessage('Fetch resumes with pagination')
  async findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return await this.resumesService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage('Fetch resume by id')
  async findOne(@Param('id') id: string) {
    return await this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update status resume')
  updateStatus(@Param('id') id: string, @Body('status') status: string, @User() loginUser: IUser) {
    return this.resumesService.updateStatus(id, status, loginUser);
  }

  @Delete(':id')
  @ResponseMessage('Delete a resume')
  remove(@Param('id') id: string, @User() loginUser: IUser) {
    return this.resumesService.remove(id, loginUser);
  }
}
