import {
    HealthValue,
    BloodPressureSampleValue 
} from 'react-native-health';

export function isHealthValue(data: HealthValue | BloodPressureSampleValue): data is HealthValue {
    return (data as HealthValue).value !== undefined;
}

export function isBloodPressureSampleValue(data: HealthValue | BloodPressureSampleValue): data is BloodPressureSampleValue {
    return (data as BloodPressureSampleValue).bloodPressureDiastolicValue !== undefined;
}