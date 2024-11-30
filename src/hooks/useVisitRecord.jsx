import { useState } from "react";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const useVisitRecord = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Отримуємо компанію з Redux store
  const company = useSelector(state => state?.auth?.data?.user?.KOD_UR);
  
  // Отримуємо поточний шлях сторінки через useLocation
  const location = useLocation();

  const page = location.pathname === "/" ? "main" : location.pathname.substring(1);

  const recordVisit = async () => {
    if (!company) {
      console.warn("Company is not available. Skipping visit recording.");
      return; // Якщо company не задано, не робимо запис
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Відправляємо запит для запису відвідування
      const response = await axios.post("/visit/record", { page, company });
      if (response.status === 200 && response.data.success) {
        setSuccess(true);
      } else {
        throw new Error("Failed to record visit");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    recordVisit,
    loading,
    error,
    success,
  };
};

export default useVisitRecord;
