import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getClients = async (key) => {
    try {
      const clients = await AsyncStorage.getItem(key);
      return JSON.parse(clients) || [];
    } catch (error) {
      console.log("Erro ao buscar clientes", error);
    }
  };

  const saveClient = async (key, client) => {
    try {
      let clients = await getClients(key);
      clients.push(client);
      await AsyncStorage.setItem(key, JSON.stringify(clients));
    } catch (error) {
      console.log("Erro ao salvar cliente", error);
    }
  };

  const updateClient = async (key, updatedClient) => {
    try {
      let clients = await getClients(key);
      const updatedClients = clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      );

      await AsyncStorage.setItem(key, JSON.stringify(updatedClients));
      return updatedClients;
    } catch (error) {
      console.log("Erro ao atualizar cliente", error);
    }
  };

  const removeClient = async (key, clientId) => {
    try {
      let clients = await getClients(key);

      let updatedClients = clients.filter((client) => client.id !== clientId);

      await AsyncStorage.setItem(key, JSON.stringify(updatedClients));
      return updatedClients;
    } catch (error) {
      console.log("Erro ao deletar cliente", error);
    }
  };

  return {
    getClients,
    saveClient,
    removeClient,
    updateClient,
  };
};

export default useStorage;
