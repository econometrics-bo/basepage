//Menu
document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".nav-menu").classList.toggle("show");
});
//Slider
var slides = document.querySelectorAll(".slide");
var btns = document.querySelectorAll(".btn");
let currentSlide = 1;

//Manual slide
var manualNav = function (manual) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
  });
  slides[manual].classList.add("active");
  btns[manual].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

//AUTOPLAY
var repeat = function (activeClass) {
  let active = document.getElementsByClassName("active");
  let i = 1;

  var repeater = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("active");
      });
      slides[i].classList.add("active");
      btns[i].classList.add("active");
      i++;

      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 6000);
  };
  repeater();
};
repeat();

//FORM
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
  
  nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
  motivo: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, 
  comentario: /^[a-zA-Z0-9À-ÿ\s]{4,350}$/, 
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^[+-\d]{7,25}$/, // 7 a 14 numeros.
};

const campos = {
  nombre: false,
  correo: false,
  telefono: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "usuario":
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;
    case "motivo":
      validarCampo(expresiones.motivo, e.target, "motivo");
      break;
    //case "comentario":
    //  validarCampo(expresiones.comentario, e.target, "comentario");
    //  break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const terminos = document.getElementById("terminos");
  if (
    campos.nombre &&
    campos.correo &&
    campos.telefono &&
    campos.motivo &&
    //campos.comentario &&
    terminos.checked
  ) {
    formulario.reset();

    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 5000);

    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((icono) => {
        icono.classList.remove("formulario__grupo-correcto");
      });
  } else {
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
  }
});
