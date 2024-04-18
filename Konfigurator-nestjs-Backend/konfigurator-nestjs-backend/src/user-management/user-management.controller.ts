import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { GetUserRequestDto } from 'src/dto/get-UserRequest.dto';
import { Response } from 'express';


@Controller('UserManagement')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Post('add')
  async CreateUser(@Res() response: Response, @Body() request: GetUserRequestDto) {
    const resp = await this.userManagementService.Createuser(request);

    if(resp.success) {
      return response.status(200).send('"' + resp.message + '"');
    }
    else 
    {
      return response.status(400).send(resp.message)
    }
  }

  @Post('login')
  async LoginUser(@Res() response: Response, @Body() request: GetUserRequestDto) {
    const resp = await this.userManagementService.LoginUser(request);
    
    if(resp.success) {
      return response.send(resp.data);
    }
    
    return response.status(400).send(resp.message)
  }
}
