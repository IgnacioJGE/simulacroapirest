import express,{Request,Response} from "npm:express@4.18.2";
import { ModeloPerosn } from "../db/personas.ts";
import { getcalidad, getciudad, validatephone } from "../apigeters.ts";



export default async function addPerson(req:Request,res:Response){
try {
    const {name,phone}= req.body;

    const validopais= await  validatephone(phone)
    const ciudad= await getciudad(validopais)
    const calidad= await getcalidad(ciudad)
    const nuevaPerson= new ModeloPerosn({
        name:name,
        phone:phone,
        country:validopais,
        city:ciudad
    })
    await nuevaPerson.save();

    return res.status(200).send({
        id:nuevaPerson._id,
        name:name,
        phone:phone,
        country:validopais,
        city:ciudad,
        calidad:calidad
    })
} catch (error) {
    if(error.message.startsWith("E11000")) return  res.status(400).send("Numero ya existente en la base de datos")
    return res.status(400).send(error.message)
}
}