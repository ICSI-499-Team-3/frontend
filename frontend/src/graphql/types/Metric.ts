import Measurement from './Measurement';

/**
 * @author Tony Comanzo 
 */
interface Metric {
    id: string;
    userId: string;
    title: string;
    xUnits: string;
    yUnits: string;
    data: Measurement[];
}

export default Metric;