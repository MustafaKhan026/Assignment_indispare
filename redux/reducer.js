const userState = {
    user: {},
  };
const dataState = {
  data:[]
}
  
 export const authReducer = (state = userState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };

export const dataReducer = (state=dataState,action) =>{
  switch(action.type){
    case "DATA_FETCH":
      return{
        ...state,
        data: action.payload
      }
      default:
      return state;
  
  }
}  