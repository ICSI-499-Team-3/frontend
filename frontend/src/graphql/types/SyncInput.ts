import SyncMetricInput from './SyncMetricInput';

/**
 * @author Tony Comanzo 
 */
interface SyncInput {
    userId: string;
    metrics: SyncMetricInput[]
}

export default SyncInput;