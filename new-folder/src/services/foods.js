import { BASE_URL } from './config'
import axios from 'axios'

export async function getAllFoods() {
    const url = BASE_URL + "/foods"
    const token = sessionStorage.getItem("token")
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(response.status === 200) {
        const resp = response.data
        if(resp.status === 'success')
            return resp.data
        throw new Error("Error: " + resp.error)
    }
    return new Error(`Error Status: ${response.status}`)
}

export async function saveFoodItem(fdata) {
    const url = BASE_URL + "/foods"
    const token = sessionStorage.getItem("token")
    const response = await axios.post(url, fdata, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    if(response.status === 200) {
        const resp = response.data
        if(resp.status === 'success')
            return resp.data
        throw new Error("Error: " + resp.error)
    }
    return new Error(`Error Status: ${response.status}`)
}

export async function updateFoodItem(foodId, fdata) {
    const url = BASE_URL + "/foods/" + foodId
    const token = sessionStorage.getItem("token")
    const response = await axios.put(url, fdata, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    if(response.status === 200) {
        const resp = response.data
        if(resp.status === 'success')
            return resp.data
        throw new Error("Error: " + resp.error)
    }
    return new Error(`Error Status: ${response.status}`)
}

export async function deleteFoodItemById(foodId) {
    const url = BASE_URL + `/foods/${foodId}`
    const token = sessionStorage.getItem("token")
    const response = await axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(response.status === 200) {
        const resp = response.data
        if(resp.status === 'success')
            return resp.data
        throw new Error("Error: " + resp.error)
    }
    return new Error(`Error Status: ${response.status}`)
}