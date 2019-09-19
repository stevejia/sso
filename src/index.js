import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import utils from './utils';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/Login" render={(matched) => {
                        var params = utils.getParams(matched.location.search)
                        return <Login test={params.test} />
                    }}></Route>
                    <Route component={NoMatch}></Route>
                </Switch>
            </Router>
        )
    }
}

// class Home extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         return <div>Home</div>
//     }
// }

class NoMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div>No Match</div>
    }
}

class Login extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = { test: props.test };
    }

    componentDidMount() {
        console.log("did mount");
        this.setState({ test: "991" })
    }

    componentDidUpdate() {
        console.log("update");
    }

    // componentWillMount() {
    //     console.log("will mount");
    // }

    componentWillUnmount() {
        console.log("will unmount");
    }

    onClick = (event) => {
        window.location.href = "http://www.baidu.com"
    }

    render() {
        return <div>
            <div>{this.state.test}</div>
            <button onClick={this.onClick}>百度一下</button>
        </div>
    }
}

// ========================================
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
