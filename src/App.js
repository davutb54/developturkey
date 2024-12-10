import MainLayout from "./layout/MainLayout";
import NavigationBar from "./layout/NavigationBar";
import "./App.css";
import { GlobalProvider } from "./context/GlobalState";
import BottomBar from "./layout/BottomBar";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <NavigationBar />
        <MainLayout />
        <BottomBar />
      </GlobalProvider>
    </div>
  );
}

export default App;
