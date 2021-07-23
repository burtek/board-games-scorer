import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { TrainButton } from '../logic/trains';
import { Button } from './Button';

const MARGIN = 2;
const styles = StyleSheet.create({
    container: {
        flex: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    row: {
        flex: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        padding: MARGIN / 2
    },
    button: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        margin: MARGIN / 2,
        height: 40
    }
});

export function TrainsRow(props: Props) {
    const { t } = useTranslation();
    const { width } = useWindowDimensions();

    const buttonWidth = useMemo(() => {
        const rows = Math.ceil(props.buttons.length / 5);
        const buttonsInRow = Math.ceil(props.buttons.length / rows);
        const base = (width - (buttonsInRow + 1) * MARGIN) / buttonsInRow;
        return base;
    }, [width, props.buttons.length]);

    const mapToButton = useCallback(
        (button: TrainButton) => (
            <Button
                key={`${button.trains} +${button.points}`}
                onPress={() => props.onPress(button)}
                style={[styles.button, { flexBasis: buttonWidth }]}>
                <Text>{t('trains.button', { count: button.trains })}</Text>
                <Text>{`(+${button.points})`}</Text>
            </Button>
        ),
        [props.onPress]
    );

    return (
        <View style={styles.container}>
            <Text>{t('trains.header')}</Text>
            <View style={styles.row}>{props.buttons.map(mapToButton)}</View>
        </View>
    );
}

interface Props {
    buttons: TrainButton[];
    onPress: (button: TrainButton) => void;
}
