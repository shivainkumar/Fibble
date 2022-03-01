import {createStackNavigator} from 'react-navigation-stack';
import ProfileView from '../scenes/AppScenes/ProfileView';
import RecipeViewScreen from '../scenes/AppScenes/RecipeView';
import SearchScreen from '../scenes/AppScenes/Search';


const SearchNavigationConfig = {
    initialRouteName: 'Search',
    header: null,
    headerMode: 'none',
  };

  const RouteConfigs = {
    Search: SearchScreen,
    Profile: ProfileView,
    RecipeView: RecipeViewScreen
};

const SearchNavigator = createStackNavigator(RouteConfigs, SearchNavigationConfig);

export default SearchNavigator;