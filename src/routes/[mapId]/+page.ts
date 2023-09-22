import { locationService } from "../../services/location.service";

export const load = (async ({ params }) => {
  try {
    if (typeof window !== 'undefined') {
      const location = localStorage.getItem('location')

      if (location) {
        const result = await locationService.getLocation(location, params.mapId);
        
        if (result) {
          return {
            ...result,
            nearbyLocations: result.expand ? result.expand.nearbyLocations : [],
            image: result.image.map((image) => locationService.getImageUrl(image, result)),
          };
        }
      } else {
       console.log("No location found");
      }
    } else {
      const randomLoc = await locationService.getRandomLocation();
  
      const result = await locationService.getLocation(randomLoc[Math.ceil(Math.random() * 4)].id, params.mapId);
  
      if (result) {
        return {
          ...result,
          nearbyLocations: result.expand ? result.expand.nearbyLocations : [],
          image: result.image.map((image) => locationService.getImageUrl(image, result)),
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
})