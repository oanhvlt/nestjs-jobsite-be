import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { Permission } from 'src/permissions/schemas/permission.schema';

export class CreateRoleDto {
    @IsNotEmpty({ message: 'Name is not empty' })
    name: string;

    @IsNotEmpty({ message: 'description is not empty' })
    description: string;

    @IsBoolean({ message: 'isActive is boolean' })
    @IsNotEmpty({ message: 'isActive is not empty' })
    isActive: string;

    @IsArray({ message: 'permissions is array' })
    @IsNotEmpty({ message: 'permissions is not empty' })
    permissions: mongoose.Schema.Types.ObjectId[];

}
