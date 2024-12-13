import { LinearGradient } from 'expo-linear-gradient';
import { color_four, color_three } from '@/constants/Colors';
import HomePage from '@/components/HomePage';

export default function Home() {
  return (
    <LinearGradient className='flex-1 justify-center items-center' colors={[color_three, color_four, color_three]} >
      <HomePage />
    </LinearGradient>
  )
}