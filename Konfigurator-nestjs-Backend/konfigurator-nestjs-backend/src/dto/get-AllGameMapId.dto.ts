import { ApiProperty} from '@nestjs/swagger';

export class GetAllGameMapIdDto {

    constructor(gameMapsIds:number[]) {
        this.gameMapIds = gameMapsIds;
    }
    @ApiProperty()
    gameMapIds: number[];
}