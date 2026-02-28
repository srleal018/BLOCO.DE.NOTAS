import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC08uBaH3okS0pdOkMM9wWS2c_sTt6_UTU",
  authDomain: "bloco-de-notas-85103.firebaseapp.com",
  projectId: "bloco-de-notas-85103",
  storageBucket: "bloco-de-notas-85103.firebasestorage.app",
  messagingSenderId: "890697512853",
  appId: "1:890697512853:web:7bff196880f1b010d5289c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Elementos
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app');

// Auth: Monitorar Login
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginScreen.style.display = 'none';
        appScreen.style.display = 'flex';
        carregarNotas();
    } else {
        loginScreen.style.display = 'block';
        appScreen.style.display = 'none';
    }
});

// Funções
document.getElementById('btn-login').onclick = () => signInWithPopup(auth, provider);
document.getElementById('btn-logout').onclick = () => signOut(auth);

document.getElementById('btn-salvar').onclick = async () => {
    const titulo = document.getElementById('titulo-nota').value;
    const conteudo = document.getElementById('editor').innerHTML;
    
    await addDoc(collection(db, "notas"), {
        uid: auth.currentUser.uid,
        titulo,
        conteudo,
        data: new Date()
    });
    alert("Nota salva!");
    carregarNotas();
};

async function carregarNotas() {
    const q = query(collection(db, "notas"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const lista = document.getElementById('lista-arquivos');
    lista.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const item = document.createElement('li');
        item.textContent = doc.data().titulo;
        lista.appendChild(item);
    });
}
