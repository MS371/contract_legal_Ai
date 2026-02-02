
import { GoogleGenAI, Type } from "@google/genai";
import { ContractAnalysis, RiskLevel } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are an expert Indian Legal Assistant specialized in helping Small and Medium Enterprises (SMEs). 
Your goal is to analyze business contracts and identify risks, explaining them in simple plain language.
Ensure you check for compliance with Indian laws (e.g., Indian Contract Act, 1872).

For the provided contract text, extract:
1. Contract Type
2. Key Parties
3. Jurisdiction (Governing Law)
4. Key Dates (Effective, Termination)
5. Financial Values mentioned
6. Analysis of every major clause including:
   - Plain language explanation
   - Risk level (Low/Medium/High)
   - Specific suggestions for alternatives if unfavorable
7. A composite risk score (0 to 100, where 100 is extremely risky)
8. Summary of the entire agreement.
9. List of missing crucial terms standard for this contract type in India.

The output MUST be in valid JSON format according to the provided schema.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    contractType: { type: Type.STRING },
    parties: { type: Type.ARRAY, items: { type: Type.STRING } },
    jurisdiction: { type: Type.STRING },
    financialAmount: { type: Type.STRING },
    effectiveDate: { type: Type.STRING },
    terminationDate: { type: Type.STRING },
    compositeRiskScore: { type: Type.NUMBER },
    summary: { type: Type.STRING },
    clauses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          originalText: { type: Type.STRING },
          explanation: { type: Type.STRING },
          riskLevel: { type: Type.STRING, description: "Low, Medium, or High" },
          category: { type: Type.STRING },
          suggestion: { type: Type.STRING },
          isUnfavorable: { type: Type.BOOLEAN }
        },
        required: ["id", "originalText", "explanation", "riskLevel", "category", "isUnfavorable"]
      }
    },
    missingCrucialTerms: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestedRenegotiationPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["contractType", "parties", "jurisdiction", "compositeRiskScore", "summary", "clauses"]
};

export const analyzeContract = async (text: string): Promise<ContractAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze the following contract text: \n\n ${text}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1, // Keep it precise for legal tasks
      }
    });

    const result = JSON.parse(response.text);
    return result as ContractAnalysis;
  } catch (error) {
    console.error("Error analyzing contract:", error);
    throw new Error("Failed to analyze contract. Please ensure you have a valid API key and valid contract text.");
  }
};

export const translateContractToEnglish = async (hindiText: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Translate the following Hindi legal contract text into formal English for analysis, preserving all legal intent: \n\n ${hindiText}`,
    config: {
      systemInstruction: "You are a professional legal translator specializing in Hindi to English translation for Indian contracts."
    }
  });
  return response.text;
};
