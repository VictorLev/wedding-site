import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface LocaleSwitcherProps {
  textColor?: string;
}

export default function LocaleSwitcher({ textColor = 'text-darkerBlue' }: LocaleSwitcherProps) {
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
      className={`${textColor} link-container text-sm tracking-wider`}
      aria-label={`Switch to ${newLocale === 'en' ? 'English' : 'French'}`}
      disabled={isPending}
    >
      <span>{newLocale.toUpperCase()}</span>
    </button>
  );
}