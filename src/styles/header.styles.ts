import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    padding: 5,
    alignItems: "center",
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerSubContainer: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    height: 80,
    width: 80,
  },
  title: {
    fontSize: 18,
    color: "#FFF",
  },
});
