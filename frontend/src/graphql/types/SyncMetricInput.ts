import SyncMeasurementInput from './SyncMeasurementInput';

/**
 * @author Tony Comanzo 
 */
interface SyncMetricInput {
    userId: string;
    title: string;
    xUnits: string;
    yUnits: string;
    data: SyncMeasurementInput[];
}

export default SyncMetricInput;