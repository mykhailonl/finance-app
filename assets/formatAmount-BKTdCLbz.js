const n=(r,t)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(t?Math.abs(r):r);export{n as f};
