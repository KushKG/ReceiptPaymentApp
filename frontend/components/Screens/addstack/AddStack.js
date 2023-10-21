import { createStackNavigator } from '@react-navigation/stack';
import AddCam from './AddCamScreen';
import AddCheck from './AddCheckScreen';
import AddFriends from './AddFriendsScreen';
import AddSplit from './AddSplitScreen';

const Stack = createStackNavigator();

function AddStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Add Cam" component={AddCam} />
            <Stack.Screen name="Add Check" component={AddCheck} />
            <Stack.Screen name="Add Friends" component={AddFriends} />
            <Stack.Screen name="Add Split" component={AddSplit} />
        </Stack.Navigator>
    );
}

export default AddStack;
