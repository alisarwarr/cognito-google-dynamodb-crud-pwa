//REACTJS
import React, { useState, useEffect } from 'react';
//GATSBY
import { navigate } from 'gatsby';
//REACT-ICONS
import { FaGoogle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
//COMPONENTS
import Posts from '../components/Posts';
//AWS-AMPLIFY
import { Auth, Hub } from 'aws-amplify';
//CONTEXT-API
import { useStateValue } from '../context/StateContext';
import { settingISSIGNEDIN } from '../context/contextapi';


export default function Home() {
    const [{ isSignedin }, dispatch] = useStateValue();
    const [user, setUser] = useState(null);


    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    getUser().then((userData) => {
                        setUser(userData);
                        dispatch(settingISSIGNEDIN(true));
                        console.log('Signed In:', userData);
                    });
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
                default:
            }
        });

        getUser().then((userData) => {
            setUser(userData);
            console.log('Signed In:', userData);
        });
    }, []);


    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then((userData) => userData)
            .catch(() => console.log('Not signed in'));
    }


    console.log(JSON.stringify(user, null, 2));


    if (user || isSignedin) return <Posts />;


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 text-center mb-5">
                Massage Open
            </h1>
            <div className="max-w-md w-[85%] sm:w-[50%] lg:w-[30%] mx-auto">
                <div className="bg-white shadow-md rounded-md p-6 pb-4 flex justify-center flex-col">
                    <button
                        onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
                        className="px-3 sm:px-6 py-2 sm:py-3 bg-green-500 rounded-lg text-white text-sm sm:text-base transition-colors mb-4 w-full flex items-center justify-center"
                    >
                        <FaGoogle className="mr-2" /> Log in with Google
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-3 sm:px-6 py-2 sm:py-3 bg-red-500 rounded-lg text-white text-sm sm:text-base transition-colors mb-4 w-full flex items-center justify-center"
                    >
                        <MdEmail className="mr-5" /> Log in with Email
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-blue-600 text-center mt-0.5 lg:mb-0.5 text-xs sm:text-sm"
                    >
                        Create New Account
                    </button>
                </div>
            </div>
        </div>
    );
}


export function Head() {
    return (
        <title> Home | MassageOpen </title>
    )
}