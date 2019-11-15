import React from 'react';
import logo from './logo.svg';
import conversation from './conversation';
import Article from './Article';
import './App.css';

function App() {
  const topLevelNodes = conversation.nodes.filter(node => node.parentId === undefined);

  return (
    <main>
      { topLevelNodes.map(node => <Article conversation={ conversation } nodeId={ node.id } key={ node.id } />) }
    </main>
  );
}

export default App;
