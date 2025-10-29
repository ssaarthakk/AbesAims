import React, { useEffect } from 'react';
import { router } from 'expo-router';

export default function HomeScreen() {
  useEffect(() => {
    router.replace('/(tabs)/index' as any);
  }, []);
  
  return null;
}