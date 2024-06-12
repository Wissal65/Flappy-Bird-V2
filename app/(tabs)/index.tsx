// src/components/Game.tsx
import React, { PureComponent } from 'react';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

// Define the type for the component props
interface GameProps {}

// Define the type for the component state
interface GameState {
  running: boolean;
}

export default class Game extends PureComponent<GameProps, GameState> {
  private entities: any;

  constructor(props: GameProps) {
    super(props);
    this.state = {
      running: true,
    };
    this.entities = {}; // Initialize entities
  }

  componentDidMount() {
    this.setupWorld();
  }

  setupWorld = () => {
    const engine = Matter.Engine.create();
    const world = engine.world;

    // Définir l'oiseau
    const bird = Matter.Bodies.rectangle(50, 200, 40, 40);

    // Ajouter l'oiseau au monde
    Matter.World.add(world, [bird]);

    this.entities = {
      physics: { engine: engine, world: world },
      bird: { body: bird, renderer: <Bird /> },
    };

    Matter.Engine.run(engine);
  };

  render() {
    return (
      <GameEngine
        style={{ flex: 1, backgroundColor: 'white' }}
        systems={[]}
        entities={this.entities}>
      </GameEngine>
    );
  }
}

// Assuming you have a Bird component defined elsewhere
const Bird = () => {
  return (
    <div style={{ width: 40, height: 40, backgroundColor: 'red' }} />
  );
};
