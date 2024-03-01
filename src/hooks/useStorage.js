import AsyncStrorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItem = async (key) => {
    try {
      const passwords = await AsyncStrorage.getItem(key);
      return JSON.parse(passwords) || [];
    } catch (error) {
      console.log("Erro ao buscar!", error);
      return [];
    }
  };

  const saveItem = async (key, value) => {
    try {
      let passwords = await getItem(key);
      passwords.push(value);

      await AsyncStrorage.setItem(key, JSON.stringify(passwords));
    } catch (error) {
      console.log("Erro ao salvar!", error);
    }
  };

  const removeItem = async (key, item) => {
    try {
      let passwords = await getItem(key);

      let myPasswords = passwords.filter((password) => {
        return password !== item;
      });
      await AsyncStrorage.setItem(key, JSON.stringify(myPasswords));
      return myPasswords;
    } catch (error) {
      console.log("Erro ao deletar!");
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
