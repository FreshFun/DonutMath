// Sample data: teacher names are made up for this demo.
const classes = [
  {pd:2,  rm:"102",  name:"ENGLISH 9",          teachers:["Ms. Hart","Mr. Alvarez"], pct:93},
  {pd:3,  rm:"219",  name:"EMERGING LEADER",    teachers:["Mr. Bell"],               pct:96},
  {pd:4,  rm:"X106", name:"KOREAN NON-NATIVE",  teachers:["Ms. Park"],               pct:88},
  {pd:5,  rm:"250",  name:"INTRODUCTION TO J…", teachers:["Mr. Reyes"],              pct:91},
  {pd:6,  rm:"130",  name:"GLOBAL 9",           teachers:["Ms. Quinn","Mr. Doyle"],  pct:85},
  {pd:7,  rm:"",     name:"LUNCH",              teachers:[],                         pct:null},
  {pd:8,  rm:"326",  name:"BIOLOGY",            teachers:["Mr. Larsen"],             pct:90},
  {pd:9,  rm:"GYM2", name:"PHYSICAL EDUCATION", teachers:["Coach Moretti"],          pct:98},
  {pd:10, rm:"235",  name:"ALGEBRA 1 YR SEQ",   teachers:["Ms. Jacobs"],             pct:82},
  {pd:11, rm:"AUD",  name:"ACADEMIC SUPPORT",   teachers:[],                         pct:null}
];

function letter(p){
  if (p >= 90) return "E";
  if (p >= 80) return "G";
  if (p >= 70) return "S";
  return "N";
}
const words = {E:"Excellent",G:"Good",S:"Satisfactory",N:"Needs improvement"};

const list = document.getElementById("classes");
const dayNames = ["Mon","Tue","Wed","Thu","Fri"];

classes.forEach(c => {
  const li = document.createElement("li");
  const days = dayNames.map(d => `<span class="${d==="Fri"?"on":""}">${d}</span>`).join("");
  const teachers = c.teachers.length
    ? c.teachers.map(t => `<span>✉ ${t}</span>`).join(" &nbsp; ")
    : '<span class="meta">No Teachers</span>';
  li.innerHTML = `
    <div class="bar"></div>
    <div>
      <div class="meta">Pd ${c.pd}${c.rm ? " &nbsp; Rm " + c.rm : ""}</div>
      <div class="days">${days}</div>
      <div class="name">${c.name}</div>
      <div class="teacher">${teachers}</div>
    </div>
    <div class="score"></div>`;
  const score = li.querySelector(".score");

  if (c.pct === null) {
    score.innerHTML = '<span class="nograde">Not graded</span>';
  } else {
    const input = document.createElement("input");
    input.type = "number"; input.min = 0; input.max = 100; input.value = c.pct;
    input.setAttribute("aria-label", c.name + " percentage");
    const badge = document.createElement("b");
    badge.className = "badge";
    const update = () => {
      const v = Math.min(100, Math.max(0, parseFloat(input.value) || 0));
      const l = letter(v);
      badge.textContent = l;
      badge.className = "badge " + l;
      badge.title = words[l];
    };
    input.addEventListener("input", update);
    update();
    score.append(input, "%", badge);
  }
  list.appendChild(li);
});
