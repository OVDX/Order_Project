import { Model } from 'mongoose';
import { User } from './users.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(username: string, password: string): Promise<User>;
    findOne(username: string): Promise<User | undefined>;
}
