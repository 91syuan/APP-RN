import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { create } from 'zustand';

interface Diary {
  id: string;
  title: string;
  content: string;
  photo: string | null;
  date: string;
}

interface DiaryState {
  diaries: Diary[];
  createDiary: (photoUri: string) => void;
}

const useDiaryStore = create<DiaryState>((set) => ({
  diaries: [],
  createDiary: (photoUri: string) => {
    const newId = String(Date.now());
    const newDiary = {
      id: newId,
      title: '新照片日記',
      content: '',
      photo: photoUri,
      date: new Date().toLocaleString(),
    };

    set((state) => ({
      diaries: [newDiary, ...state.diaries]
    }));
  },
}));

export default function HomeScreen() {
  const { diaries, createDiary } = useDiaryStore();

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('權限不足');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      createDiary(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      
      <View style={{ flex: 1, padding: 16 }}>
        
        <Text style={{ fontSize: 36, fontWeight: '900', textAlign: 'center', marginBottom: 20, color: '#1f2937' }}>
          我的照片牆
        </Text>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {diaries.map((item) => (
            <View
              key={item.id}
              className="bg-white p-3 rounded-2xl mb-4 shadow-sm items-center w-full"
            >
              {item.photo ? (
                <Image
                  source={{ uri: item.photo }}
                  style={{ width: '100%', height: 350, borderRadius: 12 }}
                  resizeMode="contain"
                  onError={(e) => Alert.alert('圖片顯示錯誤', e.nativeEvent.error)}
                />
              ) : (
                <View className="w-full h-64 bg-gray-200 rounded-xl items-center justify-center">
                  <Text className="text-gray-400">暫無圖片</Text>
                </View>
              )}

              <View className="mt-2 items-center">
                <Text className="text-gray-800 font-medium">{item.title}</Text>
                <Text className="text-gray-400 text-[10px]">{item.date}</Text>
              </View>
            </View>
          ))}

          {diaries.length === 0 && (
            <Text className="text-gray-400 text-center mt-20">
              目前還沒有照片，點擊右下角按鈕新增照片
            </Text>
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      <TouchableOpacity
        onPress={handleAddPhoto}
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          right: 30,
          bottom: 50,
          width: 90,
          height: 90,
          borderRadius: 45,
          backgroundColor: '#3b82f6',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          zIndex: 999,
        }}
      >
        <Text style={{ color: 'white', fontSize: 60, fontWeight: '200', marginTop: -5 }}>+</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}