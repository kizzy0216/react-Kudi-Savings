export const convertObjToArray = obj => {
    const newArray = Object.keys(obj).map(item => obj[item])
    return newArray
}
