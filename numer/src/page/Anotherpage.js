import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Bisection from "./1root/Bisection";
import FalsePo from "./1root/FalsePo";
import Test from "../Test";
import Sample from "../Sample";
import Onepoint from "./1root/Onepoint";
import Taylors from "./1root/Taylors";
import NewtonR from "./1root/NewtonR";
import Secant from "./1root/Secant";
import CramerR from "./2linear/CramerR";
import GaussEli from "./2linear/GaussEli";
import GaussJor from "./2linear/GaussJor";
import MatrixInv from "./2linear/MatrixInv";
import LUdecompos from "./2linear/LUdecompos";
import Linear from "./3regression/Linear";
import Polynomial from "./3regression/Polynomial";
import Mullinear from "./3regression/Mullinear";

const Anotherpage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/test" element={<Test />} />
        <Route path="/bisection" element={<Bisection />} />
        <Route path="/falsepo" element={<FalsePo />} />
        <Route path="/onepoint" element={<Onepoint />} />
        <Route path="/taylors" element={<Taylors />} />
        <Route path="/newton" element={<NewtonR />} />
        <Route path="/secant" element={<Secant />} />
        <Route path="/cramer" element={<CramerR />} />
        <Route path="/gausselimination" element={<GaussEli />} />
        <Route path="/gaussjordan" element={<GaussJor />} />
        <Route path="/matrix_inversion" element={<MatrixInv />} />
        <Route path="/LU_decomposition" element={<LUdecompos />} />
        <Route path="/Linear_Regression" element={<Linear />} />
        <Route path="/Polynomial_Regression" element={<Polynomial />} />
        <Route path="/Multiple_Linear_Regression" element={<Mullinear />} />
      </Routes>
    </div>
  );
};

export default Anotherpage;
