import {
    HealthValue,
    BloodPressureSampleValue 
} from 'react-native-health';

/**
 * @author Tony Comanzo 
 */
export function isHealthValue(data: HealthValue | BloodPressureSampleValue): data is HealthValue {
    return (data as HealthValue).value !== undefined;
}

/**
 * @author Tony Comanzo 
 */
export function isBloodPressureSampleValue(data: HealthValue | BloodPressureSampleValue): data is BloodPressureSampleValue {
    return (data as BloodPressureSampleValue).bloodPressureDiastolicValue !== undefined;
}