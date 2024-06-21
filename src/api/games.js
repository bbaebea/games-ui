import {URL} from './connection.js'

export const storeNumberMemory = async (body) => {
    const res = await fetch(`${URL}/numbermemory`, {
        method: "POST",
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}


export const store = async (body) => {
    const res = await fetch(`${URL}/game`, {
        method: "POST",
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}


export const leaderboards = async () => {
    const res = await fetch(`${URL}/leaderboards`, {
        headers: {
            "Accept": "application/json"
        }
    })
    return await res.json()
}