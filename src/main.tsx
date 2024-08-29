import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('wrapper')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
