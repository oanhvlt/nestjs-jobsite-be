import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
    @IsNotEmpty({ message: 'Name không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'Address không được để trống' })
    apiPath: string;

    @IsNotEmpty({ message: 'Description không được để trống' })
    method: string;

    @IsNotEmpty({ message: 'logo không được để trống' })
    module: string;
}
