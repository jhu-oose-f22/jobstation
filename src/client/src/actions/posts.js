import * as api from '../api'

// Action Creators, function return function

export const getPosts = () => async(dispatch)=>{
    try {
        const {data} = await api.fetchPosts();
        dispatch({type: 'FETCH_ALL', payload:data});
    }catch (error){
        console.log(error.message);
    }
}

export const getPostById = (id) => async(dispatch)=>{
    try {
        const {data} = await api.fetchPostById(id);
        dispatch({type: 'FETCH_ONE', payload:data});
    }catch (error){
        console.log(error.message);
    }
}

export const createPost = (post) =>async(dispatch) =>{
    try{
        const {data} = await api.createPost(post);
        dispatch({type:'CREATE',payload:data});
    } catch (error){
        console.log(error);
    }
}

