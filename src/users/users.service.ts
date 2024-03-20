import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable() // ~ Pipe (midleware): https://docs.nestjs.com/pipes
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) { }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hashPass = hashSync(password, salt);
    return hashPass;
  }

  // async create(email: string, password: string, name: string) {
  //   const hashPassword = this.getHashPassword(password);
  //   let user = await this.userModel.create({
  //     email,
  //     password: hashPassword,
  //     name
  //   })
  //   return user;
  // }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    let user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      name: createUserDto.name
    })
    return user;
  }

  findAll() {

    return this.userModel.find();
    //return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return `User not found`
    }
    return this.userModel.findOne({
      _id: id
    })
    //return `This action returns a #${id} user`;
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

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: updateUserDto._id }, { ...updateUserDto });
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return `User not found`
    }
    return this.userModel.softDelete({
      _id: id
    })
  }
}
