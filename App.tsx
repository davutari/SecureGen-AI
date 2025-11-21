
import React, { useState, useEffect } from 'react';
import { AlgorithmicGenerator } from './components/AlgorithmicGenerator';
import { AiGenerator } from './components/AiGenerator';
import { History } from './components/History';
import { GamificationBar } from './components/GamificationBar';
import { CyberQuiz } from './components/CyberQuiz';
import { CyberAcademy } from './components/CyberAcademy';
import { HistoryItem, PasswordType, UserProfile, AcademyTip } from './types';
import { SettingsIcon, SparklesIcon, GamepadIcon, BookIcon, ShieldIcon, LightbulbIcon, XIcon } from './components/Icons';
import { TIPS } from './data/tips';

export default function App() {
    const [activeView, setActiveView] = useState<'generator' | 'academy' | 'quiz'>('generator');
    const [genTab, setGenTab] = useState<'algo' | 'ai'>('algo');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [activeTip, setActiveTip] = useState<AcademyTip | null>(null);
    
    // Gamification State
    const [profile, setProfile] = useState<UserProfile>({
        xp: 0,
        level: 1,
        badges: [],
        completedQuizzes: []
    });
    const [readTips, setReadTips] = useState<number[]>([]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        // Check for level up
        const calculatedLevel = Math.floor(profile.xp / 100) + 1;
        if (calculatedLevel > profile.level) {
            setProfile(prev => ({ ...prev, level: calculatedLevel }));
        }
    }, [profile.xp, profile.level]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

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
        addXp(5);

        // Show a random security tip
        const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
        setActiveTip(randomTip);
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
        addXp(25);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 pb-20 transition-colors duration-300">
            
            <GamificationBar profile={profile} theme={theme} toggleTheme={toggleTheme} />

            <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
                
                {/* Hero Header */}
                <div className="text-center space-y-4 py-8 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 dark:from-indigo-300 dark:via-purple-300 dark:to-emerald-300 tracking-tight drop-shadow-lg">
                        CyberGuard Academy
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Güçlü şifreler oluştur, hacker yöntemlerini öğren ve <span className="text-indigo-600 dark:text-indigo-400 font-bold">Siber Muhafız</span> unvanını kazan.
                    </p>
                </div>

                {/* Main Navigation */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 bg-white/80 dark:bg-slate-900/80 p-2 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-2xl backdrop-blur-sm sticky top-20 z-40">
                    <button 
                        onClick={() => setActiveView('generator')}
                        className={`group flex flex-col md:flex-row items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 ${
                            activeView === 'generator' 
                            ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 text-white shadow-lg shadow-indigo-500/25' 
                            : 'text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                    >
                        <ShieldIcon className={`w-6 h-6 ${activeView === 'generator' ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'}`} />
                        <span>Cephanelik</span>
                    </button>
                    
                    <button 
                        onClick={() => setActiveView('academy')}
                        className={`group flex flex-col md:flex-row items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 ${
                            activeView === 'academy' 
                            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white shadow-lg shadow-emerald-500/25' 
                            : 'text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                    >
                        <BookIcon className={`w-6 h-6 ${activeView === 'academy' ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400'}`} />
                        <span>Akademi</span>
                    </button>

                    <button 
                        onClick={() => setActiveView('quiz')}
                        className={`group flex flex-col md:flex-row items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 ${
                            activeView === 'quiz' 
                            ? 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white shadow-lg shadow-purple-500/25' 
                            : 'text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                    >
                        <GamepadIcon className={`w-6 h-6 ${activeView === 'quiz' ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-purple-400'}`} />
                        <span>Oyun Alanı</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="min-h-[500px]">
                    {activeView === 'generator' && (
                        <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-300">
                            <div className="bg-white dark:bg-[#131825] border border-gray-200 dark:border-slate-800/60 rounded-2xl shadow-2xl overflow-hidden">
                                <div className="flex border-b border-gray-200 dark:border-slate-800/60">
                                    <button 
                                        onClick={() => setGenTab('algo')}
                                        className={`flex-1 py-5 font-medium flex items-center justify-center gap-2 transition-colors ${
                                            genTab === 'algo' 
                                            ? 'text-indigo-600 dark:text-indigo-300 bg-gray-50 dark:bg-slate-800/30 border-b-2 border-indigo-500' 
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/20'
                                        }`}
                                    >
                                        <SettingsIcon className="w-4 h-4" />
                                        Manuel Oluşturucu
                                    </button>
                                    <button 
                                        onClick={() => setGenTab('ai')}
                                        className={`flex-1 py-5 font-medium flex items-center justify-center gap-2 transition-colors ${
                                            genTab === 'ai' 
                                            ? 'text-purple-600 dark:text-purple-300 bg-gray-50 dark:bg-slate-800/30 border-b-2 border-purple-500' 
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/20'
                                        }`}
                                    >
                                        <SparklesIcon className="w-4 h-4" />
                                        Yapay Zeka (AI)
                                    </button>
                                </div>

                                <div className="p-6 md:p-8">
                                    {genTab === 'algo' ? (
                                        <AlgorithmicGenerator onGenerate={addToHistory} />
                                    ) : (
                                        <AiGenerator onGenerate={addToHistory} />
                                    )}

                                    {/* Security Tip Section */}
                                    {activeTip && (
                                        <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/30 rounded-xl p-5 relative animate-in slide-in-from-top-2">
                                            <button 
                                                onClick={() => setActiveTip(null)}
                                                className="absolute top-2 right-2 p-1 text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-200 transition-colors"
                                            >
                                                <XIcon className="w-5 h-5" />
                                            </button>
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-full shrink-0">
                                                    <LightbulbIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-indigo-900 dark:text-indigo-100">Biliyor muydunuz?</h4>
                                                        <span className="text-xs bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 rounded-full">
                                                            {activeTip.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                                                        {activeTip.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <History history={history} />
                                </div>
                            </div>
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
