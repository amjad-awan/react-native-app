import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../components/home/Header';
import VideoCard from '../components/home/VideoCard';
import AddButton from '../components/home/AddButton';
import AddModal from '../components/home/AddModal';
import { styles } from '../components/home/styles';
import ImageCarousel from '../components/carousel/Carousel';
import Swiper from 'react-native-swiper';

type Item = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [mockData, setMockData] = useState<Item[]>([
    {
      id: '1',
      title: 'Trending Video 1',
      description: 'Awesome clip about travel',
      image: 'https://placekitten.com/300/200',
    },
    {
      id: '2',
      title: 'Trending Video 2',
      description: 'Funny cats compilation',
      image: 'https://placebear.com/300/200',
    },
    {
      id: '3',
      title: 'Trending Video 3',
      description: 'Best tech of 2025',
      image: 'https://placekitten.com/301/201',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImagePick = () => {
    Alert.alert('Upload Image', 'Choose an option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 600,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });
      if (image?.path) setImageUri(image.path);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED')
        Alert.alert('Error', 'Failed to pick image');
    }
  };

  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 600,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });
      if (image?.path) setImageUri(image.path);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED')
        Alert.alert('Error', 'Failed to open camera');
    }
  };

  const handleAddItem = () => {
    if (!newTitle.trim() || !newDesc.trim() || !imageUri) {
      Alert.alert('Missing info', 'Please fill all fields and upload an image');
      return;
    }

    const newItem: Item = {
      id: (mockData.length + 1).toString(),
      title: newTitle.trim(),
      description: newDesc.trim(),
      image: imageUri,
    };

    setMockData([newItem, ...mockData]);
    setModalVisible(false);
    setNewTitle('');
    setNewDesc('');
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <Header title="For You 🎥" />
      {/* <ImageCarousel/>  */}

      {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
        {mockData.map((item) => (
          <VideoCard key={item.id} item={item} onPress={() => navigation.navigate("Detail", { id: item.id })} />
        ))}
      </ScrollView> */}

      <Swiper style={styles.scrollContainer} showsButtons={true} loop={false}>
        {mockData.map(item => (
          <VideoCard
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        ))}
      </Swiper>

      <AddButton onPress={() => setModalVisible(true)} />

      <AddModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddItem}
        title={newTitle}
        setTitle={setNewTitle}
        desc={newDesc}
        setDesc={setNewDesc}
        imageUri={imageUri}
        onPickImage={handleImagePick}
      />
    </View>
  );
};

export default HomeScreen;
