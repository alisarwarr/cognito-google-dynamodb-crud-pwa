//REACTJS
import React from 'react';
//GATSBYJS
import { navigate } from 'gatsby';


export default function Page404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 text-center mb-3">404</h1>
            <p className="text-sm sm:text-lg text-gray-600 text-center mb-5 px-4">
                Oops! page you requested was not found.
            </p>
            <button onClick={() => navigate("/")}
                className="px-3 sm:px-6 py-2 sm:py-3 bg-indigo-600 rounded-lg text-white text-sm sm:text-base hover:bg-indigo-500 transition-colors"
            >
                Go back to homepage
            </button>
        </div>
    )
}


export function Head() {
    return (
        <title> Error | MassageOpen </title>
    )
}