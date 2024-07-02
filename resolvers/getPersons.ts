import express,{Request,Response} from "npm:express@4.18.2";
import { ModeloPerosn } from "../db/personas.ts";
import { getcalidad, getciudad, validatephone } from "../apigeters.ts";



export default async function getPersons(req:Request,res:Response){
try {
    const existe= await ModeloPerosn.find()
    const arraymostrar=[]
    for (let index = 0; index < existe.length; index++) {
        const calidad= await getcalidad(existe[index].city)
        arraymostrar.push({
            id:existe[index]._id,
            name:existe[index].name,
            phone:existe[index].phone,
            country:existe[index].country,
            city:existe[index].city,
            calidad:calidad
        })
    }
return res.status(200).send(arraymostrar)
} catch (error) {
    return res.status(400).send(error.message)
}
}