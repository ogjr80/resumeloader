import React from 'react';

const DiversityCard = () => {
  return (
    <div className="w-64 h-96 rounded-lg overflow-hidden bg-[#1a2a5e] flex flex-col" style={{backgroundColor: '#1a2a5e'}}>
      <div className="flex-grow flex items-center justify-center relative" style={{backgroundColor: '#1a2a5e'}}>
        <div className="w-20 h-20 bg-[#1a2a5e] rounded-full flex items-center justify-center z-10" style={{backgroundColor: '#1a2a5e'}}>
          <div className="w-16 h-16 bg-[#243975] rounded-full flex items-center justify-center" style={{backgroundColor: '#243975'}}>
            <div 
              className="w-10 h-10 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>')`,
                backgroundColor: '#243975'
              }}
            ></div>
          </div>
        </div>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#243975] rounded-full opacity-40"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translateY(-42px) rotate(-${i * 30}deg)`,
              backgroundColor: '#243975',
              opacity: 0.4
            }}
          ></div>
        ))}
      </div>
      <div className="h-24 bg-[#15234f] flex items-center justify-center" style={{backgroundColor: '#15234f'}}>
        <p className="text-white font-bold text-center text-lg leading-tight" style={{color: 'white'}}>
          DIVERSITY<br />QUESTIONS
        </p>
      </div>
    </div>
  );
};

export default DiversityCard;