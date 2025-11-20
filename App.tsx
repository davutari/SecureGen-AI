import React, { useState, useEffect } from 'react';
import { AlgorithmicGenerator } from './components/AlgorithmicGenerator';
import { AiGenerator } from './components/AiGenerator';
import { History } from './components/History';
import { GamificationBar } from './components/GamificationBar';
import { CyberQuiz } from './components/CyberQuiz';
import { CyberAcademy } from './components/CyberAcademy';
import { HistoryItem, PasswordType, UserProfile } from './types';
import { SettingsIcon, SparklesIcon, GamepadIcon, BookIcon, ShieldIcon } from './components/Icons';

export default function App() {
    const [activeView, setActiveView] = useState<'generator' | 'academy' | 'quiz'>('generator');
    const [genTab, setGenTab] = useState<'algo' | 'ai'>('algo');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    
    // Gamification State
    const [profile, setProfile] = useState<UserProfile>({
        xp: 0,
        level: 0,
        badges: [],
        completedQuizzes: []
    });
    const [readTips, setReadTips] = useState<number[]>([]);

    // Level Up Logic
    useEffect(() => {
        const calculatedLevel = Math.floor(profile.xp / 100);
        if (calculatedLevel > profile.level) {
            // Level up animation or sound could go here
            setProfile(prev => ({ ...prev, level: calculatedLevel }));
        }
    }, [profile.xp, profile.level]);

    const addXp = (amount: number) => {
        setProfile(prev => ({ ...prev, xp: prev.xp + amount }));
    };

    const addToHistory = (password: string, type: PasswordType) => {
        const newItem: HistoryItem = {
            password,
            timestamp: Date.now(),
            type
        };
        setHistory(prev => [newItem, ...prev]);
        
        // Reward for generating secure password
        // Simple debounce mechanism could be added here to prevent spamming XP
        addXp(5);
    };

    const handleQuizComplete = (xp: number, questionId: number) => {
        setProfile(prev => ({
            ...prev,
            xp: prev.xp + xp,
            completedQuizzes: [...prev.completedQuizzes, questionId]
        }));
    };

    const handleReadTip = (tipId: number) => {
        setReadTips(prev => [...prev, tipId]);
        addXp(15);
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30">
            
            <GamificationBar profile={profile} />

            <main className="max-w-5xl mx-auto p-4 md:p-8">
                
                {/* Header */}
                <div className="text-center mb-10 mt-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 mb-4 tracking-tight">
                        CyberGuard Academy
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Siber savunma yeteneklerini geliştir, güçlü şifreler oluştur ve dijital dünyada güvende kal.
                    </p>
                </div>

                {/* Navigation */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 max-w-3xl mx-auto bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                    <button 
                        onClick={() => setActiveView('generator')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm md:text-base font-semibold transition-all ${
                            activeView === 'generator' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <ShieldIcon className="w-5 h-5" />
                        <span className="hidden md:inline">Cephanelik</span> (Araçlar)
                    </button>
                    <button 
                        onClick={() => setActiveView('academy')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm md:text-base font-semibold transition-all ${
                            activeView === 'academy' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <BookIcon className="w-5 h-5" />
                        Akademi
                    </button>
                    <button 
                        onClick={() => setActiveView('quiz')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm md:text-base font-semibold transition-all ${
                            activeView === 'quiz' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <GamepadIcon className="w-5 h-5" />
                        <span className="hidden md:inline">Siber</span> Oyun
                    </button>
                </div>

                {/* Views */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {activeView === 'generator' && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                                <div className="flex border-b border-slate-800">
                                    <button 
                                        onClick={() => setGenTab('algo')}
                                        className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                                            genTab === 'algo' 
                                            ? 'text-white bg-slate-800/50 border-b-2 border-indigo-500' 
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                                        }`}
                                    >
                                        <SettingsIcon className="w-4 h-4" />
                                        Standart Oluşturucu
                                    </button>
                                    <button 
                                        onClick={() => setGenTab('ai')}
                                        className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                                            genTab === 'ai' 
                                            ? 'text-white bg-slate-800/50 border-b-2 border-purple-500' 
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                                        }`}
                                    >
                                        <SparklesIcon className="w-4 h-4" />
                                        Yapay Zeka & Denetim
                                    </button>
                                </div>

                                <div className="p-6 md:p-8">
                                    {genTab === 'algo' ? (
                                        <AlgorithmicGenerator onGenerate={addToHistory} />
                                    ) : (
                                        <AiGenerator onGenerate={addToHistory} />
                                    )}
                                    <History history={history} />
                                </div>
                            </div>
                            <p className="text-center mt-6 text-slate-500 text-sm">
                                İpucu: Her güvenli şifre oluşturduğunda <span className="text-indigo-400 font-bold">+5 XP</span> kazanırsın.
                            </p>
                        </div>
                    )}

                    {activeView === 'academy' && (
                        <CyberAcademy onRead={handleReadTip} readTips={readTips} />
                    )}

                    {activeView === 'quiz' && (
                        <CyberQuiz onComplete={handleQuizComplete} completedQuestions={profile.completedQuizzes} />
                    )}

                </div>
            </main>
        </div>
    );
}