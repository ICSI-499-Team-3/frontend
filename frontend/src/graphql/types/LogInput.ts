/**
 * @author Tony Comanzo 
 */
interface LogInput {
    userId: string;
    dateTimeOfActivity: number;
    notes: string;
    categories: string[];
    mood: string[];
}

export default LogInput;