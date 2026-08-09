import { Routes, Route } from "react-router-dom";
import './App.css';
import './index.css'
import AppDownload from './pages/Home/App-Download.jsx';
import App2 from './pages/Home/App2.0.jsx';
import BottomSection from './pages/Home/BottomSection.jsx';
import Card from './pages/Home/Card.jsx';
import Download from './pages/Home/Download.jsx';
import Footer from './pages/Home/Footer.jsx';
import MarketMovers from './pages/Home/Market.jsx';
import Review from './pages/Home/Review.jsx';
import SecondPage from './pages/Home/Second-page.jsx';
import Navbar from './pages/Navabr.jsx';
import Ipo from "./pages/IPO/ipo.jsx";
import Product from "./pages/Product/product.jsx";
import Community1 from "./pages/Community/Community1.jsx";
import About from "./pages/About/About.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import DetailBlog from "./pages/Blog/DetailedBlog.jsx";
import Broker1 from "./pages/Broker/Broker1.jsx";
import BrokerCompare0 from "./pages/Broker/BrokerCompare0.jsx";
import Shark from "./pages/Sharks/Sharks.jsx";
import Carrers from "./pages/Carrers/Carrers.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Sector0 from "./pages/Sector/Sector0.jsx";
import Fund from "./pages/MuthodFund/Fund.jsx";
import Analysis1 from "./pages/Analysis/Analysis1.jsx";
import Schools from "./pages/Schools/Schools.jsx";
import Technical from "./pages/TechnicalAnalysis/Technical.jsx";
import Login from "./pages/Authontiction/Login.jsx";
import SignUp from "./pages/Authontiction/SignUp.jsx";
import Forgot from "./pages/Authontiction/Forgot.jsx";
import Admin from "./pages/Admin-View/Admin.jsx";
import ManageIpo from "./pages/Admin-View/ManageIpo.jsx";
import RegisterIpo from "./pages/Admin-View/RegisterIpo.jsx";
import Analytics from "./pages/Analatysic/Analatysic.jsx";
import MainHome from "./pages/Analatysic/MainHome.jsx";
import AuthProvider from './AuthProvider'

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <App2 />
                <SecondPage />
                <Card />
                <Download />
                <AppDownload />
                <Review />
                <MarketMovers />
                <BottomSection />
                <Footer />
              </>
            }
          />
          <Route path="/ipo" element={<Ipo />} />
          <Route path="/product" element={<Product />} />
          <Route path="/community" element={<Community1 />} />
          <Route path="/about" element={<About />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/DetailedBlog" element={<DetailBlog />} />
          <Route path="/Broker" element={<Broker1 />} />
          <Route path="/BrokerCompare" element={<BrokerCompare0 />} />
          <Route path="/Shark" element={<Shark />} />
          <Route path="/Carrers" element={<Carrers />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Sector" element={<Sector0 />} />
          <Route path="/MuthodFund" element={<Fund />} />
          <Route path="/Analysis" element={<Analysis1 />} />
          <Route path="/School" element={<Schools />} />
          <Route path="/TechnicalAnalysis" element={<Technical />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/dashboard" element={<Admin />} />
          <Route path="/manageipo" element={<ManageIpo />} />
          <Route path="/registeripo" element={<RegisterIpo />} />
          <Route path="/analaytics" element={<Analytics />} />
          <Route path="/mainhome" element={<MainHome />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
