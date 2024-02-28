import { useState } from "react";
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Homepage from "./pages/Homepage/Homepage"
import Admin from "./pages/Admin/Admin"
import styles from "./App.module.scss"

import { seedRecipes } from "./data/sees"


seedRecipes();

function App() {
  const [page, setPage] = useState('homepage');
  return (
      <div className={`d-flex flex-column ${styles.appContainer}`}>
        <Header setPage={setPage} />
        { page === 'homepage' && <Homepage />}
        { page === 'admin' && <Admin />}
        <Footer />
      </div>   
  )
}
export default App;
