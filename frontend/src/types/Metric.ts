import Measurement from './Measurement';

interface Metric {
    title: string;
    xUnits: string;
    yUnits: string;
    data: Measurement[];
}

export default Metric;