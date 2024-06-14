// components/Floor.js

import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Images from '@/assets/Images';

const Pipe = (props) => {
    const width = props.body.bounds.max.x - props.body.bounds.min.x;
    const height = props.body.bounds.max.y - props.body.bounds.min.y;
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;

    const pipeRatio = 138 / width;
const pipeHeight = 104 * pipeRatio;
const pipeIterations = Math.ceil(height / pipeHeight)

    return (
        <View style={[styles.container, { left: x, top: y, width: width, height: height }]}>
            {Array.apply(null, Array(pipeIterations)).map((el, idx) => {
                return (
                    <Image
                        style={[styles.image,{width: height, height: height }]}
                        resizeMode="stretch"
                        source={Images.pipeCore}
                        key={idx} 
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
        flexDirection: "column",
    },
    image: {
    },
});

export default Pipe;













