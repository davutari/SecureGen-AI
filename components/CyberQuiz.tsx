
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { GamepadIcon, CheckIcon } from './Icons';

interface Props {
    onComplete: (xp: number, questionId: number) => void;
    completedQuestions: number[];
}

const QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        question: "Bir e-postanın 'Oltalama' (Phishing) olduğunu nasıl anlarsın?",
        options: [
            "Gönderen adresi gariptir ve aciliyet hissi yaratır.",
            "E-posta çok profesyonel görünür.",
            "Sadece mesai saatleri içinde gelmiştir.",
            "İçinde resim yoktur."
        ],
        correctAnswer: 0,
        explanation: "Saldırganlar genellikle panik yaratmak için 'Hesabınız kapatılacak!' gibi ifadeler kullanır ve sahte adreslerden yazar.",
        xpReward: 50
    },
    {
        id: 2,
        question: "Şifreniz '123456' ise, bir hacker onu ne kadar sürede kırar?",
        options: [
            "1 Hafta",
            "1 Saat",
            "Anında (Milisaniyeler içinde)",
            "Kıramaz"
        ],
        correctAnswer: 2,
        explanation: "Basit şifreler 'Rainbow Table' denilen listeler sayesinde saniyenin altında kırılır.",
        xpReward: 30
    },
    {
        id: 3,
        question: "Aşağıdakilerden hangisi en güvenli kimlik doğrulama yöntemidir?",
        options: [
            "Sadece Şifre",
            "Şifre + SMS Doğrulama",
            "Şifre + Authenticator Uygulaması (2FA)",
            "Doğum tarihini kullanmak"
        ],
        correctAnswer: 2,
        explanation: "SMS klonlanabilir (SIM Swapping), ancak Authenticator uygulamaları cihazınıza özgü geçici kodlar üretir.",
        xpReward: 40
    },
    {
        id: 4,
        question: "'Metadata' nedir ve neden temizlenmelidir?",
        options: [
            "Bir virüs türüdür.",
            "Dosyanın içindeki gizli veridir (Konum, Kamera modeli vb.).",
            "İnternet hızıdır.",
            "Bir şifreleme yöntemidir."
        ],
        correctAnswer: 1,
        explanation: "Sosyal medyada paylaştığınız fotoğrafların metadata'sı evinizin konumunu ifşa edebilir.",
        xpReward: 35
    },
    {
        id: 5,
        question: "Halka açık Wi-Fi (Cafe, Otel) kullanırken ne yapmalısınız?",
        options: [
            "Bankacılık işlemleri yapmalıyım.",
            "Hiçbir şey yapmama gerek yok.",
            "VPN (Sanal Özel Ağ) kullanmalıyım.",
            "Ekran parlaklığını kısmalıyım."
        ],
        correctAnswer: 2,
        explanation: "VPN trafiğinizi şifreler. Halka açık ağlarda VPN olmadan veri trafiğiniz başkaları tarafından izlenebilir.",
        xpReward: 45
    }
];

export const CyberQuiz: React.FC<Props> = ({ onComplete, completedQuestions }) => {
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const handleAnswer = () => {
        if (selectedOption === null || activeQuestion === null) return;

        const question = QUESTIONS.find(q => q.id === activeQuestion);
        if (!question) return;

        const isCorrect = selectedOption === question.correctAnswer;
        setFeedback(isCorrect ? 'correct' : 'wrong');
        setIsAnswered(true);

        if (isCorrect) {
            onComplete(question.xpReward, question.id);
        }
    };

    const reset = () => {
        setActiveQuestion(null);
        setSelectedOption(null);
        setIsAnswered(false);
        setFeedback(null);
    };

    if (activeQuestion !== null) {
        const q = QUESTIONS.find(q => q.id === activeQuestion)!;
        
        return (
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-6">
                    <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-mono px-2 py-1 rounded">SORU #{q.id}</span>
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold text-sm">Ödül: {q.xpReward} XP</span>
                </div>
                
                <h3 className="text-xl text-slate-900 dark:text-white font-bold mb-6">{q.question}</h3>
                
                <div className="space-y-3 mb-6">
                    {q.options.map((opt, idx) => (
                        <button
                            key={idx}
                            disabled={isAnswered}
                            onClick={() => setSelectedOption(idx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${
                                isAnswered && idx === q.correctAnswer
                                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-100'
                                    : isAnswered && idx === selectedOption && feedback === 'wrong'
                                    ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-100'
                                    : selectedOption === idx
                                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                                    : 'bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                {isAnswered && (
                    <div className={`mb-6 p-4 rounded-lg ${feedback === 'correct' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200'}`}>
                        <p className="font-bold mb-1">{feedback === 'correct' ? '🎉 Doğru Cevap!' : '⚠️ Yanlış Cevap'}</p>
                        <p className="text-sm opacity-80">{q.explanation}</p>
                    </div>
                )}

                <div className="flex gap-3">
                    <button onClick={reset} className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-semibold">
                        Kapat
                    </button>
                    {!isAnswered && (
                        <button onClick={handleAnswer} disabled={selectedOption === null} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                            Cevapla
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-full bg-gradient-to-r from-indigo-600/90 to-purple-600/90 dark:from-indigo-900/50 dark:to-purple-900/50 p-6 rounded-2xl border border-indigo-500/30 mb-4 flex items-center justify-between text-white shadow-lg">
                <div>
                    <h3 className="text-xl font-bold mb-1">Siber Güvenlik Arenası</h3>
                    <p className="text-indigo-100 text-sm">Bilgini test et, seviye atla ve rozetleri topla.</p>
                </div>
                <GamepadIcon className="w-12 h-12 text-white opacity-50" />
            </div>

            {QUESTIONS.map((q) => {
                const isDone = completedQuestions.includes(q.id);
                return (
                    <button
                        key={q.id}
                        disabled={isDone}
                        onClick={() => setActiveQuestion(q.id)}
                        className={`relative p-6 rounded-xl border text-left transition-all group ${
                            isDone 
                            ? 'bg-gray-50 dark:bg-slate-900 opacity-60 border-gray-200 dark:border-slate-800 cursor-default' 
                            : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1'
                        }`}
                    >
                        {isDone && (
                            <div className="absolute top-3 right-3">
                                <CheckIcon className="w-5 h-5 text-green-500" />
                            </div>
                        )}
                        <span className="text-xs font-mono text-slate-500 mb-2 block">GÖREV #{q.id}</span>
                        <h4 className={`font-semibold mb-4 ${isDone ? 'text-slate-500' : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white'}`}>
                            {q.question.substring(0, 50)}...
                        </h4>
                        <div className="flex items-center gap-2">
                            <div className={`text-xs font-bold px-2 py-1 rounded ${isDone ? 'bg-gray-200 dark:bg-slate-800 text-slate-600' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'}`}>
                                +{q.xpReward} XP
                            </div>
                            {isDone ? <span className="text-xs text-green-500 font-medium">Tamamlandı</span> : <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">Başla &rarr;</span>}
                        </div>
                    </button>
                )
            })}
        </div>
    );
};
