import { useEffect } from "react";
import { useSelector } from "react-redux";

const CreaPrenotazione = () => {
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const getRestaurant = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/locale", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = response.json();
        console.log(data);
      }
    } catch {}
  };

  useEffect(() => {
    getRestaurant();
  }, []);
  return <div>Pagina prenotazione</div>;
};
export default CreaPrenotazione;
