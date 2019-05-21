import api from '../services/api';
import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native';
import ModuleContentList from '../components/ModuleContentList';

export default class ModuleScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.course.nome
    })

    state = {
        modules: []
    }

    componentDidMount() {
        this.loadModules();
    }

    loadModules = async () => {
        const response = await api.get('/modulos');
        let modules = response.data;

        if (!modules.length) {
            return;
        }

        modules = modules.filter((item) => item.nome && item.nome.length);
        this.setState({ modules });
    }

    renderModule = ({ item }) => (
        <View style={styles.moduleContainer}>
            <Text style={styles.moduleName}>{item.nome}</Text>

            <ModuleContentList data={item.conteudos}/>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.listModules}
                    data={this.state.modules}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderModule}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    listModules: {
        padding: 20
    },
    moduleContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    moduleName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    }
});