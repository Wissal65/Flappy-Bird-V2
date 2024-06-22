import Matter from "matter-js";
import { Dimensions } from 'react-native';
import Pipe from '@/components/Pipe';
import PipeTop from '@/components/PipeTop';
import PipeBottom from '@/components/PipeBottom';
import Bonus from '@/components/Bonus';
// import Const from '@/assets/Constants';
import Images from '@/assets/Images';
import { Image } from 'react-native';

const MAX_WIDTH = Dimensions.get("window").width;
const MAX_HEIGHT = Dimensions.get("window").height;
const PIPE_WIDTH= 100;
const BONUS_HEIGHT= 41;
const GAP_SIZE= 330;

let pipes = 0;

export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export const resetPipes = () => {
    pipes = 0;
}

export const generatePipes = () => {
    let topPipeHeight = randomBetween(100, (MAX_HEIGHT / 2) - 100);
    let bottomPipeHeight = MAX_HEIGHT - topPipeHeight - GAP_SIZE;

    let sizes = [topPipeHeight, bottomPipeHeight]

    if (Math.random() < 0.5) {
        sizes = sizes.reverse();
    }

    return sizes;
}

//  export const addPipesAtLocation = (x, world, entities) => {
//     let [pipe1Height, pipe2Height] = generatePipes();

//     let pipeTopWidth = PIPE_WIDTH + 20;
//     let pipeTopHeight = (pipeTopWidth / 205) * 95;

//     pipe1Height = pipe1Height - pipeTopHeight;

//     let pipe1Top = Matter.Bodies.rectangle(
//         x,
//         pipe1Height + (pipeTopHeight / 2),
//         pipeTopWidth,
//         pipeTopHeight,
//         { isStatic: true}
//     );

//     let pipe1 = Matter.Bodies.rectangle(
//         x,
//         pipe1Height / 2,
//         PIPE_WIDTH,
//         pipe1Height,
//         { isStatic: true}
//     );

//     pipe2Height = pipe2Height - pipeTopHeight;

//     let pipe2Top = Matter.Bodies.rectangle(
//         x,
//         MAX_HEIGHT - 50 - pipe2Height - (pipeTopHeight / 2),
//         pipeTopWidth,
//         pipeTopHeight,
//         { isStatic: true}
//     );

//     let pipe2 = Matter.Bodies.rectangle(
//         x,
//         MAX_HEIGHT - 50 - (pipe2Height / 2),
//         PIPE_WIDTH,
//         pipe2Height,
//         { isStatic: true}
//     );
//       // Add bonus in between pipes if after the first screen
//   if (pipes > 0) {
//     let bonusX = x;
//     let bonusY = (MAX_HEIGHT - GAP_SIZE) / 2;

//     let bonus = Matter.Bodies.rectangle(bonusX, bonusY, 50, BONUS_HEIGHT, { isStatic: true, label: 'bonus' });
//     let bonusType = Math.floor(Math.random() * Images.bonuses.length); // Randomly select a bonus type

//     Matter.World.add(world, [pipe1, pipe1Top, pipe2, pipe2Top,bonus]);

//     entities["pipe" + (pipes + 1)] = {
//         body: pipe1, renderer: Pipe, scored: false
//     }

//     entities["pipe" + (pipes + 2)] = {
//         body: pipe2, renderer: Pipe, scored: false
//     }

//     entities["pipe" + (pipes + 1) + "Top"] = {
//         body: pipe1Top, renderer: PipeTop, scored: false
//     }

//     entities["pipe" + (pipes + 2) + "Top"] = {
//         body: pipe2Top, renderer: PipeTop, scored: false
//     }
//     entities['bonus' + pipes] = { body: bonus, renderer: Bonus, scored: false, type: bonusType }; // Pass type to bonus

// } else {
//     Matter.World.add(world, [pipe1, pipe1Top, pipe2, pipe2Top]);

//     entities['pipe' + (pipes + 1)] = { body: pipe1, renderer: Pipe, scored: false };
//     entities['pipe' + (pipes + 2)] = { body: pipe2, renderer: Pipe, scored: false };
//     entities['pipe' + (pipes + 1) + 'Top'] = { body: pipe1Top, renderer: PipeTop, scored: false };
//     entities['pipe' + (pipes + 2) + 'Top'] = { body: pipe2Top, renderer: PipeTop, scored: false };
//   }


//     pipes += 2;
// }

