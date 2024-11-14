function play() {
    const nome = document.querySelector("#nome");
    localStorage.setItem("name", nome.value);
    const error = document.querySelector(".error-text");
    const box_error = document.querySelector(".error-box");
    if (nome.value == "") {
        error.innerHTML = "Por favor, insira seu nome";
        box_error.style.marginBottom = "0.75rem";
        box_error.style.marginTop = "0.75rem";
    }
    else{
        window.location.href = "quiz.html";
    }
    
}