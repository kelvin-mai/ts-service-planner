export const contentToReadtime = (content?: string) => {
  const WPM = 200;
  const wordCount = content?.match(/\w+/g)?.length || 0;
  return Math.ceil(wordCount / WPM);
};
