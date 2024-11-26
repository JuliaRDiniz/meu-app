import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import useStorage from "../../hooks/useStorage";
import { useState } from "react";

export function ModalAddClients({ onClose }) {
  const { saveClient } = useStorage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const salvarCliente = async () => {
    const newClient = { id: Date.now(), name, phone, address, notes, email };
    if (newClient.name == "") {
      alert("nome obrigatório");
      return;
    }
    if (newClient.phone == "") {
      return;
    }
    if (newClient.address == "") {
      return;
    }
    if (newClient.email == "") {
      return;
    }
    if (newClient.notes == "") {
      return;
    }

    await saveClient("client", newClient);
    setName("");
    setPhone("");
    setAddress("");
    setEmail("");
    setNotes("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={180}
    >
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Adicionar Cliente</Text>
      <ScrollView>
        <View style={styles.BoxInput}>
          <Text style={styles.BoxInputText}>Nome completo:</Text>
          <View style={styles.contentInput}>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.InputText}
            />
          </View>

          <Text style={styles.BoxInputText}>Telefone:</Text>
          <View style={styles.contentInputPhone}>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.InputText}
            />
          </View>

          <Text style={styles.BoxInputText}>e-mail:</Text>
          <View style={styles.contentInput}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.InputText}
            />
          </View>

          <Text style={styles.BoxInputText}>Endereço:</Text>
          <View style={styles.contentInput}>
            <TextInput
              value={address}
              onChangeText={setAddress}
              style={styles.InputText}
            />
          </View>
          <Text style={styles.BoxInputText}>Notas Adicionais:</Text>
          <View style={styles.contentInputNotes}>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              multiline={true}
              numberOfLines={4}
              scrollEnabled={true}
              style={styles.InputTextNotes}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text onPress={salvarCliente} style={styles.buttonText}>
          Salvar
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 80,
    alignItems: "center",
    color: "#fbbb",
  },

  closeButton: {
    position: "absolute",
    top: 35,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 25,
  },

  BoxInput: {
    width: "100%",
    padding: 10,
    marginTop: 30,
  },

  BoxInputText: {
    color: "#4E4C4C",
    fontSize: 16,
  },

  contentInput: {
    backgroundColor: "#FEF8F8",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    height: 35,
    padding: 8,
    paddingLeft: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 20,
    justifyContent: "center",
  },

  InputText: {
    color: "#4E4C4C",
    ffontSize: 16,
    height: "100%",
    paddingVertical: 0,
  },

  contentInputNotes: {
    backgroundColor: "#FEF8F8",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    height: 170,
    padding: 8,
    paddingLeft: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 20,
  },

  contentInputPhone: {
    backgroundColor: "#FEF8F8",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    width: 180,
    height: 35,
    padding: 8,
    paddingLeft: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 10,
  },

  InputTextNotes: {
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#D47EA2",
    width: "60%",
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
  },
});
