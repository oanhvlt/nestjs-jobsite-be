import { OmitType, PartialType } from '@nestjs/mapped-types';
//PartialType: kế thừa create-user.dto.ts
//OmitType: kế thừa và loại đi thuộc tính nào đó
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';


export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    @IsNotEmpty({ message: '_id không được để trống' })
    _id: string;
}
