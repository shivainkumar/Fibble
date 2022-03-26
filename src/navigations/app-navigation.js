import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../styles/colors';
import TrendingScreen from './trending-navigation';
import FeedScreen from './feed-navigation'
import AboutScreen from '../scenes/AppScenes/About';
import MyProfileScreen from './profile-navigation'
import SearchScreen from './search-navigation';
import React from 'react';
import store from '../Redux/store';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  // Feed:{
  //   screen:FeedScreen,
  //   navigationOptions:{
  //     tabBarLabel: "Feed",
  //     tabBarOptions: {
  //       activeTintColor: Colors.SECONDARY,
  //     },
  //     tabBarIcon: (tabInfo) => {
  //       return (
  //         <Ionicons
  //           name="home"
  //           size={24}
  //           color={tabInfo.focused ?  Colors.SECONDARY : "#666"}
  //         />
  //       );
  //     },
  //   }
  // },
  Home:{
    screen:TrendingScreen,
    navigationOptions:{
      tabBarLabel: "Trending",
      tabBarOptions: {
        activeTintColor: Colors.SECONDARY,
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="trending-up-outline"
            size={24}
            color={tabInfo.focused ?  Colors.SECONDARY : "#666"}
          />
        );
      },
    }
   
  },
  
  Search:{
    screen:SearchScreen,
    navigationOptions:{
      tabBarLabel: "Search",
      tabBarOptions: {
        activeTintColor: Colors.SECONDARY,
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="search"
            size={24}
            color={tabInfo.focused ?  Colors.SECONDARY : "#666"}
          />
        );
      },
    }
  },

  MyProfile:{
    screen:MyProfileScreen,
    navigationOptions:{
      tabBarLabel: "Profile",
      tabBarOptions: {
        activeTintColor: Colors.SECONDARY,
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="person"
            size={24}
            color={tabInfo.focused ?  Colors.SECONDARY : "#666"}
          />
        );
      },
    }
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
// export default class App extends React.Component {
//   render() {
//     return (
//         <AppNavigator />
//     );
//   }
// }