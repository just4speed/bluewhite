import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceStorage = {
    async init(){
        return new Promise(async (resolve, reject) => {
            const extingUserJson = await AsyncStorage.getItem("user");
            const extingUserToken = await AsyncStorage.getItem("token");

            if(extingUserJson === null || extingUserToken === null){
                reject();
            } else {
                const user = JSON.parse(extingUserJson);
                resolve({
                    user,
                    token: extingUserToken
                });
            }
        })
    },
    async login(data, token){
        AsyncStorage.setItem("user", JSON.stringify(data));
        AsyncStorage.setItem("token", token);
    },
    async signout(){
        AsyncStorage.clear();
    },
    async getToken(){
        return new Promise(async (resolve, reject) => {
            const extingUserToken = await AsyncStorage.getItem("token");
        })
    }
}

export default deviceStorage;