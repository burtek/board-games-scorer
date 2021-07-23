import React, { useCallback } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Player, PlayerColor } from '../logic/players';
import { Button } from './Button';

const styles = StyleSheet.create({
    container: {
        flex: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    button: {
        flex: 1,
        height: 40,
        borderWidth: 1
    },
    buttonText: {
        fontSize: 20,
        color: '#000000'
    },
    selectedButtonLight: {
        borderColor: '#ffffff'
    },
    selectedButtonDark: {
        borderColor: '#000000'
    }
});

export function PlayersRow(props: Props) {
    const colorScheme = useColorScheme();

    const mapToButton = useCallback(
        (player: Player) => (
            <Button
                key={player}
                onPress={() => props.changeCurrent(player)}
                style={[
                    styles.button,
                    {
                        backgroundColor: PlayerColor[player],
                        borderColor: PlayerColor[player]
                    },
                    player === props.current &&
                        (colorScheme === 'dark' ? styles.selectedButtonLight : styles.selectedButtonDark)
                ]}
                textStyle={styles.buttonText}>
                {props.points[player]}
            </Button>
        ),
        [props.current, props.points]
    );

    return <View style={styles.container}>{props.players.map(mapToButton)}</View>;
}

interface Props {
    points: Record<Player, number>;
    players: Player[];
    current: Player;
    changeCurrent: (player: Player) => void;
}
