import { OmitType, PartialType } from '@nestjs/mapped-types';
//PartialType: kế thừa create-user.dto.ts
//OmitType: kế thừa và loại đi thuộc tính nào đó
import { CreateUserDto } from './create-user.dto';


export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    _id: string;
}
