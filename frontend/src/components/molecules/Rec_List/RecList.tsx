//Emma
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import RecCard from '../Rec_Card/RecCard';

const RecList = () => {

    const data = [
        {
          title: "11/07/2021", 
          content: "I noticed you spent a lot of time working. Make sure you take breaks!"
        },
        {
            title: "11/08/2021", 
            content: "I noticed you usually talk about cramps when you run. Make sure you are drinking enough water!"
        },
        {
            title: "11/08/2021", 
            content: "The objective of experiment 3 is to evaluate the search function of the application. The tester should be able to filter through their logs by activity category, and by searching within the text of a log. Sample activities are provided in the chart above. Expected findings from these experiments are for the application to provide relevant, accurate insights based on the users individual logs. If users are to log certain activities in a closer duration of time, the application will be able to correlate these logs to each other, providing feedback based on how the user felt during that log period. For logs that are not logged at similar times, accurate recommendations will still be available based on the correlations between users' feelings and activities logged. Users will also rate these recommendations on how accurate they deem them to be so the application will reinforce accurate feedback moving forward."
        }
    ]

    return (
        <SafeAreaView>
           <FlatList 
                data={data} 
                renderItem={({ item }) => (
                    <RecCard 
                        title={item.title} 
                        content={item.content}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default RecList;

