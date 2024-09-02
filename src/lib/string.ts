/**
 * Generates a fallback name by taking the first character of each word in the given name and capitalizing it.
 *
 * @param name - The name to generate the fallback name from.
 * @returns The generated fallback name.
 */
export function generateFallbackName(name: string): string {
  const names = name.split(" ");
  let fallbackName = "";

  for (const name of names) {
    fallbackName += name.charAt(0).toUpperCase();
  }

  return fallbackName;
}

/**
 * Truncates the given text to the specified length.
 *
 * @param text - The text to truncate.
 * @param length - The maximum length of the truncated text.
 * @param suffix - The suffix to append to the truncated text (default: '...').
 * @returns The truncated text.
 */
export function truncateText(
  text: string,
  length: number,
  suffix = "...",
): string {
  if (text.length <= length) {
    return text;
  }

  return text.substring(0, length) + suffix;
}

/**
 * Abbreviates the given email address by replacing the middle part with ellipsis.
 *
 * @param email - The email address to abbreviate.
 * @returns The abbreviated email address.
 */
/**
 * Abbreviates the given email address to a shorter form.
 *
 * @param email - The email address to abbreviate.
 * @returns The abbreviated email address.
 */
export function abbreviateEmail(email: string): string {
  const parts = email.split("@");
  const username = parts[0];
  const domain = parts[1];

  // If the username is less than or equal to 8 characters, return the email as is
  if ((username ?? "").length <= 8) {
    return email;
  }

  const abbreviatedUsername =
    (username ?? "").substring(0, 3) +
    "..." +
    (username ?? "").substring((username ?? "").length - 3);

  return abbreviatedUsername + "@" + domain;
}

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalizeString(str: string): string {
  const words = str.toLowerCase().split(" ");
  let capitalizedString = "";

  for (const word of words) {
    capitalizedString += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  }

  return capitalizedString.trim();
}

/**
 * Separates the text and URL from the given input.
 *
 * @param input - The input to separate the text and URL from.
 * @returns An object containing the separated text and URL.
 */
export function separateTextAndUrl(input: string): {
  text: string;
  url: string;
} {
  // replace "[^1][^1]: " with empty string
  input = input.replace("[^1][^1]: ", "");

  // get url from input with regex below
  // https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const url = input.match(urlRegex)?.[0] ?? "Need to be added manually";

  // remove url from input
  // replace url with empty string
  input = input.replace(url, "");

  return { text: input, url };
}
