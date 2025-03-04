import React from 'react';

interface IconComponentProps {
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  viewBox?: string;
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({
  size = 'md',
  viewBox = '0 0 24 24',
  children,
  className = '',
  color = 'currentColor'
}) => {
  const sizes = {
    xxs: '12px',
    xs: '14px',
    sm: '16px',
    md: '20px',
    lg: '24px'
  };

  const sizeValue = sizes[size] || sizes.md;

  return (
    <svg
      className={`icon-component ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill={color}
      data-size={size}
      width={sizeValue}
      height={sizeValue}
      style={{
        width: `${sizeValue} !important`,
        height: `${sizeValue} !important`,
        minWidth: `${sizeValue} !important`,
        minHeight: `${sizeValue} !important`,
        maxWidth: `${sizeValue} !important`,
        maxHeight: `${sizeValue} !important`,
        display: 'inline-block !important',
        verticalAlign: 'middle !important',
        flexShrink: 0,
        flexGrow: 0
      }}
    >
      {children}
    </svg>
  );
};

export default IconComponent;