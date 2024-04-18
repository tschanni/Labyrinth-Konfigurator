import { ApiProperty} from '@nestjs/swagger';

export class GetHighscoresDto {

    constructor(
        date: string,
        gameMapId: number,
        username: string,
        score: number
        ) {
            this.date = date;
            this.gameMapId = gameMapId;
            this.username = username;
            this.score = score;
        }

        @ApiProperty()
        date: string;
    
        @ApiProperty()
        gameMapId: number;
    
        @ApiProperty()
        username: string;
    
        @ApiProperty()
        score: number;
}