import {useState} from "react";
import {getDivide, getMultiply, getSubtract, getSum} from "../../http/mathAPI";

const HomePage = () => {
    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(0)
    const [result, setResult] = useState('')

    console.log(process.env.REACT_APP_API_URL)

    const handleSum = () => {
        getSum(num1, num2)
            .then(response => {
                if (response.message)
                    setResult(response.message)
                else
                    setResult(response)
            })
    }

    const handleSubtract = () => {
        getSubtract(num1, num2)
            .then(response => {
                if (response.message)
                    setResult(response.message)
                else
                    setResult(response)
            })
    }

    const handleMultiply = () => {
        getMultiply(num1, num2)
            .then(response => {
                if (response.message)
                    setResult(response.message)
                else
                    setResult(response)
            })
    }

    const handleDivide = () => {
        getDivide(num1, num2)
            .then(response => {
                if (response.message)
                    setResult(response.message)
                else
                    setResult(response)
            })
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2>Fill the number inputs and click the button</h2>
            <form style={{display: "flex", marginBottom: "10px"}}>
                <input
                    style={{marginRight: "5px"}}
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}/>
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}/>
            </form>
            <div style={{display: "flex", width: "250px", justifyContent: "space-between"}}>
                <button onClick={handleSum}>Sum</button>
                <button onClick={handleSubtract}>Subtract</button>
                <button onClick={handleMultiply}>Multiply</button>
                <button onClick={handleDivide}>Divide</button>
            </div>
            {
                result !== '' &&
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <h2 style={{marginBottom: "0"}}>Result:</h2>
                    <p>{result}</p>
                </div>
            }
        </div>
    )
}

export default HomePage