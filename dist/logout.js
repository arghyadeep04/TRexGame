import { initializeApp } from 'firebase/app'
import{ getFirestore,collection,getDocs,getDoc, addDoc, doc, deleteDoc ,onSnapshot, query, where, orderBy, updateDoc } from 'firebase/firestore'
import { getAuth,createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyALwzEtAGoT4l2P8LfXerFCiie9E18ZgH4",
    authDomain: "better-56854.firebaseapp.com",
    projectId: "better-56854",
    storageBucket: "better-56854.appspot.com",
    messagingSenderId: "1080863118735",
    appId: "1:1080863118735:web:63bf56eb39150b1e52a7fa"
  };

  initializeApp(firebaseConfig)

  const auth=getAuth()

  const db=getFirestore()
  const colref=collection(db,'players')



document.getElementById('logout1').addEventListener('click',()=>{
    signOut(auth)
        .then(()=>{
            console.log('logged out')
            localStorage.setItem('id','')
        })
        .catch(err=>{
            console.log(err.message)
        })
})