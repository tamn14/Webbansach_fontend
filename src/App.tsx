import { getAllBook } from "./API/SachAPI"
import Footer from "./Layouts/Header-footer/Footer"
import Navbar from "./Layouts/Header-footer/Navbar"
import HomePages from "./Layouts/Homepage/homepage"

function App() {

  return (
    <>
      <div>
        <Navbar />
        <HomePages />
        <Footer />
      </div>

    </>
  )
}

export default App
