// Importações do react
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

// páginas do app
import Cadastro from "./src/screens/Cadastro";
import Lista from "./src/screens/Lista";
import EditFornecedor from "./src/screens/EditFornecedor";
import SobreAutor from "./src/screens/SobreAutor";
import Header from "./src/components/Header";

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#144bc9" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#144bc9',
            height: 80,
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerTitle: () => <Header title="Cadastro" />,
          }}
        />
        <Stack.Screen
          name="Lista"
          component={Lista}
          options={{
            headerTitle: () => <Header title="Lista de Fornecedores" />,
          }}
        />
        <Stack.Screen
          name="EditFornecedor"
          component={EditFornecedor}
          options={{
            headerTitle: () => <Header title="Editar Fornecedor" />,
          }}
        />
        <Stack.Screen
          name="SobreAutor"
          component={SobreAutor}
          options={{
            headerTitle: () => <Header title="Sobre o Autor" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
