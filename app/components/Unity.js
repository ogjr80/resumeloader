const UnityCard = () => {
    return (
      <div className="w-64 h-96 rounded-lg overflow-hidden bg-[#00bfa5] flex flex-col" style={{backgroundColor: '#00bfa5'}}>
        <div className="flex-grow flex items-center justify-center relative" style={{backgroundColor: '#00bfa5'}}>
          <div className="w-20 h-20 bg-[#00bfa5] rounded-full flex items-center justify-center z-10" style={{backgroundColor: '#00bfa5'}}>
            <div className="w-16 h-16 bg-[#1de9b6] rounded-full flex items-center justify-center" style={{backgroundColor: '#1de9b6'}}>
              <div 
                className="w-10 h-10 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>')`,
                  backgroundColor: '#1de9b6'
                }}
              ></div>
            </div>
          </div>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#1de9b6] rounded-full opacity-40"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 30}deg) translateY(-42px) rotate(-${i * 30}deg)`,
                backgroundColor: '#1de9b6',
                opacity: 0.4
              }}
            ></div>
          ))}
        </div>
        <div className="h-24 bg-[#00897b] flex items-center justify-center" style={{backgroundColor: '#00897b'}}>
          <p className="text-white font-bold text-center text-lg leading-tight" style={{color: 'white'}}>
            UNITY<br />CARDS
          </p>
        </div>
      </div>
    );
  };
  
export default UnityCard;   