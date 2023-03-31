import { initializeApp } from 'firebase/app'
import{ getFirestore,collection,getDocs,getDoc, addDoc, doc, deleteDoc ,onSnapshot, query, where, orderBy, updateDoc } from 'firebase/firestore'
import { getAuth,createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
let code=document.getElementById('code').innerHTML
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

 if(code=='index') {
    let loger=document.querySelector('.signup')
  loger.addEventListener('submit',(e)=>{
      e.preventDefault()
      document.getElementById('signroller').style.visibility='visible'
      let em=loger.signemail.value
      let ps=loger.signpass.value
      let name=loger.signuser.value
      let players=[]
      getDocs(colref)
    .then((capture)=>{
        
        capture.docs.forEach((obj)=>{
            players.push(obj.data().username)
        })
        console.log(players)
    })
    console.log(name,players.includes(name,0))
    setTimeout(()=>{
        console.log(name,players.includes(name,0))
        if ((players.includes(name,0))){
        
        document.getElementById('userhelp').innerHTML=('username alredy exists')
        document.getElementById('signroller').style.visibility='hidden'
      }
          else{
            createUserWithEmailAndPassword(auth,em,ps)
          .then((credentials)=>{
              console.log(credentials.user)
              loger.reset()
              addDoc(colref,{
                username : name,
                lastscore : 0,
                highscore : 0,
                email : em
            })
            .then(()=>{
                window.location='signsuccess.html'
            })
          })
          .catch((err)=>{
              if(err.code=='auth/internal-error'){
                window.alert("Please check your internet connection and try again.")
              }
              document.getElementById('signroller').style.visibility='hidden'
          })
          }
          console.log(name,players.includes(name,0))
        },3000)
    
  })
  } 
if(code=='index') {
    let loginer=document.querySelector('.login')
loginer.addEventListener('submit',(e)=>{
    e.preventDefault()
    document.getElementById('logroller').style.visibility='visible'
    let name=loginer.loguser.value
    let ps=loginer.logpass.value
    let q=query(colref,where('username','==',name))
    let players=[]
    getDocs(q)
    .then((capture)=>{

        capture.docs.forEach((obj)=>{
            players.push({...obj.data(),id:obj.id})
        })
        console.log(players)
    })
    .catch(err=>{
        window.alert(err.message)
        document.getElementById('logroller').style.visibility='hidden'
    })
    setTimeout(()=>{
        if(players.length!=0){
        let em=players[0].email
        let id=players[0].id
        console.log(em)
        signInWithEmailAndPassword(auth,em,ps)
        .then((credentials)=>{
            console.log(credentials.user)
            loginer.reset()
            window.location='welcome.html'
            localStorage.setItem('id',id)
        })
        .catch(err=>{
            if(err.code=='auth/wrong-password'){
                window.alert('Sorry , you have entered wrong password')}
            console.log(err.code)
            document.getElementById('logroller').style.visibility='hidden'
        })}
        else{
            window.alert('Sorry, Username doesnt Exist')
            document.getElementById('logroller').style.visibility='hidden'
        }
    },4000)
    

})
}

if(code=='welcome')  {
    document.getElementById('logout1').addEventListener('click',()=>{
        signOut(auth)
            .then(()=>{
                console.log('logged out')
                localStorage.setItem('id','')
                window.location='index.html'
            })
            .catch(err=>{
                console.log(err.message)
            })
    })
}

if(code=='welcome') {
    let ourdoc=doc(db,'players',localStorage.getItem('id'))
getDoc(ourdoc)
    .then((gotdoc)=>{
        console.log(gotdoc.data(),gotdoc.id)
        document.getElementById('userview').innerHTML=gotdoc.data().username
        document.getElementById('viewlastscore').innerHTML=gotdoc.data().lastscore
        document.getElementById('viewhighscore').innerHTML=gotdoc.data().highscore
    })
}

if(code=='game') {
    let updater=document.querySelector('#updater')
updater.addEventListener('submit',(e)=>{
    e.preventDefault()
    let ourdoc=doc(db,'players',localStorage.getItem('id'))
getDoc(ourdoc)
    .then((gotdoc)=>{
        console.log(gotdoc.data(),gotdoc.id)
        let hs=parseInt(gotdoc.data().highscore)
        let ls=parseInt(updater.last.value)
        if(ls>hs){
            hs=ls
        }
    updateDoc(ourdoc,{
        lastscore : ls,
        highscore : hs
    })
        .then(()=>{
            window.location='../welcome.html'
        })
    })


    
    })
}


if (code=='leader') {
    let s=`<table class="table">
    <thead>
      <tr class="table-dark">
        <th scope="col">#</th>
        <th scope="col">Username</th>
        <th scope="col">Last Score</th>
        <th scope="col">Highest Score</th>
      </tr>
    </thead>
    <tbody id="tabody">`
    let arrsty=["table-primary","table-success","table-danger","table-info","table-warning"]
    let num=1
    
    let q=query(colref,orderBy('highscore','desc'))
    getDocs(q)
    .then((capture)=>{
        // let players=[]
        capture.docs.forEach((obj)=>{
            // players.push({...obj.data(),id:obj.id})
            s=s+`<tr class="`+arrsty[num%5]+`">
            <th scope="row">`+num+`</th>
            <td>`+obj.data().username+`</td>
            <td>`+obj.data().lastscore+`</td>
            <td>`+obj.data().highscore+`</td>
          </tr>`;
          num=num+1
          console.log(num)
        })
        // console.log(players)
        s=s+`</tbody>
        </table>`
        document.getElementById('tablearea').innerHTML=s
    })
    .catch(err=>{
        console.log(err.message)
    })
} 