import { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';



export default function Login(
    { handleBackend }: { handleBackend: (token: string) => void }
) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                user.user.getIdToken().then((token) => {
                    handleBackend(token);
                })
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });

    }

    const handleRegister = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
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
                <Button title="Login" onPress={handleLogin} />
                <Button title="Register" onPress={handleRegister} />
            </KeyboardAvoidingView>
        </View>
    )
}