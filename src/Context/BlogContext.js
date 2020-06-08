import React, { useState } from 'react'
import createDataContext from '../screens/createDataContext';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 99999),
                    // title: `Blog Post #${state.length + 1}` 
                    title: action.payload.title,
                    content: action.payload.content
                }];
        case 'delete_blogpost':
            return state.filter((blogPosts) => blogPosts.id !== action.payload);
        case 'edit_blogpost':
            return state.map((blogPosts) => {
                return blogPosts.id === action.payload.id ? action.payload : blogPosts;
            });
        default:
            return state;
    }
}

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title, content } });
        if(callback){
            callback()
        }    
    };
};

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id })
    }
}

const editBlogPost = (dispatch) => {
    return (id, title, content,callback) => {
        dispatch({
            type: 'edit_blogpost',
            payload: { id: id, title: title, content: content }
        });
        if(callback){
            callback()
        }
        
    };
}

export const { Context, Provider } = createDataContext(
    blogReducer, // reducer
    { addBlogPost, deleteBlogPost, editBlogPost }, //action
    [{ title: 'Test Post', content: 'Test Content', id: 1 }] //default state
);












// import React,{useState ,useReducer} from 'react'
// const BlogContext = React.createContext();
// export const BlogProvider = ({ children }) => {
//     const [blogPosts,setBlogPosts] = useState([]);
// export const BlogProvider = ({ children }) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, []);
//     return (
//         <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
//             {children}
//         </BlogContext.Provider>
//     );
// };

//     const addBlogPost = () =>{
//         setBlogPosts([...blogPosts,{ title:`Blog Post #${blogPosts.length + 1}`}]);
//     }

//     const editBlogPost = () => {}

//     const deleteBlogPost = () => {}

//     // const blogPosts = [
//     //     {title:'Blog Post #1'},
//     //     {title:'BlogPost #2'}
//     // ];

//    return (
// <BlogContext.Provider value={{data:blogPosts , addBlogPost}}>{children}</BlogContext.Provider>
//     );
// };

// export default BlogContext;