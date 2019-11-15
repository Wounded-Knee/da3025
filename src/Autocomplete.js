import React from 'react';
import Autocomplete from 'react-autocomplete-2';

class AutocompleteWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <Autocomplete
        { ...this.props }
        onChange={ this.onChange.bind(this) }
      />
    );
  }

  onChange(e) {
    const superOnChange = this.props.onChange || function() {};
    console.log('onChange');
    this.props.onChange(e);
  }
};

AutocompleteWrapper.defaultProps = {
  getItemValue: (node) => node.text,
  suggestionsMenuId: "input-name-suggestions",
  items: [],
  selectOnBlur: true,
  autoHighlight: true,
  renderItem: (node, isHighlighted) =>
    <div
      key={node.id}
      role="option"
      style={{ background: isHighlighted ? 'lightgray' : 'white'}}
    >
      {node.text}
    </div>,
  onChange: e => this.setState({ value: e.target.value }),
  onSelect: value => {
    console.log('onSelect');
    return this.setState({ value });
  },
};

export default AutocompleteWrapper;
