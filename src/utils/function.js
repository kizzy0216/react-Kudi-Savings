export const convertObjToArray = obj => {
  const newArray = Object.keys(obj).map(item => obj[item])
  return newArray
}

export const formatCurrency = num => (typeof(num)=== 'number'? `₦${num.toFixed(2)}` : `N/A`)
