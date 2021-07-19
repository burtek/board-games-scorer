import zipObject from 'lodash/zipObject';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayersRow } from './components/PlayersRow';
import { RoutesRow } from './components/RoutesRow';
import { TrainsRow } from './components/TrainsRow';
import { europeConfig } from './configs';
import { useAppearance } from './hooks/use-appearance';
import { Player } from './logic/players';
import { TrainButton } from './logic/trains';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    containerDark: {
        backgroundColor: '#000000'
    },
    containerLight: {
        backgroundColor: '#ffffff'
    },
    separator: {
        flex: 0,
        height: 20
    }
});

export default function App() {
    const { colorScheme } = useAppearance();

    const [config] = useState(europeConfig);
    const [currentPlayer, setCurrentPlayer] = useState(config.players[0]);

    const [points, setPoints] = useState(
        () =>
            zipObject(
                config.players,
                config.players.map(() => 0)
            ) as Record<Player, number>
    );

    const addTrainsPoints = useCallback(
        ({ points }: TrainButton) => {
            setPoints(state => ({
                ...state,
                [currentPlayer]: state[currentPlayer] + points
            }));
        },
        [currentPlayer, setPoints]
    );
    const addRoutePoints = useCallback(
        (points: number) => {
            setPoints(state => ({
                ...state,
                [currentPlayer]: state[currentPlayer] + points
            }));
        },
        [currentPlayer, setPoints]
    );

    return (
        <View style={[styles.container, colorScheme === 'dark' ? styles.containerDark : styles.containerLight]}>
            <PlayersRow
                players={config.players}
                current={currentPlayer}
                changeCurrent={setCurrentPlayer}
                points={points}
            />
            <View style={styles.separator} />
            <TrainsRow buttons={config.trainPoints} onPress={addTrainsPoints} />
            <View style={styles.separator} />
            <RoutesRow onPress={addRoutePoints} />
        </View>
    );
}
