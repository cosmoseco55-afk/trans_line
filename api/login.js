export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    // Simple hardcoded check or check against Vercel Env Vars
    const validUser = process.env.ADMIN_USER || 'admin';
    const validPass = process.env.ADMIN_PASS || '12345';

    if (username === validUser && password === validPass) {
        // Return a dummy static token for simplicity
        return res.status(200).json({ token: 'logged_in_trans_line_user_12345' });
    } else {
        return res.status(401).json({ error: 'Неверный логин или пароль' });
    }
}
