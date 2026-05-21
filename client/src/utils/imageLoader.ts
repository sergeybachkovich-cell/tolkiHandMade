/**
 * Модуль для загрузки и сортировки изображений из директорий городов.
 * Использует Vite import.meta.glob для импорта всех .webp файлов.
 */

const gomelModules: Record<string, { default: string }> =
  import.meta.glob('/src/assets/images/gomel/*.webp', { eager: true }) as Record<
    string,
    { default: string }
  >;

const rechitsaModules: Record<string, { default: string }> =
  import.meta.glob('/src/assets/images/rechitsa/*.webp', { eager: true }) as Record<
    string,
    { default: string }
  >;

/**
 * Извлекает и сортирует изображения из модулей Vite.
 * Сортировка — по номеру в скобках в имени файла (например, "photo (1).webp").
 */
const getSortedImages = (modules: Record<string, { default: string }>) => {
  return Object.values(modules)
    .map((m) => m.default)
    .filter(Boolean)
    .sort((a, b) => {
      const getNum = (s: string) => {
        const match = s.match(/\((\d+)\)/);
        return match ? parseInt(match[1], 10) : 0;
      };
      return getNum(a) - getNum(b);
    });
};

export const gomelImages = getSortedImages(gomelModules);
export const rechitsaImages = getSortedImages(rechitsaModules);

export const photos = {
  gomel: gomelImages,
  rechitsa: rechitsaImages,
} as const;
