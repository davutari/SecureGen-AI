import { PasswordOptions, ValidationResult } from '../types';

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

export const generateRandomPassword = (options: PasswordOptions): string => {
    let charset = '';
    if (options.includeLowercase) charset += LOWERCASE_CHARS;
    if (options.includeUppercase) charset += UPPERCASE_CHARS;
    if (options.includeNumbers) charset += NUMBER_CHARS;
    if (options.includeSymbols) charset += SYMBOL_CHARS;

    if (charset === '') return '';

    let password = '';
    const array = new Uint32Array(options.length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < options.length; i++) {
        password += charset[array[i] % charset.length];
    }

    return password;
};

export const checkPasswordStrength = (password: string): ValidationResult => {
    let score = 0;
    if (!password) return { score: 0, label: 'Empty', color: 'bg-gray-600' };

    if (password.length > 8) score++;
    if (password.length > 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Cap at 4
    if (score > 4) score = 4;
    if (password.length < 6) score = Math.min(score, 1); // Penalty for short length

    switch (score) {
        case 0:
        case 1:
            return { score, label: 'Weak', color: 'bg-red-500' };
        case 2:
            return { score, label: 'Fair', color: 'bg-yellow-500' };
        case 3:
            return { score, label: 'Good', color: 'bg-blue-500' };
        case 4:
            return { score, label: 'Strong', color: 'bg-green-500' };
        default:
            return { score: 0, label: 'Weak', color: 'bg-red-500' };
    }
};