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
                console.log(user)
                resolve(user, extingUserToken);
            }
        })
    },
    async login(data, token){
        AsyncStorage.setItem("user", JSON.stringify(data));
        AsyncStorage.setItem("token", token);
    },
    async signout(){
        AsyncStorage.clear();
    }
}

export default deviceStorage;