// Table-specific icons
interface IconProps {
  size?: number;
  className?: string;
}

export const AddRowAboveIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="4" y="10" width="16" height="3"/>
    <rect x="4" y="13" width="16" height="3"/>
    <rect x="4" y="16" width="16" height="3"/>
    <path d="M12 5v5" strokeWidth="2"/>
    <path d="M9 7h6" strokeWidth="2"/>
  </svg>
);

export const AddRowBelowIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="4" y="5" width="16" height="3"/>
    <rect x="4" y="8" width="16" height="3"/>
    <rect x="4" y="11" width="16" height="3"/>
    <path d="M12 14v5" strokeWidth="2"/>
    <path d="M9 17h6" strokeWidth="2"/>
  </svg>
);

export const AddColumnLeftIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="10" y="4" width="3" height="16"/>
    <rect x="13" y="4" width="3" height="16"/>
    <rect x="16" y="4" width="3" height="16"/>
    <path d="M5 12h5" strokeWidth="2"/>
    <path d="M7 9v6" strokeWidth="2"/>
  </svg>
);

export const AddColumnRightIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="5" y="4" width="3" height="16"/>
    <rect x="8" y="4" width="3" height="16"/>
    <rect x="11" y="4" width="3" height="16"/>
    <path d="M14 12h5" strokeWidth="2"/>
    <path d="M17 9v6" strokeWidth="2"/>
  </svg>
);

export const DeleteRowIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="4" y="6" width="16" height="3"/>
    <rect x="4" y="12" width="16" height="3" fill="currentColor" opacity="0.3"/>
    <rect x="4" y="15" width="16" height="3"/>
    <path d="M9 13h6" strokeWidth="2"/>
  </svg>
);

export const DeleteColumnIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="6" y="4" width="3" height="16"/>
    <rect x="12" y="4" width="3" height="16" fill="currentColor" opacity="0.3"/>
    <rect x="15" y="4" width="3" height="16"/>
    <path d="M10 12h6" strokeWidth="2"/>
  </svg>
);