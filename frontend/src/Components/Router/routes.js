import HomePage from '../Pages/HomePage';
import UploadPage from '../Pages/UploadPage';
import VinciGeniusPage from '../Pages/VinciGeniusPage';
import ProfilPage from '../Pages/ProfilPage';
import BibliothequePage from '../Pages/BibliothequePage';
import DashboardPage from '../Pages/DashboardPage';
import NotAlowedPage from '../Pages/NotAlowedPage';



const routes = {
  '/': HomePage,
  '/profil': ProfilPage,
  '/upload': UploadPage,
  '/vincigenius': VinciGeniusPage,
  '/bibliotheque': BibliothequePage,
  '/dashboard': DashboardPage,
  '/notallowed': NotAlowedPage

};

export default routes;
