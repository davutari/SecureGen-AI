
import React, { useState, useEffect, useCallback } from 'react';
import { PasswordOptions, PasswordType } from '../types';
import { generateRandomPassword, checkPasswordStrength } from '../utils/passwordUtils';
import { CopyIcon, CheckIcon, RefreshIcon, ShieldIcon } from './Icons';

interface Props {
    onGenerate: (password: string, type: PasswordType) => void;
}

const Checkbox = ({ label, checked, onChange, disabled }: { label: string, checked: boolean, onChange: (v: boolean) => void, disabled?: boolean }) => (
    <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
        checked 
        ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-200 dark:border-indigo-500/50' 
        : 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${
            checked 
            ? 'bg-indigo-500 border-indigo-500' 
            : 'bg-white dark:bg-transparent border-gray-300 dark:border-slate-500'
        }`}>
            {checked && <CheckIcon className="w-3.5 h-3.5 text-white" />}
        </div>
        <input 
            type="checkbox" 
            className="hidden" 
            checked={checked} 
            onChange={(e) => !disabled && onChange(e.target.checked)}
            disabled={disabled}
        />
        <span className={`font-medium select-none ${checked ? 'text-indigo-700 dark:text-indigo-200' : 'text-slate-600 dark:text-slate-400'}`}>{label}</span>
    </label>
);

export const AlgorithmicGenerator: React.FC<Props> = ({ onGenerate }) => {
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [options, setOptions] = useState<PasswordOptions>({
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true
    });

    // Calculate how many options are currently active
    const activeOptionCount = [
        options.includeUppercase,
        options.includeLowercase,
        options.includeNumbers,
        options.includeSymbols
    ].filter(Boolean).length;

    const handleGenerate = useCallback(() => {
        const newPassword = generateRandomPassword(options);
        setPassword(newPassword);
        setCopied(false);
    }, [options]);

    // Initial generate
    useEffect(() => {
        handleGenerate();
    }, []); 

    const copyToClipboard = async () => {
        if (!password) return;
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const strength = checkPasswordStrength(password);

    return (
        <div className="space-y-6">
            {/* Display Area */}
            <div className="relative group">
                <div className={`bg-gray-50 dark:bg-slate-800/50 border rounded-xl p-6 flex items-center justify-between transition-all focus-within:ring-2 focus-within:ring-indigo-500 ${copied ? 'border-green-500/50' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'}`}>
                    <input 
                        type="text" 
                        value={password} 
                        readOnly 
                        className="bg-transparent border-none w-full text-2xl md:text-3xl font-mono text-slate-800 dark:text-white focus:outline-none tracking-wider truncate mr-4"
                    />
                    <button 
                        onClick={copyToClipboard}
                        className="p-3 rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-transparent hover:bg-indigo-50 dark:hover:bg-indigo-600 text-slate-500 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-all active:scale-95"
                        title="Kopyala"
                    >
                        {copied ? <CheckIcon className="w-6 h-6 text-green-500 dark:text-green-400" /> : <CopyIcon className="w-6 h-6" />}
                    </button>
                </div>
                
                {/* Strength Bar */}
                <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                        className={`h-full transition-all duration-500 ${strength.color}`} 
                        style={{ width: `${Math.max((strength.score / 4) * 100, 5)}%` }}
                    />
                </div>
                <div className="flex justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                        <ShieldIcon className={`w-3 h-3 ${strength.color.replace('bg-', 'text-')}`} />
                        <p className="text-xs text-slate-500">Güvenlik Seviyesi</p>
                    </div>
                    <p className={`text-xs font-bold ${strength.color.replace('bg-', 'text-')}`}>
                        {strength.label.toUpperCase()}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-50 dark:bg-slate-800/30 rounded-xl p-6 border border-gray-200 dark:border-slate-700/50 space-y-6">
                {/* Length Slider */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-slate-600 dark:text-slate-400 text-sm font-medium">Şifre Uzunluğu</label>
                        <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-md font-mono text-sm">{options.length}</span>
                    </div>
                    <input 
                        type="range" 
                        min="6" 
                        max="64" 
                        value={options.length} 
                        onChange={(e) => setOptions({...options, length: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>

                {/* Toggles */}
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Karakter Türleri (En az 1 tane)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Checkbox 
                            label="Büyük Harfler (A-Z)" 
                            checked={options.includeUppercase} 
                            onChange={(v) => setOptions({...options, includeUppercase: v})}
                            disabled={options.includeUppercase && activeOptionCount <= 1}
                        />
                        <Checkbox 
                            label="Küçük Harfler (a-z)" 
                            checked={options.includeLowercase} 
                            onChange={(v) => setOptions({...options, includeLowercase: v})}
                            disabled={options.includeLowercase && activeOptionCount <= 1}
                        />
                        <Checkbox 
                            label="Rakamlar (0-9)" 
                            checked={options.includeNumbers} 
                            onChange={(v) => setOptions({...options, includeNumbers: v})}
                            disabled={options.includeNumbers && activeOptionCount <= 1}
                        />
                        <Checkbox 
                            label="Semboller (!@#)" 
                            checked={options.includeSymbols} 
                            onChange={(v) => setOptions({...options, includeSymbols: v})}
                            disabled={options.includeSymbols && activeOptionCount <= 1}
                        />
                    </div>
                </div>

                <button 
                    onClick={() => {
                        const newPassword = generateRandomPassword(options);
                        setPassword(newPassword);
                        onGenerate(newPassword, PasswordType.ALGORITHMIC);
                    }}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
                >
                    <RefreshIcon className="w-5 h-5" />
                    Şifre Üret
                </button>
            </div>
        </div>
    );
};
