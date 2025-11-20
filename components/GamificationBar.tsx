import React from 'react';
import { UserProfile } from '../types';
import { TrophyIcon, ShieldIcon } from './Icons';

interface Props {
    profile: UserProfile;
}

export const GamificationBar: React.FC<Props> = ({ profile }) => {
    // Level calculation: 100 XP per level
    const nextLevelXp = (profile.level + 1) * 100;
    const currentLevelBaseXp = profile.level * 100;
    const progress = ((profile.xp - currentLevelBaseXp) / 100) * 100;

    const getLevelTitle = (level: number) => {
        if (level === 0) return "Siber Stajyer";
        if (level < 3) return "Acemi Savunmacı";
        if (level < 5) return "Güvenlik Uzmanı";
        if (level < 10) return "Siber Muhafız";
        return "Legendary Hacker Hunter";
    };

    return (
        <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 p-4 shadow-lg">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <ShieldIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-sm md:text-base">{getLevelTitle(profile.level)}</h2>
                        <p className="text-indigo-300 text-xs font-mono">Level {profile.level}</p>
                    </div>
                </div>

                <div className="flex-1 mx-4 md:mx-8 max-w-md">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>XP: {profile.xp}</span>
                        <span>Next: {nextLevelXp}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 ease-out"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                    <TrophyIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-slate-300 text-sm font-bold">{profile.badges.length} Rozet</span>
                </div>
            </div>
        </div>
    );
};