import {createStackNavigator} from 'react-navigation-stack';
import CreateRecipeScreen from '../scenes/AppScenes/CreateRecipe';
import MyProfileScreen from '../scenes/AppScenes/MyProfile';
import RecipeViewScreen from '../scenes/AppScenes/RecipeView';
import FollowerFollowingListScreen from '../scenes/AppScenes/FollowerFollowingList'
import SettingsScreen from '../scenes/AppScenes/Settings'
const ProfileNavigationConfig = {
    initialRouteName: 'MyProfileScreen',
    header: null,
    headerMode: 'none',
  };

  const RouteConfigs = {
    MyProfileScreen,
    RecipeViewScreen,
    CreateRecipeScreen,
    FollowerFollowingListScreen,
    SettingsScreen
};

const FeedNavigator = createStackNavigator(RouteConfigs, ProfileNavigationConfig);

export default FeedNavigator;