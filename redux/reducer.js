const initialState = {
    data: null,
    token: "",
    isAuthorized: false
};

export default function(state = initialState, action){
    switch(action.type){
        case "LOG_OUT": {
            return{
                data: null,
                isAuthorized: false
            }
        }
        case "LOGIN": {
            return{
                data: action.payload.user,
                token: action.payload.token,
                isAuthorized: true
            }
        }
        default: {
            return state;
        }
    }
}