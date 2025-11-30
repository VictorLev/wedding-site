import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const newLocale = locale === 'en' ? 'fr' : 'en';

  function onChange() {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      router.refresh();
    });
  }

  return (
    <button
      onClick={onChange}
      className="text-darkBeige link-container"
      aria-label={`Switch to ${newLocale === 'en' ? 'English' : 'French'}`}
      disabled={isPending}
    >
      <span>{newLocale.toUpperCase()}</span>
    </button>
  );
}