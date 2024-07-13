import "@/styles/globals.css";
import { SocketProvider } from "../components/SocketProvider";
export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}
