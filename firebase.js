/* Salve como: firebase-config.js
   -> Substitua os valores do firebaseConfig com as credenciais do seu projeto Firebase.
   -> Mantenha esse arquivo seguro; em produção use regras do Firestore para proteger dados.
*/

const firebaseConfig = {
  apiKey: "COLOQUE_AQUI_SUA_APIKEY",
  authDomain: "SEU-PROJ.firebaseapp.com",
  projectId: "SEU-PROJ",
  storageBucket: "SEU-PROJ.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

try {
  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
  console.log('Firebase inicializado');
} catch (err) {
  console.warn('Firebase não inicializado; modo demo sem Firestore', err);
  window.db = null;
}
