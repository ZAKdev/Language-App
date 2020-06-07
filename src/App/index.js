import React, { useState } from 'react';
import classes from './app.scss';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Popup from '../components/popup';
import AddItemForm from '../components/AddItemForm';
import ListItems from '../components/ListItems';
import LeftMenuBar from '../components/LeftMenuBar';
import SelectLang from '../components/SelectLang';
import {
    getLocalStorage,
    addItemToList,
    deleteItemFromList,
    checkHandler,
    checkItemAlreadyAdd
} from '../helpers';

const App = () => {
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [itemList, setItemList] = useState(getLocalStorage('items') || []);
    const [showList, setShowList] = useState(getLocalStorage('showItems') || []);
    // Menu State
    const [showLeftMenuBar, setShowLeftMenuBar] = useState(false);

    return (
        <div className={classes.wrapper}>
            <Router>
                <div className={classes.topBar}>
                    <ul className={classes.menu}>
                        <li>
                            <a onClick={() => setShowLeftMenuBar(true)}>
                                <i className="fas fa-bars"></i>
                            </a>
                        </li>
                        <li><Link to='/'><i className="fas fa-home"></i></Link></li>
                        <li><Link to='/managelist'><i className="fas fa-tasks"></i></Link></li>
                    </ul>
                    <SelectLang/>
                    <div className={classes.addNew} onClick={() => setIsAddFormVisible(true)}>
                        <span>+</span>
                    </div>
                </div>
                {isAddFormVisible &&
                    <Popup onClose={() => setIsAddFormVisible(false)}>
                        <AddItemForm
                            onSubmitHandler={(data, setError) => {
                                addItemToList(data, itemList, setItemList, setError);
                                setIsAddFormVisible(false);
                            }}
                        />
                    </Popup>
                }
                <Switch>
                    <Route path="/managelist">
                        <ListItems
                            items={checkItemAlreadyAdd(itemList, showList)}
                            checkHandler={(checkbox, item) => checkHandler(checkbox, item, setShowList)}
                            deleteHandler={item => deleteItemFromList(item, setItemList, setShowList)}
                        />
                    </Route>
                    <Route path="/">
                        <ListItems
                            items={showList}
                        />
                    </Route>
                </Switch>
            </Router>
            {showLeftMenuBar &&
                <LeftMenuBar
                    onClose={() => setShowLeftMenuBar(false)}
                />
            }
            <div className={classes.follow}>
                <p>Follow me:</p>
                <a href="https://github.com/ZAKdev" target="_blank"><i className="fab fa-github"></i></a>
                <a href="https://twitter.com/zak_devs" target="_blank"><i className="fab fa-twitter-square"></i></a>
            </div>
        </div>
    );
};

export default App;