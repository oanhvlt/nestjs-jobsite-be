import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserM, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import { User } from 'src/decorator/customize';
import aqp from 'api-query-params';

@Injectable() // ~ Pipe (midleware): https://docs.nestjs.com/pipes
export class UsersService {
  constructor(
    @InjectModel(UserM.name) //name: id of model
    private userModel: SoftDeleteModel<UserDocument>
  ) { }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hashPass = hashSync(password, salt);
    return hashPass;
  }

  async register(registerUser: RegisterUserDto) {
    const { name, email, password, age, gender, address } = registerUser;
    //check email is exist
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email ${email} is exist.`);
    }

    const hashPassword = this.getHashPassword(password);
    let user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
    })
    return user;
  }


  async create(createUserDto: CreateUserDto, @User() loginUser: IUser) {
    const { name, email, password, age, gender, address, role, company } = createUserDto;
    //check email is exist
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email ${email} is exist.`);
    }
    const hashPassword = this.getHashPassword(password);
    let newUser = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role,
      company,
      createdBy: {
        _id: loginUser._id,
        email: loginUser.email
      }

    })
    return newUser;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * (limit);
    let defaultLimit = limit ? limit : 10;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    let size = (totalItems - offset) < limit ? totalItems - offset : limit;

    const result = await this.userModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any) //lib define type of 'sort'  !== typescript
      .select('-password')
      .populate(population)
      .exec();
    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: size, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }

  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return `User not found`
    }
    return await this.userModel.findOne({
      _id: id
    }).select('-password'); // exclude password in result

  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username
    })
    //return `This action returns a #${id} user`;
  }

  isValidPassword(password: string, hashPass: string) {
    return compareSync(password, hashPass);
  }

  async update(updateUserDto: UpdateUserDto, @User() loginUser: IUser) {
    //const email = updateUserDto.email;
    //check email is exist
    // const isExist = await this.userModel.findOne({ email });
    // if (isExist) {
    //   throw new BadRequestException(`Email ${email} is exist.`);
    // }
    let userUpdated = await this.userModel.updateOne({ _id: updateUserDto._id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: loginUser._id,
          email: loginUser.email
        }
      });

    return userUpdated;
  }

  async remove(id: string, @User() loginUser: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return `Job not found`
    }
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: loginUser._id,
          email: loginUser.email
        }
      }
    )
    return this.userModel.softDelete(
      { _id: id }
    );

  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne(
      { _id },
      { refreshToken }
    )
  }

  findUserToken = async (refreshToken: string) => {
    return await this.userModel.findOne({ refreshToken })
  }

}
