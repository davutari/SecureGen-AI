import { GoogleGenAI, Type } from "@google/genai";

const getClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API Key not found");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateMemorablePassphrases = async (): Promise<string[]> => {
    try {
        const ai = getClient();
        const model = 'gemini-2.5-flash';
        
        const prompt = `Generate 5 distinct, secure, yet memorable passphrases. 
        Each passphrase should consist of 3 to 5 random but common words separated by hyphens or spaces. 
        Include a mix of capitalization and at least one number substituted for a letter or appended.
        Example: "Correct-Horse-Battery-Staple-99" or "Blue_Sky_Walking_7".
        Return ONLY a JSON array of strings.`;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        });

        const text = response.text;
        if (!text) return [];
        
        return JSON.parse(text) as string[];
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

export const auditPassword = async (password: string): Promise<string> => {
    try {
        const ai = getClient();
        const model = 'gemini-2.5-flash';
        
        const prompt = `Analyze the strength of this password: "${password}". 
        Provide a very brief, witty, and sarcastic one-sentence comment about its security. 
        Do not reveal the password in the response.`;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });

        return response.text || "Could not analyze.";
    } catch (error) {
        console.error("Gemini Audit Error:", error);
        return "AI Audit currently unavailable.";
    }
};