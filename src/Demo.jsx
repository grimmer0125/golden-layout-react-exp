import React from "react";
import ReactDOM from "react-dom";

import GoldenLayout from "golden-layout";

window.React = React;
window.ReactDOM = ReactDOM;

class User extends React.Component {
  //   getInitialState: function() {
  //     return this.props.userData;
  //   },
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.userData
    };
  }
  selectUser = () => {
    this.props.glEventHub.emit("user-select", this.state);
  };
  render() {
    return <li onClick={this.selectUser}>{this.state.name}</li>;
  }
}

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { name: "Jackson Turner", street: "217 Tawny End", img: "men_1.jpg" },
        { name: "Megan Perry", street: "77 Burning Ramp", img: "women_1.jpg" },
        {
          name: "Ryan Harris",
          street: "12 Hazy Apple Route",
          img: "men_2.jpg"
        },
        {
          name: "Jennifer Edwards",
          street: "33 Maple Drive",
          img: "women_2.jpg"
        },
        {
          name: "Noah Jenkins",
          street: "423 Indian Pond Cape",
          img: "men_3.jpg"
        }
      ]
    };
  }
  //   componentDidMount() {}

  // render() {
  //   return <h1>{this.props.label}</h1>;
  // }

  render() {
    const eventHub = this.props.glEventHub;
    return (
      <ul className="userlist">
        {this.state.users.map(function(user) {
          return <User key={user.name} userData={user} glEventHub={eventHub} />;
        })}
      </ul>
    );
  }
}

class UserDetail extends React.Component {
  componentWillMount() {
    this.props.glEventHub.on("user-select", this.setUser);
  }
  componentWillUnmount() {
    this.props.glEventHub.off("user-select", this.setUser);
  }
  setUser = userData => {
    this.setState(userData);
  };
  render() {
    if (this.state) {
      var imgUrl =
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/152047/" + this.state.img;
      return (
        <div className="userdetails">
          <img src={imgUrl} width="100" height="100" />
          <h2>{this.state.name}</h2>
          <p>{this.state.street}</p>
        </div>
      );
    } else {
      return <div className="userdetails">No user selected</div>;
    }
  }
}

class Demo extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.myRef = React.createRef();
  //   }
  //   componentDidMount() {}

  render() {
    return <h1>{this.props.label}</h1>;
  }
}

// import "golden-layout/src/css/goldenlayout-base.css";
// import "golden-layout/src/css/goldenlayout-dark-theme.css";

// var TestComponent = React.createClass({
//     render: function() {
//       return (<h1>{this.props.label}</h1>)
//     }
//   });

//   myLayout.registerComponent( 'test-component', TestComponent );

//   //Once all components are registered, call
//   myLayout.init();

// const myLayout = new GoldenLayout({
//   content: [
//     {
//       type: "row",
//       content: [
//         {
//           type: "react-component",
//           component: "test-component",
//           props: { label: "A" }
//         },
//         {
//           type: "column",
//           content: [
//             {
//               type: "react-component",
//               component: "test-component",
//               props: { label: "B" }
//             },
//             {
//               type: "react-component",
//               component: "test-component",
//               props: { label: "C" }
//             }
//           ]
//         }
//       ]
//     }
//   ]
// });

const config = {
  content: [
    {
      type: "row",
      content: [
        {
          title: "Users",
          type: "react-component",
          component: "user-list"
        },
        {
          title: "User Detail",
          type: "react-component",
          component: "user-detail"
        }
      ]
    }
  ]
};

const myLayout = new GoldenLayout(config);
myLayout.registerComponent("user-list", UserList);
myLayout.registerComponent("user-detail", UserDetail);
myLayout.init();

// myLayout.registerComponent("test-component", Demo);

// //Once all components are registered, call
// myLayout.init();

//  function Demo() {
//   return <div>hello world</div>;
// }

export default Demo;
