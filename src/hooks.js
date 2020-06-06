import { useState, useEffect } from 'react';
import { fetchMultipleWords } from './helpers';

export const useGenerateMultiTrans = (words, lang) => {
    const [wordsList, setWordsList] = useState([]);
    const fetchAndGroup = async () => {
        const res = await fetchMultipleWords(words, lang);
        return res.text.map((translation, index) => {
            return {
                translation,
                word: words[index]
            }
        });
    }
    useEffect(() => {
        fetchAndGroup()
            .then(res => setWordsList(res));
    }, []);
    
    return wordsList;
}