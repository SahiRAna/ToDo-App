
import "@/styles/globals.css";
import { ToDolistProvider } from "../components/toDolistApp";
const MyApp = ({ Component, pageProps }) => (
  <ToDolistProvider>
    <div>
      <Component {...pageProps} />;
    </div>
  </ToDolistProvider>
);
export default MyApp;