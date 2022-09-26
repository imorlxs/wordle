//DECLARAR VARIABLES
var inputs = document.querySelectorAll(".cuadrado");
var ending = false;
var rand = Math.floor(Math.random() * diccionario.length);
var palabrasecreta = diccionario[rand];
var varFila = -1;
var mensaje = "La palabra secreta era: " + palabrasecreta;
console.log("La palabra secreta es: " + palabrasecreta);


inputs.forEach(function (input) {
	input.addEventListener("keyup", controlar);
});

function controlar(event) {
	if (event.keyCode == 8) {
		this.value = "";
    var prev = this.previousElementSibling;
    if(prev != undefined)
		prev.focus();
	}

	if (this.value.length == 1) {
		var next = this.nextElementSibling;
    if(next != undefined)
		next.focus();
	}
  if (event.key == "Enter"){
    inputs[0].focus();
    check();
  }
}


document.getElementById("comprobar").addEventListener("click", check);

function check() {
	var palabra = input1.value + input2.value + input3.value + input4.value + input5.value;
	palabra = palabra.toUpperCase();
  cleanInput();

	console.log("Has introducido: " + palabra);
	if (diccionario.includes(palabra) && ending == false) {
		var casillas = document.querySelectorAll("td");
		var filas = document.querySelectorAll(".fila");
		varFila++;
		filas[varFila].style = "display: inline;";
		var letrasrepetidas = [""];

		for (var i = 0; i < casillas.length; i++) {
			if (i >= varFila * 5 && i < (varFila + 1) * 5) {
				casillas[i].innerHTML = palabra[i - varFila * 5];
				if (casillas[i].innerHTML == palabrasecreta[i - varFila * 5]) {
					casillas[i].style = "background-color: green";
					letrasrepetidas.push(casillas[i].innerHTML);
				}
			}
		}
		for (var i = 0; i < casillas.length; i++) {
			if (i >= varFila * 5 && i < (varFila + 1) * 5) {
				if (palabrasecreta.includes(casillas[i].innerHTML) && !letrasrepetidas.includes(casillas[i].innerHTML)) {
					casillas[i].style = "background-color: yellow";
					letrasrepetidas.push(casillas[i].innerHTML);
				}
			}
		}

		if (palabra == palabrasecreta) {
			alert("Enhorabuena, ¡has ganado!");
			ending = true;

		}
		if (varFila == 5) {
			alert("Te has quedado sin intentos. " + mensaje);
			ending = true;
		}
	} else if (ending == true) {
		alert("El juego ha terminado. " + mensaje);

	} else {
		alert("La palabra no está en el diccionario: " + mensaje);
		ending = true;
	}
}

function cleanInput() {
  for (var i = 0; i < inputs.length; i++){
    inputs[i].value="";
  }
}
