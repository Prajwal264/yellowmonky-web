/**
 *
 *
 * @param {string} stringWithPlaceholders
 * @param {Record<string, string>} replacements
 * @return {*} 
 */
 export const replacePlacholdersWithValues = (stringWithPlaceholders: string, replacements: Record<string, string>) => {
  const string = stringWithPlaceholders.replace(
    /{(\w+)}/g, 
    (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
    replacements.hasOwnProperty(placeholderWithoutDelimiters) ? 
      replacements[placeholderWithoutDelimiters] : placeholderWithDelimiters
  );
  return string;
}