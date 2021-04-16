import { RoutesContainer } from "./components/Routes/RoutesContainer";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5678/api",
  withCredentials: true,
});
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
