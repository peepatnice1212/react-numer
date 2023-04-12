import { evaluate } from "mathjs";

export const Cal = (xl, xr, Equation, variable) => {
  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;
  let fXm, fXr, ea, xm;
  let iter = 0;
  const e = 0.00001;
  let obj = {};
  let temp = [];

  do {
    xm = (xl + xr) / 2.0;
    let valuexr = xr.toString();
    let valuexm = xm.toString();
    fXr = evaluate([variable[0] + "=" + valuexr, Equation]);
    fXm = evaluate([variable[0] + "=" + valuexm, Equation]);
    iter++;
    console.log("FXR", fXr);
    console.log("FXM", fXm);
    if (typeof fXr[fXr.length - 1] === "object") {
      fXr[fXr.length - 1] = fXr[fXr.length - 1].im;
    }
    if (typeof fXm[fXm.length - 1] === "object") {
      fXm[fXm.length - 1] = fXm[fXm.length - 1].im;
    }
    if (fXm[fXm.length - 1] * fXr[fXr.length - 1] > 0) {
      ea = error(xr, xm);
      obj = {
        iteration: iter,
        Xl: xl,
        Xm: xm,
        Xr: xr,
        err: ea,
      };
      temp.push(obj);
      xr = xm;
    } else if (fXm[fXm.length - 1] * fXr[fXr.length - 1] <= 0) {
      ea = error(xl, xm);
      obj = {
        iteration: iter,
        Xl: xl,
        Xm: xm,
        Xr: xr,
        err: ea,
      };
      temp.push(obj);
      xl = xm;
    }
    console.log(iter, " ea = ", ea);
  } while (ea > e);
  console.log("obj=", obj);
  return { re_data: temp, New_N: xm };
};
