import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../styles/styles";
import { Fornecedor, FornecedorType } from "../../components/Fornecedor";

const Lista = ({ route, navigation }) => {
  const [fornecedores, setFornecedores] = useState<FornecedorType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );

  const [showFilters, setShowFilters] = useState(true);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory(undefined);
    setSelectedLocation(undefined);
  };


  const loadFornecedores = async () => {
    try {
      const fornecedoresData = await AsyncStorage.getItem("fornecedores");
      if (fornecedoresData) {
        const fornecedoresList: FornecedorType[] = JSON.parse(
          fornecedoresData
        ) as FornecedorType[];
        setFornecedores(fornecedoresList);

        const newCategories = new Set(
          fornecedoresList.map((f) => f.categorias)
        );
        setCategories(Array.from(newCategories));

        const newLocations = new Set(fornecedoresList.map((f) => f.endereco));
        setLocations(Array.from(newLocations));
      }
    } catch (error) {
      console.error("Não foi possível carregar os fornecedores:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFornecedores();
    }, [])
  );

  useEffect(() => {
    if (route.params?.novoFornecedor) {
      const { novoFornecedor } = route.params;
      setFornecedores((prevState) => {
        const updatedFornecedores = [...prevState, novoFornecedor];
        AsyncStorage.setItem(
          "fornecedores",
          JSON.stringify(updatedFornecedores)
        );

        const newCategories = new Set([
          ...categories,
          novoFornecedor.categorias,
        ]);
        setCategories(Array.from(newCategories));

        const newLocations = new Set([...locations, novoFornecedor.endereco]);
        setLocations(Array.from(newLocations));

        return updatedFornecedores;
      });
    }
  }, [route.params?.novoFornecedor]);

  const handleSearch = (text: string) => setSearch(text);

  const handleCategoryChange = (category: string) =>
    setSelectedCategory(category);

  const handleLocationChange = (location: string) =>
    setSelectedLocation(location);

  const filteredFornecedores = fornecedores
    .filter((fornecedor) =>
      fornecedor.nome.toLowerCase().includes(search.toLowerCase())
    )
    .filter((fornecedor) =>
      selectedCategory ? fornecedor.categorias === selectedCategory : true
    )
    .filter((fornecedor) =>
      selectedLocation ? fornecedor.endereco === selectedLocation : true
    );

  const handleRemove = (nome) => {
    Alert.alert("Remover", `Remover o Fornecedor ${nome}?`, [
      {
        text: "Sim",
        onPress: async () => {
          const updatedFornecedores = fornecedores.filter(
            (fornecedor) => fornecedor.nome !== nome
          );
          setFornecedores(updatedFornecedores);
          await AsyncStorage.setItem(
            "fornecedores",
            JSON.stringify(updatedFornecedores)
          );

          const newCategories = new Set(
            updatedFornecedores.map((f) => f.categorias)
          );
          setCategories(Array.from(newCategories));

          const newLocations = new Set(
            updatedFornecedores.map((f) => f.endereco)
          );
          setLocations(Array.from(newLocations));
        },
      },
      { text: "Não", style: "cancel" },
    ]);
  };

  const handleEdit = (fornecedor: FornecedorType) => {
    navigation.navigate("EditFornecedor", { fornecedor });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <TouchableOpacity
          style={styles.filterButtonHidden}
          onPress={() => setShowFilters((prev) => !prev)}
        >
          <Text style={styles.filterButtonText}>
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButtonReset}
          onPress={resetFilters}
        >
          <Text style={styles.filterButtonText}>Resetar Filtros</Text>
        </TouchableOpacity>
      </View>

      {showFilters && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar por nome"
            value={search}
            onChangeText={handleSearch}
          />

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <Picker.Item label="Categorias" value={undefined} />
              {categories.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedLocation}
              onValueChange={handleLocationChange}
            >
              <Picker.Item label="Localizações" value={undefined} />
              {locations.map((location) => (
                <Picker.Item key={location} label={location} value={location} />
              ))}
            </Picker>
          </View>
        </>
      )}


      <FlatList
        data={filteredFornecedores}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <Fornecedor
            nome={item.nome}
            endereco={item.endereco}
            contato={item.contato}
            categorias={item.categorias}
            imagemURL={item.imagemURL}
            onRemove={() => handleRemove(item.nome)}
            onEdit={() => handleEdit(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Parece que nenhum cadastro foi feito ainda.
          </Text>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.addButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Lista;
