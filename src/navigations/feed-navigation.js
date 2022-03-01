import {createStackNavigator} from 'react-navigation-stack';
import FeedScreen from '../scenes/AppScenes/Feed';
import RecipeViewScreen from '../scenes/AppScenes/RecipeView';


const FeedNavigationConfig = {
    initialRouteName: 'Feed',
    header: null,
    headerMode: 'none',
  };

  const RouteConfigs = {
    Feed:FeedScreen,
    RecipeView:RecipeViewScreen,
};

const FeedNavigator = createStackNavigator(RouteConfigs, FeedNavigationConfig);

export default FeedNavigator;