$(document).ready(function () {
  let form = $("#cepForm");
  let cep = $("#cepInput");
  let message = $("#message");
  let loadingAnimation = $('#loading')
  let messageContent = "";
  loadingAnimation.hide()
  // Ao fazer submit no form, executa a verificação do CEP

  form.submit(function (e) {
    e.preventDefault();
    if (cep.val().length === 8) {
      loadingAnimation.show()
      $.ajax({
        url: `http://viacep.com.br/ws/${cep.val()}/json/`,
      }).done(function (data) {

        // Verificando se o CEP existe

        if (data.erro) {
          alert("CEP inválido");
        } else {

          // Captando os dados especificos e formatando eles em uma string
          // Alguns dos CEP não possuem rua nem bairro, também ocorre uma verificação

          const { bairro, logradouro: rua, localidade: cidade, uf, cep } = data;
          if (rua && bairro) {
            messageContent = `${rua} - ${bairro}, ${cidade} - ${uf}, ${cep}`;
          } else {
            messageContent = `${cidade} - ${uf}, ${cep}`;
          }

          // Adiciona os dados formatados no campo de mensagem

          message.text(messageContent);
        }
      });
    } else {
      alert("CEP inválido");
    }
  });
});
