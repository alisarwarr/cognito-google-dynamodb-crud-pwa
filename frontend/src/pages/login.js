//REACTJS
import React, { useEffect } from 'react';
//GATSBYJS
import { navigate, Link } from 'gatsby';
//FORMIK & YUP
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//AWS-AMPLIFY
import { Auth } from 'aws-amplify';
//CONTEXT-API
import { useStateValue } from '../context/StateContext';
import { settingISSIGNEDIN, settingUSERNAME } from '../context/contextapi';


export default function Login() {
    const [{ isSignedin }, dispatch] = useStateValue();


    const initialValues = {
        email: "",
        password: ""
    }


    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email('Must be a valid email')
            .required('Email is required'),
        password: Yup
            .string()
            .min(6, 'Must be at least 6 characters')
            .matches(/[a-z]/, 'Must have at least 1 lowercase letter')
            .matches(/[A-Z]/, 'Must have at least 1 uppercase letter')
            .matches(/[0-9]/, 'Must have at least 1 number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must have at least 1 symbol')
            .required('Password is required')
    });


    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);

        setTimeout(async () => {
            try {
                /* using here due to ContextApi disptach accessable only in react components */
                await Auth.signIn(
                    values.email,
                    values.password
                );
                console.log('successfully login');

                dispatch(settingISSIGNEDIN(true));

                navigate("/");

                try {
                    const userInfo = await Auth.currentUserInfo();
                    console.log('successfully username:', userInfo.username);

                    dispatch(settingUSERNAME(userInfo.username));
                }
                catch (error) {
                    console.log('error username:', error);
                    alert(error);
                }
            }
            catch (error) {
                console.log('error login', error);
                alert(error);
            }

            setSubmitting(false);
        }, 1500);
    }


    useEffect(() => {
        if (isSignedin) {
            navigate("/");
        }
    }, [isSignedin]);


    if (isSignedin) return <></>;


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-[85%] sm:w-[50%] mx-auto bg-white shadow-md rounded-md p-6">
                <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-black"> Login Form </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="bg-black shadow-md rounded-md p-3 sm:p-6 flex justify-center flex-col">
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="email" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm "
                                    placeholder="Enter the email"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="password" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm "
                                    placeholder="Enter the password"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg text-xs sm:text-sm mt-1"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                            <Link to="/signup" className="m-auto text-gray-300 text-xs sm:text-sm mt-4 sm:mt-6"> Don't have an account? </Link>
                        </Form>
                    )}
                </Formik>
                <button
                    className="bg-red-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg mt-4 sm:mt-5 text-xs sm:text-sm"
                    onClick={() => navigate("/")}
                >
                    Go back to Home
                </button>
            </div>
        </div>
    )
}


export function Head() {
    return (
        <title> Login | MassageOpen </title>
    )
}