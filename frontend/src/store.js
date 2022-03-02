import { createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userUpdateReducer,

    
    
  } from "./reducers/userReducer";

 




  import {
    postCreateReducer,
    postDeleteReducer,
    postListReducer,
    feedListReducer,
    postUpdateReducer,
  } from "./reducers/postReducer";

  import {
   
    commentListReducer,
  } from "./reducers/commentReducer";


const reducer=combineReducers({

postList: postListReducer,
feedList:feedListReducer,
commentList:commentListReducer,
  
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postUpdate: postUpdateReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate:userUpdateReducer,

   

})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};


const middleware = [thunk];

const store=createStore(
    reducer,
    initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store;