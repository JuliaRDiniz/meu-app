import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useStorage from "../../hooks/useStorage";
import { EditClientModal } from "../../components/modal/editClient";
import AntDesign from "@expo/vector-icons/AntDesign";

export function ClientDetails({ route, navigation: { goBack } }) {
  const { client } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const { updateClient, removeClient } = useStorage();
  const [currentClient, setCurrentClient] = useState(client);

  async function handleSave(editedClient) {
    await updateClient("client", editedClient);
    setCurrentClient(editedClient);
    setModalVisible(false);
  }

  const handleDelete = async () => {
    await removeClient("client", client.id);
    return removeClient;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()} style={styles.closeButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Detalhes do Cliente</Text>
      <View style={styles.body}>
        <Text style={styles.detail}>Nome: {currentClient.name}</Text>
        <Text style={styles.detail}>Email: {currentClient.email}</Text>
        <Text style={styles.detail}>Telefone: {currentClient.phone}</Text>
        <Text style={styles.detail}>Endereço: {currentClient.address}</Text>
        <Text style={styles.detail}>Informações: {currentClient.notes}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDelete(client)}
        >
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText} onPress={() => setModalVisible(true)}>
            Editar
          </Text>
        </TouchableOpacity>
      </View>

      <EditClientModal
        visible={modalVisible}
        client={currentClient}
        onSave={handleSave}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 95,
    paddingBottom: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  closeButton: {
    position: "absolute",
    top: 60,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  body: {
    paddingTop: 50,
    width: 300,
    height: 530,
    borderRadius: 10,
    gap: 7,
  },

  detail: {
    fontSize: 18,
    marginBottom: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "80%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#D47EA2",
    padding: 30,
    paddingBottom: 7,
    paddingTop: 7,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});
