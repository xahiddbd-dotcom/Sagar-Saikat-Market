
import { GoogleGenAI, Type } from "@google/genai";

// Ensure we pick up the API key correctly from Vercel environment variables
const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getMarketAssistantResponse = async (query: string) => {
  try {
    if (!API_KEY) {
      return "সিস্টেম কনফিগারেশনে সমস্যা হয়েছে (API Key Missing)। দয়া করে অ্যাডমিনের সাথে যোগাযোগ করুন।";
    }
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are the Digital Guide for "Sagar Saikat Market" (সাগর সৈকত মার্কেট). 
        Market Layout Knowledge:
        - Ground Floor (নিচতলা): Divided into Left (বাম) and Right (ডান) rows. Total 20 shops.
          - Left: Food Lover Zone, Saiful Computer, R.K. Computer, Adi Enterprise, Sujon Computer, Ma Enterprise, Munna IT, Travel Agency, Citizen Business (Dutch Bangla), Advocate Bashir.
          - Right: Selim Book House, Jewel Enterprise, Raja Computer, Sabab Enterprise, Arvin Studio, RJ Computer, Tax Lawyer, Selim Store, Water Purifier, Huzur Saiful Bhai.
        - 2nd Floor (২য় তলা): Occupied by Medico Coaching Center (৯৮% জায়গা) and Professional Cake Skill Development Coaching (২% জায়গা).
        - Higher Floors (৩য়-৬ষ্ঠ তলা): Language centers, BCS prep, and IT training.
        Always respond in Bengali. Be professional and helpful.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Assistant Error:", error);
    return "দুঃখিত, এআই অ্যাসিস্ট্যান্ট বর্তমানে ব্যস্ত আছে। দয়া করে একটু পর আবার চেষ্টা করুন।";
  }
};

export const fetchMarketUpdates = async () => {
  try {
    if (!API_KEY) return [];
    const prompt = `বাংলাদেশের ব্যবসা বা বাণিজ্য সংক্রান্ত ৫টি সাম্প্রতিক নিউজ বা সাগর সৈকত মার্কেটের মতো বড় শপিং কমপ্লেক্সের জন্য উপযোগী ৫টি আপডেট দিন। JSON ফরম্যাটে দিন।`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING },
              sourceName: { type: Type.STRING }
            },
            required: ["title", "summary"]
          }
        }
      },
    });
    
    const text = response.text;
    if (!text) return [];
    
    const newsData = JSON.parse(text.trim());
    return newsData.map((item: any, index: number) => ({
      ...item,
      id: `m-news-${index}`,
      date: new Date().toLocaleDateString('bn-BD'),
      imageUrl: `https://picsum.photos/seed/market${index}/600/400`,
    }));
  } catch (error) {
    console.error("Fetch News Error:", error);
    return [];
  }
};
