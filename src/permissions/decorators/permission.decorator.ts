import { SetMetadata } from '@nestjs/common';

export const Permission = (...args: number[]) => SetMetadata('permission_key', args);
