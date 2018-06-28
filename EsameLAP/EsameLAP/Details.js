import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TextInput,
  Platform,
  Button,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

const TINT_COLOR = 'rgb(4, 159, 239)';

export default class Details extends React.Component {
  state = {
    name: '',
    address: '',
    img: ''
  };

  componentWillMount() {
    this.props.navigation.setParams({ onSave: this._save });
    let item = this.props.navigation.state.params.currentPref;
    if (item) {
      this.setState({ ...item });
    }
  }

  _save = () => {
    const onSaveEdit = this.props.navigation.state.params.onSaveEdit;
    if (onSaveEdit) {
      let item = this.props.navigation.state.params.currentPref;
      const updatedPref = {...item, ...this.state};
      onSaveEdit(updatedPref);
      AsyncStorage.setItem("todolist", JSON.stringify(this.state))
      this.props.navigation.goBack();
      return;
    }

    const onAdd = this.props.navigation.state.params.onAdd;
    if (onAdd) {
      const newPref = {
        name: this.state.name,
        address: this.state.address,
        img: this.state.address
      };
      onAdd(newPref);
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.todowrapper, { padding: 15 }]}>
          <TextInput
            value={this.state.name}
            style={[styles.textInputStyleOnAndroid, styles.label]}
            placeholder="Name of the place"
            autoFocus
            underlineColorAndroid={TINT_COLOR}
            onChangeText={value => this.setState({ name: value })}
            onSubmitEditing={this._save}
          />
          <TextInput
            value={this.state.address}
            style={[styles.textInputStyleOnAndroid, styles.label]}
            placeholder="Address of the place"
            autoFocus
            underlineColorAndroid={TINT_COLOR}
            onChangeText={value => this.setState({ address: value })}
            onSubmitEditing={this._save}
          />
        </View>
        <View style={styles.todowrapper}>
        </View>
      </View>
    );
  }
}

Details.navigationOptions = ({ navigation }) => ({
  title: 'Details',
    headerStyle: {
      backgroundColor: '#f4511e'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
      fontWeight: 'bold'
  },
  headerLeft: <Button title="Cancel" onPress={() => navigation.goBack()} />,
  headerRight: (
    <TouchableOpacity onPress={() => navigation.state.params.onSave()}>
      <Text style={styles.headerBtn}>
        {Platform.OS === 'ios' ? 'Save' : 'SAVE'}
      </Text>
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#E9E9EF', flex: 1 },
  todowrapper: {
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: 'orange',
  },
  textInputStyleOnAndroid: Platform.OS === 'android'
    ? { paddingBottom: 7, paddingLeft: 7 }
    : {},
  headerBtn: {
    color: Platform.OS === 'ios' ? TINT_COLOR : 'orange',
    padding: 10,
    fontSize: 18,
  },
});
