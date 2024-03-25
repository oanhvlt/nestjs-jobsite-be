import { IsArray, IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
    @IsNotEmpty({ message: 'Name is not empty' })
    name: string;

    @IsEmail({}, { message: 'description is not empty' })
    @IsNotEmpty({ message: 'description is not empty' })
    email: string;

    @IsArray({ message: 'permissions is array' })
    @IsNotEmpty({ message: 'permissions is not empty' })
    skills: string[];
}
