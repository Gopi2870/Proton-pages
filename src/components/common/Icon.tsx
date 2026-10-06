import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number | string;
  filled?: boolean;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  filled = false,
  className = '',
  style,
  ...props
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        fontSize: pixelSize,
        width: pixelSize,
        height: pixelSize,
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
        ...style,
      }}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  );
};
