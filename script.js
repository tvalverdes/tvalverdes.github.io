let texto = document.getElementById("enlace");
let boton = document.getElementById("submit-btn");
let ulResult = document.getElementById("ul-result");
let spin = document.getElementById("spin");

let peticion = async () => {
  link = texto.value.trim()
  if (link == "") {
    alert("Ingrese una url");
    return
  }
  spin.classList.remove("hidden");
  spin.classList.add("visible");
  ulResult.innerHTML = "";
  const url = "https://tyronevs.pythonanywhere.com/url/" + link;
  //createToast("success");
  await fetch(url, { method: "GET" })
    .then((response) => {
      console.log(response);
      if (response.status !== 200) {
        throw new Error(
          "Error en la solicitud. Código de estado: " + response.status
        );
      }
      return response;
    })
    .then(
      await function (response) {
        return response.json();
      }
    )
    .then(
      await function (data) {
        let resp = JSON.parse(JSON.stringify(data));
        try {
          spin.classList.remove("visible");
          spin.classList.add("hidden");
          if (resp[0].id < 500) {
            for (let i = 0; i < resp.length-1; i++) {
              let li = document.createElement("li");
              li.textContent = `Según ${resp[i].metodo}, es: ${resp[i].mensaje}`;
              ulResult.appendChild(li);
            }
          } else {
            let li = document.createElement("li");
              li.textContent = `Error: ${resp[0].mensaje}`;
              ulResult.appendChild(li);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
    .catch((error) => {
      console.log(error);
    });
};

boton.addEventListener("click", peticion);
texto.addEventListener('keydown', function (event) {  
  if (event.key === 'Enter') {
    event.preventDefault();
    peticion();
  }
})
