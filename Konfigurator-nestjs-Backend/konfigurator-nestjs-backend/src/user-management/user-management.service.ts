import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/UsersEntity';
import { Repository } from 'typeorm';
import { GetUserRequestDto } from 'src/dto/get-UserRequest.dto';
import { ServiceResponseDto } from 'src/dto/ServiceResponse.dto';
import * as bcrypt from 'bcrypt'
import { GetUserResponseDto } from 'src/dto/get-UserResponse.dto';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class UserManagementService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) {}

    async Createuser(request: GetUserRequestDto) {
        const user = await this.usersRepository.findOne({
            where: {
                username: request.username
            }
        });

        // pruefen, ob der Benutzername bereits vergeben ist
        if(user) {
            return new ServiceResponseDto<string> ("", false, "Username bereits vergeben");
        }
        
        const hash = await bcrypt.hash(request.passwordHash, 0);

        const newUser = new Users();
        newUser.username = request.username;
        newUser.passwordHash = hash;

        const registerdUser = await  this.usersRepository.save(newUser);

        return new ServiceResponseDto<string> (registerdUser.username, true, "Registrierung erfolgreich");
    }

    async LoginUser(request: GetUserRequestDto) {
        const token = "";
        let result;

        const user = await this.usersRepository.findOne({
            where: {
                username: request.username
            }
        });

        // Nutzer gefunden
        if(user) {
            result = await bcrypt.compare(request.passwordHash, user.passwordHash);
        }

        // Passwort falsch oder Nutzer nicht gefunden
        if(result == false || !user) {
            return new ServiceResponseDto<GetUserResponseDto> (null, false, "Benuzername oder Passwort falsch");
        }

        // Response mit Token zurueckgeben
        const response = new GetUserResponseDto(user.username, await this.jwtService.signAsync({username: user.username}));

        return new ServiceResponseDto<GetUserResponseDto> (response, true, "eingeloggt");
    }
}
