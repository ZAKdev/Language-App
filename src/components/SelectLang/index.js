import React, { useState, useEffect } from 'react';
import classes from './selectLang.scss';
import {
    fetchLanguages,
    updateLocalStorage,
    getLocalStorage
} from '../../helpers';

const SelectLang = () => {
    const [showLang, setShowLang] = useState(false);
    const [langList, setLangList] = useState({});
    const [selectedLang, setSelectedLang] = useState(getLocalStorage('lang') || 'de');
    useEffect(() => {
        fetchLanguages('en')
            .then(res => setLangList(res.langs));
    }, []);

    return (
        <div className={classes.wrapper}>
            <div className={classes.selectedLang}
                onClick={() => setShowLang(state => !state)}
            >
                <i className="fas fa-language"></i>
                <div className={classes.selectedLangName}>{selectedLang.toUpperCase()}</div>
                <i className="fas fa-chevron-down"></i>
            </div>
            {showLang &&
                <ul className={classes.langList}>
                    {Object.keys(langList).map(item => (
                        <li key={item} onClick={() => {
                            setSelectedLang(item);
                            setShowLang(false);
                            updateLocalStorage(item, 'lang');
                        }}>
                            {`${item.toUpperCase()} - ${langList[item]}`}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default SelectLang;