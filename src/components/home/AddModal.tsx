import React from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

export default function AddModal({
  visible,
  onClose,
  onAdd,
  title,
  setTitle,
  desc,
  setDesc,
  imageUri,
  onPickImage,
}: any) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Video</Text>

          <TextInput style={styles.input} placeholder="Enter title" value={title} onChangeText={setTitle} />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Enter description"
            value={desc}
            onChangeText={setDesc}
            multiline
          />

          <TouchableOpacity style={styles.uploadButton} onPress={onPickImage}>
            <Text style={styles.uploadText}>{imageUri ? "✅ Image Selected" : "📸 Upload or Take Photo"}</Text>
          </TouchableOpacity>

          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
