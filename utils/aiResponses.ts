import axios from 'axios';

/**
 * Fetches a response from the Groq API based on the provided prompt
 * @param prompt The prompt to send to the Groq API
 * @param model The Groq model to use (defaults to llama3-70b-8192)
 * @returns Promise with the AI response
 */
export const fetchGroqResponse = async (
    prompt: string,
    model: string = 'llama3-70b-8192'
) => {
    try {
        const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY;
        
        if (!apiKey) {
            throw new Error('EXPO_PUBLIC_GROQ_API_KEY is not defined in environment variables');
        }

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: model,
                messages: [{ role: 'user', content: "Answer the following question with just the option valur, no explantion, no option number, do not mention the option number, just the correct option and it should be the text of that option. "+prompt }],
                temperature: 0.7,
                max_tokens: 1024,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching response from Groq:', error);
        throw error;
    }
};