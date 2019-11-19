import React from 'react';
import logo from './logo.svg';
import conversation from './conversation';
import Article from './Article';
import './App.css';
import { useRoutes } from "hookrouter";
const routes = {
  "/": () => <h1>Nothing</h1>,
  "/:route": ({ route }) => <Article
    route={route}
    conversation={conversation}
  />
};

function App() {
  const topLevelNodes = conversation.nodes.filter(node => node.parentId === undefined);
  const routeResult = useRoutes(routes);

  return (
    <main>
      {
        routeResult ||
        topLevelNodes.map(
          ( node, index) => <Article
            conversation={ conversation }
            key={ index }
          />
        )
      }
    </main>
  );
}

export default App;
