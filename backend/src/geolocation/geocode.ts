export async function getGeocode(address: string) {

    if (!address) {
      return {};
    }


    const resp = await fetch(`${process.env.GEOCODE_URL}?api_key=${process.env.OPEN_ROUTE_KEY}&text=${address}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );  

    const data = await resp.json();


    return data;
  }



