/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LogsView from './components/logs/LogsView';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  //     <ScrollView
  //       contentInsetAdjustmentBehavior="automatic"
  //       style={backgroundStyle}>
  //       <Header />
  //       <View
  //         style={{
  //           backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //         }}>
  //         <Section title="Step One">
  //           Edit <Text style={styles.highlight}>App.tsx</Text> to change this
  //           screen and then come back to see your edits.
  //         </Section>
  //         <Section title="See Your Changes">
  //           <ReloadInstructions />
  //         </Section>
  //         <Section title="Debug">
  //           <DebugInstructions />
  //         </Section>
  //         <Section title="Learn More">
  //           Read the docs to discover what to do next:
  //         </Section>
  //         <LearnMoreLinks />
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );

  const data = [
    {
      title: "Ran well today!", 
      content: "Content", 
      categories: [
        "cat 1", 
        "cat 2",
        "cat 3",
        "cat 4",
      ],
    },
    {
      title: "Back really hurt...", 
      content: "Content", 
      categories: [
        "cat 1", 
        "cat 2",
        "cat 3",
        "cat 4",
      ],
    },
    {
      title: "Stressed from work", 
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Nisi quis eleifend quam adipiscing vitae proin sagittis. Bibendum enim facilisis gravida neque. Penatibus et magnis dis parturient montes. Ac odio tempor orci dapibus ultrices in. Dolor magna eget est lorem ipsum dolor sit. Egestas dui id ornare arcu odio ut. Maecenas sed enim ut sem viverra aliquet. Congue eu consequat ac felis donec et. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Dignissim enim sit amet venenatis. Condimentum mattis pellentesque id nibh tortor id. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Enim nunc faucibus a pellentesque sit amet porttitor. Ut ornare lectus sit amet est. Dignissim suspendisse in est ante in nibh mauris. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Urna nunc id cursus metus aliquam eleifend.

      In metus vulputate eu scelerisque. Imperdiet dui accumsan sit amet nulla facilisi morbi. Diam maecenas ultricies mi eget mauris pharetra et. Et ultrices neque ornare aenean. Volutpat blandit aliquam etiam erat velit scelerisque in. Curabitur vitae nunc sed velit. Auctor eu augue ut lectus arcu bibendum at. Sagittis id consectetur purus ut. Porttitor leo a diam sollicitudin tempor id. Nulla aliquet porttitor lacus luctus accumsan. Eu mi bibendum neque egestas. Adipiscing elit ut aliquam purus sit amet luctus. Sed enim ut sem viverra. In nibh mauris cursus mattis molestie a iaculis at. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Libero volutpat sed cras ornare arcu dui.`, 
      categories: [
        "cat 1", 
      ],
    },
    {
      title: "Physical therapy was okay today", 
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Nisi quis eleifend quam adipiscing vitae proin sagittis. Bibendum enim facilisis gravida neque. Penatibus et magnis dis parturient montes. Ac odio tempor orci dapibus ultrices in. Dolor magna eget est lorem ipsum dolor sit. Egestas dui id ornare arcu odio ut. Maecenas sed enim ut sem viverra aliquet. Congue eu consequat ac felis donec et. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Dignissim enim sit amet venenatis. Condimentum mattis pellentesque id nibh tortor id. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Enim nunc faucibus a pellentesque sit amet porttitor. Ut ornare lectus sit amet est. Dignissim suspendisse in est ante in nibh mauris. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Urna nunc id cursus metus aliquam eleifend.

      In metus vulputate eu scelerisque. Imperdiet dui accumsan sit amet nulla facilisi morbi. Diam maecenas ultricies mi eget mauris pharetra et. Et ultrices neque ornare aenean. Volutpat blandit aliquam etiam erat velit scelerisque in. Curabitur vitae nunc sed velit. Auctor eu augue ut lectus arcu bibendum at. Sagittis id consectetur purus ut. Porttitor leo a diam sollicitudin tempor id. Nulla aliquet porttitor lacus luctus accumsan. Eu mi bibendum neque egestas. Adipiscing elit ut aliquam purus sit amet luctus. Sed enim ut sem viverra. In nibh mauris cursus mattis molestie a iaculis at. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Libero volutpat sed cras ornare arcu dui.`, 
      categories: [
        "cat 1", 
        "cat 2",
      ],
    },
  ];

  return (
    <SafeAreaView style={backgroundStyle}>
      <LogsView data={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
