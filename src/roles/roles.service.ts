import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>) { }

  async create(createRoleDto: CreateRoleDto, loginUser: IUser) {
    const { name, description, isActive, permissions } = createRoleDto;

    //check role exist
    const isExist = await this.roleModel.findOne({ name });
    if (isExist) {
      throw new BadRequestException(`Role with name is ${name} already exist`)
    }

    let newRole = await this.roleModel.create({
      name, description, isActive, permissions,
      createdBy: { _id: loginUser._id, email: loginUser.email },

    });
    return {
      _id: newRole?._id,
      createdAt: newRole?.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * (limit);
    let defaultLimit = limit ? limit : 10;
    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    let size = (totalItems - offset) < limit ? totalItems - offset : limit;

    const result = await this.roleModel.find(filter)
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
      throw new BadRequestException(`permission not found`);
    }
    return await this.roleModel.findById(id)
      .populate({ path: 'permissions', select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 } })
  }

  async update(_id: string, updateRoleDto: UpdateRoleDto, loginUser: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`permission not found`);
    }
    const { name, description, isActive, permissions } = updateRoleDto;

    //check role exist
    // const isExist = await this.roleModel.findOne({ name });
    // if (isExist) {
    //   throw new BadRequestException(`Role with name is ${name} already exist`)
    // }

    return await this.roleModel.updateOne({ _id },
      {
        name, description, isActive, permissions,
        updatedBy: {
          _id: loginUser._id,
          email: loginUser.email
        }
      }
    );
  }

  async remove(_id: string, loginUser: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`permission not found`);
    }
    const foundRole = await this.roleModel.findById(_id);
    if (foundRole.name === 'ADMIN') {
      throw new BadRequestException('Can not delete rold ADMIN');
    }
    await this.roleModel.updateOne({ _id },
      {
        deletedBy: {
          _id: loginUser._id,
          email: loginUser.email
        }
      }
    )
    return this.roleModel.softDelete({ _id });
  }
}
