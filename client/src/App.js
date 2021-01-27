// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { StoreProvider } from "./utils/GlobalState";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/projects" component={Projects} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
