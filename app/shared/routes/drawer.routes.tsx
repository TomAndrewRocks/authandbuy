// import CustomDrawer from '@components/Drawer';
// import { Ionicons } from '@expo/vector-icons';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Favorites from '@screens/favorites';
// import Menu from '@screens/menu';
// import Payments from '@screens/payments';
// import React from 'react';
// import { Button, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';

// const Drawer = createDrawerNavigator();

// export default function DrawerScreen() {
//   const handleFocusedColor = (focused: boolean) => {
//     if (focused) {
//       return '#207BD1';
//     } else {
//       return '#207BD1';
//     }
//   };

//   return (
//     <Drawer.Navigator
//       useLegacyImplementation
//       initialRouteName="home"
//       screenOptions={{
//         headerShown: false,
//         // drawerStyle: {
//         //   backgroundColor: hasDarkTheme ? '#353535' : '#f1f1f1',
//         // },
//         // drawerLabelStyle: {
//         //   color: hasDarkTheme ? 'yellow' : '#207BD1',
//         // },
//       }}
//       drawerContent={(props) => <CustomDrawer {...props} />}>
//       <Drawer.Screen
//         name="Favorites"
//         component={Menu}
//         options={{
//           drawerIcon: ({ focused, size, color }) => (
//             <Ionicons
//               name={focused ? 'home' : 'home-outline'}
//               size={size}
//               //   color={handleFocusedColor(focused)}
//             />
//           ),
//         }}
//       />
//       {/* {hasBiometrics && (
//         <Drawer.Screen
//           name="Local Authentication"
//           component={Biometrics}
//           options={{
//             drawerIcon: ({ focused, size, color }) => (
//               <Ionicons name={'finger-print'} size={size} color={handleFocusedColor(focused)} />
//             ),
//           }}
//         />
//       )} */}
//       <Drawer.Screen
//         name="Favorites"
//         component={Favorites}
//         options={{
//           drawerIcon: ({ focused, size, color }) => (
//             <Ionicons
//               name={focused ? 'heart' : 'heart-outline'}
//               size={size}
//               color={handleFocusedColor(focused)}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Payments"
//         component={Payments}
//         options={{
//           drawerIcon: ({ focused, size, color }) => (
//             <Ionicons
//               name={focused ? 'card' : 'card-outline'}
//               size={size}
//               color={handleFocusedColor(focused)}
//             />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}
