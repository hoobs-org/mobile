import AsyncStorage from "@react-native-async-storage/async-storage";

export default class {
    static async clear() {
        await AsyncStorage.clear();
    }

    static async getAllKeys() {
        return await AsyncStorage.getAllKeys();
    }

    static async getItem(key) {
        const value = AsyncStorage.getItem(key)

        try {
            return JSON.parse(value);
        } catch (_error) {
            return value;
        }
    }

    static async removeItem(key) {
        await AsyncStorage.removeItem(key);
    }

    static async setItem(key, value) {
        if (typeof value === "string") {
            await AsyncStorage.setItem(key, value);
        } else {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        }
    }
}
