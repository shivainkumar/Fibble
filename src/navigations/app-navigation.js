import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Colors from '../styles/colors';
import TrendingScreen from '../scenes/AppScenes/Trending';
import FeedScreen from './feed-navigation'
import AboutScreen from '../scenes/AppScenes/About';
import MyProfileScreen from './profile-navigation'
import SearchScreen from './search-navigation';

const TabNavigatorConfig = {
  initialRouteName: 'Feed',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Feed:{
    screen:FeedScreen,
    navigationOptions:{
      tabBarLabel: "Feed",
      tabBarOptions: {
        activeTintColor: Colors.SECONDARY,
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="home"
            size={24}
            color={tabInfo.focused ?  Colors.SECONDARY : "#666"}
          />
        );
      },
    }
  },
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