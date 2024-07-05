function validar() {
    let nome = document.getElementById('nome');
    let email = document.getElementById('email');
    let telefone = document.getElementById('telefone');

    if (nome.value === "") {
        alert("Nome fora dos parâmetros!");
        nome.style.border = "2px solid red"; // Define a borda como vermelha
        nome.focus();
        return false; // Impede o envio do formulário
    } else if (nome.value.length < 6){
        alert("O nome precisa conter pelo menos 6 caracteres!");
        nome.style.border = "2px solid red"; // Define a borda como vermelha
        nome.focus();
        return false;  
    } else{
        document.getElementById('nome').style.border ="";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!email.test(email)){
        alert("E-mail inválido!");
        document.getElementById('email').style.border = "2px solid red";
        email.focus();
        return false;
    } else {
        document.getElementById('email').style.border = "";
    }
}

//nome.style.border = ""; // Remove a borda vermelha se o campo não estiver vazio
        //return true; // Permite o envio do formulário