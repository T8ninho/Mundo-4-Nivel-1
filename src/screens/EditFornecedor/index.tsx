import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { styles } from "../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputMask } from "react-native-masked-text";

const EditFornecedor = ({ route, navigation }) => {
  const { fornecedor } = route.params;

  const [nome, setNome] = useState(fornecedor.nome);
  const [endereco, setEndereco] = useState(fornecedor.endereco);
  const [contato, setContato] = useState(fornecedor.contato);
  const [categorias, setCategorias] = useState(fornecedor.categorias);
  const [imagemURL, setImagemURL] = useState(fornecedor.imagemURL || "");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Precisamos de acesso às imagens.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagemURL(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const fornecedoresData = await AsyncStorage.getItem("fornecedores");
      if (fornecedoresData) {
        const fornecedoresList = JSON.parse(fornecedoresData);
        const updatedFornecedores = fornecedoresList.map((f) =>
          f.nome === fornecedor.nome
            ? { ...f, nome, endereco, contato, categorias, imagemURL }
            : f
        );
        await AsyncStorage.setItem(
          "fornecedores",
          JSON.stringify(updatedFornecedores)
        );
        navigation.goBack();
      }
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      Alert.alert("Erro", "Não foi possível atualizar o fornecedor.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <View>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Endereço"
        />
        <TextInputMask
          style={styles.input}
          type='cel-phone'
          placeholder="Contato"
          value={contato}
          onChangeText={setContato}
        />
        <TextInput
          style={styles.input}
          value={categorias}
          onChangeText={setCategorias}
          placeholder="Categorias"
        />

        <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
          <Text style={styles.imagePickerText}>Selecionar Nova Imagem</Text>
        </TouchableOpacity>

        {imagemURL ? (
          <View style={{alignItems: "center"}}>
            <Image
              source={{ uri: imagemURL }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ) : null}
      </View>
      <View>
        <TouchableOpacity style={styles.addButton} onPress={handleSave}>
          <Text style={styles.addButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default EditFornecedor;