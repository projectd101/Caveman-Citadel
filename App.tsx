import { StatusBar } from 'expo-status-bar';
import {
  Fraunces_500Medium_Italic,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  useFonts as useDisplayFonts,
} from '@expo-google-fonts/fraunces';
import {
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
  useFonts as useBodyFonts,
} from '@expo-google-fonts/ibm-plex-sans';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CitadelProvider } from './src/context/CitadelContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme/theme';

export default function App() {
  const [displayLoaded] = useDisplayFonts({
    Fraunces_500Medium_Italic,
    Fraunces_600SemiBold,
    Fraunces_700Bold,
  });
  const [bodyLoaded] = useBodyFonts({
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
  });

  if (!displayLoaded || !bodyLoaded) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <CitadelProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </CitadelProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
