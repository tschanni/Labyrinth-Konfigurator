import { ApiProperty} from '@nestjs/swagger';

export class DesignsDto {
    constructor(
        name: string,
        img: string
    ) {
        this.name = name;
        this.img = img;
    }

    @ApiProperty()
    name: string;

    @ApiProperty()
    img: string;
}