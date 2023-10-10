import { SetMetadata } from '@nestjs/common';

export const PassAuth = () => SetMetadata('PassAuth', true);
export const IS_ALLOWED = 'PassAuth';
