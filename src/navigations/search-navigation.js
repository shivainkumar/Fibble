import {createStackNavigator} from 'react-navigation-stack';
import ProfileView from '../scenes/AppScenes/ProfileView';
import RecipeViewScreen from '../scenes/AppScenes/RecipeView';
import SearchRecipeScreen from '../scenes/AppScenes/SearchRecipe';
import SearchUserScreen from '../scenes/AppScenes/SearchUser';

import RecipeListScreen from '../scenes/AppScenes/RecipeList'

const SearchNavigationConfig = {
    initialRouteName: 'SearchRecipe',
    header: null,
    headerMode: 'none',
  };

  const RouteConfigs = {
    SearchRecipe: SearchRecipeScreen,
    SearchUser: SearchUserScreen,
    Profile: ProfileView,
    RecipeView: RecipeViewScreen,
    Results: RecipeListScreen
};

const SearchNavigator = createStackNavigator(RouteConfigs, SearchNavigationConfig);

export default SearchNavigator;