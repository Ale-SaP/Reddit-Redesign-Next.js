import axios from "axios";
import { useState } from "react";
import { useQuery, useQueryClient, QueryClientProvider } from 'react-query'

export default function Comments(props: Parameters) {

    const onClick = () => { 
        const { data, isLoading } = useQuery<any>(['todos', props.id], () => fetchComment(props.id))
    
        if (isLoading) {
        return (<h1>Loading!</h1>)
        }

        if (data) {
            console.log(data)
            return (
                <>
                {data.data.comments.map(
                    comment => {
                        <h1>{comment.text}</h1>
                    }
                )}
                </>
            )
        }
    }
    

}

const fetchComment = async (post: string) => {
    const instance = axios.create({});
    return await instance.post(`/api/get-comments`, { "post": post });
  } 

interface Parameters {
    id: string,
}