import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { ResponseMessage, SkipCheckPermission, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) { }

  @Post()
  @ResponseMessage('Create a new subscriber')
  create(@Body() createSubscriberDto: CreateSubscriberDto, @User() loginUser: IUser) {
    return this.subscribersService.create(createSubscriberDto, loginUser);
  }


  @Post('skill')
  @SkipCheckPermission()
  @ResponseMessage("Get subscriber's skills")
  getUserSkills(@User() user: IUser) {
    return this.subscribersService.getUserSkills(user);
  }


  @Get()
  @ResponseMessage('Fetch subscriberS with pagination')
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.subscribersService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage('Fetch subscriber by id')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
  @SkipCheckPermission()
  @ResponseMessage('Update subscriber')
  update(@Body() updateSubscriberDto: UpdateSubscriberDto, @User() loginUser: IUser) {
    return this.subscribersService.update(updateSubscriberDto, loginUser);
  }


  @Delete(':id')
  @ResponseMessage('Delete a subscriber')
  remove(@Param('id') id: string, @User() loginUser: IUser) {
    return this.subscribersService.remove(id, loginUser);
  }
}
