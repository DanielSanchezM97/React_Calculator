import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      prevVal: 0,
      display: 0,
      operator: "",
      dot: false,
      evaluated: false,
      limit: false,
    };
  }

  maxDigitWarning = () => {
    const { operator, display } = this.state;
    const operators = ["+", "*", "-", "/"];
    if (operators.some((char) => display.endsWith(char))) {
      let resultString = display;
      resultString = resultString.replace(/[*-/+].{0,2}$/g, (m) => "");
      this.setState({
        display: resultString,
      });
      this.result();

      this.setState({
        result: "Digit Limit Met, Equivalent Operation",
        prevVal: this.state.result,
        limit: true,
      });
      setTimeout(() => this.setState({ result: this.state.prevVal }), 1200);
    } else {
      this.result();
      this.setState({
        result:
          operator === ""
            ? "Digit Limit Met, Equivalent Number"
            : "Digit limit reached, Equivalent Operation",
        prevVal: this.state.result,
        limit: true,
      });
      setTimeout(() => this.setState({ result: this.state.prevVal }), 1200);
    }
  };

  handleClick = (e) => {
    const { display, evaluated, limit } = this.state;

    const currentValue = e.target.value;

    if (display.length > 40) {
      this.maxDigitWarning();
    } else if (evaluated && !limit) {
      this.setState({
        display: currentValue !== 0 ? currentValue : 0,
        evaluated: false,
      });
    } else {
      if (
        (display === 0 || display === "0") &&
        currentValue !== "0" &&
        !limit
      ) {
        this.setState({
          display: currentValue,
        });
      } else if (display !== 0 && display !== "0" && !limit) {
        this.setState({
          display: display + currentValue,
        });
      }
    }
  };

  handleOperators = (e) => {
    const { display, evaluated } = this.state;
    const conditionals = ["/-", "*-", "+-", "--"];
    const operators = ["+", "*", "-", "/"];

    const value = e.target.value;

    if (display.length > 40) {
      this.maxDigitWarning();
    } else if (evaluated) {
      this.setState({
        display: display + value,
        operator: value,
        evaluated: false,
        limit: false,
      });
    } else {
      if (value === "+") {
        if (
          !operators.some((char) => display.endsWith(char)) &&
          display !== 0
        ) {
          this.setState({
            display: display + value,
            operator: value,
            dot: false,
            limit: false,
          });
        } else if (conditionals.some((char) => display.endsWith(char))) {
          // Replace the last conditionals with the new operator

          let resultString = display;
          resultString = resultString.replace(/[*-/+].{0,2}$/g, (m) => "");
          this.setState({
            display: resultString + value,
            operator: value,
            dot: false,
          });
        } else if (
          operators.some((char) => display.endsWith(char)) &&
          display !== "-"
        ) {
          // Replace the last operator for the new One

          let resultString = display;
          resultString = resultString.slice(0, -1);

          this.setState({
            display: resultString + value,
            operator: value,
            dot: false,
          });
        }
      } else if (value === "-") {
        if (display === 0) {
          this.setState({
            display: "-",
            operator: value,
          });
        } else if (
          !conditionals.some((char) => display.endsWith(char)) &&
          display !== "-"
        ) {
          this.setState({
            display: display + value,
            operator: value,
            dot: false,
            limit: false,
          });
        }
      } else if (value === "*") {
        if (
          conditionals.some((char) => display.endsWith(char)) &&
          display !== 0
        ) {
          let resultString = display;
          resultString = resultString.replace(/[*-/+].{0,2}$/g, (m) => "");
          this.setState({
            display: resultString + value,
            operator: value,
            dot: false,
          });
        } else if (!operators.some((char) => display.endsWith(char))) {
          this.setState({
            display: display + value,
            operator: value,
            dot: false,
            limit: false,
          });
        } else if (
          operators.some((char) => display.endsWith(char)) &&
          display !== "-"
        ) {
          let resultString = display;
          resultString = resultString.slice(0, -1);

          this.setState({
            display: resultString + value,
            operator: value,
            dot: false,
          });
        }
      } else if (value === "/") {
        if (
          conditionals.some((char) => display.endsWith(char)) &&
          display !== 0
        ) {
          let resultString = display;
          resultString = resultString.replace(/[*-/+].{0,2}$/g, (m) => "");
          this.setState({
            display: resultString + value,
            operator: value,
            dot: false,
          });
        } else if (!operators.some((char) => display.endsWith(char))) {
          this.setState({
            display: display + value,
            operator: value,
            dot: false,
            limit: false,
          });
        } else if (
          operators.some((char) => display.endsWith(char)) &&
          display !== "-"
        ) {
          let resultString = display;
          resultString = resultString.slice(0, -1);

          this.setState({
            display: resultString + value,
            operator: value,
            dot: false,
          });
        }
      }
    }
  };

  PutDot = () => {
    const { operator, dot, display, evaluated, limit } = this.state;
    const operators = ["+", "*", "-", "/"];

    if (evaluated && !limit) {
      this.setState({
        display: "0.",
        evaluated: false,
      });
    } else {
      if (display === 0) {
        if (operator === "" && dot === false) {
          this.setState({
            display: "0.",
            dot: true,
            limit: false,
          });
        }
      } else if (
        operator !== "" &&
        operators.some((char) => display.endsWith(char))
      ) {
        this.setState({
          display: display + "0.",
          dot: true,
          limit: false,
        });
        if (
          operator !== "" &&
          dot === false &&
          !operators.some((char) => display.endsWith(char))
        ) {
          this.setState({
            display: display + ".",
            dot: true,
            limit: false,
          });
        }
      } else if (
        display !== 0 &&
        dot === false &&
        !operators.some((char) => display.endsWith(char))
      ) {
        this.setState({
          display: display + ".",
          dot: true,
          limit: false,
        });
      }
    }
  };

  result = () => {
    const { display } = this.state;

    let resultString = display;

    resultString = eval(resultString.replace(/--/g, "+"));

    let answer = Math.round(1000000000000 * eval(resultString)) / 1000000000000;

    this.setState({
      result: 0,
      display: answer,
      evaluated: true,
      dot: false,
    });
  };

  clear = () => {
    this.setState({
      result: 0,
      display: 0,
      operator: "",
      dot: false,
      evaluated: false,
      limit: false,
    });
  };

  render() {
    return (
      <div className="container">
        <div>
          <div className="calculator">
            <div className="calculator-result">
              <div id="display">
                {this.state.result === 0
                  ? this.state.display
                  : this.state.result}
              </div>
            </div>

            <div className="calculator-keypad">
              <div className="calculator-keypad-row">
                <button
                  className="calculator-keypad-button"
                  value="1"
                  onClick={this.handleClick}
                  id="one"
                >
                  1
                </button>
                <button
                  className="calculator-keypad-button"
                  value="2"
                  onClick={this.handleClick}
                  id="two"
                >
                  2
                </button>
                <button
                  className="calculator-keypad-button"
                  value="3"
                  onClick={this.handleClick}
                  id="three"
                >
                  3
                </button>
                <button
                  className="calculator-keypad-operator"
                  value="+"
                  onClick={this.handleOperators}
                  id="add"
                >
                  +
                </button>
              </div>
              <div className="calculator-keypad-row">
                <button
                  className="calculator-keypad-button"
                  value="4"
                  onClick={this.handleClick}
                  id="four"
                >
                  4
                </button>
                <button
                  className="calculator-keypad-button"
                  value="5"
                  onClick={this.handleClick}
                  id="five"
                >
                  5
                </button>
                <button
                  className="calculator-keypad-button"
                  value="6"
                  onClick={this.handleClick}
                  id="six"
                >
                  6
                </button>
                <button
                  className="calculator-keypad-operator"
                  value="-"
                  onClick={this.handleOperators}
                  id="subtract"
                >
                  -
                </button>
              </div>
              <div className="calculator-keypad-row">
                <button
                  className="calculator-keypad-button"
                  value="7"
                  onClick={this.handleClick}
                  id="seven"
                >
                  7
                </button>
                <button
                  className="calculator-keypad-button"
                  value="8"
                  onClick={this.handleClick}
                  id="eight"
                >
                  8
                </button>
                <button
                  className="calculator-keypad-button"
                  value="9"
                  onClick={this.handleClick}
                  id="nine"
                >
                  9
                </button>
                <button
                  className="calculator-keypad-operator"
                  value="*"
                  onClick={this.handleOperators}
                  id="multiply"
                >
                  x
                </button>
              </div>
              <div className="calculator-keypad-row">
                <button
                  className="calculator-keypad-button"
                  value="0"
                  onClick={this.handleClick}
                  id="zero"
                >
                  0
                </button>

                <button
                  className="calculator-keypad-button"
                  value="."
                  onClick={this.PutDot}
                  id="decimal"
                >
                  .
                </button>
                <button
                  className="calculator-keypad-operator"
                  value="="
                  onClick={this.result}
                  id="equals"
                >
                  =
                </button>

                <button
                  className="calculator-keypad-operator"
                  value="/"
                  onClick={this.handleOperators}
                  id="divide"
                >
                  /
                </button>
              </div>

              <div className="calculator-keypad-row">
                <button
                  className="calculator-keypad-operator"
                  value="C"
                  onClick={this.clear}
                  id="clear"
                >
                  C
                </button>
              </div>
            </div>
          </div>
          <div className="author">
            {" "}
            Designed and Coded By <br />
            <a href="https://codepen.io/DaniSX97">Daniel Sanchez</a>
          </div>
        </div>
      </div>
    );
  }
}
