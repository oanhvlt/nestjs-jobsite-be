import { Transform, Type } from 'class-transformer';
import {
    IsArray, IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsString,
    ValidateNested
} from 'class-validator';
import mongoose from 'mongoose';

//create class to validate 1 object
class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;

}

export class CreateJobDto {
    @IsNotEmpty({ message: 'name không được để trống' })
    name: string;


    @IsNotEmpty({ message: 'skills không được để trống' })
    @IsArray({ message: 'skills phải là mảng chuỗi' })
    @IsString({ each: true, message: 'skill có định dạng string' })
    skill: string[];

    //validate 1 object
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;


    @IsNotEmpty({ message: 'salary không được để trống' })
    salary: number;

    @IsNotEmpty({ message: 'quantity không được để trống' })
    quantity: number;

    @IsNotEmpty({ message: 'level không được để trống' })
    level: string;

    @IsNotEmpty({ message: 'description không được để trống' })
    description: string;

    @IsNotEmpty({ message: 'startDate không được để trống' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'startDate có định dạng Date' })
    startDate: Date;

    @IsNotEmpty({ message: 'endDate không được để trống' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'endDate có định dạng Date' })
    endDate: Date;

    @IsNotEmpty({ message: 'isActive không được để trống' })
    @IsBoolean({ message: 'isActive có định dạng boolean' })
    isActive: boolean;

}
