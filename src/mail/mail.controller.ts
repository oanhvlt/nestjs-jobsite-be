import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Subscriber, SubscriberDocument } from 'src/subscribers/schemas/subscriber.schema';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,

    @InjectModel(Subscriber.name)
    private readonly subscriberModel: SoftDeleteModel<SubscriberDocument>,

    @InjectModel(Job.name)
    private readonly jobModel: SoftDeleteModel<JobDocument>,
  ) { }


  // @Cron(CronExpression.EVERY_30_SECONDS)
  // testCron() {
  //   console.log('Called every 30 seconds');
  // }

  @Get()
  @Public()
  @ResponseMessage("Test email 6")
  @Cron("0 5 0 * * 0") // 0h:5m:0s every sunday (sun:0 -> sat:6)
  async handleTestEmail() {
    const subscribers = await this.subscriberModel.find({});
    for (const subs of subscribers) {
      const subsSkills = subs.skills;
      const jobWithMatchingskills = await this.jobModel.find({ skills: { $in: subsSkills } });
      //todo
      if (jobWithMatchingskills?.length) {
        const jobs = jobWithMatchingskills.map(item => {
          return {
            name: item.name,
            company: item.company,
            salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " đ",
            skills: item.skills,
          }
        })
        //build template
        await this.mailerService.sendMail({
          to: subs.email, //"vulethuyoanh@gmail.com",
          from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Nice App! Confirm your Email',
          //html: '<b>welcome bla bla</b>', // HTML body content
          template: "new-job",
          context: {
            receiver: subs.name,
            jobs: jobs
          }
        });
      }

    }
  }
}
