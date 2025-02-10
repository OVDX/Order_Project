import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<import("./clients.schema").Client>;
    findAll(): Promise<import("./clients.schema").Client[]>;
    findOne(id: string): Promise<import("./clients.schema").Client>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("./clients.schema").Client>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
