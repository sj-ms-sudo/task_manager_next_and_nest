import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum Priority{
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}
export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    title:string;
    @IsString()
    @IsNotEmpty()
    description:string;
    @IsBoolean()
    @IsOptional()
    completed?:boolean ;
    @IsDate()
    @IsOptional()
    createdAt?:Date;
    @IsString()
    @IsNotEmpty()
    @IsEnum(Priority)
    priority:string ;
}