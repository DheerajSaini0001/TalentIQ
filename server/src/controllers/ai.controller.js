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
        if (type === 'project_description') {
            systemPrompt = `You are an expert resume writer. Generate exactly 3 professional, impactful bullet points for this project.

Rules:
- Focus on achievements and measurable results
- Highlight technologies and skills used
- Use action verbs (Developed, Implemented, Designed, Built, Optimized)
- Keep each point concise (1-2 lines max)
- Return ONLY a JSON array of 3 strings
- No markdown, no explanations, just the JSON array

Example format: ["Built a full-stack e-commerce platform using MERN stack with 10,000+ monthly users", "Implemented secure payment gateway integration with Stripe and PayPal", "Optimized database queries reducing load time by 40%"]

Project: ${prompt}`;
        } else {
            systemPrompt = prompt;
        }

        // Using Gemini API directly (same approach as your Shayari app)
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
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

            // Fallback responses if API fails
            const fallbacks = [
                [
                    "Developed a full-stack web application using modern technologies and best practices",
                    "Implemented responsive UI/UX design ensuring seamless user experience across devices",
                    "Integrated secure authentication and data management features"
                ],
                [
                    "Built and deployed a scalable application with robust backend architecture",
                    "Designed intuitive user interface with focus on accessibility and performance",
                    "Optimized application performance and implemented security best practices"
                ],
                [
                    "Created a comprehensive solution addressing key user requirements and business goals",
                    "Utilized industry-standard frameworks and tools for efficient development",
                    "Delivered a production-ready application with thorough testing and documentation"
                ]
            ];

            const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
            console.log("Using fallback response");

            return res.status(200).json({ result: randomFallback });
        }

        // Extract generated text from Gemini response
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            return res.status(500).json({ message: 'No content generated' });
        }

        console.log("Generated text:", generatedText);

        // Parse the response
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
            result = [
                "Developed a comprehensive solution using modern technologies",
                "Implemented key features with focus on user experience and performance",
                "Delivered a production-ready application with best practices"
            ];
        }

        res.status(200).json({ result });

    } catch (error) {
        console.error('AI Controller Error:', error);

        // Final fallback
        const fallback = [
            "Developed and deployed a full-stack application using industry-standard technologies",
            "Implemented responsive design and intuitive user interface for optimal user experience",
            "Integrated essential features including authentication, data management, and security"
        ];

        res.status(200).json({ result: fallback });
    }
};
