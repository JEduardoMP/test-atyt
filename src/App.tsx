import { useState, useEffect } from 'react';
import UserProfile from './components/UserProfile';
import PostList from './components/PostList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { Post } from './types/Posts';
import ProductSearch from './ProductSearch';

export default function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[] | []>([]);
  const [changeToProductSearch, setChangeToProductSearch] = useState(false);

  const fetchData = async () => {
    try {
      const [userResponse, postsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users/1'),
        fetch('https://jsonplaceholder.typicode.com/posts?userId=1'),
      ]);

      if (!userResponse.ok || !postsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const userData = await userResponse.json();
      const postsData = await postsResponse.json();

      setUser(userData);
      setPosts(postsData);
      setFilteredPosts(postsData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(
          error.message ||
            'An error occurred while fetching data. Please try again later.'
        );
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  if (changeToProductSearch) {
    return <ProductSearch setChangeToProductSearch={setChangeToProductSearch} />;
  }

  return (
    <div className='container mx-auto p-4'>
      <button
        onClick={() => setChangeToProductSearch(true)}
        className='mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Change to Product Search
      </button>
      <h1 className='text-3xl font-bold mb-6'>User Dashboard</h1>
      {user && <UserProfile user={user} />}
      {posts.length > 0 && <PostList posts={filteredPosts} />}
    </div>
  );
}
