import { MediaService } from 'utils/axios'
export const convertObjToArray = obj => {
  const newArray = Object.keys(obj).map(item => obj[item])
  return newArray
}

export const formatCurrency = num =>
  typeof num === 'number'
    ? `₦${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    : `N/A`

export const fecthImage = async ({ id }) =>
  await MediaService.get(`/images/${id}`)
