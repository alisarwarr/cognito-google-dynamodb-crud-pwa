//AWS-AMPLIFY
import { API } from 'aws-amplify';
import {
    getAllPosts,
    getOnePost
} from '../../graphql/queries';


export const fetchGetAllPosts = async() => {
    const { data } = await API.graphql({ query: getAllPosts });
    return data.getAllPosts;
}
export const fetchGetOnePost = async(id) => {
    const { data } = await API.graphql({
        query: getOnePost,
        variables: {
            id
        }
    });
    return data.getOnePost;
}