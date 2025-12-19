
import { GoogleGenAI } from "@google/genai";
import { Product, SearchResult } from "./types";

const BEAUTY_PROMPT = `You are a professional Beauty Shopping Assistant for the Netherlands.
Your goal is to find REAL products currently available at 'ICI Paris XL' (iciparisxl.nl).

MANDATORY DATA RULES:
1. Use Google Search to find actual product listings on iciparisxl.nl.
2. PRICE: Extract the real price in Euros (e.g., "€89,50").
3. IMAGE: Find a direct image URL (usually hosted on images.iciparisxl.nl). If not found, use a high-quality beauty photo from Unsplash.
4. PRODUCT_URL: Provide the direct product page link from iciparisxl.nl.
5. DESCRIPTION: Provide a concise, engaging product summary.
6. INGREDIENTS: List 3-5 key ingredients.

Return ONLY a JSON object in this format:
{
  "products": [
    {
      "id": "unique-slug",
      "brand": "string",
      "name": "string",
      "price": "string",
      "category": "string",
      "description": "string",
      "ingredients": ["string"],
      "image": "URL",
      "productUrl": "URL"
    }
  ]
}`;

export async function searchProducts(query: string, gender: string): Promise<SearchResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = 'gemini-3-flash-preview';
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Search for ${gender} beauty products matching: "${query}" specifically at ICI Paris XL Netherlands. ${BEAUTY_PROMPT}`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || '';
    let products: Product[] = [];
    
    const jsonMatch = text.match(/```json?([\s\S]*?)```/) || [null, text];
    const potentialJson = jsonMatch[1] ? jsonMatch[1].trim() : text.trim();
    
    try {
      const parsed = JSON.parse(potentialJson);
      products = parsed.products || [];
    } catch (e) {
      const bracketMatch = potentialJson.match(/\{[\s\S]*\}/);
      if (bracketMatch) {
        try { products = JSON.parse(bracketMatch[0]).products || []; } catch (e2) {}
      }
    }
    
    const processedProducts = products.map((p, idx) => {
      // Robust image fallback strategy
      const isBroken = !p.image || p.image === "PLACEHOLDER" || !p.image.startsWith('http');
      const fallbackUrl = `https://images.unsplash.com/photo-1583209814613-5116e9a5a3ad?q=80&w=800&auto=format&fit=crop`;
      
      return {
        ...p,
        id: p.id || `ici-${idx}-${Date.now()}`,
        matchScore: 0,
        image: isBroken ? fallbackUrl : p.image
      };
    });

    const groundingSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'ICI Paris XL',
      uri: chunk.web?.uri || ''
    })).filter((s: any) => s.uri) || [];

    return {
      query,
      products: processedProducts,
      groundingSources
    };
  } catch (error) {
    console.error("searchProducts Error:", error);
    throw error;
  }
}
