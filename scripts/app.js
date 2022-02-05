const formulaire = document.querySelector('form');
const txtToDo = document.querySelector('input');
const btnEnvoi = document.querySelector('.remplir')

let touteLesTaches = [];

const liste = document.querySelector('.liste-toDo');

formulaire.addEventListener('submit', e => {
    e.preventDefault();

    const text = txtToDo.value.trim();
    if(text !== ''){
        rajouterTache(text);
        txtToDo.value = '';
    }
})

function rajouterTache(text){

    const todo = {
        text,
        id : Date.now()
    }
    afficherListe(todo);
}

function afficherListe(todo){
    const item = document.createElement('li');
    item.setAttribute('data-key', todo.id);

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', tacheFaite);
    item.appendChild(input);

    const para = document.createElement('p');
    para.innerText = todo.text;
    item.appendChild(para);

    const btnUpdate = document.createElement('button');
    btnUpdate.addEventListener('click', modifierTache);
    const img = document.createElement('img');
    img.setAttribute('src', './ressources/modifier.svg');
    btnUpdate.appendChild(img);
    item.appendChild(btnUpdate);

    const btnDelete = document.createElement('button');
    btnDelete.addEventListener('click', supprimerTache);
    const img2 = document.createElement('img');
    img2.setAttribute('src', '../ressources/fermer.svg');

    btnDelete.appendChild(img2);
    item.appendChild(btnDelete);

    liste.appendChild(item);
    touteLesTaches.push(item);
}

function tacheFaite(e){
    e.target.parentNode.classList.toggle('finDeTache');
}


function modifierTache(e){
    touteLesTaches.forEach(element => {

        if(e.target.parentNode.getAttribute('data-key') === element.getAttribute('data-key')){
            console.log(element.childNodes)
            txtToDo.value = element.childNodes[1].innerText;
            element.remove();
        }
    })
    
}

function supprimerTache(e){

    touteLesTaches.forEach(element => {

        if(e.target.parentNode.getAttribute('data-key') === element.getAttribute('data-key')){
            element.remove();
            touteLesTaches = touteLesTaches.filter(li => li.dataset.key !== element.dataset.key);
        }
    })
}