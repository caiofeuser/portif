import Header from "../components/Header";
import FieldsForms from "../components/FieldsForms";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer";

export default function Forms() {

  

  const fabStyle = {
    bottom: 16,
    right: 16,
  }

  const wrapper = {
    display:'flex',
    flexDirection:'column', 
    alignItems:'center'
  }

  return (
    <>
    <div style={{ marginBottom:'3rem' }}>
      <Header />
      <BackButton style={fabStyle} />
      <div style={wrapper}>
        <FieldsForms />
      </div>
    </div>
    <Footer />
    </>
  );
}