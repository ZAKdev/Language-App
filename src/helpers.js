export const fetchTranslation = (word, sentence, lang) => {
    const params = {
        key: 'trnsl.1.1.20200419T190834Z.360e04c69a2929e6.182dc1380afe4a30c012525731b58151f2c4b8d4',
        word,
        sentence,
        lang
    };
    return fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${params.key}
        &text=${params.word}
        &text=${params.sentence}
        &lang=${params.lang}
    `)
    .then(res => res.json());
}

export const fetchMultipleWords = (words, lang) => {
    const generateWordParams = words.map(word => `&text=${word}`);
    const params = {
        key: 'trnsl.1.1.20200419T190834Z.360e04c69a2929e6.182dc1380afe4a30c012525731b58151f2c4b8d4',
        words: generateWordParams.join(''),
        lang
    }
    return fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${params.key}
        ${params.words}
        &lang=${params.lang}
    `)
    .then(res => res.json());
}

export const fetchLanguages = lang => {
    const params = {
        key: 'trnsl.1.1.20200419T190834Z.360e04c69a2929e6.182dc1380afe4a30c012525731b58151f2c4b8d4',
        ui: lang
    }
    return fetch(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${params.key}
        &ui=${params.ui}
    `)
    .then(res => res.json());
}

export const updateLocalStorage = (items, storageName) =>
    window.localStorage.setItem(storageName, JSON.stringify(items));

export const getLocalStorage = storageName => {
    const storageItem = window.localStorage.getItem(storageName);
    if (storageItem) {
        return JSON.parse(storageItem)
    }
    return false;
}

export const addItemToList = async (data, itemList, setItemList, setError) => {
    const isItemExist = itemList.some(({ word }) => word === data.word);
    if (isItemExist) {
        return setError({
            isError: true,
            message: 'Item is already exist'
        })
    }
    const res = await fetchTranslation(data.word, data.sentence, `en-${getLocalStorage('lang') || 'de'}`);
    const [ word, sentence ] = res.text;
    Object.assign(data, {
        wordTrans: word,
        sentenceTrans: sentence
    });
    await setItemList(state => {
        updateLocalStorage([...state, data], 'items');
        return [...state, data]
    });
}

export const deleteItemFromList = (item, setItemList, setShowList) => {
    setItemList(state => {
        const items = state.filter(({ word }) => word !== item.word);
        updateLocalStorage(items, 'items');
        return items;
    });
    setShowList(state => {
        const items = state.filter(({ word }) => word !== item.word);
        updateLocalStorage(items, 'showItems');
        return items;
    });
}

export const checkHandler = (event, item, setShowList) => {
    if (event.target.checked) {
        setShowList(state => {
            updateLocalStorage([...state, item], 'showItems');
            return [...state, item]
        })
    } else {
        setShowList(state => {
            const items = state.filter(({ word }) => word !== item.word);
            updateLocalStorage(items, 'showItems');
            return items;
        })
    }
}

export const checkItemAlreadyAdd = (itemList, showList) => {
    return itemList.map(item => {
        if (showList.length > 0 && showList.some(showListItem => showListItem.word === item.word)) {
            Object.assign(item, {
                checked: true
            })
        } else {
            Object.assign(item, {
                checked: false
            })
        }
        return item;
    });
}