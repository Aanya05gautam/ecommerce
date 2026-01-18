import React, { useState } from 'react';
import { X, Gift, Copy, Check } from 'lucide-react';

const SpinWheel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const segments = [
    { label: "10% OFF", value: "SAVE10", color: "#6366f1" }, // Indigo
    { label: "Free Ship", value: "FREESHIP", color: "#ec4899" }, // Pink
    { label: "20% OFF", value: "SAVE20", color: "#8b5cf6" }, // Violet
    { label: "Try Again", value: null, color: "#64748b" }, // Slate
    { label: "15% OFF", value: "SAVE15", color: "#10b981" }, // Emerald
    { label: "5% OFF", value: "SAVE5", color: "#f59e0b" }, // Amber
  ];

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    // Determine winner (random but biased towards discounts)
    // 0: 10%, 1: FreeShip, 2: 20%, 3: Try, 4: 15%, 5: 5%
    // Let's bias against "Try Again"
    let index;
    do {
        index = Math.floor(Math.random() * segments.length);
    } while (index === 3 && Math.random() > 0.2); // 80% chance to retry if "Try Again" is picked

    const deg = 360 * 5 + (360 / segments.length) * index; // 5 spins + alignment

    // We need to rotate the WHEEL so the pointer (at top) points to the segment.
    // However, usually 0deg is at 3 o'clock or 12 o'clock. 
    // Let's assume standard CSS: 0deg is 12 o'clock.
    // To land on segment i, we rotate negative.
    // Simpler: Just rely on visual rotation.
    // Let's use a simpler method: just animate to a random high degree
    // and calculate the winner based on the final rotation mod 360.
    
    // Actually, setting specific winner is better for control.
    // Each segment is 60 degrees.
    // 0: 0-60, 1: 60-120, etc.
    // Pointer at top (0deg).
    // To get segment 0 under pointer, rotation should be like... 360 - (0 * 60 + 30).
    const segmentAngle = 360 / segments.length;
    // We want the center of the segment to align with top (270deg or -90deg in standard circle, but CSS rotate starts 12 o'clock? No, usually 0 is top if strictly styled or right. Let's assume 0 is top).
    // Let's just create a random total rotation that ensures at least 5 full spins
    const totalRotation = 1800 + (360 - (index * segmentAngle)); 

    const wheel = document.getElementById('wheel');
    if (wheel) {
        wheel.style.transform = `rotate(${totalRotation}deg)`;
    }

    setTimeout(() => {
        setIsSpinning(false);
        setPrize(segments[index]);
    }, 5000);
  };

  const handleCopy = () => {
    if (prize && prize.value) {
        navigator.clipboard.writeText(prize.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!showButton && !isOpen) return null;

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && showButton && !prize && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce"
        >
          <Gift size={32} />
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            Win!
          </span>
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden">
            {/* Close Button */}
            <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10"
            >
                <X size={24} />
            </button>

            {/* Content */}
            <div className="text-center relative">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Spin & Win!</h2>
                <p className="text-slate-500 mb-8">Try your luck to get huge discounts.</p>

                {!prize ? (
                    <div className="relative w-64 h-64 mx-auto mb-8">
                        {/* Pointer */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-10">
                             <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-rose-500 filter drop-shadow-lg"></div>
                        </div>

                        {/* Wheel */}
                        <div 
                            id="wheel"
                            className="w-full h-full rounded-full border-4 border-slate-900 relative overflow-hidden transition-transform duration-[5000ms] cubic-bezier(0.2, 0, 0.2, 1)"
                            style={{ 
                                background: `conic-gradient(
                                    ${segments[0].color} 0deg 60deg, 
                                    ${segments[1].color} 60deg 120deg, 
                                    ${segments[2].color} 120deg 180deg, 
                                    ${segments[3].color} 180deg 240deg, 
                                    ${segments[4].color} 240deg 300deg, 
                                    ${segments[5].color} 300deg 360deg
                                )`
                            }}
                        >
                            {/* Segment Labels */}
                            {segments.map((seg, i) => (
                                <div 
                                    key={i} 
                                    className="absolute top-1/2 left-1/2 w-full h-[2px] bg-transparent origin-left text-white font-bold text-sm"
                                    style={{ 
                                        transform: `rotate(${i * 60 + 30 - 90}deg) translateX(50%)`, // Center label in segment
                                        textAlign: 'center'
                                    }}
                                >
                                     {/* We need to rotate the text correctly so it's readable. 
                                         This simple CSS conic gradient is hard to label perfectly without SVGs.
                                         Let's just use the colors for now and a legend or just trust the conic gradient.
                                         Actually, let's keep it clean without complex labels inside CSS gradient.
                                         Better approach: Just show "Spin!" button.
                                     */}
                                </div>
                            ))}
                            {/* Inner Circle to cover center */}
                             <div className="absolute inset-0 m-auto w-8 h-8 bg-white rounded-full shadow-lg z-10 border-4 border-slate-200"></div>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 animate-in zoom-in spin-in-12">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">You Won!</h3>
                        <p className="text-indigo-600 font-black text-3xl mb-4">{prize.label}</p>
                        
                        {prize.value && (
                            <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between border border-dashed border-slate-300">
                                <code className="font-mono font-bold text-lg text-slate-900">{prize.value}</code>
                                <button 
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600 hover:text-indigo-600"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        )}
                        {!prize.value && (
                            <p className="text-slate-500">Better luck next time!</p>
                        )}
                    </div>
                )}

                {!prize && (
                    <button
                        onClick={spin}
                        disabled={isSpinning}
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-xl hover:bg-black transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                    >
                        {isSpinning ? "Spinning..." : "SPIN NOW"}
                    </button>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpinWheel;
