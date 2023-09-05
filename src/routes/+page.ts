import { locationService } from "../services/location.service";

export const load = (async () => {
  try {
    if (typeof window !== 'undefined') {
      const location = localStorage.getItem('location')

      if (location) {
        const result = await locationService.getLocation(location)
        
        if (result) {
          return {
            ...result,
            nearbyLocations: result.expand.nearbyLocations,
            image: result.image.map((image) => locationService.getImageUrl(image, result)),
          };
        }
      } else {
       console.log("No location found");
      }
    }

    const randomLoc = await locationService.getRandomLocation();
    const result = await locationService.getLocation(randomLoc[Math.round(Math.random())].locationId)

    if (result) {
      return {
        ...result,
        nearbyLocations: result.expand.nearbyLocations,
        image: result.image.map((image) => locationService.getImageUrl(image, result)),
      };
    }
  } catch (error) {
    console.log(error);
  }
})