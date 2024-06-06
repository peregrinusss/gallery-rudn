// Вспомогательная функция которая возвращает путь к изображению
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const imagePath = (src: string) => {
  return `${basePath}${src}`;
}

export const createImageSrc = (src: string) => {
  return `http://95.165.168.235:65080/RUDN_Gallery/${src}`
}