import {
    HeartRateResponse,
    BloodPressureResponse,
    BodyTemperatureResponse,
    OxygenSaturationResponse, 
} from 'react-native-google-fit';

export function isBloodPressureResponse(data: HeartRateResponse | BloodPressureResponse | BodyTemperatureResponse | OxygenSaturationResponse): data is BloodPressureResponse {
    return (data as BloodPressureResponse).diastolic !== undefined;
}