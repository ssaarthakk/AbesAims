import { View, FlatList, Text } from 'react-native'
import React, { useEffect } from 'react'
import SubjectDetailCard from '@/components/Common/SubjectDetailCard'
import { useApiStore } from '@/utils/store'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Subjects() {
    const [apiData, setApiData] = React.useState<Array<any>>([]);
    const dataApi: [any] = useApiStore((state: any) => state.data);

    useEffect(() => {
        setApiData(dataApi.slice(0, -1))
    }, [])

    return (
        <SafeAreaView className='flex-1 bg-background'>
            <View className='flex-1 px-4'>
                <Text className="text-4xl font-montserratExtraBold text-white my-6 text-left tracking-tighter">
                    Subjects
                    <Text className="text-primary">.</Text>
                </Text>
                <FlatList
                    data={apiData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <SubjectDetailCard
                            facultyName={item.faculty_name}
                            subjectName={item.cdata.course_name}
                            courseCode={item.cdata.course_code}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}
