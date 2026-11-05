import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import * as Location from 'expo-location';


export default function WelcomeScreen() {
    const [language, setLanguage] = useState<'en' | 'bn' | 'hi'>('en');

    const [locationGranted, setLocationGranted] = useState(false);

    const [progress] = useState(50);
    const [downloaded] = useState(80);
    const [total] = useState(148);
    async function handleAllowLocation() {

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            setLocationGranted(true);
        }
    }

    function handleContinue() {
        router.replace('/(tabs)');
    }


    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'bn', label: 'বাং' },
        { code: 'hi', label: 'हिं' },
    ] as const;

    return (
        <View style={styles.screen}>

            <View style={styles.langRow}>
                {languages.map((lang) => (
                    <Pressable
                        key={lang.code}
                        style={[
                            styles.langChip,
                            language === lang.code && styles.langChipActive,
                        ]}
                        onPress={() => setLanguage(lang.code)}
                    >
                        <Text
                            style={[
                                styles.langChipText,
                                language === lang.code && styles.langChipTextActive,
                            ]}
                        >
                            {lang.label}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.heroSection}>
                <View style={styles.iconBox}>
                    <Text style={styles.iconEmoji}>📍</Text>
                </View>
                <Text style={styles.appName}>Kolkata{'\n'}Pandal Hopping</Text>
                <Text style={styles.tagline}>Plan your Durga Puja route. Works offline.</Text>
            </View>


            <View style={styles.card}>
                <View style={styles.cardRow}>
                    <Text style={styles.cardTitle}>Downloading Kolkata map</Text>
                    <Text style={styles.progressPercent}>{progress}%</Text>
                </View>

                <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.cardSub}>{downloaded} of {total} MB</Text>
                    <Text style={styles.cardSub}>Wi-Fi recommended</Text>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.locationRow}>
                    <View style={styles.locationIconBox}>
                        <Text>📍</Text>
                    </View>
                    <View style={styles.locationTextBox}>
                        <Text style={styles.cardTitle}>Show pujas near you</Text>
                        <Text style={styles.cardSub}>Location is used only on your phone</Text>
                    </View>
                    {!locationGranted ? (
                        <TouchableOpacity style={styles.allowBtn} onPress={handleAllowLocation}>
                            <Text style={styles.allowBtnText}>Allow</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.grantedText}>✓ On</Text>
                    )}
                </View>
            </View>

            <View style={{ flex: 1 }} />

            <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
                <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>

        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FAF8F5',  
        paddingHorizontal: 16,
        paddingTop: 60,             
        paddingBottom: 32,
    },

    // Language switcher
    langRow: {
        flexDirection: 'row',      
        alignSelf: 'flex-end',     
        backgroundColor: '#fff',
        borderRadius: 999,
        padding: 4,
        gap: 2,
    },
    langChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    langChipActive: {
        backgroundColor: '#C0392B',
    },
    langChipText: {
        fontSize: 13,
        color: '#6B6B6B',
    },
    langChipTextActive: {
        color: '#fff',
        fontWeight: '600',
    },

    // Hero section
    heroSection: {
        alignItems: 'center',        
        marginTop: 32,
        marginBottom: 32,
    },
    iconBox: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#E8714A',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    iconEmoji: {
        fontSize: 36,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        lineHeight: 40,
        marginBottom: 10,
    },
    tagline: {
        fontSize: 15,
        color: '#6B6B6B',
        textAlign: 'center',
    },

    // Cards
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',  // pushes children to opposite ends
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    cardSub: {
        fontSize: 13,
        color: '#6B6B6B',
    },

    progressTrack: {
        height: 6,
        backgroundColor: '#E8E0D8',
        borderRadius: 999,
        marginBottom: 8,
    },
    progressFill: {
        height: 6,
        backgroundColor: '#C0392B',
        borderRadius: 999,
    },
    progressPercent: {
        fontSize: 15,
        fontWeight: '700',
        color: '#C0392B',
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    locationIconBox: {
        width: 40,
        height: 40,
        borderRadius: 999,
        backgroundColor: '#FAE8E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationTextBox: {
        flex: 1,         
    },

    allowBtn: {
        backgroundColor: '#FAE8E8',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
    },
    allowBtnText: {
        color: '#C0392B',
        fontWeight: '600',
        fontSize: 13,
    },
    grantedText: {
        color: '#2ECC71',
        fontWeight: '600',
        fontSize: 13,
    },

    continueBtn: {
        backgroundColor: '#C0392B',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
    },
    continueBtnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
});