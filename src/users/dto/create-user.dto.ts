import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNotIn, IsNumber, IsObject, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

//create class to validate 1 object
class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;

}

export class CreateUserDto {
    @IsNotEmpty({ message: 'name không được để trống' })
    name: string;

    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;

    @IsNotEmpty({ message: 'Password không được để trống' })
    password: string;

    @IsNumber({}, { message: 'age phải là number' })
    @IsNotEmpty({ message: 'age không được để trống' })
    age: number;

    @IsNotEmpty({ message: 'gender không được để trống' })
    gender: string;

    @IsNotEmpty({ message: 'address không được để trống' })
    address: string;

    @IsNotEmpty({ message: 'role không được để trống' })
    role: string;

    //validate 1 object
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}


export class RegisterUserDto {
    @IsNotEmpty({ message: 'name không được để trống' })
    name: string;

    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;

    @IsNotEmpty({ message: 'Password không được để trống' })
    password: string;

    @IsNotEmpty({ message: 'age không được để trống' })
    age: number;

    @IsNotEmpty({ message: 'gender không được để trống' })
    gender: string;

    @IsNotEmpty({ message: 'address không được để trống' })
    address: string;
}
