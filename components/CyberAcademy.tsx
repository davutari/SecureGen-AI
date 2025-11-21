
import React, { useState } from 'react';
import { AcademyCategory } from '../types';
import { TIPS } from '../data/tips';
import { BookIcon, CheckIcon, SkullIcon, ShieldIcon, FilterIcon, DiceIcon } from './Icons';

interface Props {
    onRead: (id: number) => void;
    readTips: number[];
}

export const CyberAcademy: React.FC<Props> = ({ onRead, readTips }) => {
    const [activeTab, setActiveTab] = useState<AcademyCategory>('Tehditler');
    const [randomCard, setRandomCard] = useState<number | null>(null);

    const filteredTips = TIPS.filter(t => t.category === activeTab);

    const drawRandomCard = () => {
        const unreadTips = TIPS.filter(t => !readTips.includes(t.id));
        // If all read, pick any
        const pool = unreadTips.length > 0 ? unreadTips : TIPS;
        const random = pool[Math.floor(Math.random() * pool.length)];
        setRandomCard(random.id);
        
        // CRITICAL FIX: Switch active tab to the category of the random card
        // otherwise the element doesn't exist in the DOM to scroll to.
        setActiveTab(random.category);
        
        // Auto scroll to card with a slight delay to allow React to render the new tab content
        setTimeout(() => {
            const element = document.getElementById(`tip-${random.id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Add highlight effect
                element.classList.add('ring-4', 'ring-indigo-500', 'scale-[1.02]', 'shadow-2xl', 'z-10');
                setTimeout(() => {
                    element.classList.remove('ring-4', 'ring-indigo-500', 'scale-[1.02]', 'shadow-2xl', 'z-10');
                }, 2000);
            }
        }, 150);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl text-white">
                <div className="flex items-center gap-4">
                    <div className="bg-slate-800 p-3 rounded-full border border-slate-600">
                        <BookIcon className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Siber Savunma Akademisi</h2>
                        <p className="text-slate-400">Düşmanını tanı, savunmanı kur. Kartları okuyarak XP kazan.</p>
                    </div>
                </div>
                <button 
                    onClick={drawRandomCard}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
                >
                    <DiceIcon className="w-5 h-5" />
                    Şanslı Kart Çek
                </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {(['Tehditler', 'Savunma', 'Gizlilik'] as AcademyCategory[]).map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                            activeTab === cat 
                            ? cat === 'Tehditler' ? 'bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-500/50 shadow-lg shadow-red-900/20'
                            : cat === 'Savunma' ? 'bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-500/50 shadow-lg shadow-emerald-900/20'
                            : 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-500/50 shadow-lg shadow-blue-900/20'
                            : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-transparent'
                        }`}
                    >
                        {cat === 'Tehditler' && <SkullIcon className="w-4 h-4" />}
                        {cat === 'Savunma' && <ShieldIcon className="w-4 h-4" />}
                        {cat === 'Gizlilik' && <FilterIcon className="w-4 h-4" />}
                        {cat}
                    </button>
                ))}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTips.map((tip) => {
                    const isRead = readTips.includes(tip.id);
                    return (
                        <div 
                            id={`tip-${tip.id}`}
                            key={tip.id}
                            onClick={() => !isRead && onRead(tip.id)}
                            className={`relative overflow-hidden p-6 rounded-xl border transition-all duration-300 group cursor-pointer ${
                                isRead 
                                ? 'bg-gray-100 dark:bg-slate-900 border-gray-200 dark:border-slate-800 opacity-75' 
                                : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1'
                            }`}
                        >
                            {/* Background Gradient Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br rounded-full blur-3xl -z-10 opacity-20 transition-opacity group-hover:opacity-40 ${
                                tip.category === 'Tehditler' ? 'from-red-500 to-transparent' :
                                tip.category === 'Savunma' ? 'from-emerald-500 to-transparent' :
                                'from-blue-500 to-transparent'
                            }`} />

                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700/50 shadow-inner">
                                    {tip.icon}
                                </div>
                                {isRead ? (
                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-green-200 dark:border-green-500/30">
                                        <CheckIcon className="w-3 h-3" /> Öğrenildi
                                    </span>
                                ) : (
                                    <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded-full">
                                        {tip.difficulty}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                {tip.title}
                            </h3>
                            
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                {tip.content}
                            </p>

                            {!isRead && (
                                <div className="mt-4 flex items-center justify-between border-t border-gray-200 dark:border-slate-700/50 pt-4">
                                    <span className="text-xs font-mono text-yellow-600 dark:text-yellow-500 font-bold">+25 XP</span>
                                    <span className="text-xs text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">Okudum olarak işaretle →</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
