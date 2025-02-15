import { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import GoogleSignIn from '../components/GoogleSignIn';
import EmailSignIn from '../components/EmailSignIn';



export default function Login() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    })

    function handleBackend(token: string) {
        console.log('handleBackend')
        console.log(token)
        console.log(process.env.EXPO_PUBLIC_BACKEND+ '/login')

        fetch(process.env.EXPO_PUBLIC_BACKEND + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((response) => {
            console.log("hello")
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    function handleLogout () {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }


    return (
        <View>

            <KeyboardAvoidingView behavior='padding'>
                <Text> Hello</Text>
                <EmailSignIn handleBackend={handleBackend}/>
                <GoogleSignIn handleBackend={handleBackend}/>
                <Button title="Logout" onPress={handleLogout} />
                {loggedIn && <Text>Logged In</Text>}
            </KeyboardAvoidingView>
        </View>
    )
}