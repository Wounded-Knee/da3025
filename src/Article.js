import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { navigate } from "hookrouter";
import TagCloud from 'react-tag-cloud';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Color from 'color';

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
    navigate(this.props.route + '.' + submittedNode.id);
  }

  getOrCreateNodeByText(text) {
    return this.getNodeByText(text) || this.props.createNode(text, this.getNodeId());
  }

  getNodeByText(text) {
    return this.props.conversation.nodes.find( node => node.text === text );
  }

  getRouteIndex() {
    return parseInt(this.props.routeIndex, 10) || 0;
  }

  getNodeId() {
    return this.getRouteArray()[this.getRouteIndex()];
  }

  getRouteArray() {
    return this.props.route.split('.').map(routeItem => parseInt(routeItem, 10));
  }

  getCloudWords(cloudId) {
    const words = this.getChoices().map(choice => choice.text).join(' ').replace(/[^\w\s]/gi, '').toLowerCase().split(/\s/);
    return words.reduce(
      (obj, item) => (
        {
          ...obj,
          [item]: (
            obj[item] || 0
          ) + 1
        }
      ), {}
    );
  }

  getChoices() {
    const thisNode = this.getNodeById(this.getNodeId());
    return this.props.conversation.nodes.filter(node => node.parentId === thisNode.id && node.authorId !== thisNode.authorId);
  }

  getNodeById(id) {
    return this.props.conversation.nodes.find(node => node.id === id);
  }

  render() {
    const {
      route,
      conversation
    } = this.props;
    const routeIndexInt = this.getRouteIndex();
    const routeArray = this.getRouteArray();
    const thisNodeID = this.getNodeId();
    const thisNode = this.getNodeById(thisNodeID);

    if (!thisNode) return <div title="Node #{ thisNodeID } not found">[{thisNodeID}]</div>;

    window.da = {
      ...window.da,
      getCloudWords: this.getCloudWords.bind(this)
    };

    const getAuthorByNode = node => conversation.users.find(user => user.id === node.authorId);
    const choices = this.getChoices();
    const author = getAuthorByNode(thisNode);
    const isLeafNode = !routeArray[routeIndexInt+1];

    const cloudWords = this.getCloudWords();

    return (
      <article
        style={{ color: "#"+author.color }}
        title={ author.name }
      >
        { thisNode.text } &nbsp;

        {
          !isLeafNode
            ?
              <Article
                { ...this.props }
                routeIndex={ routeIndexInt + 1 }
              />
            :
              <div className="reply">
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
                <div className="tag-cloud">
                  <TagCloud
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 15,
                      padding: 0,
                      width: '100%',
                      height: '100%'
                    }}
                    className="tag-cloud-inner"
                  >
                    {
                      Object.entries(cloudWords).map((word, index) => (
                        <div
                          key={ index }
                          style={{
                            color: Color('#000000').alpha(0.1 * word[1] + 0.2).hsl().string(),
                            fontSize: (word[1] * 9) + 10
                          }}
                        >{ word[0] }</div>
                      ))
                    }
                  </TagCloud>
                </div>
              </div>
        }
      </article>
    );
  }
};

export default Article;
