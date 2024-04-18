import { Controller, Get, Post, Body, Res, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto } from '../dto/create-configuration.dto';
import { UpdateConfigurationDto } from '../dto/update-configuration.dto';
import { ServiceResponseDto } from 'src/dto/ServiceResponse.dto';
import { AddGameMapRequestDto } from 'src/dto/add-GameMapRequest.dto';
import { Response } from 'express';

@Controller('Configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get('getData')
  async GetData(@Res() response: Response) {
    const resp = await this.configurationService.GetConfigurationData();

    if(resp.success) {
      return response.send(resp.data);
    }

    return response.status(400);
  }

  @Post('addGame')
  async CreateGame(@Res() response: Response, @Body() request: AddGameMapRequestDto) {
    const resp = await this.configurationService.CreateGame(request);

    if(resp.success) {
      return response.send(resp.data);
    }
    
    return response.status(400);
  }
}
