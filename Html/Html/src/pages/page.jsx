import {Button} from "@mui/material";
import {useState} from "react";

const page = () => {
    const [variant, setVariant] = useState('outlined')
    const [widthImg, setWidthImg] = useState('250px')
    const [widthButton, setWidthButton] = useState('100px')
    const [position, setPosition] = useState('relative')
    const [marginTop, setMarginTop] = useState('0')

    let variants = [
        'outlined',
        'text',
        'contained'
    ]

    const setRandom = () => {
        let randomIndex = Math.floor(Math.random() * (variants.length - 1))
        setVariant(variants[randomIndex])

        let randomWidth = Math.floor(Math.random() * (250))
        setWidthButton(`${randomWidth}px`)
    }

    const handleImage = () => {
        if (widthImg === '250px') {
            setWidthImg('500px')
            setPosition('absolute')
            setMarginTop('200px')
            return
        }

        setWidthImg('250px')
        setPosition('relative')
        setMarginTop('0')
    }

    return (
        <div className="main">
            <div className="main__vertical">
                <input
                    className="checkbox"
                    type="checkbox"
                />
                <Button
                    width={widthButton}
                    variant={variant}
                    onClick={setRandom}>Change</Button>
            </div>
            <div className="main__horizontal">
                <div className="switch__wrapper">
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <img
                    width={widthImg}
                    style={{position: position, marginTop: marginTop}}
                    onClick={handleImage}
                    className="image"
                    src="https://www.orkincanada.ca/drive/uploads/2018/09/shutterstock_572381431-min.jpg" alt="cat" />
            </div>
        </div>
    )
}

export default page