import { ApiProperty} from '@nestjs/swagger';
import e from 'express';
import { AbstractGameMapDto } from "./AbstractGameMap.dto";
import { MapSizeDto } from './MapSize.dto';
import { VectorDto } from './Vector.dto';

export class GetGameMapDto extends AbstractGameMapDto {
    constructor(
        id: number,
        name: string,
        username: string,
        size: MapSizeDto,
        tile: string,
        barrier: string,
        character: string,
        target: string,
        obstacles: VectorDto[],
        startPos: VectorDto,
        endPos: VectorDto
    ){
        super();
        this.id = id;
        this.name = name;
        this.username = username;
        this.size = size;
        this.tile = tile;
        this.barrier = barrier;
        this.character = character;
        this.target = target;
        this.obstacles = obstacles;
        this.startPos = startPos;
        this.endPos = endPos;

    }
    @ApiProperty()
    id: number;
}