'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useMessages } from 'next-intl';
import Beach from '@/public/images/beach.jpg';
import Container from '@/components/ui/Container';
import Loading from '@/components/ui/Loading';

export default function Rsvp() {
  const t = useTranslations('RsvpPage');
  const messages = useMessages();
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    adults: '',
    dietaryRestrictions: '',
    favoriteSong: '',
    comments: '',
    stayingOnsite: '',
    accommodations: '',
    plusOneFirstName: '',
    plusOneLastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || t('submitError'));
      }
    } catch {
      setError(t('networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (messages.Rsvp) {
      setLoading(false);
    }
  }, [messages]);

  if (loading) {
    return <Loading message={t('loading')} />;
  }

  return (
    <div className='relative bg-lightBlue min-h-screen'>
      <div className="absolute top-0 h-[50vh] w-full overflow-hidden">
        <div className='relative h-full w-full'>
          <Image
            priority
            src={Beach}
            alt="Beach Background"
            className="object-cover object-[50%_75%] w-full h-full opacity-0 animate-fadeIn"
          />
          <div className="absolute bottom-0 h-4 sm:h-[5vh] w-full bg-gradient-to-b from-transparent to-lightBlue"></div>
        </div>
      </div>
      <div className="relative h-[50vh] w-full">
        <div className="flex flex-col justify-center items-center h-full px-4">
          <div className="rounded-lg shadow-lg p-8 max-w-3xl bg-lightBlue ">
            <h1 className="text-5xl sm:text-7xl text-darkerBlue font-light tracking-widest text-center">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-darkerBlue font-light mt-4 text-center">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      <Container>
        <div className="py-10 px-4">
          {isSubmitted ? (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl text-darkerBlue font-light mb-4">{t('formReceived')}</h2>
              <p className="text-darkerBlue">We look forward to celebrating with you!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6 mb-20">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded" role="alert">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-red-800 font-medium">We&apos;re sorry, something went wrong</p>
                      <p className="text-red-700 text-sm mt-1">Please try again or contact us directly if the problem persists.</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-darkerBlue font-semibold mb-2">{t('name')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t('firstName')}
                    className="w-full p-3 border border-mediumBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t('lastName')}
                    className="w-full p-3 border border-mediumBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>



              <div>
                <label className="block text-darkerBlue font-semibold mb-2">{t('namePlusOne')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="plusOneFirstName"
                    placeholder={t('firstName')}
                    className="w-full p-3 border border-mediumBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="plusOneLastName"
                    placeholder={t('lastName')}
                    className="w-full p-3 border border-mediumBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-darkerBlue font-semibold mb-2">{t('stayingOnsite')}</label>
                <select
                  name="stayingOnsite"
                  className="w-full p-3 border border-mediumBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-all bg-white"
                  onChange={handleChange}
                >
                  <option value="">{t('select')}</option>
                  <option value="yes">{t('yes')}</option>
                  <option value="no">{t('no')}</option>
                </select>
              </div>

              {formData.stayingOnsite === 'yes' && (
                <div>
                  <label className="block text-darkerBlue font-semibold mb-2">{t('accommodations')}</label>
                  <input
                    type="text"
                    name="accommodations"
                    placeholder="Which accommodation?"
                    className="w-full p-3 border border-mediumBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                    onChange={handleChange}
                  />
                </div>
              )}

              <div>
                <label className="block text-darkerBlue font-semibold mb-2">{t('dietaryRestrictions')}</label>
                <textarea
                  name="dietaryRestrictions"
                  placeholder={t('dietaryRestrictions')}
                  rows={3}
                  className="w-full p-3 border border-mediumBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-all resize-none"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-darkerBlue font-semibold mb-2">{t('favoriteSong')}</label>
                <input
                  type="text"
                  name="favoriteSong"
                  placeholder={t('favoriteSong')}
                  className="w-full p-3 border border-mediumBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-darkerBlue font-semibold mb-2">{t('comments')}</label>
                <textarea
                  name="comments"
                  placeholder={t('leaveComment')}
                  rows={4}
                  className="w-full p-3 border border-mediumBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-blue transition-all resize-none"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-darkerBlue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('sending') : t('submit')}
              </button>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}