import React, { useEffect, useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import "./App.css"

export default function App() {
  const [number1, setNumber1] = useState(4)
  const [number2, setNumber2] = useState(3)
  const [operator, setOperator] = useState("*")
  const [guess, setGuess] = useState("")
  const [calculated, setCalculated] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [resultColor, setResultColor] = useState("")

  const handleGuessChange = e => {
    e.preventDefault()
    setGuess(+e.target.value)
  }

  useEffect(() => {
    let result = calcTotal(number1, number2, operator)
    setCalculated(+result)
  }, [number1, number2, operator, guess])

  const calcTotal = (num1, num2, operator) => {
    switch (operator) {
      case "*":
        return num1 * num2
      case "+":
        return num1 + num2
      case "-":
        return num1 - num2
      case "/":
        return parseFloat(num1 / num2).toFixed(2)
      default:
        return
    }
  }

  const startNewGame = () => {
    setNumber1(29)
    setNumber2(43)
    setGuess("")
    setShowResult(false)
    setCalculated(0)
  }

  const produceOutcome = () => {
    setShowResult(true)
    if (calculated === guess) {
      setResultColor("green")
    } else {
      setResultColor("red")
    }
  }

  function handleDrop(spot, item) {
    if (spot === "number1") setNumber1(item.text)
    if (spot === "number2") setNumber2(item.text)
    if (spot === "operator") setOperator(item.text)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        <div onClick={startNewGame} className='new-game-btn'>
          New +
        </div>
        {/* math card */}
        <div className='math_and_ops'>
          <div className='math-card'>
            <Spot
              type='number'
              text={number1}
              spot='number1'
              handleDrop={handleDrop}
            />
            <Spot
              type='number'
              text={number2}
              spot='number2'
              handleDrop={handleDrop}
            />
            <Spot
              type='operator'
              text={operator}
              spot='operator'
              handleDrop={handleDrop}
            />
            {showResult && (
              <div className='total' style={{ color: resultColor }}>
                {calcTotal(number1, number2, operator)}
              </div>
            )}
          </div>
          <div className='cards operators'>
            <div>
              {["*", "-", "+", "/"].map((o, i) => (
                <Operator key={i} text={o} />
              ))}
            </div>
            <br />
            <input
              type='number'
              placeholder='Try to do the math...'
              value={guess}
              onChange={handleGuessChange}
            />
            <button onClick={produceOutcome}>Check</button>
          </div>
        </div>

        <div>
          <div className='cards numbers'>
            {Array(100)
              .fill(0)
              .map((n, i) => (
                <Number key={i} num={i} />
              ))}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

function Spot({ type, text, handleDrop, spot }) {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: type,
    drop: item => {
      handleDrop(spot, item)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  let backgroundColor = "#E9E1D1"
  if (canDrop) backgroundColor = "#D0B658"
  if (isOver) backgroundColor = "#67C046"
  return (
    <div className='spot' ref={dropRef} style={{ backgroundColor }}>
      {text}
    </div>
  )
}

function Number({ num }) {
  const [{ opacity, color, background }, dragRef] = useDrag({
    item: { type: "number", text: num },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      color: monitor.isDragging() ? "yellow" : "darkorange",
      background: monitor.isDragging() ? "black" : "white",
    }),
  })
  return (
    <div ref={dragRef} className='card' style={{ opacity, color, background }}>
      {num}
    </div>
  )
}

function Operator({ text }) {
  const [{ opacity, color, background }, dragRef] = useDrag({
    item: { type: "operator", text: text },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      color: monitor.isDragging() ? "yellow" : "darkorange",
      background: monitor.isDragging() ? "black" : "white",
    }),
  })
  return (
    <div className='card' ref={dragRef} style={{ opacity, color, background }}>
      {text}
    </div>
  )
}
