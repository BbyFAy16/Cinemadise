import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';



type Props = NativeStackScreenProps<ParamListBase, 'Splash'>;

const Splash: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AuthLanding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Text branding */}
      <Text style={styles.title}>CINEMADISE</Text>
      <Text style={styles.tagline}>Book Your Cinema Story</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ee481a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 2,
  },
  tagline: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 8,
  },
});

export default Splash;
