// Вспомогательная функция которая возвращает путь к изображению
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function imagePath(src: string) {
  return `${basePath}${src}`;
}
