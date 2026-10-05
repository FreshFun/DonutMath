const LESSONS=[
 {u:"Unit 1: Equations",t:"One-step equations",d:"Undo the operation to get x alone.",ex:"x + 7 = 12",q:"x + 7 = 12. What is x?",a:"5",h:"Subtract 7 from both sides."},
 {u:"Unit 1: Equations",t:"Two-step equations",d:"Undo adding first, then multiplying.",ex:"2x + 3 = 11",q:"2x + 3 = 11. What is x?",a:"4",h:"Subtract 3, then divide by 2."},
 {u:"Unit 1: Equations",t:"Variables on both sides",d:"Collect the x terms on one side.",ex:"5x - 4 = 2x + 8",q:"5x - 4 = 2x + 8. What is x?",a:"4",h:"Subtract 2x, add 4, divide by 3."},
 {u:"Unit 1: Equations",t:"Inequalities",d:"Same as equations, but flip the sign when you divide by a negative.",ex:"3x < 12",q:"3x < 12. x < ?",a:"4",h:"Divide both sides by 3."},
 {u:"Unit 2: Linear functions",t:"Slope",d:"Rise over run: how steep a line is.",ex:"(1,2) and (3,8)",q:"Slope between (1,2) and (3,8)?",a:"3",h:"(8 - 2) / (3 - 1)."},
 {u:"Unit 2: Linear functions",t:"Slope-intercept form",d:"y = mx + b, where b is where the line crosses the y-axis.",ex:"y = 2x + 5",q:"In y = 2x + 5, what is the y-intercept?",a:"5",h:"It's the b value."},
 {u:"Unit 2: Linear functions",t:"Graphing lines",d:"Plot the intercept, then use the slope to find the next point.",ex:"y = x - 1",q:"What is y when x = 4 in y = x - 1?",a:"3",h:"Plug in 4 for x."},
 {u:"Unit 2: Linear functions",t:"Systems of equations",d:"Find the point where two lines meet.",ex:"y = x + 1 and y = 2x - 2",q:"x where x + 1 = 2x - 2?",a:"3",h:"Set them equal and solve."},
 {u:"Unit 3: Exponents and polynomials",t:"Exponent rules",d:"Multiplying same bases? Add the exponents.",ex:"x^2 * x^3 = x^5",q:"x^4 * x^3 = x^?",a:"7",h:"Add 4 and 3."},
 {u:"Unit 3: Exponents and polynomials",t:"Adding polynomials",d:"Combine like terms.",ex:"(2x + 3) + (x + 4)",q:"(2x + 3) + (x + 4) = ?x + 7. What goes in ?",a:"3",h:"Add the x coefficients."},
 {u:"Unit 4: Quadratics",t:"Factoring",d:"Find two numbers that multiply to c and add to b.",ex:"x^2 + 5x + 6 = (x+2)(x+3)",q:"x^2 + 7x + 12 = (x+3)(x+?)",a:"4",h:"3 times what is 12?"},
 {u:"Unit 4: Quadratics",t:"Solving quadratics",d:"Factor, then set each part to zero.",ex:"(x-2)(x+5) = 0",q:"(x-2)(x+5)=0. What is the positive solution?",a:"2",h:"x - 2 = 0."}
];
const $=s=>document.querySelector(s);
let done=new Set(),user="";
function show(id){["landing","auth","app"].forEach(i=>$("#"+i).classList.toggle("hidden",i!==id));window.scrollTo(0,0)}
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));
$("#login").onclick=()=>{
  const e=$("#em").value.trim();
  if(!e){$("#err").textContent="Enter an email. Any email works.";return}
  user=e.split("@")[0]||e;
  $("#err").textContent="";
  $("#name").textContent=user;$("#hi").textContent="Welcome back, "+user+"!";
  show("app");home();
};
$("#pw").onkeydown=$("#em").onkeydown=e=>{if(e.key==="Enter")$("#login").click()};
$("#out").onclick=()=>{done.clear();$("#em").value="";$("#pw").value="";show("landing")};
function home(){
  $("#view").classList.add("hidden");$("#home").classList.remove("hidden");
  let h="",cur="";
  LESSONS.forEach((l,i)=>{
    if(l.u!==cur){if(cur)h+="</div>";cur=l.u;h+=`<h2 class="unit">${l.u}</h2><div class="grid">`}
    h+=`<button class="lesson ${done.has(i)?"done":""}" data-i="${i}"><b>${l.t}</b><span>${l.d}</span></button>`;
  });
  $("#units").innerHTML=h+"</div>";
  $("#units").querySelectorAll(".lesson").forEach(b=>b.onclick=()=>open(+b.dataset.i));
  $("#count").textContent=done.size+" of "+LESSONS.length;
  $("#bar").style.width=(done.size/LESSONS.length*100)+"%";
}
function open(i){
  const l=LESSONS[i];
  $("#home").classList.add("hidden");const v=$("#view");v.classList.remove("hidden");
  v.innerHTML=`<button class="btn ghost" id="back" style="box-shadow:none">Back to lessons</button>
  <div class="card"><p style="margin:0;color:var(--mute)">${l.u}</p><h1>${l.t}</h1><p>${l.d}</p>
  <div class="eq">${l.ex}</div></div>
  <div class="card"><h3>Practice</h3><p>${l.q}</p>
  <div class="ans"><input id="ans" inputmode="decimal" placeholder="Your answer" aria-label="Your answer"><button class="btn" id="chk">Check answer</button></div>
  <button class="btn ghost" id="hint" style="margin-top:12px;box-shadow:none">Show hint</button>
  <div class="msg" id="msg"></div></div>`;
  window.scrollTo(0,0);
  $("#back").onclick=home;
  $("#hint").onclick=()=>$("#msg").textContent="Hint: "+l.h;
  const check=()=>{
    if($("#ans").value.trim()===l.a){done.add(i);$("#msg").textContent="Correct! Lesson complete.";$("#msg").style.color="var(--blue)";setTimeout(home,1200)}
    else{$("#msg").textContent="Not quite. Try again or show the hint.";$("#msg").style.color="#d6204a"}
  };
  $("#chk").onclick=check;$("#ans").onkeydown=e=>{if(e.key==="Enter")check()};
}