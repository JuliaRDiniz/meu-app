import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

export function EditClientModal({ visible, client, onSave, onClose }) {
  const [editedClient, setEditedClient] = useState(client);

  useEffect(() => {
    if (visible) {
      setEditedClient(client);
    }
  }, [visible, client]);

  function handleSave() {
    onSave(editedClient);
  }
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Editar Cliente</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={editedClient.name}
            onChangeText={(text) =>
              setEditedClient({ ...editedClient, name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={editedClient.email}
            onChangeText={(text) =>
              setEditedClient({ ...editedClient, email: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={editedClient.phone}
            onChangeText={(text) =>
              setEditedClient({ ...editedClient, phone: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={editedClient.address}
            onChangeText={(text) =>
              setEditedClient({ ...editedClient, address: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Notas Adicionais"
            value={editedClient.notes}
            multiline={true}
            numberOfLines={4}
            scrollEnabled={true}
            onChangeText={(text) =>
              setEditedClient({ ...editedClient, notes: text })
            }
          />
          {/* Adicione mais campos de edição, se necessário */}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "90%",
    borderRadius: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#FF5252",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
