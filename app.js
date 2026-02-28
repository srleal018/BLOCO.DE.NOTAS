import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ... sua configuração firebaseConfig aqui ...
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função Universal de Formatação
window.execCmd = (cmd, val = null) => document.execCommand(cmd, false, val);

// Inserir Imagem (Base64)
window.adicionarImagem = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = `<img src="${reader.result}" style="max-width: 300px;">`;
            document.execCommand('insertHTML', false, img);
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    input.click();
};

// Inserir Estrutura de Mapa Mental
window.inserirMapaMental = () => {
    const code = `
    <pre class="mermaid">
        graph TD
        A[Ideia Principal] --> B[Subtópico 1]
        A --> C[Subtópico 2]
    </pre>`;
    document.execCommand('insertHTML', false, code);
    mermaid.init(); // Renderiza o gráfico
};

// Salvar no Firebase
document.getElementById('btn-salvar').onclick = async () => {
    const titulo = document.getElementById('titulo-nota').value;
    const conteudo = document.getElementById('editor').innerHTML;
    await addDoc(collection(db, "notas"), {
        uid: auth.currentUser.uid,
        titulo,
        conteudo,
        data: new Date()
    });
    alert("Salvo com sucesso!");
};
