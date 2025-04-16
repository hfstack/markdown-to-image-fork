import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Md2RichTextExample from '../examples/Md2RichTextExample';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'md2richTxt',
        element: <Md2RichTextExample />,
      },
    ],
  },
]);

export default router; 