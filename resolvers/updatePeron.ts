
import express, { Request, Response } from "npm:express@4.18.2";
import { ModeloPerosn } from "../db/personas.ts";
import { getcalidad, getciudad, validatephone } from "../apigeters.ts";



export default async function updatePerson(req: Request, res: Response) {
    try {
        const { name, phone, id } = req.body;
        if (!phone && !name) throw new Error("Nombre o telefono obligatorios")
        const existe = await ModeloPerosn.findById(id)
        if (!existe) throw new Error(`No existe persona con la id: ${id}`)
            if(!name){
                const validopais = await validatephone(phone)
                const ciudad = await getciudad(validopais)
                const calidad = await getcalidad(ciudad)
                await ModeloPerosn.findByIdAndUpdate(id, {phone: phone, country: validopais, city: ciudad })
                return res.status(200).send({
                    id: existe._id,
                    name: name,
                    phone: phone,
                    country: validopais,
                    city: ciudad,
                    calidad: calidad
                })
            }
            if(!phone){
                const calidad = await getcalidad(existe.city)
                await ModeloPerosn.findByIdAndUpdate(id, { name: name })
                return res.status(200).send({
                    id: existe._id,
                    name: name,
                    phone: phone,
                    country: existe.country,
                    city: existe.city,
                    calidad: calidad
                })
            }
        const validopais = await validatephone(phone)
        const ciudad = await getciudad(validopais)
        const calidad = await getcalidad(ciudad)
        await ModeloPerosn.findByIdAndUpdate(id, { name: name, phone: phone, country: validopais, city: ciudad })
        return res.status(200).send({
            id: existe._id,
            name: name,
            phone: phone,
            country: validopais,
            city: ciudad,
            calidad: calidad
        })
    } catch (error) {
        if (error.message.startsWith("E11000")) return res.status(400).send("Numero ya existente en la base de datos")
        return res.status(400).send(error.message)
    }
}