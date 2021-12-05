import Log from './Log';
import Metric from './Metric';

interface GetLogsAndMetricsByUserIdData {
    GetLogsByUserId: Log[];
    GetMetricsByUserId: Metric[];
}

export default GetLogsAndMetricsByUserIdData;