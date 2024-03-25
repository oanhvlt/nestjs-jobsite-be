import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UploadedFiles, UseFilters } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';


@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Public()
  @Post('uploadMultiFile')
  @ResponseMessage('Upload multi file')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiFile(@UploadedFiles(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /(image\/jpeg|image\/png|text\/plain|application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
      })
      .addMaxSizeValidator({
        maxSize: 100000 * 1024 //~100mb (maxSizeL byte)
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
  ) files: Array<Express.Multer.File>) {
    console.log(files);
  }

  //@Public()
  @Post('upload')
  @ResponseMessage('Upload single file')
  @UseFilters(new HttpExceptionFilter()) // custom message upload error
  @UseInterceptors(FileInterceptor('fileUpload'))
  //code detail: multer.config.ts
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      fileName: file.filename
    }
  }
  // uploadFile(@UploadedFile(
  //   new ParseFilePipeBuilder()
  //     .addFileTypeValidator({
  //       fileType: /(image\/jpeg|image\/png|text\/plain|application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
  //     })
  //     .addMaxSizeValidator({
  //       maxSize: 10000 * 1024 //~10mb (maxSizeL byte)
  //     })
  //     .build({
  //       errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  //     }),
  // ) file: Express.Multer.File) {
  //   //console.log(file);
  //   return {
  //     fileName: file.filename
  //   }
  // }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
