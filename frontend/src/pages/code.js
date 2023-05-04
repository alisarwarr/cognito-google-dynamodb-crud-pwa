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
import { settingISCONFIRMEDSIGNUP, settingUSERNAME } from '../context/contextapi';


export default function VerficationCode() {
    const [{ isSignedin, isConfirmedSignup, username }, dispatch] = useStateValue();


    const initialValues = {
        code: ""
    }


    const validationSchema = Yup.object().shape({
        code: Yup
            .string()
            .required('Confirmation Code is required'),
    })


    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);

        setTimeout(async () => {
            try {
                /* using here due to ContextApi disptach accessable only in react components */
                await Auth.confirmSignUp(
                    username,
                    values.code
                );
                console.log('successfully code');

                dispatch(settingISCONFIRMEDSIGNUP(false));
                dispatch(settingUSERNAME(""));

                navigate("/");
            }
            catch (error) {
                console.log('error code', error);
                alert(error);
            }

            setSubmitting(false);
        }, 1500);
    }


    const resendConfirmationCode = async () => {
        try {
            await Auth.resendSignUp(username);
            console.log('Resended');
        }
        catch (error) {
            console.log('error resendingcode: ', error);
            alert(error);
        }
    }


    useEffect(() => {
        if (isSignedin || !isConfirmedSignup) {
            navigate("/");
        }
    }, [isSignedin, isConfirmedSignup]);


    if (isSignedin || !isConfirmedSignup) return <></>;


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto bg-white shadow-md rounded-md p-6 flex justify-center flex-col">
                <div className="text-center font-bold text-5xl mb-6 text-black"> 6-digit CODE </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="bg-black shadow-md rounded-md p-6 flex justify-center flex-col">
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-white font-medium mb-2">
                                    Confirmation Code
                                </label>
                                <Field
                                    type="text"
                                    name="code"
                                    id="code"
                                    className="w-full px-3 py-2 rounded-md border border-gray-400"
                                    placeholder="Enter the Confirmation code"
                                />
                                <ErrorMessage name="code" component="div" className="text-red-500 mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-medium py-2 px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                            <Link to="/" className="m-auto text-gray-300 mt-6"> Already have an account? </Link>
                        </Form>
                    )}
                </Formik>
                <button
                    className="m-auto text-gray-800 mt-5"
                    onClick={resendConfirmationCode}
                >
                    Resend Code
                </button>
                <button
                    className="bg-red-500 text-white font-medium py-2 px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg mt-5"
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
        <title> Code | MassageOpen </title>
    )
}