import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus:false,
            refetchOnMount:false,
            refetchOnReconnect:false,
            retry:false,
            staleTime:5*60*1000
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);

reportWebVitals();
