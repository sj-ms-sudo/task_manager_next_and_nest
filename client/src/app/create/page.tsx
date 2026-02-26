"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function createTask(){
    function handleChange(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
    const {name,value,type} = e.target;
    setForm((prev)=>({
        ...prev,
        [name]:value,
    }));
}
    const router = useRouter();
    const [Form,setForm] = useState({
        title:"",
        description :"",
        priority:"low"
    });
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const res = await fetch('http://localhost:5000/tasks/',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(Form),
        }
        );
    if (!res.ok){
        const error = await res.text();
        console.log("Backend error:", error);
        alert("Failed to create Task");
        return;
    }
    router.push("/")
}
return (
    <main className="p10 max-w-x1 mx-auto">
        <h1 className="text-2x1 font-bold mb-6">Create Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <input
                type = "text"
                name = "title"
                value = {Form.title}
                placeholder="Title"
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required></input>
            </div>
            <div>
                <textarea
                name = "description"
                value = {Form.description}
                placeholder="Description"
                onChange={handleChange}
                className="border p-2 rounder w-full"
                required></textarea>
            </div>
            <div>
                <label className="block mb-2 font medium">Priority</label>
                <div className="flex gap-4">
                    { ["low","medium","high"].map((level)=>(
                        <label key = {level} className="flex items-center gap-1">
                            <input
                            type = "radio"
                            name = "priority"
                            value = {level}
                            checked={Form.priority===level}
                            onChange={handleChange}/>
                            {level}
                        </label>
                    ))
                    }   
                </div>
                    
            </div>
            <button type="submit">Create Task</button>
        </form>
        <button type ="button"><Link href={"/"}>Home</Link></button>
    </main>
)
}