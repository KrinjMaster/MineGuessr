import type { PageData } from "../../routes/$types";
import { RenderLocation } from "./RenderLocation";
import { SVGRender } from "./SVGRender";

export const RenderScene = (scene: THREE.Scene, location: PageData) => {
  if (!localStorage.getItem('location') && location.id) {
    localStorage.setItem('location', location.id)
  }

  RenderLocation(scene, location);

  if (location.nearbyLocations && location.nearbyLocations.length > 0) {
    SVGRender(scene, location.nearbyLocations);
  }
}