import Chart from 'chart.js/auto'

import { clearPage } from '../../utils/render';
import '../../stylesheets/dashboard.css';
import { modificationOfStudentAccessInfo, fetchNumberOfStudents }  from '../../models/users'







const main = document.querySelector('main');



const DashboardPage = () => {
    clearPage();
    TableOfStudent();
    viewNumberOfStudent();
    annoucementForm();
    graphForNumberVisit();   
    
};

document.addEventListener('DOMContentLoaded', () => {
    TableOfStudent();
});

// Fonction pour afficher les informations de l'étudiant sélectionné
async function TableOfStudent() {
    // Create the container for the select element
    const selectContainer = document.createElement('div');
    selectContainer.className = 'select-container';

    // Create the select element
    const selectElement = document.createElement('select');
    selectElement.className = 'form-select';
    selectElement.id = 'selectEtudiants';
    selectElement.setAttribute('value', 'Sélectionnez un étudiant');

    // Create the default option
    const defaultOption = document.createElement('option');
    defaultOption.value = ''; // Ajoutez une valeur vide
    defaultOption.text = 'Choisissez un étudiant';

    // Add the default option to the select element
    selectElement.appendChild(defaultOption);

    // Add the select element to the container
    selectContainer.appendChild(selectElement);

    // Add the container to the main element or another target element
    main.appendChild(selectContainer);
    selectElement.innerHTML = '';

    try {
        // Fetch the list of users from the API
        const response = await fetch('/api/users');
        const students = await response.json();

        // Get the select element by ID
        const selectEtudiants = document.getElementById('selectEtudiants');

        if (students.length > 0) {
            // Vider le contenu existant du menu déroulant
            selectEtudiants.innerHTML = '';
        
            // Populate the select element with options
            students.forEach(student => {
                const option = document.createElement('option');
                option.value = student.email;
                option.text = `${student.name} - ${student.email}`;
                selectEtudiants.appendChild(option);
            });
        } else {
            console.log('Aucun étudiant trouvé');
            const option = document.createElement('option');
            option.text = 'Aucun étudiant trouvé';
            selectEtudiants.appendChild(option);
        }

        selectEtudiants.addEventListener('change', async () => {
        
            const selectedStudentEmail = selectEtudiants.value;
        
            if (selectedStudentEmail) {
                try {
                    // Récupérer la liste des étudiants depuis l'API
                    const studentsResponse = await fetch('/api/users');
                    const studentsData = await studentsResponse.json();
        
                    // Trouver l'étudiant sélectionné
                    const selectedStudent = studentsData.find(student => student.email === selectedStudentEmail);
        
                    if (selectedStudent) {
                        // Mettre à jour la valeur de canAccessSite pour l'étudiant sélectionné
                        selectedStudent.canAccessSite = false;
        
                        
                        modificationOfStudentAccessInfo(selectedStudent.email);
                        // Effectuer d'autres actions si nécessaire
                    } else {
                        console.error('Student not found');
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        });
        } catch (error) {
        console.error('Erreur lors de la récupération des étudiants', error);
    }
}











//-----------------------------------------------------------------------------------
function graphForNumberVisit() {
    // Create container for the chart
    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';

    // Create canvas element for the chart
    const canvasElement = document.createElement('canvas');
    canvasElement.id = 'barCanvas';
    canvasElement.setAttribute('aria-label', 'chart');
    canvasElement.setAttribute('role', 'img');

    // Append canvas element to the chart container
    chartContainer.appendChild(canvasElement);

    // Append the chart container to the main element or another target element
    main.appendChild(chartContainer);

    // Get the canvas element by ID
    const barCanvas = document.getElementById("barCanvas");

    // Create a new radar chart
    const barChart = new Chart(barCanvas, {
        type: "radar",
        data: {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [{
                label: "Nombre d'étudiants au cours du mois",
                data: [100, 150, 200, 180, 250, 300, 280, 200, 220, 300, 350, 400],
                backgroundColor: [
                    "lightblue"
                ]
            }]
        }
    });
    
    return barChart;
}



// ----------------------------------------------
async function viewNumberOfStudent() {
    try {
        const nbre = await fetchNumberOfStudents();  
        const studentInfoContainer = document.createElement('div');
        studentInfoContainer.className = 'bulle-info';

        // Create heading element for "Étudiant"
        const heading = document.createElement('h5');
        heading.textContent = 'Étudiant';

        // Create span element with yellow text
        const spanElement = document.createElement('span');
        spanElement.style.color = '#fbc72c';
        spanElement.textContent = nbre;

        // Create heading element for the student count
        const studentCountHeading = document.createElement('h3');
        studentCountHeading.appendChild(spanElement);

        // Append elements to the studentInfoContainer
        studentInfoContainer.appendChild(heading);
        studentInfoContainer.appendChild(studentCountHeading);

        // Append the studentInfoContainer to the main element or another target element
        main.appendChild(studentInfoContainer);
    }catch (error) {
        console.error('Erreur lors de la récupération des étudiants', error);
    } 
}


//-----------------------------------------------------------------------------------


function annoucementForm() {
    const divAnnouncement = document.createElement('div');
    divAnnouncement.id = 'announcementFormContainer'; // Optionally, you can set an ID for the container

    const form = document.createElement('form');
    form.id = 'myForm';
    form.className = 'bottom-left-form';

    const labelTitle = document.createElement('label');
    labelTitle.htmlFor = 'announcementTitle';
    labelTitle.textContent = 'Titre de l\'annonce :';

    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.id = 'announcementTitle';
    inputTitle.required = true;

    const labelContent = document.createElement('label');
    labelContent.htmlFor = 'announcementContent';
    labelContent.textContent = 'Contenu de l\'annonce :';

    const textareaContent = document.createElement('textarea');
    textareaContent.id = 'announcementContent';
    textareaContent.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Envoyer l\'annonce';

    // Append the created elements to the form
    form.appendChild(labelTitle);
    form.appendChild(document.createElement('br'));
    form.appendChild(inputTitle);
    form.appendChild(document.createElement('br'));
    form.appendChild(labelContent);
    form.appendChild(document.createElement('br'));
    form.appendChild(textareaContent);
    form.appendChild(document.createElement('br'));
    form.appendChild(submitButton);

    // Append the form to the divAnnouncement container
    divAnnouncement.appendChild(form);

    // Finally, append divAnnouncement to the main element or another target element
    main.appendChild(divAnnouncement);


    
    
   // Add submit event listener to the form
   form.addEventListener('submit', (event) => {
    console.log("--3");
    event.preventDefault();
    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;

    console.log(title, content);
    displayPopup(title, content);

    // Reset form values
    form.reset();
});
}
function displayPopup(title, content) {
    const announcementShown = localStorage.getItem('announcementShown');

    // Vérifier si l'annonce a déjà été affichée
    if (!announcementShown) {
        // Créer popup container
        const popup = document.createElement('div');
        popup.className = 'popup';

        // Créer popup content
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';

        // Créer heading element
        const heading = document.createElement('h2');
        heading.textContent = title;

        // Créer paragraph element
        const paragraph = document.createElement('p');
        paragraph.textContent = content;

        // Créer close button
        const closeButton = document.createElement('button');
        closeButton.id = 'closePopup';
        closeButton.textContent = 'Fermer';

        // Ajouter les éléments au contenu de la popup
        popupContent.appendChild(heading);
        popupContent.appendChild(paragraph);
        popupContent.appendChild(closeButton);

        // Ajouter le contenu de la popup au container de la popup
        popup.appendChild(popupContent);

        // Ajouter le container de la popup au body
        document.body.appendChild(popup);

        // Ajouter un gestionnaire d'événements pour fermer la popup
        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);

            // Stocker l'état de l'annonce dans le stockage local
            localStorage.setItem('announcementShown', 'true');
        });
    }
}














export default DashboardPage;