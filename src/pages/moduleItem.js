import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { setObjectStorage } from '../helper';

export default class ModuleItemScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.moduleItem.titulo
    });

    componentDidMount() {
        this.saveDisplayed();
    }

    saveDisplayed = async () => {
        const { courseId, moduleId, moduleItem } = this.props.navigation.state.params;
        const storageKey = `${courseId}_${moduleId}_${moduleItem.id}`;

        try {
            await setObjectStorage('displayedCourses', storageKey, true);
        } catch (error) {
            console.log('Error on saveDisplayed', error);
        }
    };

    render() {
        const { titulo } = this.props.navigation.state.params.moduleItem;

        return (
            <View style={styles.container}>
                <Text style={styles.mainText}>Nesta tela será será exibido o conteúdo do vídeo {titulo}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center'
    },
    mainText: {
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center'
    }
});