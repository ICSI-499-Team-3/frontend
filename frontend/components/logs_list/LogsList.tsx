import React from 'react';
import { View, FlatList } from 'react-native';
import LogCard from '../log_card/LogCard';

const LogsList = () => {

    const data = [
        {
          title: "Ran well today!", 
          createdAt: 1635610022,
          content: "Content", 
          categories: [
            "cat 1", 
            "cat 2",
            "cat 3",
            "cat 4",
          ],
          mood: "very_happy",
        },
        {
          title: "Back really hurt...", 
          createdAt: 1635610022,
          content: "Content", 
          categories: [
            "cat 1", 
            "cat 2",
            "cat 3",
            "cat 4",
          ],
          mood: "happy",
        },
        {
          title: "Stressed from work", 
          createdAt: 1635610022,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Nisi quis eleifend quam adipiscing vitae proin sagittis. Bibendum enim facilisis gravida neque. Penatibus et magnis dis parturient montes. Ac odio tempor orci dapibus ultrices in. Dolor magna eget est lorem ipsum dolor sit. Egestas dui id ornare arcu odio ut. Maecenas sed enim ut sem viverra aliquet. Congue eu consequat ac felis donec et. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Dignissim enim sit amet venenatis. Condimentum mattis pellentesque id nibh tortor id. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Enim nunc faucibus a pellentesque sit amet porttitor. Ut ornare lectus sit amet est. Dignissim suspendisse in est ante in nibh mauris. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Urna nunc id cursus metus aliquam eleifend.
    
          In metus vulputate eu scelerisque. Imperdiet dui accumsan sit amet nulla facilisi morbi. Diam maecenas ultricies mi eget mauris pharetra et. Et ultrices neque ornare aenean. Volutpat blandit aliquam etiam erat velit scelerisque in. Curabitur vitae nunc sed velit. Auctor eu augue ut lectus arcu bibendum at. Sagittis id consectetur purus ut. Porttitor leo a diam sollicitudin tempor id. Nulla aliquet porttitor lacus luctus accumsan. Eu mi bibendum neque egestas. Adipiscing elit ut aliquam purus sit amet luctus. Sed enim ut sem viverra. In nibh mauris cursus mattis molestie a iaculis at. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Libero volutpat sed cras ornare arcu dui.`, 
          categories: [
            "cat 1", 
          ],
          mood: "neutral",
        },
        {
          title: "Physical therapy was okay today", 
          createdAt: 1635610022,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Nisi quis eleifend quam adipiscing vitae proin sagittis. Bibendum enim facilisis gravida neque. Penatibus et magnis dis parturient montes. Ac odio tempor orci dapibus ultrices in. Dolor magna eget est lorem ipsum dolor sit. Egestas dui id ornare arcu odio ut. Maecenas sed enim ut sem viverra aliquet. Congue eu consequat ac felis donec et. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Dignissim enim sit amet venenatis. Condimentum mattis pellentesque id nibh tortor id. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Enim nunc faucibus a pellentesque sit amet porttitor. Ut ornare lectus sit amet est. Dignissim suspendisse in est ante in nibh mauris. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Urna nunc id cursus metus aliquam eleifend.
    
          In metus vulputate eu scelerisque. Imperdiet dui accumsan sit amet nulla facilisi morbi. Diam maecenas ultricies mi eget mauris pharetra et. Et ultrices neque ornare aenean. Volutpat blandit aliquam etiam erat velit scelerisque in. Curabitur vitae nunc sed velit. Auctor eu augue ut lectus arcu bibendum at. Sagittis id consectetur purus ut. Porttitor leo a diam sollicitudin tempor id. Nulla aliquet porttitor lacus luctus accumsan. Eu mi bibendum neque egestas. Adipiscing elit ut aliquam purus sit amet luctus. Sed enim ut sem viverra. In nibh mauris cursus mattis molestie a iaculis at. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Libero volutpat sed cras ornare arcu dui.`, 
          categories: [
            "cat 1", 
            "cat 2",
          ],
          mood: "unhappy",
        },
    ];

    return (
        <View>
            <FlatList 
                data={data} 
                renderItem={({ item }) => (
                    <LogCard 
                        title={item.title} 
                        createdAt={item.createdAt}
                        content={item.content}
                        categories={item.categories}
                        mood={item.mood}
                    />
                )}
            />
        </View>
    );
};

export default LogsList;