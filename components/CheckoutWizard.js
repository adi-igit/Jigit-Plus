import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';
import { useRouter } from 'next/router';
import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;
  return (
    <div className='mb-5 flex flex-wrap'>
      {
        [`${t.wizardAuth}`, `${t.wizardShippingAddress}`, `${t.wizardPaymentMethod}`, `${t.wizardPlaceOrder}`].map((step, index) => (
          <div
           key={step}
           className={`flex-1 border-b-2 text-center ${index <= activeStep ? 'border-b-blue-900 text-blue-900' : 'border-gray-400 text-gray-400'}`}
           >
            {step}</div>
        ))
      }
    </div>
  )
}
