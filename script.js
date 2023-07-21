let texto = document.getElementById("enlace");
let boton = document.getElementById("submit-btn");
let botonMore = document.getElementById("showMore");
let ulResult = document.getElementById("ul-result");
let ulCaracteristica = document.getElementById("ul-more");
let spin = document.getElementById("spin");
let urlReal = "https://tyronevs.pythonanywhere.com/url/";
let urlPrueba = "http://127.0.0.1:5000/url/";

let peticion = async () => {
 botonMore.classList.remove("visible")
  botonMore.classList.add("invisible")
  link = texto.value.trim();
  if (link == "") {
    return alert("Ingrese una url");
  }
  spin.classList.remove("hidden");
  spin.classList.add("visible");
  ulResult.innerHTML = "";
  ulCaracteristica.innerHTML = "";
  const url = urlReal + link;
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
            let li = document.createElement("li");
            li.textContent = `Según ${resp[0].metodo}, es: ${resp[0].mensaje}`;
            ulResult.appendChild(li);
            botonMore.classList.remove("invisible")
            botonMore.classList.add("visible")
            let caracteristicas = resp[1][0];
            for (caracteristica in caracteristicas) {
              let lic = document.createElement("li");
              lic.textContent = `${caracteristica}: ${caracteristicas[caracteristica]}`;
              ulCaracteristica.appendChild(lic);
          }}
          else {
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
texto.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    peticion();
  }
});

botonMore.addEventListener("click", function (event) {
  event.preventDefault();
  let ul = document.getElementById("ul-more");
  if (ul.hidden) {
    ul.hidden = false;
    document.getElementById("arrow").src = "arrow-up.svg";
  } else {
    ul.hidden = true;
    document.getElementById("arrow").src = "arrow-bottom.svg";
  }
});

