import { useState } from 'react';
import { Button, KeyboardAvoidingView, Text, TextInput, View, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function AuthForm(
    { handleBackend, mode }: { handleBackend: (token: string) => void, mode: 'login' | 'signup' }
) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handleAuth = () => {
        if (mode === 'login') {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                    user.user.getIdToken().then((token) => {
                        handleBackend(token);
                    });
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }
                    console.error(error);
                });
        } else {
            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match!');
                return;
            }

            if (!validatePassword(password)) {
                Alert.alert('Error', 'Password must be at least 6 characters long.');
                return;
            }

            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    user.user.getIdToken().then((token) => {
                        handleBackend(token);
                    });
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }
                    console.error(error);
                });
        }
    };

    return (
        <View>
            <Text>Email</Text>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder='email'
                />
                <Text>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder='password'
                />
                {mode === 'signup' && (
                    <>
                        <Text>Confirm Password</Text>
                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder='confirm password'
                        />
                    </>
                )}
                <Button title={mode === 'login' ? 'Login' : 'Register'} onPress={handleAuth} />
            </KeyboardAvoidingView>
        </View>
    );
}
