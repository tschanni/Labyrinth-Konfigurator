import { ApiProperty} from '@nestjs/swagger';
import { BarrierDesigns } from "src/entities/BarrierDesignsEntity";
import { CharacterDesigns } from "src/entities/CharacterDesignsEntity";
import { TargetDesigns } from "src/entities/TargetDesignsEntity";
import { TileDesigns } from "src/entities/TileDesignsEntity";
import { DesignsDto } from './Designs.dto';

export class GetConfigurationDataResponseDto {
    constructor(
        barrierDesignDtos: DesignsDto[],
        characterDesignDtos: DesignsDto[],
        targetDesignDtos: DesignsDto[],
        tileDesignDtos: DesignsDto[]
    ) {
        this.barrierDesignDtos = barrierDesignDtos;
        this.characterDesignDtos = characterDesignDtos;
        this.targetDesignDtos = targetDesignDtos;
        this.tileDesignDtos = tileDesignDtos;
    }
    
    @ApiProperty()
    barrierDesignDtos: DesignsDto[];

    @ApiProperty()
    characterDesignDtos: DesignsDto[];

    @ApiProperty()
    targetDesignDtos: DesignsDto[];

    @ApiProperty()
    tileDesignDtos: DesignsDto[];
}