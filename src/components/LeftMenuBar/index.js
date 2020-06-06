import React from 'react';
import classes from './leftMenubar.scss';
import words from './words';
import { useGenerateMultiTrans } from '../../hooks';
import { getLocalStorage } from '../../helpers';

const LeftMenuBar = props => {
    const langFromStorage = getLocalStorage('lang');
    const whWordsList = useGenerateMultiTrans(words.wh, `en-${langFromStorage || 'de'}`);
    const subjectsWordsList = useGenerateMultiTrans(words.subjects, `en-${langFromStorage || 'de'}`);
    const othersWordsList = useGenerateMultiTrans(words.others, `en-${langFromStorage || 'de'}`);
    return (
        <div className={classes.wrapper}>
            <div className={classes.closeBtn} onClick={props.onClose}>
                <i className="fas fa-times"></i>
            </div>
            <h2>WH Words</h2>
            <ul className={classes.list}>
                {whWordsList.map((list, index) => {
                    return (
                        <li key={index}>
                            <div className={classes.large}>{list.translation}</div>
                            <div className={classes.small}>{list.word}</div>
                        </li>
                    );
                })}
            </ul>
            <h2>Subjects</h2>
            <ul className={classes.list}>
                {subjectsWordsList.map((list, index) => {
                    return (
                        <li key={index}>
                            <div className={classes.large}>{list.translation}</div>
                            <div className={classes.small}>{list.word}</div>
                        </li>
                    );
                })}
            </ul>
            <h2>Others</h2>
            <ul className={classes.list}>
                {othersWordsList.map((list, index) => {
                    return (
                        <li key={index}>
                            <div className={classes.large}>{list.translation}</div>
                            <div className={classes.small}>{list.word}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default LeftMenuBar;