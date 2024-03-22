import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query }
  from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

//@: decorator
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ResponseMessage('Create a new user')
  async create(@Body() createUserDto: CreateUserDto, @User() loginUser: IUser) { //@User: ''decorator >> customize.ts
    let newUser = await this.usersService.create(createUserDto, loginUser);
    return {
      _id: newUser._id,
      createdAt: newUser.createdAt
    };
  }



  @Get()
  @ResponseMessage('Fetch user with paginate')
  async findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string) {
    return await this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public() // to don't use JWT
  @Get(':id')
  @ResponseMessage('Fetch user by id')
  async findOne(@Param('id') id: string) { //@Param: req.params.id
    return await this.usersService.findOne(id);

  }

  @Patch()
  @ResponseMessage('Update a user')
  async update(@Body() updateUserDto: UpdateUserDto, @User() loginUser: IUser) {
    return await this.usersService.update(updateUserDto, loginUser);
  }

  @Delete(':id')
  @ResponseMessage('Delete a user')
  remove(@Param('id') id: string, @User() loginUser: IUser) {
    return this.usersService.remove(id, loginUser);
  }
}
