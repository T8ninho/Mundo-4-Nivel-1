import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/header.styles";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ title }) => {
    const navigation = useNavigation();

    return (
      <View style={styles.headerContainer}>
        {title === "Cadastro" && (
            <View></View>
        )}
        <View style={styles.headerSubContainer}>
          <Image
            source={require("../../assets/images/estacio.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>
            {title}
          </Text>
        </View>

        {title === "Cadastro" && (
          <TouchableOpacity
          onPress={() => navigation.navigate("SobreAutor" as never)}>
            <Icon name="information-circle" size={30} color="#FFF" />
          </TouchableOpacity>
          
        )}
      </View>
    );
}

export default Header;