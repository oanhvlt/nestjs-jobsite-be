import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name) // need to import Compay in companies.module.ts
    private resumeModel: SoftDeleteModel<ResumeDocument>) { }

  async create(createUserCvDto: CreateUserCvDto, loginUser: IUser) {
    const { _id, email } = loginUser;
    let newCV = await this.resumeModel.create(
      {
        ...createUserCvDto,
        email: email,
        userId: _id,
        status: 'PENDING',
        createdBy: { _id, email },
        history: [
          {
            status: 'PENDING',
            updatedAt: new Date,
            updatedBy: { _id, email }
          }
        ]

      });
    return {
      _id: newCV?._id,
      createdAt: newCV?.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * (limit);
    let defaultLimit = limit ? limit : 10;
    const totalItems = (await this.resumeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    let size = (totalItems - offset) < limit ? totalItems - offset : limit;

    const result = await this.resumeModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any) //lib define type of 'sort'  !== typescript
      .populate(population)
      .select(projection as any)
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
      throw new BadRequestException(`Resume not found`);
    }
    return await this.resumeModel.findById(id);
  }

  async findByUser(user: IUser) {
    if (!user._id) {
      throw new BadRequestException(`user id not found`);
    }
    return await this.resumeModel.find({
      userId: user._id
    });
  }

  async updateStatus(_id: string, status: string, loginUser: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Resume not found`);
    }
    let updated = await this.resumeModel.updateOne({ _id },
      {
        status,
        updatedBy: {
          _id: loginUser._id,
          email: loginUser.email
        },
        $push: { // đẩy thêm data vào old data
          history: {
            status,
            updatedAt: new Date,
            updatedBy: {
              _id: loginUser._id,
              email: loginUser.email
            }
          }
        }
      });

    return updated;
  }

  async remove(_id: string, loginUser: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Resume not found`);
    }
    await this.resumeModel.updateOne({ _id },
      {
        deletedBy: {
          _id: loginUser._id,
          email: loginUser.email
        }
      }
    )
    return this.resumeModel.softDelete({ _id });
  }
}
