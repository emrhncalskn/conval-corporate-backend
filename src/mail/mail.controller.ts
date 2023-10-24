import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PassAuth } from '../../src/auth/guards/pass-auth.guard';
import { ContactDto } from './dto/contact.dto';
import { MailService } from './mail.service';

@PassAuth()
@ApiTags('Mail')
@Controller('mail')
export class MailController {
    constructor(
        private readonly mailService: MailService,
    ) { }

    @Post('send-contact-mail')
    async sendMail(@Body() contactDto : ContactDto, @Res() res) {
        return await this.mailService.sendContactMail(contactDto, res);
    }

}
