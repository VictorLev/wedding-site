import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { useEffect, useState } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const [, startTransition] = useTransition();
  const [clientLocale, setClientLocale] = useState(locale);
  const newLocale = clientLocale === 'en' ? 'fr' : 'en'; // Toggle between 'en' and 'fr'
  useEffect(() => {
    setClientLocale(locale);
  }, [locale]);

  function onChange() {
     
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale};`;
      window.location.reload(); // Reload the page to apply the new locale
    });
  }

  return (
    <button onClick={onChange} className="text-darkBeige link-container">
      <span >{newLocale.toUpperCase()}</span>
    </button>
  );
}