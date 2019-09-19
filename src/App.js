import React from 'react';
import Home from './Home';


  
class App extends React.Component {
  // componentDidMount =() => {
  //   window.AddCampaigns = () =>{
  //     // do whatever you want here
  //     console.log("global method")
  //    };
  // }
  render(){
    return (
      <div className="App">
        <Home />
  
      </div>
    );
  }
}

export default App;
