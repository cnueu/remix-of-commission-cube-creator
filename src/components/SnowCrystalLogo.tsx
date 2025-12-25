interface SnowCrystalLogoProps {
  className?: string;
  size?: number;
}

export default function SnowCrystalLogo({ className = '', size = 32 }: SnowCrystalLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main vertical line */}
      <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      
      {/* Main horizontal line */}
      <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      
      {/* Diagonal lines */}
      <line x1="18" y1="18" x2="82" y2="82" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="82" y1="18" x2="18" y2="82" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      
      {/* Top branches */}
      <line x1="50" y1="20" x2="40" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="20" x2="60" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Bottom branches */}
      <line x1="50" y1="80" x2="40" y2="90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="80" x2="60" y2="90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Left branches */}
      <line x1="20" y1="50" x2="10" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="50" x2="10" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Right branches */}
      <line x1="80" y1="50" x2="90" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="80" y1="50" x2="90" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Diagonal top-left branches */}
      <line x1="30" y1="30" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="30" x2="38" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="30" x2="22" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Diagonal top-right branches */}
      <line x1="70" y1="30" x2="78" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="30" x2="62" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="30" x2="78" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Diagonal bottom-left branches */}
      <line x1="30" y1="70" x2="22" y2="78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="70" x2="38" y2="78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="70" x2="22" y2="62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Diagonal bottom-right branches */}
      <line x1="70" y1="70" x2="78" y2="78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="70" x2="62" y2="78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="70" x2="78" y2="62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Center crystal */}
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      
      {/* Small diamonds on branches */}
      <circle cx="50" cy="35" r="3" fill="currentColor" />
      <circle cx="50" cy="65" r="3" fill="currentColor" />
      <circle cx="35" cy="50" r="3" fill="currentColor" />
      <circle cx="65" cy="50" r="3" fill="currentColor" />
    </svg>
  );
}
