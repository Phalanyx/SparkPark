import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AutoSuggestButtonProps {
    onPress: () => void;
}

const AutoSuggestButton: React.FC<AutoSuggestButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Find Best Spot</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#1d434f',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        zIndex: 5,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default AutoSuggestButton;
