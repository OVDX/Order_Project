import { Model } from 'mongoose';
import { Client } from './clients.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsService {
    private readonly clientModel;
    constructor(clientModel: Model<Client>);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<Client>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
