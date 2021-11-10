import React from 'react';
import { Share, View, Button } from 'react-native';
import { FAB } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
// documentation: https://reactnative.dev/docs/share

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
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
};

export default LogShare;

