import React from 'react';
import {
    Text,
    View,
    StyleSheet ,
    Image,
    TouchableHighlight
} from 'react-native';

const ItemTodo = (props) => {
    return (    <TouchableHighlight
        onPress = { ()=> props.onPressEvent(props.item) }
        underlayColor = "#ccc"
    >
        <View style={ styles.container }>
            <View>
                <Image
                    style={ styles.image }
                    source ={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-2IFfE-OJ6zJfHhuKspsPvBNk6W2OOsQuo7naPue3rEBFvOHl'}}
                />
            </View>
            <View style={ styles.context }>
                <View>
                    <Text style={ styles.name }> { props.todo.name }</Text>
                    <Text>{ props.todo.checked  ? 'Terminado' : 'Sin terminar' }</Text>
                </View>
            </View>
        </View>
    </TouchableHighlight>)

}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
    },
    context:{
        paddingLeft: 10,
        justifyContent: 'center'
    },
    image:{ 
        width: 70,
        height: 70,
        borderRadius: 35,
        padding: 3,
        margin: 3,
    },
    name:{
        fontSize: 12,
        fontWeight: '200',
    }
});

export default ItemTodo;