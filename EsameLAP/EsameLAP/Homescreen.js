//ESAME

import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, ActivityIndicator, StatusBar, TouchableHighlight, Button, AsyncStorage } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  
  constructor(){
    super()
    this.state = {
      dataSource: [],
      isLoading: true
    }
  }
    static navigationOptions = {
      title: "Homescreen",
      headerStyle: {
          backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold'
      },
      headerRight : <Button title="Add" onPress={ () => this.props.navigation.navigate("Details")}/>
  }
  renderItem = ({item}) => {
    return(
      <TouchableHighlight onPress={ () => this.props.navigation.navigate("Details",{name:item.name, address:item.address,img:item.img} )} underlayColor={"red"}>
      <View style={styles.viewstyle}>
      <Image style={styles.imgstyle} source={{uri: item.img}}/>
      <View style={styles.viewstyle2}>
        <Text style={styles.txtstyle}>{item.name}</Text>
        <Text>{item.address}</Text>
        <Text>{item.tags}</Text>
      </View>
    </View>
    </TouchableHighlight>
      )
    
  }
  
  renderSeparator = () => {
    return(
        <View style={styles.stylerendersep}>
        
        </View>
      )
  }
  componentDidMount (){
    const url = 'http://www.dmi.unict.it/~calanducci/LAP2/favorities.json'
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson.data,
        isLoading: false
      }) 
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  render() {
    return (
      this.state.isLoading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large" animating/></View> :
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item,index) => index}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  viewstyle: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3
  },
  viewstyle2:{
    flex: 1,
    justifyContent: 'center',
  },
  imgstyle: {
    width: 100,
    height: 100,
    margin: 5,
  },
  txtstyle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15
  },
  stylerendersep: {
    height: 1,
    width: '100%',
    backgroundColor: 'black'
  },
});
