<<<<<<< HEAD
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
=======
import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
>>>>>>> e08c9f48163d1d98e9f366b18d3e8fcd79f29275
