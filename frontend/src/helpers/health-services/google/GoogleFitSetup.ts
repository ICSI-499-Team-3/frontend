import GoogleFit, { Scopes } from 'react-native-google-fit'
import { Alert } from 'react-native';

/**
 * @author Tony Comanzo 
 */
export async function initGoogleFit(onAlreadyAuthorized: () => void, onAuthorizeSuccess: () => void, onAccessDenied: (authResult: string) => void, onAuthorizeError: () => void) {
    const options = {
        scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_NUTRITION_READ,
            Scopes.FITNESS_BLOOD_PRESSURE_READ,
            Scopes.FITNESS_BLOOD_GLUCOSE_READ,
            Scopes.FITNESS_OXYGEN_SATURATION_READ,
            Scopes.FITNESS_BODY_TEMPERATURE_READ,
            Scopes.FITNESS_REPRODUCTIVE_HEALTH_READ,
            Scopes.FITNESS_SLEEP_READ,
            Scopes.FITNESS_HEART_RATE_READ,
        ],
    };

    // check if user already gave access
    await GoogleFit.checkIsAuthorized();
    if (GoogleFit.isAuthorized) {
        onAlreadyAuthorized();
        return;
    }

    Alert.alert(
        "Google Fit Alert", 
        'The app needs access to your Google Fit account in order to sync data. Would you like to grant access?', 
        [
            {
                text: 'Cancel', 
                style: 'cancel',
            },
            {
                text: 'Yes', 
                onPress: () => {
                    GoogleFit.authorize(options)
                        .then(authResult => {
                            if (authResult.success) {
                                onAuthorizeSuccess();
                            } else {
                                onAccessDenied(authResult.message);
                            }
                        })
                        .catch(() => {
                            onAuthorizeError();
                        });
                },
            },
        ],
    );
}