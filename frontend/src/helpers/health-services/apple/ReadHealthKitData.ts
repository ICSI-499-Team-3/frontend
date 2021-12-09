import AppleHealthKit, {
    HealthValue,
    BloodPressureSampleValue 
} from 'react-native-health';

/**
 * @author Tony Comanzo 
 */
export function syncHealthKitData(callback: (callbackError: string, metricTitle: string, results: HealthValue[] | BloodPressureSampleValue[]) => void, startDate: Date, endDate?: Date) {
    
    const operations = [
        {
            title: 'Heart Rate', 
            query: AppleHealthKit.getHeartRateSamples, 
        },
        {
            title: 'Blood Pressure', 
            query: AppleHealthKit.getBloodPressureSamples, 
        },
        {
            title: 'Body Temperature', 
            query: AppleHealthKit.getBodyTemperatureSamples, 
        },
        {
            title: 'VO2 Max', 
            query: AppleHealthKit.getVo2MaxSamples,
        },
    ];
    
    const options = endDate 
        ? { startDate: startDate.toISOString(), endDate: endDate.toISOString() }
        : { startDate: startDate.toISOString() };

    operations.map(operation => {
        operation.query(options, (error, results) => {
            callback(error, operation.title, results);
        });
    });
}