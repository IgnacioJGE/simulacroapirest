import axios from "npm:axios"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";


const env=await load()
const api_key=env.api_key||Deno.env.get("api_key")

export async function validatephone(phone:string){

    const response= await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${phone}`,{
        headers:{ 'X-Api-Key': api_key }
    })
    if(response.data.error) return new Error(`Por favor introdduce un numero de telefono correcto`)
    if(response.data.is_valid==false) return new Error(`Telefono: ${phone} no es valido`)
    return response.data.country
}


export async function getciudad(pais:string){

    
    const response= await axios.get(`https://api.api-ninjas.com/v1/country?name=${pais}`,{
        headers:{ 'X-Api-Key': api_key }
    })
    if(response.data.length==0) return new Error(`Pais: ${pais} incorrecto`)
    return response.data[0].capital
}

export async function getcalidad(ciudad:string){
    const response= await axios.get(`https://api.api-ninjas.com/v1/airquality?city=${ciudad}`,{
        headers:{ 'X-Api-Key': api_key }
    })
    return response.data.overall_aqi
}