import React from 'react';

export const RisharaaMark: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 40 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M4 17.5L20 4.5L36 17.5"
      stroke="#D99B26"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 16.5V31.5H30.5V16.5"
      stroke="#D99B26"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 31.5V22.5H24V31.5"
      stroke="#D99B26"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 13.5L20 9L25.5 13.5"
      stroke="#B87E14"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface BrandWordmarkProps {
  brandName: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({ brandName, size = 'md' }) => {
  const heightClass =
    size === 'sm' ? 'h-7' : size === 'lg' ? 'h-12' : 'h-9';

  switch (brandName) {
    case 'Havells':
      return (
        <div className={`inline-flex items-center gap-2 ${heightClass} select-none`}>
          <svg viewBox="0 0 28 28" className="h-[72%] w-auto shrink-0" aria-hidden="true">
            <path
              d="M14 2L25 8.5V19.5L14 26L3 19.5V8.5L14 2Z"
              fill="#C81E2B"
            />
            <path
              d="M9.5 9V19M18.5 9V19M9.5 14H18.5"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="font-bold tracking-[0.06em] text-[#C81E2B] leading-none"
            style={{ fontSize: size === 'lg' ? '1.5rem' : size === 'sm' ? '1rem' : '1.2rem' }}
          >
            HAVELLS
          </span>
        </div>
      );

    case 'Orient Electric':
      return (
        <div className={`inline-flex items-center gap-2 ${heightClass} select-none`}>
          <span className="inline-flex items-center justify-center rounded-md bg-[#E86A17] text-white font-bold px-2 py-0.5 text-sm leading-none">
            O
          </span>
          <div className="flex flex-col leading-none">
            <span
              className="font-bold tracking-tight text-[#E86A17]"
              style={{ fontSize: size === 'lg' ? '1.25rem' : size === 'sm' ? '0.9rem' : '1.05rem' }}
            >
              orient
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-[#57534E]">
              electric
            </span>
          </div>
        </div>
      );

    case 'USHA':
      return (
        <div className={`inline-flex items-center gap-1 ${heightClass} select-none`}>
          {['U', 'S', 'H', 'A'].map((letter) => (
            <span
              key={letter}
              className="inline-flex items-center justify-center bg-[#C42026] text-white font-bold rounded-[4px] leading-none"
              style={{
                width: size === 'lg' ? '1.85rem' : size === 'sm' ? '1.25rem' : '1.5rem',
                height: size === 'lg' ? '1.85rem' : size === 'sm' ? '1.25rem' : '1.5rem',
                fontSize: size === 'lg' ? '1.05rem' : size === 'sm' ? '0.75rem' : '0.88rem',
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      );

    case 'Poppy':
      return (
        <div className={`inline-flex items-center ${heightClass} select-none`}>
          <span
            className="inline-flex items-center justify-center rounded-[50%] bg-[#6E2B7A] text-white font-serif italic font-bold px-4 py-1 tracking-wide leading-none"
            style={{ fontSize: size === 'lg' ? '1.35rem' : size === 'sm' ? '0.95rem' : '1.1rem' }}
          >
            Poppy
          </span>
        </div>
      );

    case 'VIP':
      return (
        <div className={`inline-flex items-center ${heightClass} select-none`}>
          <span
            className="font-black italic tracking-[-0.04em] text-[#D01C27] leading-none"
            style={{ fontSize: size === 'lg' ? '2rem' : size === 'sm' ? '1.25rem' : '1.6rem' }}
          >
            VIP
          </span>
        </div>
      );

    case 'Aristocrat':
      return (
        <div className={`inline-flex items-center ${heightClass} select-none`}>
          <span
            className="font-serif font-bold tracking-[0.02em] text-[#1C1917] leading-none"
            style={{ fontSize: size === 'lg' ? '1.6rem' : size === 'sm' ? '1.05rem' : '1.3rem' }}
          >
            Aristocrat
          </span>
        </div>
      );

    case 'Skybags':
      return (
        <div className={`inline-flex items-center ${heightClass} select-none`}>
          <span
            className="font-bold italic tracking-tight text-[#0284C7] leading-none"
            style={{ fontSize: size === 'lg' ? '1.65rem' : size === 'sm' ? '1.1rem' : '1.35rem' }}
          >
            Skybags
          </span>
        </div>
      );

    default:
      return (
        <span className="font-serif font-semibold text-[#1C1917] text-lg leading-none">
          {brandName}
        </span>
      );
  }
};
