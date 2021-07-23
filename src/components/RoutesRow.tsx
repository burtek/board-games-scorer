import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Button } from './Button';

const MARGIN = 2;
const BUTTONS_IN_ROW = 7;
const BUTTONS = 25;

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

export function RoutesRow(props: Props) {
    const { t } = useTranslation();
    const { width } = useWindowDimensions();

    const buttonWidth = useMemo(() => (width - (BUTTONS_IN_ROW + 1) * MARGIN) / BUTTONS_IN_ROW, [width]);
    const manualButtonWidth = useMemo(() => {
        const rest = BUTTONS_IN_ROW - (BUTTONS % BUTTONS_IN_ROW);
        return buttonWidth * rest + MARGIN * (rest - 1);
    }, [buttonWidth]);

    const mapToButton = useCallback(
        (_: unknown, index: number) => {
            const points = index + 1;
            return (
                <Button
                    key={`+${points}`}
                    onPress={() => props.onPress(points)}
                    style={[styles.button, { flexBasis: buttonWidth }]}>
                    {`(+${points})`}
                </Button>
            );
        },
        [props.onPress]
    );

    return (
        <View style={styles.container}>
            <Text>{t('routes.header')}</Text>
            <View style={styles.row}>
                {Array.from({ length: BUTTONS }, mapToButton)}
                <Button onPress={() => {}} style={[styles.button, { flexBasis: manualButtonWidth }]}>
                    Manual
                </Button>
            </View>
        </View>
    );
}

interface Props {
    onPress: (points: number) => void;
}
