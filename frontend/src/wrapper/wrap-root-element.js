//REACTJS
import React from 'react';
//AWS-AMPLIFY
import { Amplify } from 'aws-amplify';
import awsmobile from '../aws-exports.js';
//CONTEXT-API
import { StateProvider } from '../context/StateContext';


export const wrapRootElement = ({ element }) => {
    Amplify.configure(awsmobile);
    return <StateProvider>{element}</StateProvider>;
}