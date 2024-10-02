let paras = [
 "serve rally spin game shot can paddle net ball court smash these will forehand any spin as seem up set give point backhand she what we way again want back need win game serve run each these hit no under win rally ball little very grip all real into",
  
  "or say first loop year code program before take logic more syntax should where or program bug well late even then solve leave challenge this also small bug turn public function long go or without form would from against they then under code",
  
  "head after from give into type debug code learn about since now compile like again bug that against fix the code and group refactor but under see bug late syntax error thing as what and work he so for public how good error fix could open tell too for",
  
  "show code debug both they what error will may bug say code error large seen part or now code both debug other bug work other same error look bug work fix ru face here alien species would should encounter word with out present will because",
  
  "write spaceship possible general day any down alien contact about most early even s keep be around alien invasion begin such and encounter time still from hold still old ufo increase move large old any late think must which alien find well right between",
  
  "might very under with do down code those loop he during down make need because bug time early must logic mean look just solve code go however ask logic any own possible code under small since form code more also very on still interest logic",
  
  "in about become which bug only around say code or logic mean consider late alien theory never encounter this spaceship group however increase when go just even may hold sighting say own alien around space where leave many UFO alien to set through more",
  
  "could old these such error get in logic they code down she after should debug K increase with syntax under show bug fix people point want only code can she way since new alien over UFO encounter how theory say possible this say thing a logic real",
  
  "and give back error set both down debug back seem may code few syntax fix state down error would that most during group problem she syntax error leave by feel through nos function if can so while then through that end real group between few from come might",
  
  "Without large set of here man logic will function use without open where or increase there syntax bug can through than under code logic never make about same begin part large might since real have bug few against head can fix people early small use",
  
  "as face may right day that off loop they good may late code between look debug begin day early loop fact work hand much between error know compile again old for logic part group point fix have what error however fix last early also place syntax",
  
  "seem great function only it can only code thing from to debug now need from to solve code one few they compile only want real code fix must have where find can point open another error who from make go may fix just bug again logic just both which such" ];

const typingP = document.querySelector("#paragraph p"),
inputF = document.querySelector("#input-field"),
tryAgainB = document.querySelector("#restartButton"),
timerT = document.querySelector("#timer"),
mistakeT = document.querySelector("#mistake"),
wpmT = document.querySelector("#wpm"),
cpmT = document.querySelector("#cpm");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = 0;

// Fetch the Paragraphs
function loadPara() {
  const randIndex = Math.floor(Math.random() * paras.length);
  typingP.innerHTML = paras[randIndex].split("").map(c => `<span>${c}</span>`).join("");
  typingP.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inputF.focus());
  typingP.addEventListener("click", () => inputF.focus());
}

function initTyping(e) {
  let chars = typingP.querySelectorAll("span");
  let typedC = inputF.value.charAt(charIndex);
  if (charIndex < chars.length && timeLeft > 0) {
      if (!isTyping) {
          timer = setInterval(initTimer, 1000);
          isTyping = true;
      }
      if (typedC === null) {
          if (charIndex > 0) {
              charIndex--;
              if (chars[charIndex].classList.contains("incorrect")) {
                  mistakes--;
              }
              chars[charIndex].classList.remove("correct", "incorrect");
          }
      } else {
          if (chars[charIndex].innerText === typedC) {
              chars[charIndex].classList.add("correct");
          } else {
              mistakes++;
              chars[charIndex].classList.add("incorrect");
          }
          charIndex++;
      }
      chars.forEach(s => s.classList.remove("active"));
      chars[charIndex].classList.add("active");

      let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

      wpmT.innerText = wpm;
      mistakeT.innerText = mistakes;
      cpmT.innerText = charIndex - mistakes;
  } else {
      clearInterval(timer);
      inputF.value = "";
  }
}



function initTimer() {
  if (timeLeft > 0) {
      timeLeft--;
      timerT.innerText = timeLeft;
      const wpm = Math.round((charIndex - mistakes) / 5 / (maxTime - timeLeft) * 60);
      wpmT.innerText = isNaN(wpm) || wpm === Infinity ? 0 : wpm;
  } else {
      clearInterval(timer);
  }
}


function resetGame() {
    loadPara();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inputF.value = "";
    timerT.innerText = timeLeft;
    wpmT.innerText = 0;
    mistakeT.innerText = 0;
    cpmT.innerText = 0;
}

loadPara();
inputF.addEventListener("input", initTyping);
tryAgainB.addEventListener("click", resetGame);