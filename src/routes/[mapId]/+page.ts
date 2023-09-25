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
        const result = (await locationService.getRandomLocation(params.mapId))[Math.ceil(Math.random() * 3)];
  
        if (result) {
          return {
            ...result,
            nearbyLocations: result.expand ? result.expand.nearbyLocations : [],
            image: result.image.map((image) => locationService.getImageUrl(image, result)),
          };
        }
      }
    } else {
      const result = (await locationService.getRandomLocation(params.mapId))[Math.ceil(Math.random() * 3)];
  
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