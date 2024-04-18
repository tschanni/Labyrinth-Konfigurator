import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { Users } from 'src/entities/UsersEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  PassportModule,
    JwtModule.register({
      secret: 'my-secret-secret-key',
      signOptions: { expiresIn: '1d'},
    }),
],
  controllers: [UserManagementController],
  providers: [UserManagementService, JwtStrategy]
})
export class UserManagementModule {}
