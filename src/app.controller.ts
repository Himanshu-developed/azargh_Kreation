import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { IcreateUser, IupdateUser } from 'interfaces/requests';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}
  @Get('/users')
  async getallUsers() {
    return this.usersService.getUsers();
  }
  @Get('/users/:id')
  async getuserDetail() {
    return this.usersService.getUserDetail();
  }
  @Post('/users')
  async createuser(@Body() body: IcreateUser) {
    return this.usersService.CreateUsers(body);
  }
  @Put('/users')
  async updateUser(@Body() body: IupdateUser) {
    return this.usersService.updateUsers(body);
  }
  @Delete('/users/:id')
  async deleteUser() {
    return this.usersService.deleteUsers();
  }
}
