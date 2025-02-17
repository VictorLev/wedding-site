'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useMessages } from 'next-intl';
import Beach from '@/src/public/images/beach.jpg';
import Container from '@/src/components/ui/Container';

export default function Rsvp() {
  const t = useTranslations('RsvpPage');
  const messages = useMessages();
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    activities: [] as string[],
    adults: '',
    children: '',
    dietaryRestrictions: '',
    favoriteSong: '',
    comments: '',
    stayingOnsite: '',
    accommodations: '',
    arrivalDate: '',
    departureDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        activities: checked
          ? [...prev.activities, value]
          : prev.activities.filter((activity) => activity !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (messages.Rsvp) {
      setLoading(false);
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className='relative bg-white'>
      <div className="absolute top-0 h-[75vh] w-full overflow-hidden">
        <div className='relative h-full w-full'>
          <Image 
            priority
            src={Beach} 
            alt="Beach Background" 
            className="object-cover object-[50%_75%] w-full h-full opacity-0 animate-fadeIn" 
          />
          <div className="absolute bottom-0 h-4 sm:h-[10vh] w-full bg-gradient-to-b from-transparent to-white"></div>
        </div>
      </div>
      <div className="relative h-[75vh] w-full ">
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-5xl text-white drop-shadow-lg font-light tracking-widest pt-2 text-center">
            {t('title')}
          </p>
        </div>
      </div>

      <Container>
        {isSubmitted ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-2xl text-darkBlue">{t('formReceived')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 w-full sm:w-1/2 p-4 mb-32">
            <div>
              <p className="font-semibold">{t('name')}</p>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder={t('firstName')}
                  className="w-1/2 p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder={t('lastName')}
                  className="w-1/2 p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">{t('activity')}</p>
              <label className="block">
                <input type="checkbox" value="BBQ" onChange={handleChange} /> {t('fridayBBQ')}
              </label>
              <label className="block">
                <input type="checkbox" value="Cocktail" onChange={handleChange} /> {t('saturdayCocktail')}
              </label>
              <label className="block">
                <input type="checkbox" value="Cérémonie" onChange={handleChange} /> {t('saturdayCeremony')}
              </label>
              <label className="block">
                <input type="checkbox" value="Réception" onChange={handleChange} /> {t('saturdayReception')}
              </label>
              <label className="block">
                <input type="checkbox" value="Brunch" onChange={handleChange} /> {t('sundayBrunch')}
              </label>
            </div>
            <div>
              <p className="font-semibold">{t('numberOfAdults')}</p>
              <input
                type="number"
                name="adults"
                placeholder={t('numberOfAdults')}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-semibold">{t('numberOfChildren')}</p>
              <input
                type="number"
                name="children"
                placeholder={t('numberOfChildren')}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-semibold">{t('stayingOnsite')}</p>
              <select name="stayingOnsite" className="w-full p-2 border border-gray-300 rounded" onChange={handleChange}>
                <option value="">{t('select')}</option>
                <option value="yes">{t('yes')}</option>
                <option value="no">{t('no')}</option>
              </select>
            </div>
            <div>
              <p className="font-semibold">{t('accommodations')}</p>
              <input
                type="text"
                name="accommodations"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-semibold">{t('arrivalDate')}</p>
              <input
                type="date"
                name="arrivalDate"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-semibold">{t('departureDate')}</p>
              <input
                type="date"
                name="departureDate"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-semibold">{t('dietaryRestrictions')}</p>
              <textarea
                name="dietaryRestrictions"
                placeholder={t('dietaryRestrictions')}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <p className='font-semibold'>{t('favoriteSong')}</p>
              <input
                type="text"
                name="favoriteSong"
                placeholder={t('favoriteSong')}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-semibold">{t('comments')}</p>
              <textarea
                name="comments"
                placeholder={t('leaveComment')}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-darkBeige text-white py-2 rounded-lg hover:bg-darkLight"
            >
              {t('submit')}
            </button>
          </form>
        )}
      </Container>
    </div>
  );
}