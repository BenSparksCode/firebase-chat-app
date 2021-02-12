import React, { } from 'react'
import './App.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const API_KEY = process.env.REACT_APP_FIREBASE_API

firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: "chat-party-60343.firebaseapp.com",
  projectId: "chat-party-60343",
  storageBucket: "chat-party-60343.appspot.com",
  messagingSenderId: "701818781895",
  appId: "1:701818781895:web:b930924389c7381e357ee2",
  measurementId: "G-1ZJTWFQ7W0"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


const App = () => {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export const SignIn = (props) => {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

export const SignOut = (props) => {
  return auth.currentUser && (
    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )
}

export const ChatRoom = () => {

  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})

  return (
    <>
    <div>
      {messages && messages.map( msg => <ChatMessage key={msg.id} message={msg}/>)}
    </div>
    <div>

    </div>
    </>
  )
}

export const ChatMessage = (props) => {

  const { text, uid } = props.message

  return <p>{text}</p>
}


export default App;


