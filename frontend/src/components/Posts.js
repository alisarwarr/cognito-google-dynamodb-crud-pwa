//REACTJS
import React, { useState, useEffect } from 'react';
//GATSBY
import { navigate } from 'gatsby';
//REACT-ICONS
import { FaTrash, FaEdit } from 'react-icons/fa';
//APPSYNC-MUTATIONS
import { handleDeletePost } from '../appsync_functions/mutations';
//APPSYNC-QUERIES
import { fetchGetAllPosts } from '../appsync_functions/queries';
//AWS-AMPLIFY
import { Auth } from 'aws-amplify';
//CONTEXT-API
import { useStateValue } from '../context/StateContext';
import { settingISSIGNEDIN, settingUSERNAME } from '../context/contextapi';


export default function Posts() {
    const [{ username }, dispatch] = useStateValue();


    const [loading, setLoading] = useState(false);


    //fetching data from APPSYNC
    const [getAllPosts, setGetAllPosts] = useState(false);
    useEffect(() => {
        const fetchFunction = async () => {
            setLoading(true);
            setGetAllPosts(await fetchGetAllPosts());
            setLoading(false);
        }
        fetchFunction();
    }, []);
    //fetching data from APPSYNC


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto mt-8 mb-8 w-[85%] sm:w-[50%]">
                {
                    !loading ? (
                        <>
                            <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-black"> All Posts </div>

                            <div className="flex items-center justify-center w-[80%] pb-2 m-auto -mt-2 sm:mt-0 mb-3 sm:mb-5">
                                <button
                                    className="bg-green-500 text-white text-xs sm:text-base font-medium px-3 sm:px-6 py-2 sm:py-3 rounded-md flex items-center justify-center transition-all duration-200 hover:shadow-lg"
                                    onClick={() => navigate("/create-post")}
                                >
                                    Create Post
                                </button>
                                <button
                                    className="bg-yellow-500 text-white text-xs sm:text-base font-medium px-3 sm:px-6 py-2 sm:py-3 rounded-md flex items-center justify-center transition-all duration-200 hover:shadow-lg ml-2"
                                    onClick={async () => {
                                        try {
                                            await Auth.signOut();
                                            console.log('successfully logout');

                                            dispatch(settingISSIGNEDIN(false));
                                            dispatch(settingUSERNAME(""));

                                            navigate("/");
                                        }
                                        catch (error) {
                                            console.log('error logout:', error);
                                            alert(error);
                                        }
                                    }}
                                >
                                    Logout
                                </button>
                            </div>

                            {
                                getAllPosts.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                                        {
                                            getAllPosts.map((
                                                { id, title, author, description, city, country },
                                                index
                                            ) => (
                                                <div key={id} className="bg-white rounded-lg shadow-lg p-4 pb-6 my-0.5">
                                                    <div className="flex items-center mb-2 text-sm sm:text-xl lg:text-2xl text-justify">
                                                        Post #
                                                        <div className="bg-gray-200 text-gray-600 rounded-full w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center ml-1.5">
                                                            <span className="text-xs lg:text-base mt-0.5 font-bold">{index + 1}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 sm:mt-4 lg:mt-6 mb-7 animate-zoom-in duration-500 ease-out">
                                                        <h4 className="text-sm sm:text-xl lg:text-2xl text-justify font-bold mb-0.5"> Country : </h4>
                                                        <p className="text-xs sm:text-lg lg:text-xl text-justify font-normal text-gray-700 mb-2 break-words">{country}</p>
                                                        <h4 className="text-sm sm:text-xl lg:text-2xl text-justify font-bold mb-0.5"> City : </h4>
                                                        <p className="text-xs sm:text-lg lg:text-xl text-justify font-normal text-gray-700 mb-2 break-words">{city}</p>
                                                        <h2 className="text-sm sm:text-xl lg:text-2xl text-justify font-bold mb-0.5"> Title : </h2>
                                                        <p className="text-xs sm:text-lg lg:text-xl text-justify font-medium text-gray-700 mb-2 break-words">{title}</p>
                                                        <h3 className="text-sm sm:text-xl lg:text-2xl text-justify font-bold mb-0.5 ">Author : </h3>
                                                        <p className="text-xs sm:text-lg lg:text-xl text-justify font-medium text-gray-700 mb-2 break-words">{author}</p>
                                                        <h4 className="text-sm sm:text-xl lg:text-2xl text-justify font-bold mb-0.5"> Description : </h4>
                                                        <p className="text-xs sm:text-lg lg:text-xl text-justify font-normal text-gray-700 mb-2 break-words">{description}</p>
                                                    </div>

                                                    <div className="-mt-1 -ml-0.5">
                                                        <button
                                                            className="bg-red-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg mt-6 sm:mt-5 text-xs sm:text-sm"
                                                            onClick={async () => {

                                                                if (
                                                                    username === author
                                                                ) {
                                                                    await handleDeletePost(id);

                                                                    const fetchFunction = async () => {
                                                                        setLoading(true);
                                                                        setGetAllPosts(await fetchGetAllPosts());
                                                                        setLoading(false);
                                                                    }
                                                                    fetchFunction();
                                                                }

                                                                else {
                                                                    alert("Sorry, You're not allowed to Delete someone's post!");
                                                                }

                                                            }}
                                                        >
                                                            <FaTrash className="inline-block mr-2" /> Delete
                                                        </button>
                                                        <button
                                                            className="bg-blue-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg mt-2 text-xs sm:text-sm"
                                                            onClick={() => {

                                                                if (
                                                                    username === author
                                                                ) {
                                                                    navigate("/update-post",
                                                                        {
                                                                            state: {
                                                                                id,
                                                                                title,
                                                                                author,
                                                                                description,
                                                                                city,
                                                                                country
                                                                            }
                                                                        }
                                                                    )

                                                                    const fetchFunction = async () => {
                                                                        setLoading(true);
                                                                        setGetAllPosts(await fetchGetAllPosts());
                                                                        setLoading(false);
                                                                    }
                                                                    fetchFunction();
                                                                }

                                                                else {
                                                                    alert("Sorry, You're not allowed to Update someone's post!");
                                                                }

                                                            }}
                                                        >
                                                            <FaEdit className="inline-block mr-2" /> Update
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-black"> ( No Post Exist ) </div>
                                )
                            }
                        </>
                    ) : (
                        <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-black"> .  . . Loading . . . </div>
                    )
                }
            </div>
        </div>
    )
}