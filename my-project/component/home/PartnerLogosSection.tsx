import React from 'react';

const partners = [
  { name: 'BUMN Company', logo: '/images/logos/bumn.svg' },
  { name: 'Tech Corp', logo: '/images/logos/techcorp.svg' },
  { name: 'Creative Inc', logo: '/images/logos/creativeinc.svg' },
  { name: 'Finance Group', logo: '/images/logos/finance.svg' },
  { name: 'Startup Hub', logo: '/images/logos/startuphub.svg' },
];

export const PartnerLogosSection = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Dipercaya oleh perusahaan terbaik di berbagai industri
        </h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-8 items-center">
          {partners.map((partner) => (
            <img
              key={partner.name}
              className="col-span-1 max-h-12 w-full object-contain filter grayscale hover:filter-none transition-all duration-300"
              src={partner.logo}
              alt={partner.name}
              width={158}
              height={48}
            />
          ))}
        </div>
      </div>
    </div>
  );
};