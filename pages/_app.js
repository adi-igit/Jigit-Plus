import '@/styles/globals.scss';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

let persistor = persistStore(store);

export default function App({ session, Component, pageProps, router }) {
  
  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer position="bottom-center" limit={1} />
      <Provider store={store}>
          <PersistGate persistor={persistor}>
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
              <Component {...pageProps} />
            </motion.div>
          </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
