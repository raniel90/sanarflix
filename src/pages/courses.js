import api from '../services/api';
import sortBy from 'lodash/sortBy';
import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

export default class CoursesScreen extends Component {
    static navigationOptions = {
        title: 'Cursos'
    }

    state = {
        courses: []
    }

    componentDidMount() {
        this.loadCourses();
    }

    loadCourses = async () => {
        const response = await api.get('/cursos');
        let courses = response.data;

        if (!courses.length) {
            return;
        }

        courses = sortBy(courses, 'nome');
        this.setState({ courses });
    }

    renderItem = ({ item }) => (
        <View style={styles.courseContainer}>
            <Text style={styles.courseName}>{item.nome}</Text>
            <Text style={styles.courseArea}>{item.area}</Text>

            <TouchableOpacity style={styles.courseButton} onPress={() => {
                this.props.navigation.navigate('Module', { course: item })
            }}>
                <Text style={styles.courseButtonText}>Detalhes do Curso</Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={this.state.courses}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderItem}
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
    list: {
        padding: 20
    },
    courseContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    containerName: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    courseName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#40091D'
    },
    courseArea: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24
    },
    courseButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#999',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    courseButtonText: {
        fontSize: 16,
        color: '#999',
        fontWeight: 'bold'
    }
});