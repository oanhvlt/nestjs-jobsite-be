import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IUser } from 'src/users/users.interface';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class JobsService {

  constructor(
    @InjectModel(Job.name) // need to import Compay in companies.module.ts
    private jobModel: SoftDeleteModel<JobDocument>) { }

  async create(createJobDto: CreateJobDto, user: IUser) {
    let newJob = await this.jobModel.create(
      {
        ...createJobDto,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      });
    return {
      _id: newJob._id,
      createdAt: newJob?.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {

    const { filter, sort, population } = aqp(qs);

    //params in query string (companies.controller,ts >> findAll )
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * (limit);
    let defaultLimit = limit ? limit : 10;
    const totalItems = (await this.jobModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    let size = (totalItems - offset) < limit ? totalItems - offset : limit;

    const result = await this.jobModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any) //lib define type of 'sort'  !== typescript
      .populate(population)
      .exec();
    return {
      meta: {
        current: currentPage,
        pageSize: size,
        pages: totalPages,
        total: totalItems
      },
      result
    }

  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return `Job not found`
    }
    return await this.jobModel.findById(id);
    // return await this.jobModel.findOne({
    //   _id: id
    // })
  }

  async update(_id: string, updateJobDto: UpdateJobDto, loginUser: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return `Job not found`
    }
    let updated = await this.jobModel.updateOne({ _id },
      {
        ...updateJobDto,
        updatedBy: {
          _id: loginUser._id,
          email: loginUser.email
        }
      });

    return updated;
  }

  async remove(_id: string, loginUser: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return `Job not found`
    }
    await this.jobModel.updateOne(
      { _id },
      {
        deletedBy: {
          _id: loginUser._id,
          email: loginUser.email
        }
      }
    )
    return this.jobModel.softDelete({ _id });
  }
}
