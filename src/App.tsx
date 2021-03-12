import "./App.css";
import { RoutesContainer } from "./components/Routes/RoutesContainer";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="bg-grey-200 App">
      <BrowserRouter>
        <RoutesContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
