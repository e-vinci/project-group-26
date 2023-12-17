import HomePage from '../Pages/HomePage';
import DashboardPage from '../Pages/DashboardPage';
import ProfilPage from '../Pages/ProfilPage';
import VinciGeniusPage from '../Pages/VinciGeniusPage';
import UploadPage from '../Pages/UploadPage';
import NotAlowedPage from '../Pages/NotAlowedPage';



const routes = {
  '/': HomePage,
  '/dashboard': DashboardPage,
  '/upload': UploadPage,
  '/vincigenius': VinciGeniusPage,
  '/profil': ProfilPage,
  '/notallowed': NotAlowedPage,
};



export default routes;
