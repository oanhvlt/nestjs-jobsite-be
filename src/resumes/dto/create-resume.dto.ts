import { IsMongoId, IsNotEmpty, isMongoId } from "class-validator";
import mongoose from "mongoose";

export class CreateResumeDto {
    @IsNotEmpty({ message: 'email is not empty' })
    email: string;

    @IsNotEmpty({ message: 'userId is not empty' })
    @IsMongoId({ message: 'userId is a mongo id' })
    userId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'url is not empty' })
    url: string;

    @IsNotEmpty({ message: 'status is not empty' })
    status: string;

    @IsNotEmpty({ message: 'company is not empty' })
    @IsMongoId({ message: 'company is a mongo id' })
    company: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'job is not empty' })
    @IsMongoId({ message: 'job is a mongo id' })
    job: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
    @IsNotEmpty({ message: 'url is not empty' })
    url: string;

    @IsNotEmpty({ message: 'company is not empty' })
    @IsMongoId({ message: 'company is a mongo id' })
    company: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'job is not empty' })
    @IsMongoId({ message: 'job is a mongo id' })
    job: mongoose.Schema.Types.ObjectId;
}


