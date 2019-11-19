import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { navigate } from "hookrouter";
import 'react-bootstrap-typeahead/css/Typeahead.css';

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputString: undefined
    };
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.submitForm();
    }
  }

  onChange(selected) {
    var inputString;
    switch(typeof selected) {
      case 'object':
        [{text: inputString}] = selected;
      break;
      case 'string':
        inputString = selected;
      break;
    }
    this.setState({inputString});
    console.log('onChange: ', inputString);
  }

  submitForm() {
    const submittedNode = this.getOrCreateNodeByText( this.state.inputString );
    console.log('Submitted: ', submittedNode);
    navigate(this.props.route + '.' + submittedNode.id);
  }

  getOrCreateNodeByText(text) {
    return this.getNodeByText(text) || this.props.createNode(text, this.props.nodeId);
  }

  getNodeByText(text) {
    return this.props.conversation.nodes.find( node => node.text === text );
  }

  render() {
    const {
      route,
      routeIndex,
      conversation
    } = this.props;
    const routeIndexInt = parseInt(routeIndex, 10) || 0;
    const routeArray = route.split('.').map(routeItem => parseInt(routeItem, 10));
    const getNodeById = id => conversation.nodes.find(node => node.id === id);
    const thisNodeID = routeArray[routeIndexInt];
    const thisNode = getNodeById(thisNodeID);

    if (!thisNode) return <div>Node #{ thisNodeID } not found</div>;

    const nextNodeID = routeArray[routeIndexInt+1];
    const getAuthorByNode = node => conversation.users.find(user => user.id === node.authorId);
    const choices = conversation.nodes.filter(node => node.parentId === thisNode.id && node.authorId !== thisNode.authorId);
    const author = getAuthorByNode(thisNode);

    return (
      <article
        style={{ color: "#"+author.color }}
        title={ author.name }
      >
        { thisNode.text } &nbsp;

        {
          nextNodeID ? <Article
            { ...this.props }
            routeIndex={ routeIndexInt + 1 }
          /> : <Typeahead
            id="nope"
            multiple={ false }
            emptyLabel={ false }
            onKeyDown={ this.onKeyDown.bind(this) }
            labelKey="text"
            options={
              choices
            }
            onInputChange={ this.onChange.bind(this) }
            onChange={ this.onChange.bind(this) }
          />
        }
      </article>
    );
  }
};

export default Article;
