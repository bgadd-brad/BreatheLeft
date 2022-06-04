import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
// import BackgroundTimer from 'react-native-background-timer';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const screen = Dimensions.get('window');

const formatNumber = number => `0${number}`.slice(-2)
const getRamaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs)}
}
export default function App() {
  const [reaminingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const {mins, secs } = getRamaining(reaminingSecs);

  const toggle = () =>  {
    setIsActive(!isActive);
  }

  useEffect(() => {
let interval = null;
if(isActive) {
  interval = setInterval(() => {
    setRemainingSecs(reaminingSecs => reaminingSecs + 1);
  }, 1000);
} else if(!isActive && reaminingSecs !== 0) {
  clearInterval(interval);
}
  }, [isActive])
  return (
    <View style={styles.container}>
      <StatusBar style="light-content" />
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={() => null} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: '#B9AAFf',
    width: screen.width / 2,
    // maxWidth: '10vw',
    height : screen.width / 2,
    // maxHeight: '10vw',
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 40,
    color: '#B9AAFF'
  },
  timerText: { 
    fontSize: 40,
    color: '#B9AAFF',
    marginBottom: 20,
  }
});
