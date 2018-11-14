import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, TextInput} from 'react-native';
import ItemTodo from './item-todo';

var SQLite = require('react-native-sqlite-storage');
const SQL_CREATE_TODO = 'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, checked INTEGER NOT NULL)';
const SQL_INSERT_TODO = 'INSERT INTO todos (name, checked) VALUES ("Terminar App EmiStore", 0), ("Leer sobre Redux", 0), ("Estudiar Js", 0), ("Lavar la ropa", 0), ("Terminar de leer libro", 0), ("Ir al Gym", 0), ("Farrear", 0)';
const SQL_DELETE = 'DELETE todos WHERE id = ?';
const SQL_UPDATE_STATE = 'UPDATE todos SET checked = ? WHERE id = ?';

const NAME_DB = 'database-test1.db';
const LOCATION = 'default';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
        todoList: [],
        task: ''
    }
}
  componentDidMount(){
    this.connection();
  }

  connection() {
      console.log('Estableciendo coneccion...');
      SQLite.openDatabase({ name: NAME_DB, location: LOCATION }, (db) => {  
        console.log( 'Success: ', db );
        db.transaction((tx)=>{
          tx.executeSql(SQL_CREATE_TODO, [], (tx, results) =>{
            console.log('create db results' + results);
            this.getAllItems();
          })
        })
      }, (error) => {
        console.log( 'Error: ', success );
      } )
  }

  insert(){
    console.log('Estableciendo coneccion...');
    SQLite.openDatabase({ name: NAME_DB, location: LOCATION }, (db) => {
      console.log( 'Success: ', db );
      db.transaction((tx)=>{
        tx.executeSql(SQL_INSERT_TODO, [], (tx, results) =>{
          console.log('insert results' + results);
        })
      })
    }, (error) => {
      console.log( 'Error: ', success );
    } )
  }

  add(text) {
      SQLite.openDatabase({ name: NAME_DB, location: LOCATION }, (db) => {
        
        db.transaction((tx)=>{
          tx.executeSql('INSERT INTO todos (name, checked) values (?, 0)', [text], (tx, results) =>{
            console.log('insert results' + results);
          })
        })
        this.getAllItems();

      }, (error) => {
        console.log( 'Error: ', error );
      } )
  }

  getAllItems(){
    SQLite.openDatabase({ name: NAME_DB, location: LOCATION }, (db) => {
      db.transaction((tx)=>{
        tx.executeSql('SELECT * FROM todos ORDER BY id DESC', [], (tx, results) =>{
            this.setState({
              todoList: results.rows.raw()
            })
        })
      })
    }, (error) => {
      console.log( 'Error: ', error );
    } )
  }
  
  update(checked, id) {
    console.log("update ");
  }
  
  delete(id) {
    console.log("delete");
  }

  renderItem = ( { item }) => <ItemTodo onPressEvent={ this.props.onPressEvent } todo = { item } />
  emptyComponent = () => <Text>Todo empty </Text>
  keyExtractor = item => item.id.toString();
  emptyComponent = () => <Text>Todo empty </Text>
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}> Todo - Taller CEDESISTEMAS SQLite React Native</Text>
        {/* <Button
            title="Insert Data"
            onPress = { ()=> this.insert() }
        /> */}
          <View style={styles.containerTextInput}>
            <TextInput style ={ styles.TextInput }
              placeholder="What do you need to do?"
              value={this.state.task}
              onChangeText={task => this.setState({ task })}
              onSubmitEditing={() => {
                this.add(this.state.task);
                this.setState({ task: null });
              }}
          />
        </View>
        <FlatList
          data ={ this.state.todoList }
          renderItem={ this.renderItem }
          keyExtractor = { this.keyExtractor }
          ListEmptyComponent = { this.emptyComponent }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  containerTextInput: {
    flexDirection: 'row',
  },
  TextInput:{
    flex: 1,
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
  }
});