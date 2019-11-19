import React from 'react';
import importedConversation from './conversation';
import Article from './Article';
import './App.css';
import { useRoutes, A, navigate } from "hookrouter";
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

function copyJSON() {
  /* Get the text field */
  var copyText = document.getElementById("json");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}

const routes = {
  "/": () => <h1>Nothing</h1>,
  "/json": () => (
    <textarea id="json" onClick={ copyJSON }>
      { JSON.stringify(conversation,undefined,2) }
    </textarea>
  ),
  "/reload": () => {
    localStorage.removeItem('conversation');
    navigate('/1000');
  },
  "/:route": ({ route }) => <Article
    route={route}
    createNode={ createNode }
    conversation={conversation}
  />,
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
            route={ node.id }
            conversation={ conversation }
            createNode={ createNode }
            key={ index }
          />
        )
      }

      <footer>
        <A href="/json">JSON</A> |
        <A href="/1000">Main</A> | 
        <A href="/reload">Reload Data</A> | 
      </footer>
    </main>
  );
}

export default App;
