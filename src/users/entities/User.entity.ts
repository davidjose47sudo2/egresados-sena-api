import { $Enums, User as ModelUser } from '@prisma/client';

export class User implements ModelUser {
  id: string;
  dni: number;
  password: string;
  role: $Enums.Role;
}
