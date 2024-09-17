import React from 'react';

const StorytellingPromptsCard = () => {
  return (
    <div className="w-64 h-96 rounded-lg overflow-hidden bg-[#7b1fa2] flex flex-col" style={{backgroundColor: '#7b1fa2'}}>
      <div className="flex-grow flex items-center justify-center relative" style={{backgroundColor: '#7b1fa2'}}>
        <div className="w-20 h-20 bg-[#7b1fa2] rounded-full flex items-center justify-center z-10" style={{backgroundColor: '#7b1fa2'}}>
          <div className="w-16 h-16 bg-[#9c27b0] rounded-full flex items-center justify-center" style={{backgroundColor: '#9c27b0'}}>
            <div 
              className="w-10 h-10 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-13C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>')`,
                backgroundColor: '#9c27b0'
              }}
            ></div>
          </div>
        </div>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#9c27b0] rounded-full opacity-40"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translateY(-42px) rotate(-${i * 30}deg)`,
              backgroundColor: '#9c27b0',
              opacity: 0.4
            }}
          ></div>
        ))}
      </div>
      <div className="h-24 bg-[#6a1b9a] flex items-center justify-center" style={{backgroundColor: '#6a1b9a'}}>
        <p className="text-white font-bold text-center text-lg leading-tight" style={{color: 'white'}}>
          STORYTELLING<br />PROMPTS
        </p>
      </div>
    </div>
  );
};

export default StorytellingPromptsCard;