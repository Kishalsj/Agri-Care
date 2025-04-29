import * as React from 'react';
import { Text } from 'react-native';

export default function TabBarLabel({ focused, name }) {
  return (
    <Text style={{ color: focused ? '#000' : '#888', fontSize: 12 }}>
      {name}
    </Text>
  );
}
