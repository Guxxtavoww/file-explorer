import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { Providers } from './providers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <App />
  </Providers>
);
