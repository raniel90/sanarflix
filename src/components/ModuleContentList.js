import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'

export default class ModuleContentList extends Component {

    renderItem = ({ item }) => (
        <View>
            <Text>{item.titulo}</Text>
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
