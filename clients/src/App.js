import './App.css';
import axios from "axios";
import {useState} from "react";
function App() {

  const [train, setTrain] = useState([]);
  
  const [data, setdata] = useState({
    source: "",
    destination: ""
  });

  //console.log(start, dest);

  const handleChange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
   await axios.post("http://localhost:5000/search",{
      start: data.source,
      dest: data.destination
    }).then((response)=>{
      //console.log(response.data.train);
      setTrain(response.data.train);
    })
    
  }
  
  console.log(train);

  return (
   <>
    <div className="mane">
      <form>
        <header> CHECK TICKET STATUS</header>
        <h2 className="name"> Source:</h2>
        <input className="src" name="source" onChange={handleChange} type="text" placeholder="From Station" /><br />
        <h2 className="name1">Destination:</h2>
        <input className="des" name="destination" onChange={handleChange} type="text" placeholder="To Station" />
        <h2 className="name2"> Date:</h2>
        <input className="dat" type="date" />
        <button onClick={handleSubmit}>Find Trains</button>
      </form>
    </div>
    <div className="output">
      <header>SEARCHED RESULTS</header>
    </div>
    <table  class="tab" bgcolor="black" width="580">
    <tr bgcolor="white">
      <th width="100">Train Number</th>
      <th width="100">Train Name</th>
      <th width="100">Seats Available</th>
      <th width="100">Running Schedule</th>
    </tr>
    {train.map((t)=>(

      <tr bgcolor="white">
      <td>{t.trainNo}</td>
      <td>{t.trainName}</td>
      <td>{t.seats}</td>
      <td>{t.days}</td>
    </tr>
    ))}
  </table>
   </>
  );
}

export default App;
