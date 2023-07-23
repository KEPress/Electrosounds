import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { App } from './App'
import { ContextProvider } from './context/provider' //NOTE: Place Context After App to Load Context
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <ContextProvider>
          <PayPalScriptProvider deferLoading={'true'}>
            <App />
          </PayPalScriptProvider>
        </ContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)