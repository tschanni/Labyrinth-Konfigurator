import { ApiProperty} from '@nestjs/swagger';
import { GetGameMapDto } from "./get-GameMap.dto";

export class GetGameMapResponseDto {

    constructor(getGameMapDto: GetGameMapDto){
        this.getGameMapDto = getGameMapDto;
    }

    @ApiProperty()
    getGameMapDto: GetGameMapDto;
}