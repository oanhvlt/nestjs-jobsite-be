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

    @IsNotEmpty({ message: 'companyId is not empty' })
    @IsMongoId({ message: 'companyId is a mongo id' })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'jobId is not empty' })
    @IsMongoId({ message: 'jobId is a mongo id' })
    jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
    @IsNotEmpty({ message: 'url is not empty' })
    url: string;

    @IsNotEmpty({ message: 'companyId is not empty' })
    @IsMongoId({ message: 'companyId is a mongo id' })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'jobId is not empty' })
    @IsMongoId({ message: 'jobId is a mongo id' })
    jobId: mongoose.Schema.Types.ObjectId;
}


