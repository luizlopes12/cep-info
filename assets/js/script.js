$(document).ready(function () {
  // console.log('funcionando')

  let form = $('#cepForm')
  let cep = $('#cepInput')
  form.submit(async function (e) {
    e.preventDefault()
    if(cep.val().length === 8){
        console.log('foi')
        $.ajax({
            url: `http://viacep.com.br/ws/${cep.val()}/json/`,
          }).done(function (data) {
            const cepData = data;
            console.log(cepData);
          });
    }else{
        console.log('que louco')
    }

  });







});
