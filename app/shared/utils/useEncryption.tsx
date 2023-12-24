import CryptoJS from 'react-native-crypto-js';

const encryptData = async (data: string, key: string): Promise<string | null> => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
    return ciphertext;
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

const decryptData = async (encryptedData: string, key: string): Promise<string | null> => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

export { encryptData, decryptData };
