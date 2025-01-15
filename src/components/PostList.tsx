import { useState, useEffect } from 'react';
import { Post, PostWithCommentCount } from '../types/Posts';

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  const [postsWithComments, setPostsWithComments] = useState<
    PostWithCommentCount[] | []
  >([]);

  const fetchComments = async () => {
    const updatedPosts = await Promise.all(
      posts?.map(async (post) => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        );
        const comments = await response.json();
        return { ...post, commentCount: comments.length };
      })
    );

    setPostsWithComments(updatedPosts as PostWithCommentCount[]);
  };

  useEffect(() => {
    fetchComments();
  }, [posts]);

  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Recent Posts</h2>
      <ul className='space-y-4'>
        {postsWithComments?.map((post) => (
          <li key={post.id} className='border-b pb-2'>
            <h3 className='text-lg font-medium'>{post.title}</h3>
            <p className='text-gray-600'>Comments: {post.commentCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
