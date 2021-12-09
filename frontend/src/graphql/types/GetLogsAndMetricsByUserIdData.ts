import Log from './Log';
import Metric from './Metric';

/**
 * @author Tony Comanzo 
 */
interface GetLogsAndMetricsByUserIdData {
    GetLogsByUserId: Log[];
    GetMetricsByUserId: Metric[];
}

export default GetLogsAndMetricsByUserIdData;