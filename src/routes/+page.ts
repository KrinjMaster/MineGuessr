import { locationService } from "../services/location.service";

export const load = (async () => {
  const id = "5dwuoimbjf18zun";
  
  try {
    const result = await locationService.getLocation(id)

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