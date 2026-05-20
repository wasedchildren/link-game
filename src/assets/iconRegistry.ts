const iconModules = import.meta.glob('./icons/**/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const entries = Object.entries(iconModules);

const toBaseName = (path: string) => {
  const fileName = path.split('/').pop() ?? path;
  return fileName.replace(/\.png$/i, '');
};

const iconSourceByName = entries.reduce<Record<string, string>>((acc, [path, src]) => {
  acc[toBaseName(path)] = src;
  return acc;
}, {});

const genericIconSources = entries
  .filter(([path]) => path.includes('/cropped_icons_48/'))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

export type IconToken = string | number;

export function getIconSource(icon: IconToken) {
  if (typeof icon === 'number') {
    const safeIndex = Math.max(0, Math.min(icon, genericIconSources.length - 1));
    return genericIconSources[safeIndex];
  }

  return iconSourceByName[icon];
}

export function hasIconSource(icon: IconToken) {
  return Boolean(getIconSource(icon));
}
