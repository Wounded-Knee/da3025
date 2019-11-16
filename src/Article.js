import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
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
  }

  getOrCreateNodeByText(text) {
    return this.getNodeByText(text) || this.createNode(text);
  }

  createNode(text) {
    const newId = Math.max.apply( Math, this.props.conversation.nodes.map( node => node.id ) ) + 1;
    const newNode = {
      id: newId,
      authorId: 1,
      text: text,
      parentId: this.props.nodeId,
    };
    this.props.conversation.nodes.push(newNode);
    return newNode;
  }

  getNodeByText(text) {
    return this.props.conversation.nodes.find( node => node.text === text );
  }

  render() {
    const {nodeId, conversation} = this.props;
    const getNodeById = id => conversation.nodes.find(node => node.id === id);
    const getAuthorByNode = node => conversation.users.find(user => user.id === node.authorId);
    const thisNode = getNodeById(nodeId);
    const children = conversation.nodes.filter(node => node.parentId === thisNode.id && node.authorId === thisNode.authorId);
    const choices = conversation.nodes.filter(node => node.parentId === thisNode.id && node.authorId !== thisNode.authorId);
    const author = getAuthorByNode(thisNode);

    return (
      <article style={{ color: "#"+author.color }} title={ author.name }>
        { thisNode.text }
        &nbsp;
        <Typeahead
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
      </article>
    );
  }
};

export default Article;
