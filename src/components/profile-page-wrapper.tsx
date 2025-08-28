'use client';

import React from 'react';
import { useTheme } from './theme-provider';

interface ProfilePageWrapperProps {
  children: React.ReactNode;
}

export const ProfilePageWrapper: React.FC<ProfilePageWrapperProps> = ({ children }) => {
  const { theme } = useTheme();

  const mainDivClasses = `font-sans text-[var(--color-primary-dark)] bg-white ${theme === 'newspaper' ? 'paper-texture vintage-shadow' : ''}`;

  return (
    <div className={mainDivClasses}>
      {children}
    </div>
  );
};