// export const addPipesAtLocation = (x, world, entities) => {
//     let [pipe1Height, pipe2Height] = generatePipes();

//     let pipeTopWidth = PIPE_WIDTH + 20;
//     let pipeTopHeight = (pipeTopWidth / 205) * 95;

//     pipe1Height = pipe1Height - pipeTopHeight;

//     let pipe1Top = Matter.Bodies.rectangle(
//         x,
//         pipe1Height + (pipeTopHeight / 2),
//         pipeTopWidth,
//         pipeTopHeight,
//         { isStatic: true }
//     );

//     let pipe1 = Matter.Bodies.rectangle(
//         x,
//         pipe1Height / 2,
//         PIPE_WIDTH,
//         pipe1Height,
//         { isStatic: true }
//     );

//     pipe2Height = pipe2Height - pipeTopHeight;

//     let pipe2Top = Matter.Bodies.rectangle(
//         x,
//         MAX_HEIGHT - 50 - pipe2Height - (pipeTopHeight / 2),
//         pipeTopWidth,
//         pipeTopHeight,
//         { isStatic: true }
//     );

//     let pipe2 = Matter.Bodies.rectangle(
//         x,
//         MAX_HEIGHT - 50 - (pipe2Height / 2),
//         PIPE_WIDTH,
//         pipe2Height,
//         { isStatic: true }
//     );

//     // Add bonus in between pipes if after the first screen
//     if (pipes > 0) {
//         let bonusX = x;
//         let bonusY = pipe1Height + (GAP_SIZE / 2); // Correctly position bonus between pipes

//         let bonus = Matter.Bodies.rectangle(bonusX, bonusY, 50, BONUS_HEIGHT, { isStatic: true, label: 'bonus' });
//         let bonusType = Math.floor(Math.random() * Images.bonuses.length); // Randomly select a bonus type


//         Matter.World.add(world, [pipe1, pipe1Top, pipe2, pipe2Top, bonus]);

//         entities["pipe" + (pipes + 1)] = { body: pipe1, renderer: Pipe, scored: false };
//         entities["pipe" + (pipes + 2)] = { body: pipe2, renderer: Pipe, scored: false };
//         entities["pipe" + (pipes + 1) + "Top"] = { body: pipe1Top, renderer: PipeTop, scored: false };
//         entities["pipe" + (pipes + 2) + "Top"] = { body: pipe2Top, renderer: PipeTop, scored: false };
//         entities['bonus' + pipes] = { body: bonus, renderer: Bonus, scored: false, type: bonusType }; // Add bonus to entities
//     } else {
//         Matter.World.add(world, [pipe1, pipe1Top, pipe2, pipe2Top]);

//         entities['pipe' + (pipes + 1)] = { body: pipe1, renderer: Pipe, scored: false };
//         entities['pipe' + (pipes + 2)] = { body: pipe2, renderer: Pipe, scored: false };
//         entities['pipe' + (pipes + 1) + 'Top'] = { body: pipe1Top, renderer: PipeTop, scored: false };
//         entities['pipe' + (pipes + 2) + 'Top'] = { body: pipe2Top, renderer: PipeTop, scored: false };
//     }

