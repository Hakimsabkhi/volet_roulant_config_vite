import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'; 
import LoadingScreen from './LoadingScreen';
import './styles.css';

import App from './App';

const Root: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <div className='MainStyle'>
        {loading ? <LoadingScreen /> : <App />}
      </div>
    </Provider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Root />);
}

export default Root;
