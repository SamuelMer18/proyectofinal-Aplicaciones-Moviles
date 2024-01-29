import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permiso de Cámara",
          message: "Esta aplicación necesita acceso a tu cámara.",
          buttonNeutral: "Pregúntame Luego",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasCameraPermission(true);
      } else {
        Alert.alert("Permiso de cámara denegado");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={styles.flexContainer}>
      {hasCameraPermission ? (
        <WebView
          source={{ uri: 'https://proyectofinalweb.vercel.app' }}
          style={styles.flexContainer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          mixedContentMode="compatibility"
        />
      ) : (
        Alert.alert("Se requiere permiso de cámara para esta aplicación.")
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    marginTop: 25,
  },
});

export default App;
