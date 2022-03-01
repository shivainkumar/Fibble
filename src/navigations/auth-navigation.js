import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../scenes/AuthScenes/Login';
import SignupScreen from '../scenes/AuthScenes/Signup';
import WelcomeScreen from '../scenes/AuthScenes/Welcome';
const AuthNavigatorConfig = {
  initialRouteName: 'Welcome',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
    Welcome:WelcomeScreen,
    Signup:SignupScreen,
    Login:LoginScreen
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;