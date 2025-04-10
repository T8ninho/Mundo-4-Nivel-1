import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    minHeight: 60,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
  },
  imagePickerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imagePickerText: {
    color: "#333",
    fontWeight: "bold",
  },
  pickerWrapper: {
    marginBottom: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    gap: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    paddingLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  containerActions: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-end",
    marginTop: 12,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 8,
    color: "#FFF",
    fontSize: 16,
    marginBottom: 4,
  },
  removeButton: {
    borderColor: "#FF0000",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    color: "#FF0000",
    fontSize: 16,
    marginBottom: 4,
  },
  listEmptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontSize: 16,
  },
  
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  form: {
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 10,
  },

  addButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#144bc9",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewListButton: {
    padding: 12,
    borderColor: "#144bc9",
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    marginBlock: 20,
  },
  viewListButtonText: {
    color: "#37474F",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  // Estilos de botões de filtro
  filterButtonReset: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f88",
  },
  filterButtonHidden: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ccc"
  },
  filterButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
