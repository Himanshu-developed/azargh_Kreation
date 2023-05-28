import { ImATeapotException, Injectable, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, UserDetail, Prisma } from '@prisma/client';
import { IcreateUser, IupdateUser } from 'interfaces/requests';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUsers() {
    try {
        return await this.prisma.user.findMany({
        where: {
          isActive: true,
        },
        select:{
            id:true,
            isActive:true,
            userDetail:{
                select:{
                    userdetail_id:true
                }
            }
        }
      });
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async getUserDetail() {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: 3,
        },
        select: {
          userDetail: {
            select: {
              firstName: true,
              lastname: true,
              image: true,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
      return 'Failed to fetch user deatail retry again';
    }
  }
  async CreateUsers(body:IcreateUser) {
    try {
      return await this.prisma.user.create({
        data: {
          userDetail: {
            create: {
              firstName: body.firstName,
              lastname: body.lastName,
              image: body.image? body.image:null
            },
          },
          phone: body.phone.toString(),
        },
      });
    } catch (err) {
      console.log(err);
      return 'Failed to create User';
    }
  }
  async updateUsers(body:IupdateUser) {
    try {
      return await this.prisma.user.update({
        where: { id: body.userId },
        data: {
          phone: body.fieldsToUpdate.includes('phone')?body.newValues[body.fieldsToUpdate.indexOf('phone')]:body.oldValues[body.fieldsToUpdate.indexOf('phone')],
          userDetail:{
            update:{
                where:{userdetail_id:body.userDetailId},
                data:{
                    firstName:body.fieldsToUpdate.includes('firstName')?body.newValues[body.fieldsToUpdate.indexOf('firstName')]:body.oldValues[body.fieldsToUpdate.indexOf('firstName')],
                    lastname:body.fieldsToUpdate.includes('lastName')?body.newValues[body.fieldsToUpdate.indexOf('lastName')]:body.oldValues[body.fieldsToUpdate.indexOf('lastName')],
                }
            }
          }
        },
        include:{
            userDetail:true
        }
      });
    } catch (err) {
      console.log(err)
      return 'Failed to Update user';
    }
  }

  async deleteUsers() {
    try {
        return await this.prisma.user.delete({
          where: { id: 3 },
        });
      } catch (err) {
        return 'Failed to delete user';
      }
  }
}
