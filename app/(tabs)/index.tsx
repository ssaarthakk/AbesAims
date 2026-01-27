import HomePage from '@/components/Home/HomePage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardTab() {
  return (
    <SafeAreaView className='flex-1 bg-background' edges={['top', 'left', 'right']}>
      <HomePage />
    </SafeAreaView>
  );
}
