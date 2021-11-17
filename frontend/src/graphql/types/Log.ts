interface Log {
    id: string;
    dateTimeOfActivity: number;
    notes: string | null; 
    categories: string[] | null;
    mood: string[] | null;
}

export default Log;