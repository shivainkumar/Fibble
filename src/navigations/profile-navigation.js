import {createStackNavigator} from 'react-navigation-stack';
import CreateRecipeScreen from '../scenes/AppScenes/CreateRecipe';
import MyProfile from '../scenes/AppScenes/MyProfile';
import RecipeViewScreen from '../scenes/AppScenes/RecipeView';

const ProfileNavigationConfig = {
    initialRouteName: 'Profile',
    header: null,
    headerMode: 'none',
  };

  const RouteConfigs = {
    Profile:MyProfile,
    RecipeView:RecipeViewScreen,
    CreateRecipe: CreateRecipeScreen
};

const FeedNavigator = createStackNavigator(RouteConfigs, ProfileNavigationConfig);

export default FeedNavigator;