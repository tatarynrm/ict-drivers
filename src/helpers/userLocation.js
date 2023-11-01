export const sucessfulLookup = async (position, setFunc) => {
  const { latitude, longitude } = position.coords;
  const data = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?${latitude}&${longitude}&localityLanguage=en`
  )
    .then((response) => response.json())
    .then((data) => {
      setFunc(data);
    });
};
//   const handleUserLocation = async (values) => {
//     try {
//       const { data } = await fetching.post("/location", values);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(sucessfulLookup);
//   }, []);
