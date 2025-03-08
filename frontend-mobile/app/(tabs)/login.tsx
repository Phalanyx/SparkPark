import { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import GoogleSignIn from '../components/GoogleSignIn';
import EmailSignIn from '../components/EmailSignIn';

export default function Login() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState<any>();
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    });

    function handleBackend(token: string) {
        console.log('handleBackend');
        console.log(token);
        console.log(process.env.EXPO_PUBLIC_BACKEND + '/login');

        fetch(process.env.EXPO_PUBLIC_BACKEND + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((response) => {
            response.json().then((data) => {
                setData(data);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleLogout() {
        auth()
            .signOut()
            .then(() => setData(undefined))
            .catch((error) => console.error(error)); 
    }

    return (
        loggedIn ? (
            <View className='flex-1 justify-center items-center bg-gray-100'>
                <KeyboardAvoidingView behavior='padding'>
                    <Text>Welcome, you are logged in!</Text>
                    <Text>{JSON.stringify(data?.name)}</Text>
                    <Text>{JSON.stringify(data?.email)}</Text>
                    <Text>{JSON.stringify(data?.uid)}</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </KeyboardAvoidingView>
            </View>
        ) : (
            <View className="flex-1 justify-center items-center bg-gray-100">
                <KeyboardAvoidingView behavior='padding' className="w-full px-4">
                    <Text className="text-lg font-bold mb-4 text-center">
                        {authMode === 'login' ? 'Please log in' : 'Create an account'}
                    </Text>
                    <EmailSignIn handleBackend={handleBackend} mode={authMode} />
                    <Button
                        title={authMode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Log in'}
                        onPress={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    />
                    <GoogleSignIn handleBackend={handleBackend} />
                </KeyboardAvoidingView>
            </View>
        )
    );
}
