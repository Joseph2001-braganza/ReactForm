import React,{useState,useEffect} from 'react'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Navbar from "./components/Navbar/NavScroll"
import FormComponent from './components/Form/FormComponent';
import './App.css';

const override: CSSProperties = {
  display: "flex",
  margin: "auto",
  borderColor: "red",
  width:"100%",
  height:"100vh",
  backgroundColor:"#282c34"
};

function App() {
  const [loading,setLoading]=useState(false)
  let color="#d76737"
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },5000)
  },[])
  return (
      <>
      {
       loading?<ClimbingBoxLoader color={color} loading={loading} cssOverride={override}   size={35} />:
        <div className='OutBox'>
          <Navbar/>
            <div className="App" style={{width:"90%",height:"100%"}}>
              <div className='col1'>
              <img src='https://assets.scaler.com/assets/data_science/svg/extra-e908e7bbef0eb95bee253dc456da50b043abea721b31b7c748da1955d950b747.svg.gz' /> {' '}
              </div>
              <div className='col2'>
              <FormComponent/>
              </div>
            </div>
        </div>
      }
      </>
  );
}

export default App;
