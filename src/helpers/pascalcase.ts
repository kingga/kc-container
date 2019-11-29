export function pascalcase(str: string): string {
    str = str.trim();

    // If the string is empty return an empty string.
    if (str === '') {
        return '';
    }

    // If this string is only one character just uppercase the character.
    if (str.length === 1) {
        return str.toLocaleUpperCase();
    }

    // Split the string into alphanumeric groups so if there is any space we can
    // ucfirst() the first character.
    const match = str.match(/[A-Za-z0-9]+/g);

    if (match) {
        // Make the first character uppercase and then append the rest of the string.
        return match.map((m) => (m[0].toLocaleUpperCase() + m.slice(1)).trim())
            .join('');
    }

    return str;
}
