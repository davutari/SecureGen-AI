import React, { useState, useEffect, useCallback } from 'react';
import { PasswordOptions, PasswordType } from '../types';
import { generateRandomPassword, checkPasswordStrength } from '../utils/passwordUtils';
import { CopyIcon, CheckIcon, RefreshIcon } from './Icons';

interface Props {
    onGenerate: (password: string, type: PasswordType) => void;
}

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

    const handleGenerate = useCallback(() => {
        const newPassword = generateRandomPassword(options);
        setPassword(newPassword);
        onGenerate(newPassword, PasswordType.ALGORITHMIC);
        setCopied(false);
    }, [options, onGenerate]);

    // Generate on mount and when options change (debounced slightly for sliders)
    useEffect(() => {
        handleGenerate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex items-center justify-between transition-all focus-within:ring-2 focus-within:ring-indigo-500 hover:border-slate-600">
                    <input 
                        type="text" 
                        value={password} 
                        readOnly 
                        className="bg-transparent border-none w-full text-2xl md:text-3xl font-mono text-white focus:outline-none tracking-wider truncate mr-4"
                    />
                    <button 
                        onClick={copyToClipboard}
                        className="p-3 rounded-lg bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all active:scale-95"
                        title="Copy to clipboard"
                    >
                        {copied ? <CheckIcon className="w-6 h-6 text-green-400" /> : <CopyIcon className="w-6 h-6" />}
                    </button>
                </div>
                
                {/* Strength Bar */}
                <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                        className={`h-full transition-all duration-500 ${strength.color}`} 
                        style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                </div>
                <p className={`text-xs mt-1 text-right font-bold ${strength.color.replace('bg-', 'text-')}`}>
                    {strength.label.toUpperCase()}
                </p>
            </div>

            {/* Controls */}
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 space-y-6">
                {/* Length Slider */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-slate-400 text-sm font-medium">Password Length</label>
                        <span className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-md font-mono text-sm">{options.length}</span>
                    </div>
                    <input 
                        type="range" 
                        min="6" 
                        max="64" 
                        value={options.length} 
                        onChange={(e) => setOptions({...options, length: parseInt(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Checkbox 
                        label="Uppercase Letters (A-Z)" 
                        checked={options.includeUppercase} 
                        onChange={(v) => setOptions({...options, includeUppercase: v})} 
                    />
                    <Checkbox 
                        label="Lowercase Letters (a-z)" 
                        checked={options.includeLowercase} 
                        onChange={(v) => setOptions({...options, includeLowercase: v})} 
                    />
                    <Checkbox 
                        label="Numbers (0-9)" 
                        checked={options.includeNumbers} 
                        onChange={(v) => setOptions({...options, includeNumbers: v})} 
                    />
                    <Checkbox 
                        label="Symbols (!@#...)" 
                        checked={options.includeSymbols} 
                        onChange={(v) => setOptions({...options, includeSymbols: v})} 
                    />
                </div>
            </div>

            <button 
                onClick={handleGenerate}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
            >
                <RefreshIcon className="w-5 h-5" />
                Generate New Password
            </button>
        </div>
    );
};

const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (c: boolean) => void }) => (
    <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-slate-700/30 rounded-lg transition-colors">
        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-indigo-600 border-indigo-600' : 'border-slate-500 bg-transparent group-hover:border-indigo-400'}`}>
            {checked && <CheckIcon className="w-3.5 h-3.5 text-white" />}
        </div>
        <input 
            type="checkbox" 
            checked={checked} 
            onChange={(e) => onChange(e.target.checked)} 
            className="hidden"
        />
        <span className="text-slate-300 text-sm select-none group-hover:text-white">{label}</span>
    </label>
);
