export const loginUser = data => {
    return dispatch => {
      dispatch({type: 'LOGIN_SUCCESS', payload: data});
      console.log("Stored Data: ",data)
    };
  };
export const fetchData = data =>{
  return dispatch =>{
    dispatch({type:"DATA_FETCH",payload:data})
    console.log("data Fetched",data)
  }
}
  