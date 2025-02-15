import { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';


export default function Login() {

    GoogleSignin.configure({
        webClientId: '1053130768001-h8il86fb016cgres1om7h1jn1f1pi7kb.apps.googleusercontent.com',
        });


    const signIn = async () => {
  // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
    console.log(signInResult);
        
    if (!signInResult.data) {
        return;
    }

    

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
        }

    function logOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User signed in!');
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
                <GoogleSigninButton onPress={signIn} />
                <Button title="Log out" onPress={logOut} />
            </KeyboardAvoidingView>
        </View>
    )
}