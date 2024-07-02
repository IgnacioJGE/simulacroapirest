import mongoose from 'npm:mongoose@7.6.3';
import { Person } from "../types.ts";


const Schema= mongoose.Schema

const schemaPerson= new Schema({
    name:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    country:{type:String,required:true},
    city:{type:String,required:true}
},
{timestamps:true})

export type tipoPerson= mongoose.Document & Omit<Person,"id"> & ({city:string})

export const ModeloPerosn= mongoose.model<tipoPerson>("Personas",schemaPerson)