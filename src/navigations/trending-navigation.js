import {createStackNavigator} from 'react-navigation-stack';
import TrendingScreen from '../scenes/AppScenes/Home';
import RecipeViewScreen from '../scenes/AppScenes/RecipeView';
import RecipeListScreen from '../scenes/AppScenes/RecipeList'

const TrendingNavigationConfig = {
    initialRouteName: 'TrendingScreen',
    header: null,
    headerMode: 'none',
  };

  const RouteConfigs = {
  TrendingScreen,
  RecipeListScreen,
  RecipeViewScreen,
  
};

const TrendingNavigator = createStackNavigator(RouteConfigs, TrendingNavigationConfig);

export default TrendingNavigator;