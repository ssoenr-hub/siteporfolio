import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/design-v4.css';

// StrictMode dropped — caused framer-motion enter animations to flicker / get
// stuck at opacity 0 on dev double-mount. Production behaviour stable.
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
