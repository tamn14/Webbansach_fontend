import React from "react";
import Banner from "./Components/Banner";
import DanhSachSP from "../Prouducts/DanhSachSP";
import { useParams } from "react-router-dom";

interface homePageProps {
    tuKhoaTimKiem : string
}

const HomePages = ({tuKhoaTimKiem} : homePageProps) => {

    const {maTheLoai} = useParams() ; 
    let maTheLoaiNumber= 0 ; 
    try{
        maTheLoaiNumber = parseInt(maTheLoai + "") ; 
    } catch(error) {
        maTheLoaiNumber = 0  ; 
        console.log('Erorr : ', error) ; 
        

    }

    if(Number.isNaN(maTheLoaiNumber))
        maTheLoaiNumber = 0  ; 

    
    return (
        <div>
            <Banner /> 
            <DanhSachSP tuKhoaTimKiem = {tuKhoaTimKiem}  maTheLoai = {maTheLoaiNumber}  />
        </div>

    );
};
export default HomePages