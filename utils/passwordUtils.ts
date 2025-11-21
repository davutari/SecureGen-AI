import { PasswordOptions, ValidationResult } from '../types';

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// Helper to get a secure random character from a string
const getRandomChar = (charset: string): string => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return charset[array[0] % charset.length];
};

// Fisher-Yates Shuffle Implementation for strings
const shuffleString = (str: string): string => {
    const arr = str.split('');
    const n = arr.length;
    const randomValues = new Uint32Array(n);
    window.crypto.getRandomValues(randomValues);

    for (let i = n - 1; i > 0; i--) {
        const j = randomValues[n - 1 - i] % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
};

export const generateRandomPassword = (options: PasswordOptions): string => {
    let charset = '';
    let guaranteedChars = '';

    // 1. Build the pool AND collect at least one char from each selected type
    // This ensures strict adherence to rules.
    if (options.includeLowercase) {
        charset += LOWERCASE_CHARS;
        guaranteedChars += getRandomChar(LOWERCASE_CHARS);
    }
    if (options.includeUppercase) {
        charset += UPPERCASE_CHARS;
        guaranteedChars += getRandomChar(UPPERCASE_CHARS);
    }
    if (options.includeNumbers) {
        charset += NUMBER_CHARS;
        guaranteedChars += getRandomChar(NUMBER_CHARS);
    }
    if (options.includeSymbols) {
        charset += SYMBOL_CHARS;
        guaranteedChars += getRandomChar(SYMBOL_CHARS);
    }

    // If nothing selected (should be prevented by UI, but safety first)
    if (charset === '') return '';

    // 2. Fill the rest of the length
    let password = guaranteedChars;
    const remainingLength = options.length - password.length;

    if (remainingLength > 0) {
        const randomBuffer = new Uint32Array(remainingLength);
        window.crypto.getRandomValues(randomBuffer);
        
        for (let i = 0; i < remainingLength; i++) {
            password += charset[randomBuffer[i] % charset.length];
        }
    }

    // 3. Shuffle to mix the guaranteed characters with the random ones
    // otherwise the first characters would always be in order (Lower, Upper, Num, Sym)
    return shuffleString(password);
};

export const checkPasswordStrength = (password: string): ValidationResult => {
    let score = 0;
    if (!password) return { score: 0, label: 'Empty', color: 'bg-gray-600' };

    // Length Score
    if (password.length > 8) score += 1;
    if (password.length > 14) score += 1;

    // Complexity Score
    let complexity = 0;
    if (/[A-Z]/.test(password)) complexity++;
    if (/[a-z]/.test(password)) complexity++;
    if (/[0-9]/.test(password)) complexity++;
    if (/[^A-Za-z0-9]/.test(password)) complexity++;

    score += complexity >= 3 ? 2 : complexity >= 2 ? 1 : 0;

    // Cap at 4
    if (score > 4) score = 4;
    
    // Penalty for very short passwords regardless of complexity
    if (password.length < 8) score = Math.min(score, 1);

    switch (score) {
        case 0:
        case 1:
            return { score, label: 'Zayıf', color: 'bg-red-500' };
        case 2:
            return { score, label: 'Orta', color: 'bg-yellow-500' };
        case 3:
            return { score, label: 'İyi', color: 'bg-blue-400' };
        case 4:
            return { score, label: 'Güçlü', color: 'bg-emerald-500' };
        default:
            return { score: 0, label: 'Zayıf', color: 'bg-red-500' };
    }
};