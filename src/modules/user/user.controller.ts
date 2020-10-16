import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    ClassSerializerInterceptor,
    UseInterceptors,
    Put,
    HttpStatus, HttpCode, Delete, Param, UseGuards
} from '@nestjs/common';
import {UserService} from './user.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private usersService: UserService,
    ) {
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<any> {
        return await this.usersService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto): Promise<any> {
        await this.usersService.updateUser(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        await this.usersService.deleteUser(id);
    }
}
