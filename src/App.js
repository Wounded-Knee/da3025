import React from 'react';
import logo from './logo.svg';
import conversation from './conversation';
import Article from './Article';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom";

function App() {
  const topLevelNodes = conversation.nodes.filter(node => node.parentId === undefined);

  return (
    <main>
      <Router>
        <Switch>
          <Route path="/:id">
            {
              topLevelNodes.map(
                (node, index) => <Article
                  conversation={ conversation }
                  key={ index }
                />)
              }
            }
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
