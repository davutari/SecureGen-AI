import React from 'react';
import { AcademyTip } from '../types';
import { BookIcon, CheckIcon } from './Icons';

interface Props {
    onRead: (id: number) => void;
    readTips: number[];
}

const TIPS: AcademyTip[] = [
    {
        id: 1,
        title: "Oltalama (Phishing) Nedir?",
        content: "Siber korsanların sizi kandırarak şifrelerinizi çalmaya çalışmasıdır. 'Bankadan geliyoruz' diyen acil e-postalara asla tıklamayın.",
        category: "Defense",
        icon: "🎣"
    },
    {
        id: 2,
        title: "2FA Hayat Kurtarır",
        content: "İki Faktörlü Doğrulama (2FA), şifreniz çalınsa bile hesabınızı korur. SMS yerine Authenticator uygulamalarını tercih edin.",
        category: "Defense",
        icon: "🛡️"
    },
    {
        id: 3,
        title: "Halka Açık Wi-Fi Tehlikesi",
        content: "Kafe veya havaalanı Wi-Fi ağlarında bankacılık işlemi yapmayın. Verileriniz şifrelenmemiş olabilir. VPN kullanın.",
        category: "Privacy",
        icon: "📶"
    },
    {
        id: 4,
        title: "Güncellemeleri Ertelemeyin",
        content: "Yazılım güncellemeleri genellikle güvenlik açıklarını kapatır. 'Daha sonra hatırlat' demek, kapıyı hırsıza açık bırakmaktır.",
        category: "Awareness",
        icon: "🔄"
    },
    {
        id: 5,
        title: "Güçlü Şifre Formülü",
        content: "En az 12 karakter, büyük/küçük harf, rakam ve sembol. Veya 'Cyber-Guard-Academy-2024' gibi uzun ama hatırlanabilir cümleler.",
        category: "Defense",
        icon: "🔑"
    }
];

export const CyberAcademy: React.FC<Props> = ({ onRead, readTips }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 mb-4">
                <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl flex items-start gap-3">
                    <BookIcon className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                        <h3 className="text-emerald-200 font-bold">Siber Bilgi Kütüphanesi</h3>
                        <p className="text-emerald-100/70 text-sm">Bu kartları okuyarak siber savunma yeteneklerini geliştir ve +15 XP kazan.</p>
                    </div>
                </div>
            </div>

            {TIPS.map((tip) => {
                const isRead = readTips.includes(tip.id);
                return (
                    <div 
                        key={tip.id}
                        className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer group ${
                            isRead 
                            ? 'bg-slate-900/50 border-emerald-500/30' 
                            : 'bg-slate-800 border-slate-700 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10'
                        }`}
                        onClick={() => !isRead && onRead(tip.id)}
                    >
                        {isRead && (
                            <div className="absolute top-3 right-3 bg-emerald-500/20 p-1 rounded-full">
                                <CheckIcon className="w-4 h-4 text-emerald-400" />
                            </div>
                        )}
                        <div className="text-3xl mb-3">{tip.icon}</div>
                        <h4 className={`font-bold mb-2 ${isRead ? 'text-emerald-400' : 'text-white group-hover:text-emerald-300'}`}>
                            {tip.title}
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {tip.content}
                        </p>
                        {!isRead && (
                            <div className="mt-4 text-xs font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                +15 XP kazanmak için tıkla
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};