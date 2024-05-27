import {$host} from "./index";

const getSum = async (num1, num2) => {
    const {data} = await $host.get('math/sum?' + new URLSearchParams({
        num1, num2
    }))
    return data;
}

const getSubtract = async (num1, num2) => {
    const {data} = await $host.get('math/subtract?' + new URLSearchParams({
        num1, num2
    }))
    return data;
}

const getMultiply = async (num1, num2) => {
    const {data} = await $host.get('math/multiply?' + new URLSearchParams({
        num1, num2
    }))
    return data;
}

const getDivide = async (num1, num2) => {
    const {data} = await $host.get('math/divide?' + new URLSearchParams({
        num1, num2
    }))
    return data;
}

export {
    getSum,
    getSubtract,
    getMultiply,
    getDivide
}