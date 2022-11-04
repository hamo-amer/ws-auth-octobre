import axios from "axios";
import React, { useEffect, useState } from "react";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("/posts");
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, []);
    return (
        <div>
            {posts.map((post) => (
                <div>
                    <h5>{post.userId.username}</h5>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
};

export default Posts;
