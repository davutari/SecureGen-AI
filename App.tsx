import React, { useState } from 'react';
import { AlgorithmicGenerator } from './components/AlgorithmicGenerator';
import { AiGenerator } from './components/AiGenerator';
import { History } from './components/History';
import { HistoryItem, PasswordType } from './types';
import { SettingsIcon, SparklesIcon } from './components/Icons';

export default function App() {
    const [activeTab, setActiveTab] = useState<'algo' | 'ai'>('algo');
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const addToHistory = (password: string, type: PasswordType) => {
        const newItem: HistoryItem = {
            password,
            timestamp: Date.now(),
            type
        };
        setHistory(prev => [newItem, ...prev]);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
            <div className="w-full max-w-xl">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
                        SecureGen
                    </h1>
                    <p className="text-slate-400">Generate impenetrable passwords instantly.</p>
                </div>

                {/* Main Card */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                    
                    {/* Tabs */}
                    <div className="flex border-b border-slate-800">
                        <button 
                            onClick={() => setActiveTab('algo')}
                            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                                activeTab === 'algo' 
                                ? 'text-white bg-slate-800/50 border-b-2 border-indigo-500' 
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                            }`}
                        >
                            <SettingsIcon className="w-4 h-4" />
                            Standard
                        </button>
                        <button 
                            onClick={() => setActiveTab('ai')}
                            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                                activeTab === 'ai' 
                                ? 'text-white bg-slate-800/50 border-b-2 border-purple-500' 
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                            }`}
                        >
                            <SparklesIcon className="w-4 h-4" />
                            AI Powered
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                        {activeTab === 'algo' ? (
                            <AlgorithmicGenerator onGenerate={addToHistory} />
                        ) : (
                            <AiGenerator onGenerate={addToHistory} />
                        )}

                        <History history={history} />
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-slate-600 text-sm">
                    <p>SecureGen runs locally. Passwords generated via Standard mode never leave your browser.</p>
                </div>
            </div>
        </div>
    );
}