// Blink animation
const eyes = document.querySelectorAll(".eye");
function blink(){
    eyes.forEach(eye=>{
        eye.style.height="2px";
         setTimeout(()=>{
            eye.style.height="18px";
         },180);
    });
}
setInterval(blink,3000);
// Rotate panda slightly when clicked
document.querySelector(".panda").addEventListener("click",()=>{
    const panda=document.querySelector(".panda");
    panda.animate([
        {transform:"rotate(0deg)"},
        {transform:"rotate(10deg)"},
        {transform:"rotate(-10deg)"},
        {transform:"rotate(0deg)"}
    ],{
        duration:600
    });

});
