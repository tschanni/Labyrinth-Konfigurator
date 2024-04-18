import { ApiProperty} from '@nestjs/swagger';

export class GetUserResponseDto {
    constructor(
        username: string,
        jwtToken: string
    ) {
        this.username = username,
        this.jwtToken = jwtToken
    }

    @ApiProperty()
    username: string;

    @ApiProperty()
    jwtToken: string;
}