import AppleHealthKit, {
    HealthKitPermissions,
} from 'react-native-health';

export function initAppleHealthKit(callback?: () => void) {

    const permissions = {
        permissions: {
            read: [
                AppleHealthKit.Constants.Permissions.HeartRate,
                AppleHealthKit.Constants.Permissions.BloodPressureDiastolic, 
                AppleHealthKit.Constants.Permissions.BloodPressureSystolic, 
                AppleHealthKit.Constants.Permissions.BodyTemperature, 
                AppleHealthKit.Constants.Permissions.Vo2Max,
            ], 
        },
    } as HealthKitPermissions;
    
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
        // called after we receive a response from the system
    
        if (error) {
            console.log('Error: Cannot grant permissions');
        }

        if (callback) {
            callback();
        }
    });
}

