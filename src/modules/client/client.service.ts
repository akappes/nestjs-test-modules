import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Client} from './entity/client.entity';
import {Repository, FindConditions} from 'typeorm';
import {CreateClientDto} from './dto/create-client.dto';
import {UpdateClientDto} from "./dto/update-client.dto";

@Injectable()
export class ClientService {
    private readonly logger = new Logger(ClientService.name);

    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) {
    }

    findOne(query: FindConditions<Client>): Promise<Client> {
        return this.clientRepository.findOne(query);
    }

    async createClient(createClientDto: CreateClientDto): Promise<Client> {
        try {
            return this.clientRepository.save({
                ...createClientDto,
                is_active: true
            });
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async updateClient(id: string, updateClientDto: UpdateClientDto): Promise<void> {
        const {affected} = await this.clientRepository.update(id, updateClientDto);

        if (affected < 1) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }

    async deleteClient(id: string): Promise<void> {
        const {affected} = await this.clientRepository.delete(id);

        if (affected < 1) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
}
