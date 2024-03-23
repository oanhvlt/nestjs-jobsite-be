import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import mongoose from 'mongoose';
import { IsArray, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdatedBy {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}

class History {
    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    updatedAt: Date;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => UpdatedBy)
    updatedBy: UpdatedBy;
}

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
    @IsNotEmpty({ message: 'History is not empty' })
    @IsArray({ message: 'History is array' })
    @ValidateNested()
    @Type(() => History)
    history: History[];

}
