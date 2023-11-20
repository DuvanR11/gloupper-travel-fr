
export function convertToSlug(frase: string, ) {
    return frase
      .toLowerCase()
      .replace(/ /g, '-')       
      .replace(/[^\w-]+/g, '');
}