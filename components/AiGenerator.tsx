import React, { useState } from 'react';
import { PasswordType } from '../types';
import { generateMemorablePassphrases, auditPassword } from '../services/geminiService';
import { SparklesIcon, CopyIcon, CheckIcon } from './Icons';

interface Props {
    onGenerate: (password: string, type: PasswordType) => void;
}

export const AiGenerator: React.FC<Props> = ({ onGenerate }) => {
    const [passphrases, setPassphrases] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [auditResult, setAuditResult] = useState<{ pwd: string, comment: string } | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleGenerate = async () => {
        setLoading(true);
        setAuditResult(null);
        try {
            const results = await generateMemorablePassphrases();
            setPassphrases(results);
        } catch (error) {
            alert("Failed to generate passwords with AI. Please check your API key.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyAndAudit = async (pwd: string, idx: number) => {
        await navigator.clipboard.writeText(pwd);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
        onGenerate(pwd, PasswordType.AI_MEMORABLE);

        // Perform AI Audit
        setAuditResult({ pwd, comment: "Analyzing..." });
        const comment = await auditPassword(pwd);
        setAuditResult({ pwd, comment });
    };

    return (
        <div className="space-y-6">
            <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl">
                <p className="text-indigo-200 text-sm flex gap-2 items-start">
                    <SparklesIcon className="w-5 h-5 shrink-0 mt-0.5" />
                    Generates memorable passphrases (e.g., "Correct-Horse-Battery") using Gemini 2.5 Flash. Perfect for humans, hard for computers.
                </p>
            </div>

            <div className="min-h-[200px] space-y-3">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-48 space-y-4 text-slate-400">
                        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <p>AI is hallucinating passwords...</p>
                    </div>
                ) : passphrases.length > 0 ? (
                    passphrases.map((pwd, idx) => (
                        <div 
                            key={idx}
                            onClick={() => handleCopyAndAudit(pwd, idx)}
                            className="group bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all"
                        >
                            <span className="font-mono text-lg text-slate-200">{pwd}</span>
                            <button className="text-slate-400 group-hover:text-white transition-colors">
                                {copiedIndex === idx ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-48 text-slate-500 italic border-2 border-dashed border-slate-800 rounded-xl">
                        Click generate to start
                    </div>
                )}
            </div>

            {auditResult && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-slate-900 border-l-4 border-purple-500 p-4 rounded-r-xl shadow-xl">
                        <p className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-1">Gemini Security Audit</p>
                        <p className="text-slate-300 italic">"{auditResult.comment}"</p>
                    </div>
                </div>
            )}

            <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Generating...' : <><SparklesIcon className="w-5 h-5" /> Generate with AI</>}
            </button>
        </div>
    );
};
