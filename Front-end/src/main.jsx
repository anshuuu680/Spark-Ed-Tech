import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './Context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './App/store';
import Modal from 'react-modal';
import { SocketProvider } from './SocketContext';

Modal.setAppElement('#root');

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={true}
          closeOnClick
          rtl={false}
         
        />

        <Provider store={store}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </Provider>
      </AppProvider>
    </QueryClientProvider>
);
