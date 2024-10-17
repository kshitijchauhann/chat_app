import { initializeApp } from "firebase/app";
import Dashboard from './components/Dashboard.jsx';
import SignUp from './components/SignUp.jsx';
import FindNearby from './components/FindNearby.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnGo_MlKz2UYTkYkZhPx6mbIbP_qZK7x0",
  authDomain: "ilvu-4dfdc.firebaseapp.com",
  projectId: "ilvu-4dfdc",
  storageBucket: "ilvu-4dfdc.appspot.com",
  messagingSenderId: "839885124914",
  appId: "1:839885124914:web:c4aef23e0b4138aa07d32b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const App = () => {
  return (   
  <BrowserRouter>
      <Routes>
        <Route path='/' element={< SignUp />}></Route>
        <Route path='/dashboard' element={< Dashboard />}></Route>
      </Routes>
  </BrowserRouter>
  )
}


export default App;
