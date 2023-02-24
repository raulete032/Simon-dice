

document.getElementById("btnStart").addEventListener("click", start);
document.getElementById("btnComprobar").addEventListener("click", comprobar);
var divsColores= document.getElementsByClassName("divColor");
for(let i=0;i<divsColores.length;i++)
    divsColores[i].addEventListener("click", guardaEleccion);


const arrayColor=["red", "blue", "green", "yellow"];
var arrayPC=[];
var arrayPlayer=[];

//Variable que indicará el nº de colores que van a salir
var vueltas=1;


function chooseColor(){

    let color= Math.trunc(Math.random() * 4);

    return arrayColor[color];
}



function start(){
    document.getElementById("btnStart").style.display="none";
    document.getElementById("btnComprobar").style.display="block";
    document.getElementById("error").innerHTML="";

    dibujar_despacio(0, false);

}



function comprobar(){
    let sw=true;

    for(let i=0;i<arrayPC.length && sw;i++){
        if(arrayPC[i]!=arrayPlayer[i])
            sw=false;
    }
    arrayPlayer=[];

    if(!sw){
        document.getElementById("error").innerHTML="FALLASTE";
        arrayPC=[];
        arrayPlayer=[];
        vueltas=1;
        vueltaActual=0;
        document.getElementById("btnStart").style.display="block";
        document.getElementById("btnComprobar").style.display="none";
    }
    else{
        vueltas++;
        dibujar_despacio(0, false);
    }
        

}


function dibujar_despacio(vueltaActual, newColor) {
    quitaBrightness();
    setTimeout(()=>{

        if (arrayPC.length!=0 && vueltaActual+1 < vueltas && !newColor) {
            let color= arrayPC[vueltaActual];
            let divColor= document.getElementById(color);
            divColor.setAttribute("style", "filter:brightness(100%)");
            
            if(vueltaActual==arrayPC.length)
                nuevo=true;
            else
                nuevo=false;
    
            setTimeout(() => dibujar_despacio((vueltaActual+1), nuevo), 1000);
        }
        else if(!newColor){ //si entra por aquí es que se añade nuevo color
            let color= chooseColor();
            let divColor= document.getElementById(color);
            divColor.setAttribute("style", "filter:brightness(100%)");
            arrayPC.push(color);
            newColor= !newColor;
            setTimeout(() => dibujar_despacio((vueltaActual+1), newColor), 1000);
        }

    }, 300);
    
}
 

function quitaBrightness(){
    
    for(let i=0;i<divsColores.length;i++)
        divsColores[i].setAttribute("style", "filter:brightness(50%)");

}


function guardaEleccion(){
    let divColor= document.getElementById(this.id);
    divColor.setAttribute("style", "filter:brightness(100%)");
    let color= this.id;
    arrayPlayer.push(color);

    setTimeout(()=>{
        quitaBrightness();
    }, 200);
    

}