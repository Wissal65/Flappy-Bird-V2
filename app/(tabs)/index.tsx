import React, { useState, useRef, useCallback,useEffect } from 'react'; 
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'; 
import Matter from "matter-js"; 
import { GameEngine } from "react-native-game-engine";  
import Images from '@/assets/Images'; 
import Const from '@/assets/Constants'; 
import Floor from '@/components/Floor';
import Bird from '@/components/Bird';
import Physics, { resetPipes }  from '@/Physics';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Game = () => {
    const [running, setRunning] = useState(true); // Declare state variable running, initialize to true, and create setter function setRunning
    const [score, setScore] = useState(0); // Declare state variable score, initialize to 0, and create setter function setScore
    const gameEngine = useRef<GameEngine & { dispatch: (e: any) => void }>(null); // Create a ref for the game engine with explicit type
    const [timeLeft, setTimeLeft] = useState(50);
    const [timerStarted, setTimerStarted] = useState(false); // Track if the timer has started
    const timerInterval = useRef<NodeJS.Timeout | null>(null); // Reference to the timer interval

     // Function to save score in AsyncStorage
     const saveScore = async (newScore: number) => {
        try {
            await AsyncStorage.setItem('score', newScore.toString());
        } catch (e) {
            console.error('Failed to save the score.');
        }
    };

    const clearTimerInterval = () => {
        if (timerInterval.current) {
            clearInterval(timerInterval.current);
            timerInterval.current = null;
            console.log("Timer interval cleared");
        }
    };

    useEffect(() => {
        if (timerStarted) { // Start the timer only if it has started
            timerInterval.current = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            console.log("Timer interval started");
        }else {
            clearTimerInterval(); // Stop the timer if it's not started
        }

        return () => {
            clearTimerInterval();
        };
    }, [timerStarted]);

    useEffect(() => {
        if (timeLeft === 0) {
            setRunning(false);
            saveScore(score); // Save score when the game is over
            clearTimerInterval(); // Clear the interval on game over
        }
    }, [timeLeft]);


    const setupWorld = useCallback(() => { // Define function setupWorld
        let engine = Matter.Engine.create({ enableSleeping: false }); // Create Matter engine
        let world = engine.world; // Get Matter world from engine
        world.gravity.y = 0.0; // Set gravity to 0
        
        let bird = Matter.Bodies.rectangle( Const.MAX_WIDTH / 2, Const.MAX_HEIGHT / 2, Const.BIRD_WIDTH, Const.BIRD_HEIGHT,{
            // inertia: Infinity, // Prevent rotation
            // // frictionAir: 0,    // Disable air friction
            // isStatic: false,   // Ensure it's not a static body      // Add label for identification
          });

        let floor1 = Matter.Bodies.rectangle( // Create floor body 1
            Const.MAX_WIDTH / 2,
            Const.MAX_HEIGHT - 25,
            Const.MAX_WIDTH + 4,
            50,
            { isStatic: true ,label: 'ground'}
        );

        let floor2 = Matter.Bodies.rectangle( // Create floor body 2
            Const.MAX_WIDTH + (Const.MAX_WIDTH / 2),
            Const.MAX_HEIGHT - 25,
            Const.MAX_WIDTH + 4,
            50,
            { isStatic: true,label: 'ground' }
        );

        Matter.World.add(world, [bird, floor1, floor2]); // Add bodies to the Matter world
        
        Matter.Events.on(engine, 'collisionStart', (event) => {
            if (gameEngine.current) {
                var pairs = event.pairs;
                pairs.forEach((pair) => {
                    const { bodyA, bodyB } = pair;
                    const bodies = [bodyA, bodyB];
        
                    const isBird = bodies.some(body => body === bird);
                    const isPipeOrGround = bodies.some(body => body.label === 'pipe' || body.label === 'ground');
                    const isBonus = bodies.some(body => body.label === 'bonus');
        
                    if (isBird && isPipeOrGround) {
                        gameEngine.current?.dispatch({ type: "game-over" });
                    }
                });
            }
        });
        

        return { // Return entities object
            physics: { engine: engine, world: world }, // Physics engine and world
            floor1: { body: floor1, renderer: Floor }, // Floor body 1
            floor2: { body: floor2, renderer: Floor }, // Floor body 2
            bird: { body: bird, renderer: Bird},
        };
    }, [gameEngine]); // Dependency array includes gameEngine

    const entities = useRef(setupWorld());

    const onEvent = useCallback((e: { type: string; score?: number; }) => {
        if (e.type === "game-over") {
            setRunning(false);
            clearTimerInterval(); // Clear the interval on game over
            saveScore(score);
        } else if (e.type === "score") {
            setScore(prevScore => prevScore + 1);
        } else if (e.type === 'bonus' && e.score !== undefined) {
            setScore(prevScore => prevScore + e.score!); // Add ! to assert that e.score is not undefined
        }else if (e.type === 'start-timer') { // Handle the start-timer action
            setTimerStarted(true);
        }
    }, [score]);
    
    

    const reset = useCallback(() => { // Define function reset
        resetPipes();
        entities.current = setupWorld(); // Reset entities with setupWorld
        setRunning(true); // Set running to true
        setScore(0); // Reset score to 0 when the game is restarted
        setTimeLeft(50);
        setTimerStarted(true); // Reset the timer state
        // Clear any existing timer interval
        clearTimerInterval();
        return () => {
            clearTimerInterval(); // Cleanup on unmount (not strictly necessary)
        };
    }, [setupWorld]); // Dependency array includes setupWorld

    return ( // Return JSX
        <View style={styles.container}>
            <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
            <GameEngine
                ref={gameEngine}
                style={styles.gameContainer}
                systems={[Physics]}
                running={running}
                onEvent={onEvent}
                entities={entities.current}>
                <StatusBar hidden={true} />
            </GameEngine>
            <Text style={styles.score}>{score}</Text>
            <Text >{timeLeft}</Text>
            {!running && (
                <TouchableOpacity style={styles.fullScreenButton} onPress={reset }>
                    <View style={styles.fullScreen}>
                        <Text style={styles.gameOverText}>Game Over</Text>
                        <Text style={styles.gameOverSubText}>Try Again</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({ // Define styles using StyleSheet
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject, // Apply absolute fill to image
        width: Const.MAX_WIDTH,
        height: Const.MAX_HEIGHT
    },
    gameContainer: {
        ...StyleSheet.absoluteFillObject, // Apply absolute fill to game container
    },
    gameOverText: {
        color: 'white',
        fontSize: 48,
        fontFamily: '04b_19'
    },
    gameOverSubText: {
        color: 'white',
        fontSize: 24,
        fontFamily: '04b_19'
    },
    fullScreen: {
        ...StyleSheet.absoluteFillObject, // Apply absolute fill to full screen
        backgroundColor: 'black',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    score: {
        position: 'absolute',
        color: 'white',
        fontSize: 72,
        top: 50,
        left: Const.MAX_WIDTH / 2 - 20,
        textShadowColor: '#444444',
        textShadowOffset: { width: 2, height: 2},
        textShadowRadius: 2,
        fontFamily: '04b_19'
    },
    fullScreenButton: {
        ...StyleSheet.absoluteFillObject, // Apply absolute fill to full screen button
    }
});

export default Game; // Export Game component


