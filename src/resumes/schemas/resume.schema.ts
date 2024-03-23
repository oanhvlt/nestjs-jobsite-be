import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/companies/schemas/company.schema';
import { Job } from 'src/jobs/schemas/job.schema';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    userId: mongoose.Schema.Types.ObjectId;;

    @Prop()
    url: string;

    @Prop()
    status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name }) //or ref: "Company"
    company: mongoose.Schema.Types.ObjectId; // can use this, không cần khai báo type ref
    //company: Company

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Job.name })
    job: mongoose.Schema.Types.ObjectId;
    //job: Job

    @Prop({ type: mongoose.Schema.Types.Array })
    history: {
        status: string;
        updatedAt: Date;
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId;
            email: string;
        }
    }[];

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}

export const ResumeSchema = SchemaFactory.createForClass(Resume);