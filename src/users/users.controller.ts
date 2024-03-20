import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards }
  from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//@: decorator
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  // create(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  //   @Body('name') name: string
  //   ) {
  //   //@Body ~ req.body
  //   //@Body('email') email: string ~ const email: string = req.body.email
  //   return this.usersService.create(email, password, name);
  // }
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) { //@Param: req.params.id
    return this.usersService.findOne(id);

  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
