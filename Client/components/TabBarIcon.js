import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

export default function TabBarIcon({ name, color }) {
  return <Ionicons name={name} size={24} color={color} style={{ marginBottom: -3 }} />;
}
