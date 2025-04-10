import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInputMask } from 'react-native-masked-text';
import { styles } from "../../styles/styles";
import { FornecedorType } from "../../components/Fornecedor";

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [categorias, setCategorias] = useState("");
  const [imagemURL, setImagemURL] = useState("");


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Precisamos de acesso às imagens.");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    // Checa se o usuário não cancelou a seleção de imagem e define a imagem
    if (!result.canceled) {
      setImagemURL(result.assets[0].uri);
    }
  };

  // Verifica se todos os campos obrigatórios foram preenchidos e se o numero de contato tem 11 dígitos
  const isContatoValid = contato.replace(/\D/g, "").length === 11;
  const isFormValid = nome && endereco && isContatoValid && categorias && imagemURL;

  const handleAddFornecedor = async () => {
    if (!isFormValid) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    
    const contatoNumerico = contato.replace(/\D/g, "");
    if (contatoNumerico.length !== 11) {
      Alert.alert("Erro", "O número de contato deve ter 11 dígitos (DDD + número).");
      return;
    }

    try {
      const fornecedoresData = await AsyncStorage.getItem("fornecedores");
      const fornecedores = fornecedoresData ? JSON.parse(fornecedoresData) : [];

      const fornecedorAlreadyExists = fornecedores.find(
        (fornecedor: { nome: string; }) => fornecedor.nome === nome
      );
      if (fornecedorAlreadyExists) {
        Alert.alert("Erro", "Já existe um fornecedor com este nome.");
        return;
      }

      const newFornecedor: FornecedorType = {
        nome,
        endereco,
        contato,
        categorias,
        imagemURL,
      };

      const updatedFornecedores = [...fornecedores, newFornecedor];
      await AsyncStorage.setItem(
        "fornecedores",
        JSON.stringify(updatedFornecedores)
      );

      Alert.alert("Sucesso", "Fornecedor adicionado!");

      navigation.navigate("Lista");

      setNome("");
      setEndereco("");
      setContato("");
      setCategorias("");
      setImagemURL("");
    } catch (error) {
      console.error("Falha ao salvar fornecedor:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* Formulario */}
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nome do Fornecedor"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
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
            placeholder="Categorias"
            value={categorias}
            onChangeText={setCategorias}
          />
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Icon name="image" size={30} color="#000" />
            <Text style={styles.imagePickerText}>Selecionar Imagem</Text>
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

        {/* Botões */}
        <View>
          <TouchableOpacity
            style={[
              styles.addButton,
              !isFormValid && { opacity: 0.4 },
            ]}
            onPress={handleAddFornecedor}
            disabled={!isFormValid}
          >            
            <Text style={styles.addButtonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewListButton}
            onPress={() => navigation.navigate("Lista")}
          >
            <Text style={styles.viewListButtonText}>Listagem</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cadastro;
