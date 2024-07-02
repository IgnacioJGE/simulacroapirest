import express,{Request,Response} from "npm:express@4.18.2";
import { ModeloPerosn } from "../db/personas.ts";
import { getcalidad} from "../apigeters.ts";



export default async function deletePerson(req:Request,res:Response){
try {
    const id= req.params.id
    const existe= await ModeloPerosn.findByIdAndDelete(id)
    if(!existe) throw new Error(`No existe persona con la id: ${id}`)
    const calidad= await getcalidad(existe.city)
    return res.status(200).send({
        id:existe._id,
        name:existe.name,
        phone:existe.phone,
        country:existe.country,
        city:existe.city,
        calidad:calidad
    })
} catch (error) {
    return res.status(400).send(error.message)
}
}