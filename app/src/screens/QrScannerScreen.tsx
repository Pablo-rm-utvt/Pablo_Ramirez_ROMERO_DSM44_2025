import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions, ScanningResult } from 'expo-camera';
import { appTheme } from '../themes/appTheme';

export const QrScannerScreen = () => {

    const [color, setColor] = useState<string>("white");
    const [qrdata, setQrData] = useState<ScanningResult>();
    const [permissions, requestPermissions] = useCameraPermissions();
    const colors: string[] = ["#129B44", "#5D00B9", "#4878CB", "#BCEC00"];

    const randomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    useEffect(() => {
        (async () => {
            (!permissions?.granted) && (async () => await requestPermissions());
        });

        const interval = setInterval(() => {
            setColor(randomColor);
        }, 400);

        return () => clearInterval(interval);
    }, []);

    return (
        <View
            style={{ width: "100%", height: "100%" }}
        >
            <CameraView
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={(result: ScanningResult) => {
                    setQrData(result);
                }}
            >
                <View
                    style={{ height: "100%", width: "100%" }}
                >
                    <View
                        style={{
                            width: 200,
                            height: 200,
                            borderColor: color,
                            borderWidth: 10,
                            position: "absolute",
                            top: "35%",
                            alignSelf: "center",
                            borderRadius: 10
                        }}
                    />
                    <Text
                        style={{
                            ...appTheme.title,
                            alignSelf: "center",
                            color: color,
                            top: "68%"
                        }}
                    >
                        Escaner QR
                    </Text>
                    <Text
                        style={{
                            ...appTheme.title,
                            alignSelf: "center",
                            color: "white",
                            top: "70%",
                            fontSize: 20,
                        }}
                    >
                        Data: {JSON.stringify(qrdata?.data)}
                    </Text>
                </View>
            </CameraView>
        </View>
    );
}

