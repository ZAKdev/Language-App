import React, { useState, useRef } from 'react';
import classes from './addItemForm.scss';
import { useHistory } from "react-router-dom";

const validateForm = (inputRef, textareaRef) => {
    if (inputRef.value === '' && textareaRef.value === '') {
        return false;
    }
    return {
        word: inputRef.value,
        sentence: textareaRef.value
    }
}

const AddItemForm = props => {
    const inputRef = useRef(null);
    const textareaRef = useRef(null);
    const [error, setError] = useState({
        isError: false,
        message: ''
    });
    let history = useHistory();
    return (
        <div className={classes.wrapper}>
            {error.isError &&
                <div className={classes.error}>{error.message}</div>
            }
            <div className={classes.group}>
                <label>Enter the word you want to learn</label>
                <input type="text" ref={inputRef}/>
            </div>
            <div className={classes.group}>
                <label>Make a sentences</label>
                <textarea ref={textareaRef}></textarea>
            </div>
            <div className={classes.group}>
                <button type="submit" onClick={() => {
                    const data = validateForm(inputRef.current, textareaRef.current);
                    if (data) {
                        props.onSubmitHandler(data, setError)
                        history.push('/managelist');
                    } else {
                        setError({
                            isError: true,
                            message: '* All Fields Required'
                        });
                    }
                }}>Add</button>
            </div>
        </div>
    )
};

export default AddItemForm;