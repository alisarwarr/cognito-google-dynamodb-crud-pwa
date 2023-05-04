//REACTJS
import React, { useEffect } from 'react';
//GATSBYJS
import { navigate } from 'gatsby';
//FORMIK & YUP
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//APPSYNC-MUTATIONS
import { handleCreatePost } from '../appsync_functions/mutations';
//CONTEXT-API
import { useStateValue } from '../context/StateContext';
//CUSTOM-HOOK
import useGeoLocation from '../hook/useGeoLocation';


export default function CreatePost() {
    const [{ username, isSignedin }] = useStateValue();


    const initialValues = {
        title: "",
        description: ""
    }


    const validationSchema = Yup.object().shape({
        title: Yup
            .string()
            .required('Title is required'),
        description: Yup
            .string()
            .required('Description is required'),
    });


    const { city, country } = useGeoLocation();


    const onSubmit = async (values, { setSubmitting }) => {
        await handleCreatePost({ ...values, author: username, city, country });
        setSubmitting(false);
        navigate("/");
    }


    useEffect(() => {
        if (!isSignedin) {
            navigate("/");
        }
    }, [isSignedin]);


    if (!isSignedin) return <></>;


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-[85%] sm:w-[50%] mx-auto bg-white shadow-md rounded-md p-6">
                <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-black"> Create Post </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="bg-black shadow-md rounded-md p-6">
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Title
                                </label>
                                <Field
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm "
                                    placeholder="Enter the title"
                                />
                                <ErrorMessage name="title" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Description
                                </label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    id="description"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm "
                                    placeholder="Enter the description"
                                    cols="2"
                                    rows="4"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg text-xs sm:text-sm -mt-2.5"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
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
        <title> Create | MassageOpen </title>
    )
}