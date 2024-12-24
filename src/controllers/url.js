import Url from '../models/Url.js';
import { generateShortCode } from '../utils/generateShortCode.js';


export const createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
            return res.status(400).json({ error: 'Long URL is required' });
        }

        let shortCode;
        let existingUrl;
        let attempts = 0;
        const maxAttempts = 5;

        do {
            shortCode = generateShortCode();
            existingUrl = await Url.findOne({ shortUrl: shortCode });
            attempts++;

            if (attempts === maxAttempts && existingUrl) {
                return res.status(500).json({ 
                    error: 'Could not generate unique short URL after maximum attempts' 
                });
            }
        } while (existingUrl && attempts < maxAttempts);

        const newUrl = await Url.create({
            longURl: longUrl,
            shortUrl: shortCode
        });

        res.status(201).json(newUrl);
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getShortUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl });

        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.redirect(url.longURl);
    } catch (error) {
        console.error("Error retrieving URL:", error);
        res.status(500).json({ error: 'Server error' });
    }
};