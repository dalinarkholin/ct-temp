
import axios from "axios";
import * as google from "@google/maps";
import ILocation from "src/interfaces/ILocation";

const googleMapsClient = google.createClient({
  key: "AIzaSyCfnxD-FfpIghgJVWYRDiouMKpcdv8HKZw",
  Promise: Promise,
});

class LocationService {

  public static async getClosestLocationByAddress(address: string) {
    const kitchens = await this.getKitchens();
    const kitchenLocations = kitchens.map((kitchen: any) => kitchen.location);
    const googleResult = await this.getDistanceMatrix(address, kitchenLocations);
    if (googleResult.kind === "error") {
      return googleResult;
    }
    const locationsWithOriginalIndex = googleResult.data.map(
      (element: any, index: number) => ({...element, originalIndex: index})
    );
    
    const sortedByDurationValue = locationsWithOriginalIndex.sort((a: any, b: any) => a.duration.value - b.duration.value);
    const closestKitchen = sortedByDurationValue[0];

    const kitchen = {
      address: googleResult.destination_addresses[closestKitchen.originalIndex],
      duration: closestKitchen.duration.text,
      distance: closestKitchen.distance.text,
    }
    return kitchen;
  }

  public static async getKitchens() {
    try {
      const response = await axios.get("https://api.staging.clustertruck.com/api/kitchens");
      return response.data;
    }
    catch(e) {
      console.error(e)
    }
  }

  public static async getDistanceMatrix(address: string, kitchenLocations: ILocation[]) {
    const result = await googleMapsClient.distanceMatrix({
      origins: address,
      destinations: kitchenLocations,
    }).asPromise();

    if (result.json.rows[0].elements[0].status !== "OK") {
      return ({ 
        kind: "error", 
        message: "Google Result did not return OK", 
        data: result.json.rows[0].elements,
        destination_addresses: result.json.destination_addresses
      });
    }
    return ({ 
      kind: "success", 
      data: result.json.rows[0].elements,
      destination_addresses: result.json.destination_addresses,
    });
  } 
}

export default LocationService;