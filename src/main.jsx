import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { store } from './redux/types/configStore.jsx'
import './i18n.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>,
)