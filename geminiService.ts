
import { GoogleGenAI } from "@google/genai";
import { Product, SearchResult } from "./types";

/**
 * SOURCE DATA CONTEXT
 * This is the literal source of truth derived from the provided JSON.
 * Soleil MUST only recommend these specific products with these specific URLs.
 */
const SOURCE_CATALOG = [
  {
    "brand": "hugo-boss",
    "name": "Ma Vie Eau de Parfum",
    "category": "Geuren",
    "details": "Fris vrouwelijk parfum opgebouwd rond de cactusbloem. Moderne interpretatie van bloemige, groene noten met een delicate roze twist.",
    "price": "€34,99",
    "url": "https://www.iciparisxl.nl/hugo-boss/ma-vie/eau-de-parfum/p/BP_694607",
    "image": "https://media.iciparisxl.nl/medias/prd-front-694593-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8NTkzMjd8aW1hZ2UvanBlZ3xhRGhoTDJnMU5TOHhNVGt5TVRZMk5qZ3pORFEyTWk5d2NtUXRabkp2Ym5RdE1uTmpNek16WHprMU5IZ3hNVGt5TG1wd1p3fDdkYzNlMWEyNWU3M2IxODg4NGRhMTcxMDUwYWMyM2M1NzZlMWMwZDU5ODQwMDNhOWViMTM0ZmMxZDY1ZjQ2ZDE"
  },
  {
    "brand": "dior",
    "name": "Miss Dior Eau de Parfum",
    "category": "Geuren",
    "details": "Bloemig en fris met geurnoten van iris roos, verhelderd door een veelheid aan frisse accenten. Een briesje van optimisme.",
    "price": "€70,60",
    "url": "https://www.iciparisxl.nl/dior/miss-dior/miss-dior-eau-de-parfum/p/BP_1134172",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1134172-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MjI3OTc5fGltYWdlL2pwZWd8YURRNUwyZzJaUzh4TVRReU16QTJNekUzT1RJNU5DOXdjbVF0Wm5KdmJuUXRNVEV6TkRFM01sODVOVFI0TVRFNU1pNXFjR2N8YjM3Yzk2ZmQ0ZjYxNzA3YTc4ODU0M2UzOTM1NGM1OWZiYjZkOWZiMGJjYzAyMjg0NmNkNjdjMzRjYTQ1NjQ1ZQ"
  },
  {
    "brand": "dior",
    "name": "J'adore Eau de Parfum Infinissime",
    "category": "Geuren",
    "details": "Sensueel en krachtig. Een golf van bloemen: centifoliaroos, sambacjasmijn, ylang-ylang en tuberoos met houtige accenten van sandelhout.",
    "price": "€74,04",
    "url": "https://www.iciparisxl.nl/dior/jadore/jadore-eau-de-parfum-infinissime/p/BP_1089988",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1144427-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8Nzg0NzR8aW1hZ2UvanBlZ3xhRGRpTDJnM09TOHhNRGcyTnpjd016VTNPRFkxTkM5d2NtUXRabkp2Ym5RdE1URTBORFF5TjE4NU5UUjRNVEU1TWk1cWNHY3w3ZDFhZjM1N2M5MjkzYThiNTBhZGY4YWYyMGE3MmIxOTliN2JjNDA2MWQ4ODUxNmEyNDhiNmRiMjY5OWQzMWFj"
  },
  {
    "brand": "lancôme",
    "name": "La Vie est Belle Eau de Parfum",
    "category": "Geuren",
    "details": "Een ode aan geluk. Zoete, fruitig, bloemige geur met zeldzame, zuivere en natuurlijke ingrediënten. Navulbaar.",
    "price": "€54,99",
    "url": "https://www.iciparisxl.nl/lancome/la-vie-est-belle/eau-de-parfum-navulbaar-dames-parfum/p/BP_593198",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1190370-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTY3NzUyfGltYWdlL2pwZWd8YUdJMkwyZzFNQzh4TVRFd09EVXdPRGd5TnpZM09DOXdjbVF0Wm5KdmJuUXRNVEU1TURNM01GODVOVFI0TVRFNU1pNXFjR2N8OWExNmQ5OGNlMWI2ZjgxMTAwYTgzNTk5Nzk3MzVkZjU4NTExNTY4MzUxMmJkZjRlNjY4MDU0MDAxODhhYjg4MQ"
  },
  {
    "brand": "hugo-boss",
    "name": "Alive Eau de Parfum",
    "category": "Geuren",
    "details": "Eigentijds en zelfverzekerd. Mix van zachte en gedurfde noten: sprankelende appel, pruim en een hart van jasmijn sambac.",
    "price": "€67,20",
    "url": "https://www.iciparisxl.nl/hugo-boss/alive/hugo-boss-alive-eau-de-parfum/p/BP_1067518",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1067518-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8ODEzMjN8aW1hZ2UvanBlZ3xhRFprTDJobU55OHhNVEUzTmprd05EWTROelkwTmk5d2NtUXRabkp2Ym5RdE1UQTJOelV4T0Y4NU5UUjRNVEU1TWk1cWNHY3xlNDk5ZmI2M2Q2NmY4ZjM0NzY4YjRlODE1YmE3MzVjMzgwMGI0YjdmZTVhN2E4NGMxNmJmZjU2NTAxMmFhYjNl"
  },
  {
    "brand": "armani",
    "name": "My Way Intense Eau de Parfum",
    "category": "Geuren",
    "details": "Intense en authentieke damesgeur met oranjebloesem, sandelhout en verslavende vanille. Bloemig houtachtig karakter.",
    "price": "€81,60",
    "url": "https://www.iciparisxl.nl/armani/my-way-intense/eau-de-parfum-intense-vrouwen/p/BP_1133269",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1133269-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTQ2NDY1fGltYWdlL2pwZWd8YURabUwyaGhOaTh4TURFNU9Ea3dPVGt4TVRBM01DOXdjbVF0Wm5KdmJuUXRNVEV6TXpJMk9WODVOVFI0TVRFNU1pNXFjR2N8NmVkNWJiM2FiN2QwYTkzZTg4NWUwNTg1MjA4YTg3MmE2NDYwNzRjOTFlZmExOTFmYjI4Yjg0MWI5OTIyYWM5MA"
  },
  {
    "brand": "yves-saint-laurent",
    "name": "Black Opium Eau de Parfum",
    "category": "Geuren",
    "details": "Warme en kruidige damesgeur met koffie, witte bloemen en vanille. Voor de rebelse vrouw die verslaafd is aan rock en glamour.",
    "price": "€74,40",
    "url": "https://www.iciparisxl.nl/yves-saint-laurent/black-opium/eau-de-parfum/p/BP_703098",
    "image": "https://media.iciparisxl.nl/medias/prd-side-703098-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8NTI2MTk4fGltYWdlL2pwZWd8YURZMUwyaGhOQzh4TURjMU5EQTVOekExTXpjeU5pOXdjbVF0YzJsa1pTMDNNRE13T1RoZk9UVTBlREV4T1RJdWFuQm58MGJmZmNmOTUzZDFiYzhkOTU5MGJkMWMxNWNhYWQ2MTA1MzZlZjlkZmRkNTZlNDI3YjNmM2E0NjNkYWUxNWFkMg"
  },
  {
    "brand": "lancôme",
    "name": "Idôle Eau de Parfum",
    "category": "Geuren",
    "details": "Frisse, zuivere bloemige geur. Schoon en zacht, krachtig en comfortabel. Bedacht door vrouwen voor vrouwen met ambitie.",
    "price": "€46,99",
    "url": "https://www.iciparisxl.nl/lancome/idole/eau-de-parfum-navulbaar-dames-parfum/p/BP_1036732",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1036732-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTExMzU3fGltYWdlL2pwZWd8YURWakwyZzJPUzh4TVRZME1qVXdPVGMxTkRNNU9DOXdjbVF0Wm5KdmJuUXRNVEF6Tmpjek1sODVOVFI0TVRFNU1pNXFjR2N8NGNhOTkzZTRkMjkyNjNhYTYyNjY1MTA2NWJkOGNlMjc0NGQ0YmE0Yjg1ZDVhZjA2MGM1NWFmZmRmMzQ2ZWZhZA"
  },
  {
    "brand": "gucci",
    "name": "Flora Gorgeous Orchid Eau de Parfum",
    "category": "Geuren",
    "details": "Gourmand bloemig parfum met levendige warmte van vanille en adembenemende contrasten. Omarm je grenzeloze creativiteit.",
    "price": "€64,80",
    "url": "https://www.iciparisxl.nl/gucci/flora-gorgeous-orchid/eau-de-parfum/p/BP_1324812",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1324812-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MjA3MjY5fGltYWdlL2pwZWd8YURnd0wyZ3hOeTh4TVRjM05EWTFPVEUyTmpJek9DOXdjbVF0Wm5KdmJuUXRNVE15TkRneE1sODVOVFI0TVRFNU1pNXFjR2N8ZmE3NmU4NzQ0YzljYTIxMTllZDc0YjQ1MmNmYTAzMTg0ZTBiZjE0OThhZmViOWYwM2IwOTE1ZDkyYzAyNzAxMQ"
  },
  {
    "brand": "marc-jacobs",
    "name": "Daisy Ever So Fresh Eau de Parfum",
    "category": "Geuren",
    "details": "Bruisend, levendig en verkwikkend. Sappige citrusnoten, rozenwater en kasjmierhout zorgen voor een wervelende warmte.",
    "price": "€64,00",
    "url": "https://www.iciparisxl.nl/marc-jacobs/daisy-ever-so-fresh/eau-de-parfum-spray/p/BP_1172751",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1172751-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8Mjc1NTU3fGltYWdlL2pwZWd8YURrMEwyaGlaQzg1Tnpjd09UTTBOVGs1TnpFd0wzQnlaQzFtY205dWRDMHhNVGN5TnpVeFh6azFOSGd4TVRreUxtcHdad3wyNzQwOThjMWM3ZmY1NDZkYTY0Njg0YzQwYTVhYmVhYTNkMzMxMTBkZTgxODc2M2ZlZGYyZDNiNTM4MjVlY2M3"
  },
  {
    "brand": "prada",
    "name": "Paradoxe Eau de Parfum",
    "category": "Geuren",
    "details": "Bloemige damesgeur met akkoorden van amber en muskus. Een viering van nooit hetzelfde zijn, maar altijd jezelf. Navulbaar.",
    "price": "€79,20",
    "url": "https://www.iciparisxl.nl/dior/jadore-lor/parfum-met-bloemennoten/p/BP_1262925",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1176076-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTQ5MDY2fGltYWdlL2pwZWd8YURnMEwyaGhNeTh4TVRFM05qa3hNell3TURVME1pOXdjbVF0Wm5KdmJuUXRNVEUzTmpBM05sODVOVFI0TVRFNU1pNXFjR2N8ZGRhMDJhMzk5ZWE3ZGMwOTExNzcyZTI0YzljNTMyYzdlNDcyNWMzYzM4MjkwYTk2YmVlNGU3ODczNTllYjE4Nw"
  },
  {
    "brand": "armani",
    "name": "My Way Eau de Parfum",
    "category": "Geuren",
    "details": "Bloemige, houtachtige damesgeur. Tijdloos en elegant. Voor de nieuwsgierige vrouw die bereid is haar horizon te verbreden.",
    "price": "€74,40",
    "url": "https://www.iciparisxl.nl/hermes/barenia/eau-de-parfum/p/BP_1325456",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1090394-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTMzNzc5fGltYWdlL2pwZWd8YURJM0wyaGxOaTh4TVRBM09EVXlNamMyTlRNME1pOXdjbVF0Wm5KdmJuUXRNVEE1TURNNU5GODVOVFI0TVRFNU1pNXFjR2N8NzQ2M2JiMzEzMWIwMDI4NDM3NjRlNzVmNmMxMjY4MDMyMzZiOWUzYTg2MDU5NTc0MTNjOGQyY2ZlOTk4MjRkMw"
  },
  {
    "brand": "rabanne",
    "name": "Fame Eau de Parfum",
    "category": "Geuren",
    "details": "Onweerstaanbaar Parijse geest. Sappige mango, zuivere jasmijn en sensuele wierook. Een ode aan een nieuw tijdperk van vrouwelijkheid.",
    "price": "€59,52",
    "url": "https://www.iciparisxl.nl/dior/jadore-parfum-deau/eau-de-parfum-zonder-alcohol/p/BP_1177392",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1173066-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTY4NjI0fGltYWdlL2pwZWd8YURVM0wyZ3haQzh4TVRVeE5EQXlNREV3TWpFM05DOXdjbVF0Wm5KdmJuUXRNVEUzTXpBMk5sODVOVFI0TVRFNU1pNXFjR2N8NzE5YThlYWE3Njg1OWJhOTJmZDIyNmQ5ZGI5YTQ5NjJlNWRmYmJkOTgxNjAzNGM1YzE5NzI1ZGI0NjU3NTY4Ng"
  },
  {
    "brand": "dior",
    "name": "J'adore Parfum d'eau",
    "category": "Geuren",
    "details": "Concentraat van water en bloemen zonder alcohol. Sambacjasmijn, neroli en magnolia in een revolutionaire formule.",
    "price": "€70,60",
    "url": "https://www.iciparisxl.nl/dior/miss-dior-blooming-bouquet/eau-de-toilette/p/BP_1193254",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1177378-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8NzIyOTJ8aW1hZ2UvanBlZ3xhR1F6TDJnMVpTOHhNRGcyTnpjd09EZ3lNVFV6TkM5d2NtUXRabkp2Ym5RdE1URTNOek0zT0Y4NU5UUjRNVEU1TWk1cWNHY3w4OWRhZWM4YTA2ZjdhNTk4YTVjNzJjZjhjY2MxOGE3ODMzNzA2NzYwMmY0NmFkYWQxMjFiNmVlZjk2Njg1NWU3"
  },
  {
    "brand": "mugler",
    "name": "Alien Goddess Eau de Parfum",
    "category": "Geuren",
    "details": "Sprankelende bloemige damesgeur met bergamot, Indische jasmijn en bourbon vanille. Nodigt uit tot positiviteit en mysterie.",
    "price": "€84,80",
    "url": "https://www.iciparisxl.nl/mugler/alien-goddess/eau-de-parfum-navulbaar-parfum/p/BP_1136083",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1136083-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTIwMDczfGltYWdlL2pwZWd8YURrMUwyaGtZUzh4TVRBNE1EYzFNVGczTkRBM09DOXdjbVF0Wm5KdmJuUXRNVEV6TmpBNE0xODVOVFI0TVRFNU1pNXFjR2N8Mzg0ZjYyMTk2NDg0ZWQ1YTJkZjc3YzQxZmU5MzIzZjQ2ZjIwNjBmMWEzMWVjNDE4NDlkOTQ1MzI0ZjE1NjRmZg"
  },
  {
    "brand": "dior",
    "name": "Miss Dior Blooming Bouquet",
    "category": "Geuren",
    "details": "Frisse en tedere geur met noten van roos, pioenroos en witte musks. Contrasterende sillage met de iconische couturestrik.",
    "price": "€62,84",
    "url": "https://www.iciparisxl.nl/gucci/flora/gorgeous-jasmine-eau-de-parfum-natural-spray/p/BP_1174200",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1193261-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTM5NTY5fGltYWdlL2pwZWd8YUdNNEwyaGpOeTh4TVRReU16QTJOekV4TVRRMU5DOXdjbVF0Wm5KdmJuUXRNVEE1TXpJMk1WODVOVFI0TVRFNU1pNXFjR2N8YTU0M2ZkYTUwZmNmYjJhZTgzNzBhMmRiOTE2NjU4Mjc5NDkwYTIxYTBiZDVmMzg0N2FmNjM3ZmNjZDY3YWEwZg"
  }
];

