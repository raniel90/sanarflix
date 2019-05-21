import { createStackNavigator, createAppContainer } from 'react-navigation';
import CoursesScreen from './pages/courses';
import ModuleScreen from './pages/module';
import ModuleItemScreen from './pages/moduleItem';

const RootStack = createStackNavigator({
    Courses: {
        screen: CoursesScreen
    },
    Module: {
        screen: ModuleScreen
    },
    ModuleItem: {
        screen: ModuleItemScreen
    },
}, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5D0F2E'
            },
            headerTintColor: '#FFF'
        }
    });

const App = createAppContainer(RootStack);

export default App;