//     pipes += 2;
// }
export const addPipesAtLocation = (x, world, entities) => {
    let [pipe1Height, pipe2Height] = generatePipes();

    let pipeTopWidth = PIPE_WIDTH + 20;
    let pipeTopHeight = (pipeTopWidth / 205) * 95;

    pipe1Height = pipe1Height - pipeTopHeight;

    let pipe1Top = Matter.Bodies.rectangle(
        x,
        pipe1Height + (pipeTopHeight / 2),
        pipeTopWidth,
        pipeTopHeight,
        { isStatic: true, label: 'pipe' }
    );

    let pipe1 = Matter.Bodies.rectangle(
        x,
        pipe1Height / 2,
        PIPE_WIDTH,
        pipe1Height,
        { isStatic: true, label: 'pipe' }
    );

    pipe2Height = pipe2Height - pipeTopHeight;

    let pipe2Top = Matter.Bodies.rectangle(
        x,
        MAX_HEIGHT - 50 - pipe2Height - (pipeTopHeight / 2),
        pipeTopWidth,
        pipeTopHeight,
        { isStatic: true, label: 'pipe' }
    );

    let pipe2 = Matter.Bodies.rectangle(
        x,
        MAX_HEIGHT - 50 - (pipe2Height / 2),
        PIPE_WIDTH,
        pipe2Height,
        { isStatic: true, label: 'pipe' }
    );

    if (pipes > 0) {
        let bonusX = x;
        let bonusY = pipe1Height + (GAP_SIZE / 2);

        let bonus = Matter.Bodies.rectangle(bonusX, bonusY, 50, BONUS_HEIGHT, { isStatic: true, label: 'bonus' });
        let bonusType = Math.floor(Math.random() * Images.bonuses.length);

        Matter.World.add(world, [pipe1, pipe1Top, pipe2, pipe2Top, bonus]);

        entities["pipe" + (pipes + 1)] = { body: pipe1, renderer: Pipe, scored: false };
        entities["pipe" + (pipes + 2)] = { body: pipe2, renderer: Pipe, scored: false };
        entities["pipe" + (pipes + 1) + "Top"] = { body: pipe1Top, renderer: PipeTop, scored: false };
        entities["pipe" + (pipes + 2) + "Top"] = { body: pipe2Top, renderer: PipeTop, scored: false };
        entities['bonus' + pipes] = { body: bonus, renderer: Bonus, scored: false, type: bonusType };
    } else {
        Matter.World.add(world, [pipe1, pipe1Top, pipe2, pipe2Top]);

        entities['pipe' + (pipes + 1)] = { body: pipe1, renderer: Pipe, scored: false };
        entities['pipe' + (pipes + 2)] = { body: pipe2, renderer: Pipe, scored: false };
        entities['pipe' + (pipes + 1) + 'Top'] = { body: pipe1Top, renderer: PipeTop, scored: false };
        entities['pipe' + (pipes + 2) + 'Top'] = { body: pipe2Top, renderer: PipeTop, scored: false };
    }

    pipes += 2;
};



const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine;
    let world = entities.physics.world;
    let bird = entities.bird.body;

    let hadTouches = false;
    touches.filter(t => t.type === "press").forEach(t => {
        if (!hadTouches){
            if (world.gravity.y === 0.0){
                world.gravity.y = 1.2;
                addPipesAtLocation((MAX_WIDTH * 1) - (PIPE_WIDTH / 2), world, entities);
                addPipesAtLocation((MAX_WIDTH * 2) - (PIPE_WIDTH / 2), world, entities);
                dispatch({ type: "start-timer" }); // Dispatch the start-timer action
            }

            hadTouches = true;
            Matter.Body.setVelocity( bird, {
                x: bird.velocity.x,
                y: -8
            });
        }

    });

    Matter.Engine.update(engine, time.delta);

    Object.keys(entities).forEach(key => {
        if (key.indexOf("pipe") === 0 && entities.hasOwnProperty(key)){
            Matter.Body.translate(entities[key].body, {x: -2, y: 0});

            if (key.indexOf("Top") !== -1 && parseInt(key.replace("pipe", "")) % 2 === 0){
                if (entities[key].body.position.x <= bird.position.x && !entities[key].scored){
                    entities[key].scored = true;
                    dispatch({ type: "score" });
                }

                if (entities[key].body.position.x <= -1 * (PIPE_WIDTH / 2)){
                    let pipeIndex = parseInt(key.replace("pipe", ""));
                    delete(entities["pipe" + (pipeIndex - 1) + "Top"]);
                    delete(entities["pipe" + (pipeIndex - 1)]);
                    delete(entities["pipe" + pipeIndex + "Top"]);
                    delete(entities["pipe" + pipeIndex]);

                    addPipesAtLocation((MAX_WIDTH * 2) - (PIPE_WIDTH / 2), world, entities);
                }
            }

        } else if (key.indexOf("floor") === 0){
            if (entities[key].body.position.x <= -1 * MAX_WIDTH / 2){
                Matter.Body.setPosition(entities[key].body, { x: MAX_WIDTH + (MAX_WIDTH / 2), y: entities[key].body.position.y });
            } else {
                Matter.Body.translate(entities[key].body, { x: -2, y: 0 });
            }
        } else if (key.indexOf('bonus') === 0) {
            const collisionResult = Matter.Collision.collides(bird, entities[key].body);
            if (collisionResult !== null && collisionResult.collided) {
                delete entities[key];
                dispatch({ type: 'bonus', score: 10 });
            } else {
                Matter.Body.translate(entities[key].body, { x: -2, y: 0 });
            }
          }
    });

    return entities;
};

export default Physics;
