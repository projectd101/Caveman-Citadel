import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBar } from '../components/BottomTabBar';
import { useCitadel } from '../context/CitadelContext';
import { HomeScreen } from '../screens/HomeScreen';
import { ReadingHistoryScreen, SavedSnopsScreen } from '../screens/LibraryScreens';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { AboutScreen, PreferencesScreen } from '../screens/PlaceholderScreens';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SnopDetailScreen } from '../screens/SnopDetailScreen';
import { colors } from '../theme/theme';
import type { RootStackParamList, TabParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.bg,
    text: colors.text,
    border: colors.border,
    primary: colors.accent,
  },
};

type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

function CitadelTabBar(props: BottomTabBarProps) {
  const { notifications } = useCitadel();
  return <BottomTabBar {...props} hasUnread={notifications.some((n) => n.unread)} />;
}

function HomeRoute({ navigation }: TabScreenProps<'Home'>) {
  return (
    <HomeScreen onOpenSnop={(snopId) => navigation.navigate('SnopDetail', { snopId })} />
  );
}

function NotificationsRoute({ navigation }: TabScreenProps<'Notifications'>) {
  return (
    <NotificationsScreen onOpenSnop={(snopId) => navigation.navigate('SnopDetail', { snopId })} />
  );
}

function ProfileRoute({ navigation }: TabScreenProps<'Profile'>) {
  return (
    <ProfileScreen
      onOpenSaved={() => navigation.navigate('SavedSnops')}
      onOpenHistory={() => navigation.navigate('ReadingHistory')}
      onOpenPreferences={() => navigation.navigate('Preferences')}
      onOpenAbout={() => navigation.navigate('About')}
    />
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CitadelTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tab.Screen name="Home" component={HomeRoute} />
      <Tab.Screen name="Notifications" component={NotificationsRoute} />
      <Tab.Screen name="Profile" component={ProfileRoute} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="SnopDetail" component={SnopDetailRoute} />
        <Stack.Screen name="SavedSnops" component={SavedRoute} />
        <Stack.Screen name="ReadingHistory" component={HistoryRoute} />
        <Stack.Screen name="Preferences" component={PreferencesRoute} />
        <Stack.Screen name="About" component={AboutRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SnopDetailRoute({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'SnopDetail'>) {
  return <SnopDetailScreen snopId={route.params.snopId} onBack={() => navigation.goBack()} />;
}

function SavedRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'SavedSnops'>) {
  return (
    <SavedSnopsScreen
      onBack={() => navigation.goBack()}
      onOpenSnop={(snopId) => navigation.navigate('SnopDetail', { snopId })}
    />
  );
}

function HistoryRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'ReadingHistory'>) {
  return (
    <ReadingHistoryScreen
      onBack={() => navigation.goBack()}
      onOpenSnop={(snopId) => navigation.navigate('SnopDetail', { snopId })}
    />
  );
}

function PreferencesRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'Preferences'>) {
  return <PreferencesScreen onBack={() => navigation.goBack()} />;
}

function AboutRoute({ navigation }: NativeStackScreenProps<RootStackParamList, 'About'>) {
  return <AboutScreen onBack={() => navigation.goBack()} />;
}
