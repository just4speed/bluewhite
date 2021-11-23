const initialState = {
    data: null,
    isAuthorized: true
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
                data: action.payload,
                isAuthorized: true
            }
        }
        default: {
            return state;
        }
    }
}