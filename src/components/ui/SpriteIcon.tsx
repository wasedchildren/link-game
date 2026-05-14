const iconModules = import.meta.glob('../../assets/icons/cropped_icons_48/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const iconSources = Object.entries(iconModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

interface SpriteIconProps {
  icon: number;
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
  const safeIcon = Math.max(0, Math.min(icon, iconSources.length - 1));
  const src = iconSources[safeIcon];

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
