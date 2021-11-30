const digits = [
  {
    value: "7",
    id: "seven",
  },
  {
    value: "8",
    id: "eight",
  },
  {
    value: "9",
    id: "nine",
  },
  {
    value: "4",
    id: "four",
  },
  {
    value: "5",
    id: "five",
  },
  {
    value: "6",
    id: "six",
  },
  {
    value: "1",
    id: "one",
  },
  {
    value: "2",
    id: "two",
  },
  {
    value: "3",
    id: "three",
  },
  {
    value: "0",
    id: "zero",
  },
  {
    value: ".",
    id: "decimal",
  },
];

const operators = [
  {
    op: "+",
    id: "add",
  },
  {
    op: "-",
    id: "subtract",
  },
  {
    op: "*",
    id: "multiply",
  },
  {
    op: "/",
    id: "divide",
  },
];

const PrevDisplay = ({ displayPrev }) => {
  return <h4 id="display-prev">{displayPrev}</h4>;
};

const Display = ({ display }) => {
  return <h3 id="display">{display}</h3>;
};

const Number = ({ value, id, handleOperands }) => {
  return (
    <button
      id={id}
      className="number"
      onClick={() => {
        handleOperands(value);
      }}
    >
      {value}
    </button>
  );
};

const Numbers = ({ operands, handleOperands }) => {
  return (
    <div className="numbers">
      {operands.map((item) => {
        const { value, id } = item;
        return (
          <Number
            key={id}
            value={value}
            id={id}
            handleOperands={handleOperands}
          />
        );
      })}
    </div>
  );
};

const Operator = ({ op, id, handleOperations }) => {
  return (
    <button id={id} className="operator" onClick={() => handleOperations(op)}>
      {op}
    </button>
  );
};

const Operators = ({ operators, handleOperations }) => {
  return (
    <div className="operators">
      {operators.map((operator) => {
        const { op, id } = operator;
        return (
          <Operator
            key={id}
            op={op}
            id={id}
            handleOperations={handleOperations}
          />
        );
      })}
    </div>
  );
};

const EqualBtn = ({ handleEqual }) => {
  return (
    <button id="equals" onClick={handleEqual}>
      =
    </button>
  );
};

const ClearBtn = ({ handleClear }) => {
  return (
    <button id="clear" onClick={handleClear}>
      AC
    </button>
  );
};

const App = () => {
  const [currOperands, setCurrOperands] = React.useState("0");
  const [prevOperands, setPrevOperands] = React.useState("");

  const handleOperands = (value) => {
    if (currOperands === "0") {
      if (value === ".") {
        setCurrOperands((prev) => prev + value);
      } else {
        setCurrOperands(value);
      }
    } else {
      if (value === "." && currOperands.includes(value)) {
        value = "";
      }
      setCurrOperands((prev) => prev + value);
    }
  };

  const handleOperations = (op = "") => {
    setPrevOperands((prev) => prev + currOperands + op);
    setCurrOperands("");
  };

  const handleEqual = () => {
    handleOperations();
    const calcArr = (prevOperands + currOperands).split("");

    for (let i = 0; i < calcArr.length; i++) {
      if (isNaN(calcArr[i]) && isNaN(calcArr[i + 1]) && calcArr[i + 1] !== "-")
        if (isNaN(calcArr[i - 1])) {
          calcArr[i - 1] = "";
          calcArr[i] = "";
        } else {
          calcArr[i] = "";
        }
    }
    const newStr = calcArr.join("");
    setCurrOperands(eval(newStr));
    setPrevOperands("");
  };

  const handleClear = () => {
    // setDisplay("0");
    setCurrOperands("0");
    setPrevOperands("");
  };

  return (
    <div className="calculator">
      <PrevDisplay displayPrev={prevOperands} />
      <Display display={currOperands} />
      <Numbers operands={digits} handleOperands={handleOperands} />
      <Operators operators={operators} handleOperations={handleOperations} />
      <EqualBtn handleEqual={handleEqual} />
      <ClearBtn handleClear={handleClear} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
