import Measurement from './Measurement';

interface Metric {
    id: string;
    userId: string;
    title: string;
    xUnits: string;
    yUnits: string;
    data: Measurement[];
}

export default Metric;