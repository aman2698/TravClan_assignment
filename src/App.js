
import './App.css';



import { GlobalProvider } from "./Context/GlobalState";
function App() {
  return (
    <GlobalProvider>
    <div >
      hello
    </div>
    </GlobalProvider>
  );
}

export default App;

