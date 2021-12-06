import GoogleFit, { BucketUnit } from 'react-native-google-fit'

async function readAllGoogleFitData(startDate: Date, endDate: Date, bucketUnit?: BucketUnit, bucketInterval?: number) {

    const options = {
        startDate: startDate.toISOString(), // required ISO8601Timestamp
        endDate: endDate.toISOString(), // required ISO8601Timestamp
        bucketUnit: bucketUnit ?? BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: bucketInterval ?? 1, // optional - default 1. 
    };

    const results = [];

    const heartRateSamples = await GoogleFit.getHeartRateSamples(options);
    results.push({
        title: 'Heart Rate',
        samples: heartRateSamples,
    });

    const bloodPressureSamples = await GoogleFit.getBloodPressureSamples(options);
    results.push({
        title: 'Blood Pressure', 
        samples: bloodPressureSamples,
    });

    const bodyTemperatureSamples = await GoogleFit.getBodyTemperatureSamples(options);
    results.push({
        title: 'Body Temperature',
        samples: bodyTemperatureSamples,
    });

    const oxygenSaturationSamples = await GoogleFit.getOxygenSaturationSamples(options);
    results.push({
        title: 'VO2 Max',
        samples: oxygenSaturationSamples,
    });

    return results;
}

export default readAllGoogleFitData;