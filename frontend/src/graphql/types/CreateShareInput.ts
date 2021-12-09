/**
 * @author Tony Comanzo 
 */
interface CreateShareInput {
    sharerId: string;
    shareeEmail: string;
    sharedLog: boolean;
    sharedMetric: boolean;
    dataId: string;
}

export default CreateShareInput;