const SOLEIL_PROMPT = `You are "Soleil", an Elite AI Beauty Assistant.
Your core mission is to recommend products from the provided SOURCE CATALOG below.

SOURCE CATALOG:
${JSON.stringify(SOURCE_CATALOG, null, 2)}

STRICT OPERATIONAL DIRECTIVES:
1. DATA INTEGRITY: You MUST use the exact 'brand', 'name', 'price', 'details', 'url', and 'image' from the SOURCE CATALOG for your primary suggestions. 
2. ZERO HALLUCINATION: The 'productUrl' in your response MUST be the exact 'url' provided in the catalog for that product. 
3. IMAGE ACCURACY: The 'image' field in your response MUST be the exact 'image' URL from the catalog.
4. SEARCH FALLBACK: Only use Google Search if the user query cannot be satisfied by the catalog. In that case, find REAL products on iciparisxl.nl and ensure the URL and image are genuine.
5. RESPONSE FORMAT: Always return valid JSON matching the structure below.

Return ONLY a JSON object:
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
      "productUrl": "URL",
      "aiReasoning": "Tailored reason why this matches the user request"
    }
  ]
}`;

export async function searchProducts(query: string, gender: string): Promise<SearchResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = 'gemini-3-flash-preview';
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `User Context: ${gender}. Query: "${query}". Provide the best matches from your source catalog.`,
      config: {
        systemInstruction: SOLEIL_PROMPT,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    const text = response.text || '{}';
    let products: Product[] = [];
    
    try {
      const parsed = JSON.parse(text);
      products = parsed.products || [];
    } catch (e) {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        products = JSON.parse(jsonMatch[0]).products || [];
      }
    }
    
    const processedProducts = products.map((p, idx) => {
      // Final sanity check on image URLs
      const isInvalidImage = !p.image || !p.image.startsWith('http');
      const fallbackUrl = "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop";
      
      return {
        ...p,
        id: p.id || `ici-${idx}-${Date.now()}`,
        matchScore: 100 - (idx * 5),
        image: isInvalidImage ? fallbackUrl : p.image,
        ingredients: p.ingredients && p.ingredients.length > 0 ? p.ingredients : ["Dermatologisch getest", "Premium ingrediënten"]
      };
    });

    const groundingSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'ICI Paris XL Official',
      uri: chunk.web?.uri || ''
    })).filter((s: any) => s.uri) || [];

    return {
      query,
      products: processedProducts,
      groundingSources
    };
  } catch (error) {
    console.error("Soleil Core Search Failure:", error);
    throw error;
  }
}
