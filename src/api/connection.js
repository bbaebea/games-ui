// export const URL = "http://localhost:8000/api/ctg"
export const URL = "https://mfiapi.mfi.org.ph/api/ctg"
// export const URL = "https://mfiapi.mfi.org.ph/api/ctg"

export const URL2 = "https://mfiapi.mfi.org.ph/api"




export const status = async () => {
    const res = await fetch(`${URL2}/status`, {
        headers :{
            Accept: 'application/json'
        }
    })
    return await res.json()
}