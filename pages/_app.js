import '@/styles/globals.scss';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { motion } from 'framer-motion';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { appWithTranslation } from 'next-i18next'


let persistor = persistStore(store);

function App({ Component, pageProps, router }) {
  return (
      <SessionProvider session={pageProps.session}>
        <ToastContainer position="bottom-center" limit={1} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <motion.div
              key={router.route}
              initial="pageInitial"
              animate="pageAnimate"
              variants={{
                pageInitial: {
                  opacity: 0,
                },
                pageAnimate: {
                  opacity: 1,
                },
              }}
            >
              <PayPalScriptProvider deferLoading={true}>
                <Component {...pageProps} />
              </PayPalScriptProvider>
            </motion.div>
          </PersistGate>
        </Provider>
      </SessionProvider>
  );
}

export default appWithTranslation(App);