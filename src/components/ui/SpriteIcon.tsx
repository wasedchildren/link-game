import { getIconSource, type IconToken } from '@/assets/iconRegistry';

const fallbackGlyphs = ['🐶', '🐱', '🐰', '🐼', '🦊', '🐸', '🐵', '🐻', '🍎', '🍓', '🍋', '🍇'];
const fallbackGradients = [
  'linear-gradient(135deg, #f59e0b 0%, #fb7185 100%)',
  'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #f472b6 0%, #fb7185 100%)',
];

interface SpriteIconProps {
  icon: IconToken;
  size?: number;
  className?: string;
  label?: string;
}

export function SpriteIcon({
  icon,
  size = 32,
  className,
  label,
}: SpriteIconProps) {
  const src = getIconSource(icon);

  if (!src) {
    const fallbackIndex =
      typeof icon === 'number'
        ? icon
        : Array.from(icon).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const glyph = fallbackGlyphs[fallbackIndex % fallbackGlyphs.length];
    const gradient = fallbackGradients[fallbackIndex % fallbackGradients.length];

    return (
      <span
        aria-label={label}
        role={label ? 'img' : undefined}
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: `${Math.max(12, Math.floor(size * 0.28))}px`,
          background: gradient,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.16)',
          fontSize: `${Math.max(16, Math.floor(size * 0.55))}px`,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {glyph}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      draggable={false}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        objectPosition: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  );
}
