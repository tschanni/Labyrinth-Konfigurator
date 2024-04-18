import { ApiProperty} from '@nestjs/swagger'

export class GetUserRequestDto {
    constructor(
        username: string,
        passwordHash: string
    )
    {
        this.username = username;
        this.passwordHash = passwordHash;
    }
    @ApiProperty()
    username: string;

    @ApiProperty()
    passwordHash: string;
}