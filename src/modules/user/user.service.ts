import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository, FindConditions} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    /**
     * @param query
     */
    findOne(query: FindConditions<User>): Promise<User> {
        return this.userRepository.findOne(query);
    }

    /**
     * @param createUserDto
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            return this.userRepository.save({
                ...createUserDto,
                is_active: true
            });
        } catch (e) {
            Logger.log(e);
            throw e;
        }
    }

    /**
     * @param id
     * @param updateUserDto
     */
    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        const {affected} = await this.userRepository.update(id, updateUserDto);

        if (affected < 1) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }

    /**
     * @param id
     */
    async deleteUser(id: string): Promise<void> {
        const {affected} = await this.userRepository.delete(id);

        if (affected < 1) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
}
