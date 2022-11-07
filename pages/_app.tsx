import "@/styles/globals.css";

import Home from "./index";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Home />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

// lazy loading
