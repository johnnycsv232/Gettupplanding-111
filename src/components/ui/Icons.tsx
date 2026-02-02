import React from 'react';

/**
 * Icons
 * A centralized repository for optimized inline SVG icons.
 * Usage: <Icons.Logo className="w-8 h-8" />
 */
export const Icons = {
  Logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),

  // Custom Gettupp Zenith Icon
  Zenith: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
      <path d="M50 20L80 80H20L50 20Z" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  ),

  Spinner: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
