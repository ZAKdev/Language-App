import React from 'react';
import classes from './listItems.scss';

const ListItems = props => {
    return (
        <div className={classes.wrapper}>
            {props.checkHandler &&
                <h3 className={classes.title}>Select vocabs for new tabs</h3>
            }
            <ul>
                {props.items.map((item, index) => {
                    const checked = !!item.checked;
                    return (
                        <li key={index}>
                            {props.checkHandler &&
                                <div className={classes.checkbox}>
                                    <input
                                        type="checkbox"
                                        onClick={event => props.checkHandler(event, item)}
                                        defaultChecked={checked}
                                    />
                                </div>
                            }
                            <div className={classes.content}>
                                {props.deleteHandler &&
                                    <span className={classes.delete} onClick={() => props.deleteHandler(item)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                }
                                <h2>{`${item.wordTrans} | ${item.word}`}</h2>
                                <p className={classes.sentenceTrans}>{item.sentenceTrans}</p>
                                <p>{item.sentence}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {props.items.length === 0 &&
                <div className={classes.message}>Click on plus to add words and sentences</div>
            }
        </div>
    );
};

export default ListItems;