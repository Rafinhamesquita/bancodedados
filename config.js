// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicialização
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Funções de demo
function saveContact(data){
    db.collection('contacts').add(data)
      .then(()=>console.log('Contato salvo no Firebase'))
      .catch(e=>console.error(e));
}

function saveOrder(data){
    db.collection('orders').add(data)
      .then(()=>console.log('Pedido salvo no Firebase'))
      .catch(e=>console.error(e));
}
