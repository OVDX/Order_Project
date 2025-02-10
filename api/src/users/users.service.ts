// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(username: string, password: string): Promise<User> {
    const newUser = new this.userModel({ username, password });
    return newUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username }).exec();
    return user || undefined;
  }
}
