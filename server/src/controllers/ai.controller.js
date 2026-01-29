
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

        let systemInstruction = "";
        if (type === 'project_description') {
            systemInstruction = "You are an expert resume writer. The user will provide a brief description of a project. generate 3 distinct, professional, and impactful bullet points (or short paragraphs) describing this project for a resume. Focus on achievements, technologies used, and metrics if possible. Return the response as a JSON array of strings, e.g. [\"Designed and implemented...\", \"Optimized database queries...\"]. Do not include markdown formatting like ```json.";
        } else {
            systemInstruction = "You are a helpful AI assistant.";
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemInstruction}\n\nUser Input: ${prompt}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API Error:', data);
            return res.status(response.status).json({ message: 'Failed to generate content from AI provider', error: data });
        }

        // Parse Gemini Response
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            return res.status(500).json({ message: 'No content generated' });
        }

        // Attempt to parse JSON if we asked for it
        let result = generatedText;
        try {
            // Clean up markdown code blocks if present
            const cleanedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
            result = JSON.parse(cleanedText);
        } catch (e) {
            // Fallback to splitting by newlines or just returning raw text
            console.log("Failed to parse JSON, returning raw text or split lines");
            result = generatedText.split('\n').filter(line => line.trim().length > 0);
        }

        res.status(200).json({ result });

    } catch (error) {
        console.error('AI Controller Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
