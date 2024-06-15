export function captalize(text: string): string {
  const words = text.split(' ');

  const mappedWords = words.map((word) => {
    const [firstLetter, ...rest] = word;

    return firstLetter?.toLocaleUpperCase().concat(...rest);
  });

  return mappedWords.join(' ');
}
