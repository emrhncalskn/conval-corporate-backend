import { differenceInCalendarMonths, differenceInMilliseconds, isAfter } from "date-fns";
import { formatDuration, intervalToDuration } from 'date-fns'
import { formatDurationWithOptions } from "date-fns/fp";

export class Functions {
    async slugCreator(value: string) {
        const slug = value
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .trim();

        const randomNum = `${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`;
        const pslug = slug + '-' + randomNum
        return await pslug;
    }

    async getToday() {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate
                .getHours()
                .toString()
                .padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate
                    .getSeconds()
                    .toString()
                    .padStart(2, '0')}`;
        return formattedDate
    }

    async formatDate(dateString, type) {
        if (isNaN(dateString)) return '';
        const date = new Date(dateString);
        if (type === 'year') {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return await `${day}-${month}-${year}`;
        }

        else {
            const hours = date.getHours().toString().padStart(2, '0')
            const min = date.getMinutes().toString().padStart(2, '0')
            const sec = date.getSeconds().toString().padStart(2, '0')

            return await `${hours}:${min}:${sec}`;
        }
    }

    async diffBetweenDates(startDate: Date, endDate: Date) {
        let duration = intervalToDuration({
            start: (startDate),
            end: (endDate),
        })

        formatDuration(duration, { delimiter: ',' })
        return duration;
    }

    async getMilliseconds(date: Date) {
        return differenceInMilliseconds(date, new Date());
    }

    async getStatusByDate(date: Date) {
        let status = 0;
        let msDate = Number(((await this.getMilliseconds(date)) / 100000).toFixed(0));
        const day = [864, 1728, 2592, 4320, 6048, 12096, 25920, 155520, 315576]; // 1 gün, 2 gün, 3 gün, 5 gün, 7 gün, 14 gün, 30 gün, 180 gün, 365 gün (milisaniye cinsinden)
        for (let i = 0; i < 9; i++) {
            msDate < 0 ? status = -1 : msDate < day[0] && msDate > 0 ? status = 11 : msDate > day[i] ? status++ : status;
        }
        return status;
    }

    async convertTurkishWords(text: string) {
        const turkishChars = 'çğıöşüÇĞİÖŞÜ ';
        const englishChars = 'cgiosuCGIOSU-';

        let result = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const index = turkishChars.indexOf(char);

            if (index !== -1) {
                result += englishChars[index];
            } else {
                result += char === ' ' ? '-' : char;
            }
        }

        return result.toLowerCase();
    }

    async fillEmpty(value: string) {
        const tr = await this.convertTurkishWords(value);
        const slug = tr
            .toLowerCase()
            .replace(/[\s_-]+/g, '-')
            .trim();

        return slug;
    }
}