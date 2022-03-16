$(document).ready(function () {
  let form = $("#cepForm");
  let cep = $("#cepInput");
  let message = $("#message");
  let messageContent = "";
  let alertMessage = $('#dialog')
  alertMessage.hide();
  // Ao fazer submit no form, executa a verificação do CEP
  form.submit(async function (e) {
    e.preventDefault();
    if (cep.val().length === 8) {
        $.ajax({
          url: `http://viacep.com.br/ws/${cep.val()}/json/`,
        }).done(function (data) {
        // Pega os dados especificos no retorno e coloca eles na string messageContent
          const { bairro, logradouro: rua, localidade: cidade, uf, cep } = data;
          if (rua && bairro) {
            messageContent = `${rua} - ${bairro}, ${cidade} - ${uf}, ${cep}`;
          } else {
            messageContent = `${cidade} - ${uf}, ${cep}`;
          }
        // Adiciona os dados formatados no campo de mensagem
          message.text(messageContent);
        });
    } else {
        alert('CEP inválido');
    }
  });
});
