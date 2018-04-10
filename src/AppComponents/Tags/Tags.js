import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';
import _ from 'lodash';
import { Styles } from 'AppStyles';
import { TagsItem } from './TagsItem';

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsLabel: {
    flex: 1,
    color: Styles.FONT_COLOR,
  }
});

export class Tags extends Component {
  static labels = ['Eat', 'Drink', 'Sleep', 'Do'];
  static propTypes = {
    tagsLabel: PropTypes.string,
    onTagSelected: PropTypes.func,
    tagsSelected: PropTypes.array
  }
  static defaultProps = {
    tagsLabel: 'Choose a tag',
    onTagSelected: _.noop,
  };

  constructor(props) {
    super(props);
    this.tags = {};
    this.getSelectedTags = this.getSelectedTags.bind(this);
  }

  getSelectedTags() {
    const selectedTags = _.reduce(this.tags, (memo, ref, label) => {
      const { selected } = ref.state;
      if (selected) {
        memo.push(label);
      }
      return memo;
    }, []);
    return selectedTags;
  }

  render() {
    const { onTagSelected, tagsSelected } = this.props;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.tagsLabel}>
          {this.props.tagsLabel}
        </Text>
        {Tags.labels.map((label, idx) => (
            <TagsItem
              selected={tagsSelected ? !!tagsSelected.filter(item => item === label).length : false}
              label={label}
              key={idx}
              onPress={() => onTagSelected(this.getSelectedTags())}
              ref={(e) => this.tags[label] = e}
            />)
        )}
      </View>
    );
  }
}
