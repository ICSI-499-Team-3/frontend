import GoogleFit, { Scopes } from 'react-native-google-fit'

export function initGoogleFit() {
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

      GoogleFit.authorize(options)
        .then(authResult => {
            if (authResult.success) {
                console.log("AUTH_SUCCESS");
            } else {
                console.log("AUTH_DENIED", authResult.message);
            }
        })
        .catch(() => {
            console.log("AUTH_ERROR");
        });
}