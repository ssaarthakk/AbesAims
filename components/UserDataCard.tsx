import { Text, View } from 'react-native'
import React from 'react'
import { BookIcon, CalendarIcon, HomeIcon, ProfileIcon } from '@/constants/SvgIcons'
import { StudentData } from '@/utils/apicalls'

export default function UserDataCard({ userData }: { userData: StudentData }) {

    const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | undefined }) => (
        <View className='flex-1 min-w-0'>
            <View className='flex-row items-center gap-3 mb-2'>
                <View className='p-3 bg-primary-50 rounded-xl'>
                    {icon}
                </View>
                <View className='flex-1 min-w-0'>
                    <Text className='text-color_text_secondary text-xs font-montserratMedium uppercase tracking-wide mb-1'>
                        {label}
                    </Text>
                    <Text className='font-montserratSemiBold text-base text-color_text_primary leading-tight' numberOfLines={2}>
                        {value || 'N/A'}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View className='bg-color_surface mx-4 rounded-2xl shadow-lg shadow-gray-200 border border-color_border overflow-hidden'>
            {/* Header */}
            <View className='bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4'>
                <Text className='text-color_text_inverse text-lg font-montserratBold text-center'>
                    Student Profile
                </Text>
            </View>
            
            {/* Content */}
            <View className='p-6'>
                <View className='space-y-6'>
                    {/* Row 1 */}
                    <View className='flex-row gap-4'>
                        <InfoItem 
                            icon={<ProfileIcon />}
                            label="Full Name"
                            value={userData?.name}
                        />
                        <InfoItem 
                            icon={<BookIcon />}
                            label="Branch"
                            value={userData?.branch}
                        />
                    </View>
                    
                    {/* Divider */}
                    <View className='h-px bg-color_divider' />
                    
                    {/* Row 2 */}
                    <View className='flex-row gap-4'>
                        <InfoItem 
                            icon={<CalendarIcon />}
                            label="Semester"
                            value={userData?.semester?.toString()}
                        />
                        <InfoItem 
                            icon={<HomeIcon />}
                            label="Admission No."
                            value={userData?.username}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}