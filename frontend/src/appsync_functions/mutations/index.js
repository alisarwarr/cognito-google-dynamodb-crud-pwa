//AWS-AMPLIFY
import { API } from 'aws-amplify';
import {
    createPost,
    deletePost,
    updatePost
} from '../../graphql/mutations';


export const handleCreatePost = async ({ title, author, description, city, country }) => {
    try {
        await API.graphql({
            query: createPost,
            variables: {
                title,
                author,
                description,
                city,
                country
            }
        });
    }
    catch (error) {
        console.log('error createPost:', error);
    }
}
export const handleDeletePost = async (id) => {
    try {
        await API.graphql({
            query: deletePost,
            variables: {
                id
            }
        });
    }
    catch (error) {
        console.log('error deletePost:', error);
    }
}
export const handleUpdatePost = async ({ id, title, author, description, city, country }) => {
    try {
        await API.graphql({
            query: updatePost,
            variables: {
                id,
                title,
                author,
                description,
                city,
                country
            }
        });
    }
    catch (error) {
        console.log('error updatePost:', error);
    }
}