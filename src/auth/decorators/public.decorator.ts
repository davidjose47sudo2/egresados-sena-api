import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = Symbol('isPublic');

/**
 * The Public decorator is used to mark a route as public.
 * @param [value = true] - The value to set the metadata to.
 */
export const Public = (value = true) => SetMetadata(IS_PUBLIC_KEY, value);
