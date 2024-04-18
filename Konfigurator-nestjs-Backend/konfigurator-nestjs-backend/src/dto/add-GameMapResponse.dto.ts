import { ApiProperty} from '@nestjs/swagger'

export class AddGameMapResponseDto {
    constructor(gameMapId: number) {
        this.gameMapId = gameMapId;
    }

    @ApiProperty()
    gameMapId: number;
}