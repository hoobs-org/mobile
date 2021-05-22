import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.text}>Open up app.tsx to start working on your app!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: "#999",
    },
});
