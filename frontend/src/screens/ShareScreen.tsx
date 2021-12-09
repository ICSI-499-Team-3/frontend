import { useQuery, useMutation } from '@apollo/client';
import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import TextInput from '../components/atoms/login/TextInput';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import { useAuth } from '../contexts/Auth';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Log from '../graphql/types/Log';
import Metric from '../graphql/types/Metric';
import GetShareesByDataIdData from '../graphql/types/GetShareesByDataIdData';
import GET_SHAREES_BY_DATA_ID from '../graphql/queries/GetShareesByDataId';
import CreateShareData from '../graphql/types/CreateShareData';
import CreateShareInput from '../graphql/types/CreateShareInput';
import CREATE_SHARE from '../graphql/mutations/CreateShare';
import DeleteShareData from '../graphql/types/DeleteShareData';
import DeleteShareInput from '../graphql/types/DeleteShareInput';
import DELETE_SHARE from '../graphql/mutations/DeleteShare';

type ShareScreenProps = NativeStackScreenProps<AppStackParamList, 'ShareScreen'>;

export type ShareScreenNavigationProps = {
  sharedData: Log | Metric;
};

/**
 * @author Tony Comanzo 
 */
const ShareScreen = ({ route, navigation }: ShareScreenProps) => {

  const { authData } = useAuth();

  const { sharedData } = route.params;

  const [email, setEmail] = useState({ value: '', error: '' });

  const [emailIsInvalid, setEmailIsInvalid] = useState(true);
  
  const handleShare = () => {

    function isLog(data: Log | Metric): data is Log {
      return (data as Log).mood !== undefined;
    }

    function isMetric(data: Log | Metric): data is Metric {
      return (data as Metric).xUnits !== undefined;
    }

    console.log('sharing...');
    console.log(email.value);

    share({
      variables: {
        input: {
          sharerId: authData!.id, 
          shareeEmail: email.value, 
          sharedLog: isLog(sharedData),
          sharedMetric: isMetric(sharedData), 
          dataId: sharedData.id,
        },
      },
      refetchQueries: [
        GET_SHAREES_BY_DATA_ID, 
        'GetShareesByDataId',
      ],
    });
  };

  const handleUnshare = (shareeId: string) => {
    unshare({
      variables: {
        input: {
          shareeId: shareeId, 
          dataId: sharedData.id,
        },
      },
      refetchQueries: [
        GET_SHAREES_BY_DATA_ID, 
        'GetShareesByDataId',
      ],
    });
  };

  const getShareesByDataIdContext = useQuery<GetShareesByDataIdData, { id: string }>(GET_SHAREES_BY_DATA_ID, {
    variables: {
      id: sharedData.id,
    },
  });

  const [share, shareContext] = useMutation<CreateShareData, { input: CreateShareInput }>(CREATE_SHARE, {
    onCompleted: () => {
      console.log('done');
    },
    onError: (error) => {
      setEmail({ ...email, error: error.message });
    },
  });

  const [unshare, unshareContext] = useMutation<DeleteShareData, { input: DeleteShareInput }>(DELETE_SHARE);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        
        !shareContext.loading 
          ? (
            <IconButton
              icon="send"
              size={20}
              onPress={handleShare}
              disabled={emailIsInvalid}
            />
          )
          : (
            <ActivityIndicator />
          )
      ),
    });
  }, [navigation, emailIsInvalid, email, shareContext]);

  if (getShareesByDataIdContext.loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (getShareesByDataIdContext.error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => {
          setEmail({ value: text, error: '' });
          // regex tests true if text is a valid email
          setEmailIsInvalid(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)));
        }}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description=''
      />
      <View style={styles.sharedUsersList}>
        {getShareesByDataIdContext.data?.GetShareesByDataId.map(sharee => (
          <View key={sharee.id} style={styles.sharedUserContainer}>
            <Text>{sharee.name}</Text>
            {
              !unshareContext.loading
                ? <IconButton
                    icon="account-remove-outline"
                    size={20}
                    onPress={() => handleUnshare(sharee.id)}
                  />
                : <ActivityIndicator />
            }
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
    padding: 10,
  }, 
  sharedUsersList: {

  },
  sharedUserContainer: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: 'black', 
    borderWidth: 1, 
    borderRadius: 30,
  },
});

export default ShareScreen;

