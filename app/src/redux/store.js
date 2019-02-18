import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';
const Database = require("../database")();
//
// Initial State...
//

const initialState = {
    getBookmarkList:[],
};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case "getBookmarksData":
            return { ...state, getBookmarkList: action.value };

        default: 
            return state;
    }
};

//
// Store...
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

//
// Action Creators...
//


const getBookmarksData = (data) => {
    return {
        type: "getBookmarksData",
        value: data
    };
}

const getFireBaseData = () => {
    return function(dispatch) {
        Database.getAllBookmarks()
        .then(bookmarks => {
            dispatch(getBookmarksData(bookmarks));
        })
        .catch(e => console.log(e));
    };
}


const insertBookmark = (bookmark) => {
    return function(dispatch) {
        Database.insertBookmark(bookmark);
    };
}

const deleteBookmark = (bookmark) => {
    return function(dispatch) {
        Database.deleteBookmark(bookmark);
    };
}


export { getBookmarksData, getFireBaseData,insertBookmark,deleteBookmark};