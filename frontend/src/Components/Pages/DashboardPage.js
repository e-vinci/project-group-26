import Chart from 'chart.js/auto';  // Importez Chart.js
import { clearPage } from '../../utils/render';


const main = document.querySelector('main');



const DashboardPage = () => {
    clearPage()
    TableOfStudent();
    nbDownloadAndUpload();
    graphForNumberVisit();   
};



// Fonction pour afficher les informations de l'étudiant sélectionné
function afficherInfoEtudiant() {
    const selectEtudiants = document.getElementById('selectEtudiants');
    const selectedId = selectEtudiants.value;

    // Vous pouvez ajouter ici le code pour afficher les informations de l'étudiant sélectionné
    console.log(`Étudiant sélectionné (ID): ${selectedId}`);
}

function TableOfStudent() {
    main.innerHTML += `
        <select class="form-select" id="selectEtudiants" aria-label="Sélectionnez un étudiant">
            <option selected disabled>Choisissez un étudiant</option>
        </select>
    `;

    // Fonction pour créer les options du menu déroulant
    function creerOptionsMenuDeroulant() {
        const selectEtudiants = document.getElementById('selectEtudiants');
        const etudiants = document.querySelectorAll('.etudiant');

        etudiants.forEach(etudiant => {
            const nom = etudiant.textContent.trim();
            const id = etudiant.getAttribute('data-id');
            const option = document.createElement('option');
            option.value = id;
            option.textContent = nom;
            selectEtudiants.appendChild(option);
        });

        // Attacher l'événement onchange après la création des options
        selectEtudiants.addEventListener('change', afficherInfoEtudiant);
    }

    // Appeler la fonction pour créer les options lors du chargement de la page
    window.onload = function () {
        creerOptionsMenuDeroulant();
    };
}






//-----------------------------------------------------------------------------------
function graphForNumberVisit() {

    main.innerHTML += `
    <div class="chart-container">
        <canvas id="barCanvas" aria-label="chart" role="img"></canvas>
    </div>
        
    `
    const barCanvas = document.getElementById("barCanvas")
    const barChart = new Chart(barCanvas, {
        type:"radar",
        data: {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [{
                label:"nombre d'étudiants au cours du mois",
                data: [100, 150, 200, 180, 250, 300, 280, 200, 220, 300, 350, 400],
                backgroundColor: [
                    "lightblue"
                ]
            }]
        }
    });
    return barChart

}




//--------------------------------------------------------------------------------------
function nbDownloadAndUpload() {

    main.innerHTML += `<h1>Bonjour les gars</h1>`
}

export default DashboardPage;