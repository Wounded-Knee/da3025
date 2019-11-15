import React from 'react';
import Autocomplete from './Autocomplete';

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  render() {
    const {nodeId, conversation} = this.props;
    const getNodeById = id => conversation.nodes.filter(node => node.id === id)[0];
    const getAuthorByNode = node => conversation.users.filter(user => user.id === node.authorId)[0];
    const thisNode = getNodeById(nodeId);
    const children = conversation.nodes.filter(node => node.parentId === thisNode.id && node.authorId === thisNode.authorId);
    const choices = conversation.nodes.filter(node => node.parentId === thisNode.id && node.authorId !== thisNode.authorId);
    const author = getAuthorByNode(thisNode);

    return (
      <article style={{ color: "#"+author.color }} title={ author.name }>
        { thisNode.text }
        &nbsp;
        <Autocomplete
          getItemValue={(node) => node.text}
          suggestionsMenuId="input-name-suggestions"
          items={ choices }
          value={this.state.value}
          onSubmit={
            () => {
              console.log('onSubmit');
            }
          }
          onChange={e => {
            this.setState({ value: e.target.value });
          }}
          onSelect={value => {
            console.log('onSelect');
            return this.setState({ value });
          }}
        />
      </article>
    );
  }
};

export default Article;
