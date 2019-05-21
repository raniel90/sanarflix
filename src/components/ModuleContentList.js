import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Text, View, FlatList, StyleSheet } from 'react-native';

export default class ModuleContentList extends Component {

    renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View><Text style={styles.itemTitle}>{item.titulo}</Text></View>
            <View><Icon name="check" size={22} color="green" /></View>
        </View>
    )

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemTitle: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24
    },
});