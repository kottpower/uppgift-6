import { useState } from 'react'
import SearchComponent from './Components/SearchComponent/SearchComponent'
import Main from './Components/Main/Main'

/* Dan Lindblad */

function App() {

    // Tillskriver dagens datum i formatet xxxx-xx-xx som initialt tillstånd
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [nameDay, setNameDay] = useState({});


  return (
    <>
      <SearchComponent date={date} setDate={setDate} setNameDay={setNameDay} />
      <Main nameDay={nameDay} date={date} setNameDay={setNameDay}/>
    </>
  )
}

export default App
