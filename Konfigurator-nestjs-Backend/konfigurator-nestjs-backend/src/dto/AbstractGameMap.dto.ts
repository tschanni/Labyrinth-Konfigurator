import { ApiProperty} from '@nestjs/swagger';
import { MapSizeDto } from "./MapSize.dto";
import { VectorDto } from "./Vector.dto";

export abstract class AbstractGameMapDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    size: MapSizeDto;

    @ApiProperty()
    tile: string;

    @ApiProperty()
    barrier: string;

    @ApiProperty()
    character: string;
    
    @ApiProperty()
    target: string;

    @ApiProperty()
    obstacles: VectorDto[];

    @ApiProperty()
    startPos: VectorDto;

    @ApiProperty()
    endPos: VectorDto;
}