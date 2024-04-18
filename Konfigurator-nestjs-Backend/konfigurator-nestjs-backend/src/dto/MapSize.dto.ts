import { ApiProperty} from '@nestjs/swagger';

export class MapSizeDto {

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    @ApiProperty()
    x: number;

    @ApiProperty()
    y: number;
}