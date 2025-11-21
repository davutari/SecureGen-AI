
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

// Gamification Types
export interface UserProfile {
    xp: number;
    level: number;
    badges: string[];
    completedQuizzes: number[];
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    xpReward: number;
}

export type AcademyCategory = 'Tehditler' | 'Savunma' | 'Gizlilik';

export interface AcademyTip {
    id: number;
    title: string;
    content: string;
    category: AcademyCategory;
    icon: React.ReactNode; // Changed from string to ReactNode for components
    difficulty: 'Başlangıç' | 'Orta' | 'İleri';
}
