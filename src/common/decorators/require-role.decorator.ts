import { SetMetadata } from '@nestjs/common';
import { Role } from '@/resources/code/code';

export const ROLE_KEY = 'role';
// 必須ロール.
export const RequireRole = (role: Role) => SetMetadata(ROLE_KEY, role);
