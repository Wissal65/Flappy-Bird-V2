// components/Floor.js

import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Images from '@/assets/Images';

const Floor = (props) => {
    const width = props.body.bounds.max.x - props.body.bounds.min.x;
    const height = props.body.bounds.max.y - props.body.bounds.min.y;
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;
    const imageIterations = Math.ceil(width / height);

    return (
        <View style={[styles.container, { left: x, top: y, width: width, height: height }]}>
            {Array.apply(null, Array(imageIterations)).map((el, idx) => {
                return (
                    <Image
                        style={styles.image}
                        key={idx}
                        resizeMode="stretch"
                        source={Images.floor}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        overflow: "hidden",
        flexDirection: "row",
        zIndex: 1, // Adjust the zIndex to ensure the floor is rendered above other components
    },
    image: {
        flex: 1, // Ensure the image fills the entire container
    },
});

export default Floor;
