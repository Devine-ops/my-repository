$(function(){
    //Funções para abrir e fechar o formulário
    abrirJanela();
    verificarClick();

    function abrirJanela(){
        $('.btn').click(function(e){
            e.stopPropagation();
            $('.bg').fadeIn();
        });
    }

    function verificarClick(){       
        let el = $('body, .closeBtn');
        el.click(function(){
            $('.bg').fadeOut();
        });
        $('.form').click(function(e){
            e.stopPropagation();
        });
    }

    //Eventos do Formulário
    $('input[type=text]').focus(function(){
        resetarCampoInvalido($(this));
    });

    $('form#form1').submit(function(e){
        e.preventDefault();
        
        let nome = $('input[name=nome]').val();    
        let email = $('input[name=email]').val();       
        let telefone = $('input[name=telefone]').val();

        let nomeValido = verificarNome(nome);
        let emailValido = verificarEmail(email);
        let telefoneValido = verificarTelefone(telefone);

        if (!nomeValido) {
            aplicarCampoInvalido($('input[name=nome]'));
        }

        if (!emailValido) {
            aplicarCampoInvalido($('input[name=email]'));
        }

        if (!telefoneValido) {
            aplicarCampoInvalido($('input[name=telefone]'));
        }

        if (nomeValido && emailValido && telefoneValido) {
            alert("Formulário enviado com sucesso!");
            this.submit(); // Submeter o formulário se todos os campos forem válidos
        }
    });

    //Funções para estilizar o campo do formulário
    function aplicarCampoInvalido(el){
        el.css({'color': 'red', 'border': '1px solid red'})
          .val('Campo Inválido!');
    }

    function resetarCampoInvalido(el){
        el.css({'color': '#ccc', 'border': '1px solid #ccc'})
          .val('');
    }

    //Funções para verificar os campos do formulário
    function verificarNome(nome){
        if(nome === ''){
            return false;
        }

        let espacos = nome.split(' ').length;
        let splitString = nome.split(' ');

        if(espacos >= 2){
            for(let i = 0; i < espacos; i++){
                if(!splitString[i].match(/^[A-Z]{1}[a-z]{1,}$/)){
                    return false;
                }
            }
            return true;
        }else{
            return false;
        }
    }

    function verificarEmail(email){
        if(email === ''){
            return false;
        }

        if(email.match(/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) === null){
            return false;
        }
        return true;
    }

    function verificarTelefone(telefone){
        if(telefone === ''){
            return false;
        }
       
        if(telefone.match(/^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/) === null){
            return false;
        }
        return true;
    }
});