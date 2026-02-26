import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type TaskDocument = Task & Document;
@Schema()
export class Task{
    @Prop({required:true})
    title:string;
    @Prop({required:true})
    description:string;
    @Prop({require:true,enum:["high","low","medium"]})
    priority:string;
    @Prop({required:true,default:false})
    completed:boolean;
    @Prop({required:true,default:Date.now})
    createdAt:Date
}
export const TaskSchema = SchemaFactory.createForClass(Task);