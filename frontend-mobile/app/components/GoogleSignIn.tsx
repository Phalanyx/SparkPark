import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';


export default function Login({handleBackend}: 
    {handleBackend: (token: string) => void}) {
    GoogleSignin.configure({
        webClientId: '1053130768001-h8il86fb016cgres1om7h1jn1f1pi7kb.apps.googleusercontent.com',
        });
    const signIn = async () => {

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });





    const signInResult = await GoogleSignin.signIn();

    
        
    if (!signInResult.data) {
        return;
    }
    
    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);

    auth().signInWithCredential(googleCredential).then((result) => {
        result.user.getIdToken().then((token) => {
            console.log(token);
            handleBackend(token);
            })
        }).catch((error) => {
        return error;
    });
    }

    return (
            <GoogleSigninButton testID="google-signin-button" onPress={signIn} />
    )
}