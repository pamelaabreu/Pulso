  import React, { useState, useEffect } from "react";
  import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Vibration,
    ImageBackground
  } from "react-native";
  // import * as Font from 'expo-font';
  
  
  export default function App() {
    const [buttons, setButtons] = useState({
      BINGO: {
        vibrate: false,
        pattern: [1000, 0.1, 200, 0.1, 3000, 0.1, 100, 0.1, 4000, 0.1, 200, 0.1, 1000 ],
        imageURI: require("./assets/box.gif")
      },
      "Big-O": {
        vibrate: false,
        pattern: [500, 2, 500, 2],
        imageURI: require("./assets/lines.gif")
      },
      Bang: {
        vibrate: false,
        pattern: [2000, 2, 2000, 2, 2000],
        imageURI: require("./assets/bang.gif")
      },
      "Big Bang": {
        vibrate: false,
        pattern: [1000, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        imageURI: require("./assets/blackHole2.gif")
      }
    });
    const [currentButton, setCurrentButton] = useState("");
    const [loading, setLoading] = useState(true);
  
    // useEffect(async () => {
    //   await Font.loadAsync({
    //     Roboto: require("native-base/Fonts/Roboto.ttf")
    //   });
    //   this.setState({ loading: false });
    // })
  
    // async function setLoadStatus (){
    //   await Font.loadAsync({
    //     'RussoOne-Regular': require('./assets/fonts/RussoOne-Regular.ttf'),
    //   });
    // }
  
    // useEffect(() => {
    //   setLoadStatus();
  
    //   setLoading(true);
    // }, [loading])
  
    useEffect(() => {
      if (currentButton) {
        startVibration(buttons[currentButton].pattern);
      } else {
        stopVibration();
      }
    }, [currentButton]);
  
    const startVibration = pattern => {
      console.log("Started Vibration", pattern);
      Vibration.vibrate(pattern, true);
    };
  
    const stopVibration = () => {
      console.log("Stopped Vibration");
      Vibration.cancel();
    };
  
    const setVibration = buttonName => e => {
      const buttonObjectCopy = { ...buttons };
  
      for (const keyname in buttonObjectCopy) {
        if (keyname !== buttonName) {
          buttonObjectCopy[keyname].vibrate = false;
        } else {
          if (buttonObjectCopy[buttonName].vibrate) {
            buttonObjectCopy[buttonName].vibrate = false;
          } else buttonObjectCopy[buttonName].vibrate = true;
        }
      }
  
      if (currentButton === buttonName) {
        setCurrentButton("");
      } else setCurrentButton(buttonName);
  
      setButtons(buttonObjectCopy);
    };
  
    const buttonDisplay = () => {
      const buttonArray = Object.keys(buttons);
      return buttonArray.map((buttonName, index) => {
        const conditionalButtonStyle = buttons[buttonName].vibrate
          ? [styles.uniButtion, styles.activeButton]
          : [styles.uniButtion, styles.inactiveButton];
        const conditionalButtonText = buttons[buttonName].vibrate
          ? [styles.uniButtonText, styles.activeButtonText]
          : [styles.uniButtonText, styles.inactiveButtonText];
  
        return (
          <TouchableOpacity
            key={index}
            style={conditionalButtonStyle}
            onPress={setVibration(buttonName)}
          >
            {/* {
            loading ? <Text style={conditionalButtonText}>{buttonName}</Text> : null
          } */}
            <Text style={conditionalButtonText}>{buttonName}</Text>
          </TouchableOpacity>
        );
      });
    };
  
    const renderBackgroundImage = currentButton
      ? buttons[currentButton].imageURI
      : null;
  
    return (
      <View style={styles.container}>
        <ImageBackground
          source={renderBackgroundImage}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.contentContainer}>
            <View>{buttonDisplay()}</View>
          </View>
        </ImageBackground>
      </View>
    );
  }
  
  const red = "#EA4200";
  const pink = "#FFADB1";
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: pink
    },
    contentContainer: {
      padding: 10,
      paddingTop: 30,
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    inactiveButton: {
      backgroundColor: pink
    },
    inactiveButtonText: {
      color: red
    },
    activeButton: {
      backgroundColor: red
    },
    activeButtonText: {
      color: pink
    },
    uniButtion: {
      borderColor: red,
      borderWidth: 4,
      borderRadius: 20,
      paddingVertical: 30,
      paddingHorizontal: 0,
      marginBottom: 30,
      marginTop: 30
    },
    uniButtonText: {
      fontSize: 20,
      textAlign: "center",
      fontWeight: "900"
      // fontFamily: "RussoOne-Regular"
    }
  });
  