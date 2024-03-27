const validation_form = (input) => {

  let errors = {};

  if (tiene_numeros(input.name) === 1) {
    errors.name = 'No se permite numeros';
  } else if (input.name === '') {
    errors.name = 'Campo vacío';
  } else if (input.name.length < 4) {
    errors.name = 'El nombre es muy corto';
  }

  if (input.name_pais) {
    if (tiene_numeros(input.name_pais) === 1) {
      errors.name_pais = 'No se permite numeros';
    }
  }

  if (!input.temporada) {
    errors.temporada = 'Elija una temporada';
  }

  if (input.countries && !input.countries.length) {
    errors.countries = 'No hay paises seleccionados';
  }

  return errors;
}

const validation_buscar = (input) => {

  let errors = {};

  if (tiene_numeros(input.name) === 1) {
    errors.name = 'No se permite numeros';
  } else if (input.name === '') {
    errors.name = 'Campo vacío';
  }

  return errors;
}

// valida si un texto contiene numero
function tiene_numeros(texto) {
  let numeros = "0123456789";
  for (let i = 0; i < texto.length; i++) {
    if (numeros.indexOf(texto.charAt(i), 0) !== -1) {
      return 1;
    }
  }
  return 0;
}

// valida si un numero contiene letras
// function tiene_letras(texto){
//   var letras="abcdefghyjklmnñopqrstuvwxyz";
//   for(let i=0; i<texto.length; i++){
//      if (letras.indexOf(texto.charAt(i),0)!==-1){
//         return 1;
//      }
//   }
//   return 0;
// }

export { validation_form, validation_buscar };