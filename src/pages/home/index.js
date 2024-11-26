import { useCallback, useEffect, useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ModalAddClients } from "../../components/modal/addClient";
import useStorage from "../../hooks/useStorage";
import { useFocusEffect } from "@react-navigation/native";
import { ClientDetails } from "../clients";

export function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { getClients, removeClient } = useStorage();
  const [searchText, setSearchText] = useState("");

  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const fetchedClients = await getClients("client");
    setClients(fetchedClients);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadClients = async () => {
        const savedClients = await getClients("client");
        setClients(savedClients);
      };

      loadClients();
    }, [])
  );

  function onPressButon() {
    setModalVisible(true);
  }

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-10}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Clientes cadastradas</Text>
        <View style={styles.containerInput}>
          <TextInput
            placeholderTextColor="#4E4C4C"
            placeholder="Buscar"
            style={styles.input}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <FontAwesome6 name="magnifying-glass" size={18} color="#4E4C4C" />
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          style={styles.list}
          data={filteredClients}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.clientItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ClientDetails", { client: item })
                }
              >
                <Text style={styles.clientName}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onPressButon}>
        <Text style={styles.buttonText}>Adicionar Cliente</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible}>
        <ModalAddClients
          onClose={() => {
            setModalVisible(false);
            fetchClients();
          }}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    paddingBottom: 120,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },

  containerInput: {
    backgroundColor: "#D9D9D9",
    height: 35,
    padding: 10,
    paddingLeft: 16,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  input: {
    width: "80%",
    color: "#4E4C4C",
    fontSize: 16,
    height: 45,
    textAlignVertical: "center",
    padding: 0,
  },

  body: {
    width: 300,
    height: 470,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
  },

  clientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
  },
  clientName: {
    fontSize: 18,
    color: "#4E4C4C",
  },

  button: {
    backgroundColor: "#D47EA2",
    width: "60%",
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
  },
});
