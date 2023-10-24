import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import { config } from 'dotenv';
import { ContactDto } from './dto/contact.dto';
import { Response } from 'express';
import { ConfirmMessages, ErrorMessages } from '../../constants/messages.constants';

config();

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}

    async sendContactMail(contact_info: ContactDto, res : Response) {
        if(!contact_info.first_name || !contact_info.last_name || !contact_info.telephone_number || !contact_info.email || !contact_info.message) {
            return res.status(400).json(ErrorMessages.CONTACT_FORM_REQUIRED_FIELD_ERROR());
        }
        const templatesFolderPath = path.join(__dirname, './templates'); // Template mail dosyasının bulunduğu klasör
        console.log(" DDD :  " + templatesFolderPath)
        const templatePath = path.join(templatesFolderPath, "contact-mail"); // Template mail dosyasının adı
        console.log(" DDD :  " + templatePath)
        const result = await this.mailerService.sendMail({
            to: process.env.COMPANY_MAIL,   // mail gonderilecek mail adresi
            subject: 'İletişim Formu',
            template: templatePath, 
            context: {                                          // mail template içerisinde kullanılacak değişkenler
                first_name: contact_info.first_name,
                last_name: contact_info.last_name,
                telephone_number: contact_info.telephone_number,
                email: contact_info.email,
                message: contact_info.message,
            },
        });
        if(result) {
            return res.status(200).json(ConfirmMessages.MAIL_SEND_CONFIRM(result));
        }
        return res.status(400).json(ErrorMessages.MAIL_SEND_ERROR(result));
    }
}
