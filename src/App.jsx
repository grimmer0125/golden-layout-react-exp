import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Demo from "./Demo";

let show = false;

class App extends React.Component {
  //   getInitialState: function() {
  //     return this.props.userData;
  //   },
  constructor(props) {
    super(props);
    this.state = {
      // ...this.props.userData
    };
  }
  showGolden = () => {
    if (!show) {
      Demo.init();
    } else {
      Demo.destroy();
    }
    show = !show;

    // this.props.glEventHub.emit("user-select", this.state);
  };
  render() {
    return <div onClick={this.showGolden}> click this to show/hide </div>;
  }
}

// function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code> src / App.js </code> and save to reload.{" "}
//         </p>{" "}
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React{" "}
//         </a>{" "}
//       </header>{" "} */}
//       {/* <Demo /> */}
//     </div>
//   );
// }

export default App;
