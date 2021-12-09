/**
 * @author Tony Comanzo 
 */
interface Share {
    id: string;
    sharerId: string;
    shareeId: string;
    sharedLog: string;
    sharedMetric: string;
    dataId: string;
}

export default Share;