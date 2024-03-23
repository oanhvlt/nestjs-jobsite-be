
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @ResponseMessage('Create a new role')
  create(@Body() createRoleDto: CreateRoleDto, @User() loginUser: IUser) {
    return this.rolesService.create(createRoleDto, loginUser);
  }

  @Get()
  @ResponseMessage('Fetch role with pagination')
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.rolesService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage('Fetch role by id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update status role')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() loginUser: IUser) {
    return this.rolesService.update(id, updateRoleDto, loginUser);
  }


  @Delete(':id')
  @ResponseMessage('Delete a role')
  remove(@Param('id') id: string, @User() loginUser: IUser) {
    return this.rolesService.remove(id, loginUser);
  }
}
