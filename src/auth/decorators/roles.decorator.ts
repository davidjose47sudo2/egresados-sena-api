import { SetMetadata } from '@nestjs/common';
import { $Enums } from '@prisma/client';

export const ROLES_KEY = Symbol('roles');
export const Roles = (...roles: $Enums.Role[]) => SetMetadata(ROLES_KEY, roles);
