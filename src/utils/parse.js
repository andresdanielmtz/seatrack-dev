function getCoords() { 
    axios({
      method: "GET",
      url: "/coords"
    })
    .then((response) => {
      const res = response.data; // This is an array of objects
      // Map through the array to extract and set all coordinates
      const allCoords = res.map(coordinate => ({
        name: coordinate.name,
        lat: coordinate.latitude,
        long: coordinate.longitude,
        id: coordinate.id
      }));
      setCoords(allCoords);

    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  }