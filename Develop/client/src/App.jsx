import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Auth from './utils/auth';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${Auth.getToken()}`
  }
})

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />

    </ApolloProvider>
    </>
  );
}

export default App;
