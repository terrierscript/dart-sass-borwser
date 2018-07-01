import React from "react";
import ReactDOM from "react-dom";
import "./polyfill";

import sass from "sass";

class Darter extends React.Component {
  constructor() {
    super();
    this.state = {
      scss: ".foo { .baz { color: red} }",
      css: ""
    };
  }
  componentDidMount() {
    this.sync();
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState(
      {
        scss: e.target.value
      },
      () => {
        this.sync();
      }
    );
  }
  sync() {
    try {
      const css = sass
        .renderSync({
          data: this.state.scss
        })
        .css.toString();
      this.setState({
        css
      });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <div>
        <textarea
          onChange={e => this.handleChange(e)}
          value={this.state.scss}
        />
        <pre>
          <code>{this.state.css}</code>
        </pre>
      </div>
    );
  }
}
function App() {
  return (
    <div className="App">
      <Darter />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
