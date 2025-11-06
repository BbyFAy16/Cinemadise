import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

const posters = [
  require('../assets/posters/poster1.jpg'),
  require('../assets/posters/poster2.jpeg'),
  require('../assets/posters/poster3.jpeg'),
  require('../assets/posters/poster4.jpeg'),
  require('../assets/posters/poster5.jpg'),
  require('../assets/posters/poster6.jpg'),
];

const AuthLanding = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Poster Carousel fills top 75% */}
      <View style={styles.carouselContainer}>
        <Carousel
          width={width}
          height={height * 0.75}
          autoPlay
          autoPlayInterval={2500}
          data={posters}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image source={item} style={styles.poster} resizeMode="cover" />
          )}
        />
      </View>

      {/* Bottom black container (25%) */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>CINEMADISE</Text>
        <Text style={styles.subtitle}>Book Your Cinema Story</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    width: '100%',
    height: height * 0.75,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    paddingTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ee481a',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },
  buttonContainer: {
    width: '80%',
  },
  signUpBtn: {
    backgroundColor: '#ee481a',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  signUpText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  loginBtn: {
    borderWidth: 2,
    borderColor: '#ee481a',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: '#ee481a',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default AuthLanding;