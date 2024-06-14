import Matter from "matter-js";
import { Dimensions } from 'react-native';

const MAX_WIDTH = Dimensions.get("screen").width;
const MAX_HEIGHT = Dimensions.get("screen").height;

export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine;
    let world = entities.physics.world;
    let bird = entities.bird.body;

    let hadTouches = false;
    touches.filter(t => t.type === "press").forEach(t => {
        if (!hadTouches){
            if (world.gravity.y === 0.0){
                world.gravity.y = 1.2;
            }

            hadTouches = true;
            Matter.Body.setVelocity( bird, {
                x: bird.velocity.x,
                y: -10
            });
        }

    });

    Matter.Engine.update(engine, time.delta);

    Object.keys(entities).forEach(key => {
        if (key.indexOf("floor") === 0){
            if (entities[key].body.position.x <= -1 * MAX_WIDTH / 2){
                Matter.Body.setPosition(entities[key].body, { x: MAX_WIDTH + (MAX_WIDTH / 2), y: entities[key].body.position.y });
            } else {
                Matter.Body.translate(entities[key].body, { x: -2, y: 0 });
            }
        }
    });

    return entities;
};

export default Physics;
