import SyncMeasurementInput from './SyncMeasurementInput';

interface SyncMetricInput {
    userId: string;
    title: string;
    xUnits: string;
    yUnits: string;
    data: SyncMeasurementInput[];
}

export default SyncMetricInput;