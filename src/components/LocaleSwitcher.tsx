import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [clientLocale, setClientLocale] = useState(locale);

  useEffect(() => {
    setClientLocale(locale);
  }, [locale]);

  function onChange() {
    const newLocale = clientLocale === 'en' ? 'fr' : 'en'; // Toggle between 'en' and 'fr'
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale};`;
      window.location.reload(); // Reload the page to apply the new locale
    });
  }

  return (
    <button onClick={onChange} className="text-darkBeige link-container text-xl">
      <span className={`${clientLocale === 'en' ? "font-bold" : ""}`}>EN</span>/<span className={`${clientLocale === 'fr' ? "font-bold" : ""}`}>FR</span>
    </button>
  );
}