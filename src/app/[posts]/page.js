"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
const Post = () => {

  const [content, setContent] = useState([]);

    // folder structure /posts/[pid]
    const params = useParams();
    // example URL /posts/123
    const { posts } = params;
    // pid will equal 123
    
  const getContent = async () => {
    try {
      const response = await axios.get('https://0lkw8msj-3000.asse.devtunnels.ms/' + posts);
      setContent(response.data);
    } catch (error) {
      console.error(error);
      setContent(
        {
          title: 'Error',
          content: 'Error'
        }
      );
    }
  }

  useEffect(() => {
    getContent();
  }
  , []);

  return (
  <div>
    <p>{posts}</p>
    <h1>{content.title}</h1>
    <p>{content.content}</p>
  </div>
  
)
}

export default Post