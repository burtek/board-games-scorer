import type { ReactText } from 'react';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
    ViewStyle
} from 'react-native';

export const BUTTON_DIVIDER = 8;

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLight: {
        backgroundColor: '#ffffff'
    },
    buttonDark: {
        backgroundColor: '#000000'
    },
    textLight: {
        color: '#ffffff'
    },
    textDark: {
        color: '#000000'
    }
});

function isReactText(arg: unknown): arg is ReactText {
    return typeof arg === 'string' || typeof arg === 'number';
}

export function Button(props: Props) {
    const colorScheme = useColorScheme();

    return (
        <TouchableWithoutFeedback onPress={() => props.onPress()}>
            <View style={[styles.button, colorScheme === 'dark' ? styles.buttonDark : styles.buttonLight, props.style]}>
                {isReactText(props.children) ? (
                    <Text style={[colorScheme === 'dark' ? styles.textLight : styles.textDark, props.textStyle]}>
                        {props.children}
                    </Text>
                ) : (
                    <>{props.children}</>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

interface BaseProps {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

interface TextProps extends BaseProps {
    children: ReactText;
    textStyle?: StyleProp<TextStyle>;
}

interface ChildProps extends BaseProps {
    children: Exclude<React.ReactNode, ReactText>;
    textStyle?: never;
}

type Props = TextProps | ChildProps;
