import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout';
import store from './redux/store';
import { Homepage } from './pages/Homepage';
// import store from './redux/store'
const router = createBrowserRouter([
  {
  path: '/',
  element: <Layout />,
  children: [
  {
    path: '',
    element: <Homepage />
    },
  ]
},
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
     <Provider store={store}>
      <RouterProvider router={router} />
     </Provider>
  </>
);
