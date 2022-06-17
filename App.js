import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
// import BackgroundTimer from 'react-native-background-timer';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const screen = Dimensions.get('window');

const formatNumber = number => `0${number}`.slice(-2)
const getRamaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs:formatNumber(secs)}
}
export default function App() {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const {mins, secs } = getRamaining(remainingSecs);

  const toggle = () =>  {
    setIsActive(!isActive);
  }

  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
  }

  useEffect(() => {
  let interval = null;

  if(isActive) {
  interval = setInterval(() => {
    setRemainingSecs(remainingSecs => remainingSecs + 1);
    console.log(remainingSecs);
  }, 1000);
} else if(!isActive && remainingSecs !== 0) {
  clearIntervalal(interval);
}
  }, [isActive]);

  return (
    <View style={styles.container}>
      <StatusBar style="light-content" />

      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
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
    height : screen.width / 2,
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
  },
  buttonReset: {
    marginTop: 20,
    borderColor: '#FF851B',
  },
  buttonTextReset: {
    color: '#FF851B',
  }
});
