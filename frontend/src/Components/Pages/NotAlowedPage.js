import { clearPage } from '../../utils/render';

const body = document.querySelector('body');



const NotAlowedPage = () => {
    clearPage();
    errorPage();
     
    
};

function errorPage() {
    body.innerHTML = `
    <div class="error">
        <h1>Erreur 404</h1>
        <p>La page que vous recherchez n'existe pas.</p>
    </div>
    `;
}



export default NotAlowedPage;