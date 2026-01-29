const generateContent = async (prompt, type) => {
    try {
        console.log('Generating AI content for prompt:', prompt);

        const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, type })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Error:', errorData);
            throw new Error(errorData.message || `AI Request failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('AI Response:', data);
        return data;
    } catch (error) {
        console.error('AI Service Error:', error);
        throw error;
    }
};

export default {
    generateContent
};
