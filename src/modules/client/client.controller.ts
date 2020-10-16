import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor, HttpCode, HttpStatus, Param, Delete
} from '@nestjs/common';
import { ClientService } from './client.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {UpdateClientDto} from "./dto/update-client.dto";

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(
    private clientService: ClientService,
  ) {
  }

  @Post()
  async create(@Body(new ValidationPipe()) CreateClientDto: CreateClientDto) {
    return await this.clientService.createClient(CreateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateClientDto: UpdateClientDto): Promise<any> {
    await this.clientService.updateClient(id, updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.clientService.deleteClient(id);
  }
}
