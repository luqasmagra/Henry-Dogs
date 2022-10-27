import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import DogDetail from "./components/DogDetail/DogDetail.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Form from "./components/Form/Form.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/dog/:id" component={DogDetail} />
        <Route exact path="/create" component={Form} />
      </BrowserRouter>
    </div>
  );
}

export default App;
