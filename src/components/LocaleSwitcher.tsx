import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onChange() {
    const newLocale = locale === 'en' ? 'fr' : 'en'; // Toggle between 'en' and 'fr'
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
      window.location.reload(); // Reload the page to apply the new locale
    });
  }

  return (
    <button onClick={onChange} className="text-darkBeige link-container text-xl">
      <span className={`${locale === 'en' ? "font-bold" : ""}`}>EN</span>/<span className={`${locale === 'fr' ? "font-bold" : ""}`}>FR</span>
    </button>
  );
}