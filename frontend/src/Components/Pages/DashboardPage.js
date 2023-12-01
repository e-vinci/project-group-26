import Chart from 'chart.js/auto';  // Importez Chart.js
import { clearPage } from '../../utils/render';




const main = document.querySelector('main');



const DashboardPage = () => {
    clearPage()
    TableOfStudent();
    graphForNumberVisit();   
};



// Fonction pour afficher les informations de l'étudiant sélectionné
async function TableOfStudent() {
    main.innerHTML += `
        <h1>Liste des Étudiants</h1>
        
        <label for="selectEtudiants">Sélectionnez un étudiant :</label>
        <select class="form-select" id="selectEtudiants" aria-label="Sélectionnez un étudiant">
            <option selected disabled>Choisissez un étudiant</option>
        </select>
    `;

    try {
        const response = await fetch('/api/users');
        const students = await response.json();



        console.log('Étudiants récupérés depuis l\'API :', students); // Ajoutez cette ligne


        const selectEtudiants = document.getElementById('selectEtudiants');

        // Option par défaut
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = 'Choisissez un étudiant';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectEtudiants.appendChild(defaultOption);


        if (students.length > 0) {
            students.forEach(student => {
                console.log('Étudiant :', student);
                const option = document.createElement('option');
                option.value = student.email;
                option.text = `${student.firstName} ${student.lastName} - ${student.email}`;
                selectEtudiants.appendChild(option);
            });
        } else {
            console.log('Aucun étudiant trouvé');
            const option = document.createElement('option');
            option.text = 'Aucun étudiant trouvé';
            selectEtudiants.appendChild(option);
        }
        
    } catch (error) {
        console.error('Erreur lors de la récupération des étudiants', error);
        // Gérer l'erreur de manière appropriée, par exemple, afficher un message à l'utilisateur
    }
}

// Appel de la fonction une fois le DOM chargé
document.addEventListener('DOMContentLoaded', TableOfStudent);







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



export default DashboardPage;