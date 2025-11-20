import React from 'react';
import { HistoryItem, PasswordType } from '../types';
import { CopyIcon, SparklesIcon, SettingsIcon } from './Icons';

interface Props {
    history: HistoryItem[];
}

export const History: React.FC<Props> = ({ history }) => {
    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    if (history.length === 0) return null;

    return (
        <div className="mt-8 border-t border-slate-800 pt-6">
            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">Recent History</h3>
            <div className="space-y-2">
                {history.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 group transition-colors">
                        <div className="flex items-center gap-3 overflow-hidden">
                            {item.type === PasswordType.AI_MEMORABLE ? 
                                <SparklesIcon className="w-4 h-4 text-purple-400 shrink-0" /> : 
                                <SettingsIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                            }
                            <span className="font-mono text-slate-300 truncate text-sm">{item.password}</span>
                        </div>
                        <button 
                            onClick={() => copy(item.password)}
                            className="text-slate-600 hover:text-slate-300 p-1 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <CopyIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};