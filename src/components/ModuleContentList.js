import React, { Component } from 'react';
import { getObjectStorage } from '../helper';
import Icon from 'react-native-vector-icons/Feather';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default class ModuleContentList extends Component {

    state = {
        displayedCourses: {}
    }

    componentDidMount() {
        this.setDisplayedCourses();
        this.forceReloadOnBack();
    }

    forceReloadOnBack = () => {
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.setDisplayedCourses();
            }
        );
    }

    setDisplayedCourses = () => {
        getObjectStorage('displayedCourses').then((res) => {
            this.setState({ displayedCourses: res });
        });
    }

    renderItem = ({ item }) => {
        let isModuleItemDisplayed = false;
        const { courseId, module } = this.props;
        const { displayedCourses } = this.state;

        if (displayedCourses) {
            isModuleItemDisplayed = displayedCourses[`${courseId}_${module.id}_${item.id}`]
        }

        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.courseButton} onPress={() => {
                    this.props.navigation.navigate('ModuleItem',
                        {
                            courseId: courseId,
                            moduleId: module.id,
                            moduleItem: item
                        },
                    )
                }}>
                    <View><Text style={styles.itemTitle}>{item.titulo}</Text></View>
                </TouchableOpacity>

                {isModuleItemDisplayed && <View style={styles.iconCheck}><Icon name="check" size={22} color="green" /></View>}
            </View >
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.module.conteudos}
                    extraData={this.state}
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
        marginTop: 10,
        lineHeight: 24
    },
    iconCheck: {
        marginTop: 10
    }
});