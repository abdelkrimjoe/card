let arrayData = [];
let nombreAffiche = 3;
let cards = document.querySelectorAll(".card");
let container = document.querySelector(".container");
let suivant = document.getElementById("suivant");
let precedent = document.getElementById("precedent");
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    arrayData = data;

    afficher(0, nombreAffiche, arrayData);

    suivant.addEventListener("click", () => {
      let debut = nombreAffiche;
      nombreAffiche = nombreAffiche + 3;
      afficher(debut, nombreAffiche, arrayData);
    });
    precedent.addEventListener("click", () => {
      let fin = nombreAffiche;
      nombreAffiche = nombreAffiche - 3;
      afficher(nombreAffiche, fin, arrayData);
    });
  });

let afficher = (debut, fin, tabArray) => {
  if (debut < 0) {
    precedent.style.display='none'
  } else {
    precedent.style.display='flex'
    suivant.style.display='flex'
    let index = 0;
    let finSpeciale = 0;
    if (fin > tabArray.length) {
      finSpeciale = fin;
      fin = tabArray.length;
    }
    for (let i = debut; i < fin; i++) {
      let img = document.createElement("img");
      img.src = tabArray[i].photo;
      let h2 = document.createElement("h2");
      h2.innerText = tabArray[i].nom;
      let job = document.createElement("p");
      job.innerText = tabArray[i].Job;
      let des = document.createElement("div");
      des.classList.add("description");
      des.innerText = tabArray[i].description;
      let socialMediaDiv = document.createElement("div");
      socialMediaDiv.classList.add("socialMedia");
      let iFace = document.createElement("i");
      iFace.classList.add("fa-brands", "fa-facebook");
      let iTwiter = document.createElement("i");
      iTwiter.classList.add("fa-brands", "fa-twitter");
      let iInsta = document.createElement("i");
      iInsta.classList.add("fa-brands", "fa-instagram");

      socialMediaDiv.append(iFace, iTwiter, iInsta);
      while (cards[index].firstChild) {
        cards[index].removeChild(cards[index].firstChild);
      }
      cards[index].style.display = "flex";
      cards[index].append(img, h2, job, des, socialMediaDiv);
      index++;
    }

    if (finSpeciale != 0) {
      for (let i = arrayData.length; i < finSpeciale; i++) {
        cards[finSpeciale - i].style.display = "none";
        suivant.style.display="none"
      }
    }
  }
};
