import { useQuery } from '@apollo/client';
import React from 'react';
import { Share, View, Button, SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../contexts/Auth';
import GET_USER_BY_EMAIL from '../queries/GetUserByEmail';
import { Searchbar} from 'react-native-paper';
import GET_USER_BY_EMAIL_FOR_SHARE from '../queries/GetUserByEmailForShare';
import UserData from '../types/UserData';
// documentation: https://reactnative.dev/docs/share

const LogShare = () => {
/*
  const { authData } = useAuth(); // function fron auth.tsx might need to create a 
                                  // different function at the bottom of the file for email
   
  const { loading, error, data } = useQuery<UserData>(GET_USER_BY_EMAIL, {
    variables: {
        email: authData!.email,
    },
  });

  if (loading) return (
    <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
    </SafeAreaView>
);

if (error) return (
    <SafeAreaView>
        <Text>{`${error}\n\n\n\n\n\n\n`}</Text>
    </SafeAreaView>
  );

const usersEmails = data?.GetUserByEmail.map(x => x); // GetUserByEmail has to be user array to use map

return (
  <FlatList 
      style={styles.container}
      data={usersEmails} 
      renderItem={({ item }) => (

              email = {item.email}
          
      )}
  />
);

}; // end of const LogShare

const styles = StyleSheet.create({
  container: {
      height: '100%',
  },
});


const LogShare = () => {
  const onShare = async () => {
    
      const result = await Share.share({
        message:
          'Share your logs with your family and friends!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
  };
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);

  const { authUData } = useAuth();

  const { loading, error, data } = useQuery<UserData>(GET_USER_BY_EMAIL_FOR_SHARE, {
      variables: {
          email: String //authUData!.email,
      },
  });

  if (loading) return null;
  /*
  if (error) return `Error! ${error}`;
  */

  /*if (error) return (
		<SafeAreaView>
			<Text>{`${error}\n\n\n\n\n\n\n`}</Text>
		</SafeAreaView>
	);

  const usersByEmail = data?.GetUserByEmailForShare.map((x: any) => x);

  return (
    <Searchbar
      placeholder="Type in users email to share to..."
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};
*/

}

export default LogShare;

