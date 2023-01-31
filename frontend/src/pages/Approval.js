import Header from "../components/Header";
import BackButton from '../components/BackButton';
import DataTable from '../components/DataTable';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import useAxios from '../utils/useAxios';

export default function Approval() {
  let { user } = useContext(AuthContext)
  const [data, setData] = useState([]);
  const api = useAxios();
  const [loaded, setLoaded] = useState(false);

  const teste = () => {
    console.log('funciona')
  }

  const handleGet = () => {
    api.get('purchaserequest/get/').then(
      r => {
        setData(r.data)
        setLoaded(true)
      }
    )
  }

  useEffect(() => {
    handleGet();
  }, [])


  return (
    <div>
      <div style={{ minHeight: '100vh' }} >
        <Header />
        <BackButton />
        <DataTable title="Pending Approvals:"
          delete={true}
          data={data}
          setData={setData}
          handleGet={handleGet}
          history={false}
          loaded={loaded}
        />
      </div>
      <Footer />
    </div>
  );
}