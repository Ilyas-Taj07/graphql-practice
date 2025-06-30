# Example - if we want to call a get query later 

import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_TODOS } from './queries';

const TodoList = ({ id }) => {
  const [getTodos, { data, loading, error }] = useLazyQuery(GET_TODOS);

  useEffect(() => {
    if (id) {
      getTodos({ variables: { userId: id } });
    }
  }, [id, getTodos]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.todos?.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};
