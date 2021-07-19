import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export const useAppearance = () => {
    const [appearance, setAppearance] = useState({
        colorScheme: Appearance.getColorScheme()
    });

    useEffect(() => {
        const onChange: Appearance.AppearanceListener = preferences => {
            setAppearance({
                colorScheme: preferences.colorScheme
            });
        };
        Appearance.addChangeListener(onChange);

        return () => {
            Appearance.removeChangeListener(onChange);
        };
    }, []);

    return appearance;
};
