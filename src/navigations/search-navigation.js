import {createStackNavigator} from 'react-navigation-stack';
import ProfileViewScreen from '../scenes/AppScenes/ProfileView';
import RecipeViewScreen from '../scenes/AppScenes/RecipeView';
import SearchRecipeScreen from '../scenes/AppScenes/SearchRecipe';
import SearchUserScreen from '../scenes/AppScenes/SearchUser';

import RecipeListScreen from '../scenes/AppScenes/RecipeList'

const SearchNavigationConfig = {
    initialRouteName: 'SearchRecipeScreen',
    header: null,
    headerMode: 'none',
  };

  const RouteConfigs = {
    SearchRecipeScreen,
    SearchUserScreen,
    ProfileViewScreen,
    RecipeViewScreen,
    RecipeListScreen
};

const SearchNavigator = createStackNavigator(RouteConfigs, SearchNavigationConfig);

export default SearchNavigator;