import Header from "../components/Header";
import BackButton from "../components/BackButton";
import DataTable from "../components/DataTable";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";

export default function History() {
  const [data, setData] = useState([]);
  const api = useAxios();
  const [loaded, setLoaded] = useState(false);


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
      <div style={{ minHeight: '100vh' }}>
        <Header />
        <BackButton />
        <DataTable
          title="History:"
          delete={false}
          data={data}
          handleGet={handleGet}
          setData={setData}
          history={true}
          loaded={loaded}
        />
      </div>
      <Footer />
    </div>
  );
}