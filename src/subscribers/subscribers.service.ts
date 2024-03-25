import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { IUser } from 'src/users/users.interface';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private SubscriberModel: SoftDeleteModel<SubscriberDocument>) { }

  async create(createSubscriberDto: CreateSubscriberDto, loginUser: IUser) {
    const { name, email, skills } = createSubscriberDto;

    //check Subscriber exist
    const isExist = await this.SubscriberModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Subscriber with name is ${email} already exist`)
    }

    let newSubscriber = await this.SubscriberModel.create({
      name, email, skills,
      createdBy: { _id: loginUser._id, email: loginUser.email },

    });
    return {
      _id: newSubscriber?._id,
      createdAt: newSubscriber?.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * (limit);
    let defaultLimit = limit ? limit : 10;
    const totalItems = (await this.SubscriberModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    let size = (totalItems - offset) < limit ? totalItems - offset : limit;

    const result = await this.SubscriberModel.find(filter)
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
      throw new BadRequestException(`Subscriber not found`);
    }
    return await this.SubscriberModel.findById(id);
  }

  async getUserSkills(user: IUser) {
    return await this.SubscriberModel.findOne(
      { email: user.email }, //điều kiện query
      { skills: 1 } //data select
    )
  }


  async update(updateSubscriberDto: UpdateSubscriberDto, user: IUser) {
    let sub = await this.SubscriberModel.findOne({ email: user.email });
    if (!sub) {
      throw new BadRequestException(`Subscriber not found`);
    }

    const updated = await this.SubscriberModel.updateOne(
      { email: user.email },
      {
        ...updateSubscriberDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      },
      { upsert: true } //nếu bản ghi đã tồn tại thì update, nếu chưa tồn tại thì insert
    );

    return updated;
  }

  async remove(_id: string, loginUser: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Subscriber not found`);
    }

    await this.SubscriberModel.updateOne({ _id },
      {
        deletedBy: {
          _id: loginUser._id,
          email: loginUser.email
        }
      }
    )
    return this.SubscriberModel.softDelete({ _id });
  }
}
