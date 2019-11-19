import React from 'react';
import importedConversation from './conversation';
import Article from './Article';
import './App.css';
import { useRoutes } from "hookrouter";
const conversation = getConversation();

function getConversation() {
  const localStorageConversation = localStorage.getItem("conversation");
  if (localStorageConversation) {
    console.log('Load');
    return JSON.parse(localStorageConversation);
  } else {
    saveConversation(importedConversation);
    return importedConversation;
  }
}

function saveConversation(conversation) {
  localStorage.setItem("conversation", JSON.stringify(conversation));
  console.log('Saved');
}

function createNode(text, parentNodeId) {
  const newId = Math.max.apply( Math, conversation.nodes.map( node => node.id ) ) + 1;
  const newNode = {
    id: newId,
    authorId: 1,
    text: text,
    parentId: parentNodeId,
  };
  conversation.nodes.push(newNode);
  saveConversation(conversation);
  return newNode;
}

const routes = {
  "/": () => <h1>Nothing</h1>,
  "/:route": ({ route }) => <Article
    route={route}
    createNode={ createNode }
    conversation={conversation}
  />
};

function App() {
  const conversation = getConversation();
  const topLevelNodes = conversation.nodes.filter(node => node.parentId === undefined);
  const routeResult = useRoutes(routes);

  return (
    <main>
      {
        routeResult ||
        topLevelNodes.map(
          ( node, index) => <Article
            conversation={ conversation }
            createNode={ createNode }
            key={ index }
          />
        )
      }
    </main>
  );
}

export default App;
