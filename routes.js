import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

