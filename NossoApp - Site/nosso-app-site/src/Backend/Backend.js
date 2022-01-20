import firebase from '../config/firebase';

export default class Backend {
  static isPasswordCorrect(password) {
    return new Promise(async (res, rej) => {
      try {
        const result = await firebase
          .firestore()
          .collection('passwords')
          .doc('secretPassword')
          .get()
        const { webPassword }  = result.data();

        res(password === webPassword);
      } catch (e) {
        console.error("Erro ao verificar a senha da web");
        rej();
      }
    });
  }
}
