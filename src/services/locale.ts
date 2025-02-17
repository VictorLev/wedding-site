'use server';

import { cookies } from 'next/headers';
import { defaultLocale } from '@/src/i18n/config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieStore = await cookies();
  const cookie = await cookieStore.get(COOKIE_NAME);
  return cookie?.value || defaultLocale;
}