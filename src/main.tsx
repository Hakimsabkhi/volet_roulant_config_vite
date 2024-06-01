import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'; 
import './styles.css';

import App from './App';

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='MainStyle' >
        <App />
      </div>
    </Provider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Root />);
}
