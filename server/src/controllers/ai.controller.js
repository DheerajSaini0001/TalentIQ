import { GEMINI_API_KEY } from '../config/env.js';

export const generateContent = async (req, res) => {
    try {
        const { prompt, type } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }

        if (!GEMINI_API_KEY) {
            return res.status(500).json({ message: 'Gemini API key not configured' });
        }

        let systemPrompt = "";
        let isArrayResponse = false;

        if (type === 'project_description') {
            isArrayResponse = true;
            systemPrompt = `You are an expert ATS-friendly resume writer. Your task is to generate EXACTLY 3 powerful, achievement-oriented bullet points for a project description based on the provided text.

CRITICAL RULES:
- Focus heavily on quantifiable achievements, metrics, and measurable outcomes.
- Highlight specific technologies, frameworks, and methodologies used.
- Begin each bullet with a strong action verb (e.g., Engineered, Architected, Spearheaded).
- Ensure each bullet is professional, targeted, and concise (1-2 lines maximum).
- Return ONLY a valid JSON array containing exactly 3 string elements.
- Do NOT include any markdown formatting, conversational text, or explanations. Just the raw JSON array.

Example Output format:
["Engineered a scalable e-commerce backend utilizing Node.js and MongoDB, resulting in a 40% reduction in API response times and supporting 10k+ concurrent users.", "Architected a responsive frontend with React and TailwindCSS, improving mobile user retention by 25%.", "Integrated secure Stripe payment gateways and OAuth2 authentication, achieving a 99.9% successful transaction rate."]

User's Project Details: ${prompt}`;
        } else if (type === 'summary') {
            isArrayResponse = false;
            systemPrompt = `You are an expert executive resume writer. Your task is to write a compelling, professional resume summary based on the provided details.

CRITICAL RULES:
- Write a 3-4 sentence paragraph that highlights the candidate's core strengths, years of experience, and key accomplishments.
- Keep the tone highly professional, confident, and action-oriented.
- Avoid generic buzzwords; use industry-specific terminology.
- Return ONLY the paragraph text itself. Do not include quotes, markdown formatting, prefixes, or any conversational text.

User's Details: ${prompt}`;
        } else {
            systemPrompt = prompt;
        }

        // Using Gemini API directly (same approach as your Shayari app)
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: systemPrompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API Error:', data);
            return res.status(response.status).json({ 
                message: data?.error?.message || 'Failed to generate content from AI. Please check your API key.',
                details: data
            });
        }

        // Extract generated text from Gemini response
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            return res.status(500).json({ message: 'No content generated' });
        }

        console.log("Generated text:", generatedText);

        // Handle summary type (return as string)
        if (type === 'summary') {
            const cleanedSummary = generatedText
                .replace(/```/g, '')
                .replace(/^["']|["']$/g, '')
                .trim();

            return res.status(200).json({ content: cleanedSummary });
        }

        // Handle project description type (return as array)
        let result = [];
        try {
            // Try to parse as JSON first
            const cleanedText = generatedText
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            result = JSON.parse(cleanedText);
        } catch (e) {
            // Fallback: split by newlines and clean up
            console.log("Failed to parse JSON, splitting by lines");
            result = generatedText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 10)
                .map(line => line.replace(/^[-•*\d.)\]]+\s*/, ''))
                .filter(line => line.length > 0)
                .slice(0, 3);
        }

        // Ensure we have exactly 3 items
        if (!Array.isArray(result) || result.length === 0) {
            return res.status(500).json({ message: 'AI failed to generate a valid response array. Please try again.' });
        }

        res.status(200).json({ result });

    } catch (error) {
        console.error('AI Controller Error:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error during AI generation' });
    }
};
