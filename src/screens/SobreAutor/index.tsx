import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const dadosAutor = [
  { label: "Universidade", value: "Estácio de Sá" },
  { label: "Campus", value: "Campo Grande - Cariacica / ES" },
  { label: "Curso", value: "Desenvolvimento Full Stack" },
  { label: "Disciplina", value: "RPG0023 - Vamos criar um App" },
  { label: "Turma", value: "9001" },
  { label: "Semestre", value: "2025.1" },
  { label: "Integrante", value: "Antonio Vitor Serra dos Santos" },
  { label: "Matrícula", value: "2023 0701 4834" },
];

const SobreAutor = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoBox}>
        {dadosAutor.map((item, index) => (
          <View key={index}>
            <Text style={styles.label}>{item.label}:</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f0f0f0",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
  },
});

export default SobreAutor;