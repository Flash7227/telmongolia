"use client"
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/ui/breadcrumb";
import Pad from "./pad";
import Prefix from "./prefix";
import List from "./list";
import Grade from "./grade";
import { getNumbers } from "@/api/rest";


const breadcrumb = ["Дугаар захиалах"];

const Page = () => {
    const [currentNumber, setCurrentNumber] = useState('');
    const [prefixState, setPrefixState] = useState('');
    const [list, setList] = useState();
    const [grade, setGrade] = useState('A');

    const handlePrefixChange = (d:string)=>{
        setPrefixState(d);
    }
    const handleGradeChange = (d:string) => {
        setGrade(d);
    }
    const handlePadChange = async (number:any) =>{
        let temp = '';
        for (const key in number) {
            if(number[key] === "*"){
                temp += "_";
            }else{
                temp += number[key]
            }
        }
        setCurrentNumber(temp);
    }
    useEffect(()=>{
        getData(1);
    },[currentNumber, grade]);

    const getData = async (page:number) => {
        if(currentNumber){
            let data = await getNumbers(currentNumber, grade, page);
            setList(data);
        }
    }

    return (
        <div>
            <Breadcrumb data={breadcrumb} />
            <div className="mx-auto text-center">
                <Pad prefix={prefixState} onPadChange={handlePadChange}/>
            </div>
            
            <div className="flex my-4 flex-wrap">
                <div className="mt-2">
                    <Prefix onPrefixChange={handlePrefixChange}/>
                </div>
                <div className="mx-auto">
                    <div className="my-2">
                        <Grade onGradeChange={handleGradeChange} grade={grade}/>
                    </div>
                    <List list={list} onPageChange={getData}/>
                </div>
            </div>
        </div>
    );
}

export default Page;