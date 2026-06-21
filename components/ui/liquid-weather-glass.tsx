// @ts-nocheck
'use client';
import React, { useState } from 'react';
import {cn} from "@/lib/utils"

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  expandable?: boolean;
  width?: string;
  height?: string;
  expandedWidth?: string;
  expandedHeight?: string;
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  shadowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: string;
  glowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const LiquidGlassCard = ({
  children,
  className = '',
  draggable = true,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = 'xl',
  borderRadius = '32px',
  glowIntensity = 'sm',
  shadowIntensity = 'md',
  ...props
}: LiquidGlassCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = (e: {
    target: { closest: (arg0: string) => any };
  }) => {
    if (!expandable) return;
    // Don't toggle if clicking on interactive elements
    if (e.target.closest('a, button, input, select, textarea')) return;
    setIsExpanded(!isExpanded);
  };

  // Explicit blur radii (px) so the frost is strong and unambiguous across
  // browsers — applied inline with a -webkit- prefix on the bend layer.
  const blurPx = {
    sm: 'blur(12px)',
    md: 'blur(20px)',
    lg: 'blur(32px)',
    xl: 'blur(44px)',
  };

  const shadowStyles = {
    none: 'inset 0 0 0 0 rgba(255, 255, 255, 0)',
    xs: 'inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.3)',
    sm: 'inset 2px 2px 2px 0 rgba(255, 255, 255, 0.35), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.35)',
    md: 'inset 3px 3px 3px 0 rgba(255, 255, 255, 0.45), inset -3px -3px 3px 0 rgba(255, 255, 255, 0.45)',
    lg: 'inset 4px 4px 4px 0 rgba(255, 255, 255, 0.5), inset -4px -4px 4px 0 rgba(255, 255, 255, 0.5)',
    xl: 'inset 6px 6px 6px 0 rgba(255, 255, 255, 0.55), inset -6px -6px 6px 0 rgba(255, 255, 255, 0.55)',
    '2xl':
      'inset 8px 8px 8px 0 rgba(255, 255, 255, 0.6), inset -8px -8px 8px 0 rgba(255, 255, 255, 0.6)',
  };

  const glowStyles = {
    none: '0 4px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(0, 0, 0, 0.05)',
    xs: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 16px rgba(255, 255, 255, 0.05)',
    sm: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 24px rgba(255, 255, 255, 0.1)',
    md: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 32px rgba(255, 255, 255, 0.15)',
    lg: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 40px rgba(255, 255, 255, 0.2)',
    xl: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 48px rgba(255, 255, 255, 0.25)',
    '2xl':
      '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 60px rgba(255, 255, 255, 0.3)',
  };

  return (
      <div
        className={cn(
          `relative ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${expandable ? 'cursor-pointer' : ''}`,
          className
        )}
        style={{
          borderRadius,
          width: expandable && isExpanded ? expandedWidth || width : width,
          height: expandable && isExpanded ? expandedHeight || height : height,
          transition: expandable
            ? 'width 400ms cubic-bezier(0.5, 1.5, 0.5, 1), height 400ms cubic-bezier(0.5, 1.5, 0.5, 1)'
            : undefined,
        }}
        onClick={expandable ? handleToggleExpansion : undefined}
        {...props}
      >
        {/* Bend Layer (Backdrop blur).
            NOTE: do NOT put a CSS `filter` (e.g. the SVG url(#glass-blur)
            displacement) on this same element. Chromium isolates any element
            that has both `filter` and `backdrop-filter` into its own surface,
            which makes the backdrop-filter capture an empty backdrop — the
            frosted-glass blur silently disappears.
            The backdrop-filter is set inline (with the -webkit- prefix) rather
            than via Tailwind so Safari renders it and the intensity is
            explicit and strong. */}
        <div
          className="absolute inset-0 z-0"
          style={{
            borderRadius,
            backdropFilter: `${blurPx[blurIntensity]} saturate(135%)`,
            WebkitBackdropFilter: `${blurPx[blurIntensity]} saturate(135%)`,
          }}
        />

        {/* Face Layer (Main shadow and glow) */}
        <div
          className='absolute inset-0 z-10'
          style={{
            borderRadius,
            boxShadow: glowStyles[glowIntensity],
          }}
        />

        {/* Edge Layer (Inner highlights) */}
        <div
          className='absolute inset-0 z-20'
          style={{
            borderRadius,
            boxShadow: shadowStyles[shadowIntensity],
          }}
        />

        {/* Content */}
        <div className={cn('relative z-30')}>{children}</div>
      </div>
  );
};
