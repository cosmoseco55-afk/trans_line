export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Ключ OpenAI API не задан на сервере Vercel.' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Быстрая и дешевая модель по умолчанию
                messages: [
                    { role: 'system', content: 'Вы — умный AI-помощник логистической и транспортной компании Trans Line. В компанию входят автобусные перевозки, дальнобойная логистика, таксопарк Стимул, продажа спецтехники, шин и автозапчастей. Отвечайте коротко, профессионально и вежливо на русском языке.' },
                    { role: 'user', content: message }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error?.message || 'Ошибка от сервиса OpenAI' });
        }

        res.status(200).json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: 'Произошла ошибка при обработке вашего запроса.' });
    }
}
