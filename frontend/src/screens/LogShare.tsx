import { useQuery } from '@apollo/client';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { useAuth } from '../contexts/Auth';
import GET_USER_BY_EMAIL_FOR_SHARE from '../queries/GetUserByEmailForShare';
import UserData from '../types/UserData';
// documentation: https://reactnative.dev/docs/share

const LogShare = () => {
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

  if (error) return (
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

export default LogShare;

