import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>) { }

  async create(createPermissionDto: CreatePermissionDto, loginUser: IUser) {
    const { name, apiPath, method, module } = createPermissionDto;
    const { _id, email } = loginUser;

    //check permission exist
    const isExist = await this.permissionModel.findOne({ apiPath, method });
    if (isExist) {
      throw new BadRequestException(`Permission with apiPath ${apiPath}, method ${method} already exist`)
    }

    let newPermission = await this.permissionModel.create({
      name, apiPath, method, module,
      createdBy: { _id, email },
    });
    return {
      _id: newPermission?._id,
      createdAt: newPermission?.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * (limit);
    let defaultLimit = limit ? limit : 10;
    const totalItems = (await this.permissionModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    let size = (totalItems - offset) < limit ? totalItems - offset : limit;

    const result = await this.permissionModel.find(filter)
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
    return await this.permissionModel.findById(id);
  }

  async update(_id: string, updatePermissionDto: UpdatePermissionDto, loginUser: IUser) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`permission not found`);
    }
    return await this.permissionModel.updateOne({ _id },
      {
        ...updatePermissionDto,
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
    await this.permissionModel.updateOne({ _id },
      {
        deletedBy: {
          _id: loginUser._id,
          email: loginUser.email
        }
      }
    )
    return this.permissionModel.softDelete({ _id });
  }
}
