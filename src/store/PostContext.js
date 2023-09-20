import { createContext, useState } from 'react'

export const PostContext = createContext(null)

const PostContextProvider = props => {
    const [postDetails, setPostDetails] = useState()
    return (
        <PostContext.Provider value={{ postDetails, setPostDetails }}>
            {props.children}
        </PostContext.Provider>
    )
}
export default PostContextProvider