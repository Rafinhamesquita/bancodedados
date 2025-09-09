// Configuração Firebase (substitua com a sua)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
} catch (error) {
    console.log('Firebase demo mode');
}

// Funções
export function saveOrder(orderData){
    if(db) db.collection('orders').add(orderData);
    console.log('Order saved:', orderData);
}

export function saveContact(contactData){
    if(db) db.collection('contacts').add(contactData);
    console.log('Contact saved:', contactData);
}
