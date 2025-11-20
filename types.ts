export interface PasswordOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
}

export enum PasswordType {
    ALGORITHMIC = 'ALGORITHMIC',
    AI_MEMORABLE = 'AI_MEMORABLE'
}

export interface HistoryItem {
    password: string;
    timestamp: number;
    type: PasswordType;
    strengthScore?: number; // 0-4
}

export interface ValidationResult {
    score: number; // 0-4
    label: string;
    color: string;
}