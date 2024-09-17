import "./App.css";
import useRouteElements from "./routes";

function App() {
  const routeElements = useRouteElements();
  return <div className="App">{routeElements}</div>;
}

export default App;
