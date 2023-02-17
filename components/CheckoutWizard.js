import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className='mb-5 flex flex-wrap'>
      {
        ['Auth', 'Shipping Address', 'Payment Method', 'Place Order'].map((step, index) => (
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
