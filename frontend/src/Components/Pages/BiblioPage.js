import isLogIn from "../Azure/IsLogIn";

const BiblioPage = () => {
    isLogIn();
    const main = document.querySelector('main');
    const mainOk = `


    `;

  main.innerHTML = mainOk; 

}

export default BiblioPage;
