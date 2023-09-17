import {Feature, Map, MapBrowserEvent, Tile, View} from 'ol';
import Projection from 'ol/proj/Projection.js';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ'
import TileGrid from 'ol/tilegrid/TileGrid';
import { boundingExtent } from 'ol/extent';
import { addCoordinateTransforms, transform } from 'ol/proj';
import { Point } from 'ol/geom';
import Vector from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import VectorLayer from 'ol/layer/Vector';
import TileDebug from 'ol/source/TileDebug.js';
interface MarkersCFG {
  isEnabled: boolean;
  markers: {
    x: number;
    z: number;
    image: string;
    imageAnchor: number[];
    imageScale: number;
  }[]
}

const customMarkers: MarkersCFG = {
  isEnabled: true,
  markers: []
}

const options = {
  minZoom: 0,
  maxZoom: 2,
  defaultZoom: 0,
  imageFormat: "jpeg",
  minRegionX: -4,
  minRegionZ: -4,
  maxRegionX: 3,
  maxRegionZ: 3,
  worldName: "SP1",
  background: "",
  markers: customMarkers,
}

const OLmap = (id: string, regions: any) => {
  const dpiScale = window.devicePixelRatio ?? 1.0;

  const worldMinX = options.minRegionX * 512;
  const worldMinY = options.minRegionZ * 512;
  const worldWidth = (options.maxRegionX + 1 - options.minRegionX) * 512;
  const worldHeight = (options.maxRegionZ + 1 - options.minRegionZ) * 512;

  const worldTileSize = 256;

  const worldMaxZoomFactor = Math.pow(2, options.maxZoom);

  const viewProjection = new Projection({
    code: 'VIEW',
    units: 'pixels',
  });

  const dataProjection = new Projection({
    code: 'DATA',
    units: 'pixels',
  });

  addCoordinateTransforms(viewProjection, dataProjection,
    function (coordinate) {
      return [coordinate[0], -coordinate[1]];
    },
    function (coordinate) {
        return [coordinate[0], -coordinate[1]];
    });

  const mapExtent = boundingExtent([
    [worldMinX * worldMaxZoomFactor, -(worldMinY + worldHeight) * worldMaxZoomFactor],
    [(worldMinX + worldWidth) * worldMaxZoomFactor, -worldMinY * worldMaxZoomFactor]]);

  const mapZoomLevels = options.maxZoom - options.minZoom;

  const resolutions = new Array(mapZoomLevels + 1);

  for (let z = 0; z < mapZoomLevels + 1; ++z) {
      resolutions[mapZoomLevels - z] = Math.pow(2, z) * dpiScale / worldMaxZoomFactor;
  }

  const tileGrid = new TileGrid({
    extent: mapExtent,
    origin: [0, 0],
    resolutions: resolutions,
    tileSize: worldTileSize / dpiScale
  });

  const map = new Map({
    target: id,
    layers: [
      new TileLayer({
        source: new XYZ({
          projection: viewProjection,
          tileGrid: tileGrid,
          tilePixelRatio: dpiScale,
          tileSize: worldTileSize / dpiScale,
          tileUrlFunction: function (coordinate) {
            const worldZoom = -(mapZoomLevels - coordinate[0]) + options.maxZoom;
            const worldZoomFactor = Math.pow(2, worldZoom);

            const minTileX = Math.floor(worldMinX * worldZoomFactor / worldTileSize);
            const minTileY = Math.floor(worldMinY * worldZoomFactor / worldTileSize);
            const maxTileX = Math.ceil((worldMinX + worldWidth) * worldZoomFactor / worldTileSize) - 1;
            const maxTileY = Math.ceil((worldMinY + worldHeight) * worldZoomFactor / worldTileSize) - 1;

            const tileX = coordinate[1];
            const tileY = coordinate[2];

            const tileBlockSize = worldTileSize / worldZoomFactor;
            const tileBlockPoint = {
                x: tileX * tileBlockSize,
                z: tileY * tileBlockSize
            };

            const hasTile = function () {
              const tileRegionPoint = {
                x: Math.floor(tileBlockPoint.x / 512),
                z: Math.floor(tileBlockPoint.z / 512)
              };
              const tileRegionSize = Math.ceil(tileBlockSize / 512);

              for (let x = tileRegionPoint.x; x < tileRegionPoint.x + tileRegionSize; x++) {
                for (let z = tileRegionPoint.z; z < tileRegionPoint.z + tileRegionSize; z++) {
                  const group = {
                    x: Math.floor(x / 32),
                    z: Math.floor(z / 32)
                  };
                  const regionMap = regions.find((e: any) => e.x == group.x && e.z == group.z);
                  if (regionMap) {
                    const relX = x - group.x * 32;
                    const relZ = z - group.z * 32;
                    const inx = relZ * 32 + relX;
                    const b = regionMap.m[Math.floor(inx / 32)];
                    const bit = inx % 32;
                    const found = (b & (1 << bit)) != 0;
                    if (found) return true;
                  }
                }
              }
              return false;
            };

            if (tileX >= minTileX
              && tileY >= minTileY
              && tileX <= maxTileX
              && tileY <= maxTileY
              && hasTile()) {
              const url = ('/src/tiles/sp1/zoom.{z}/{xd}/{yd}/tile.{x}.{y}.' + options.imageFormat)
                .replace('{z}', worldZoom.toString())
                .replace('{yd}', Math.floor(tileY / 10).toString())
                .replace('{xd}', Math.floor(tileX / 10).toString())
                .replace('{y}', tileY.toString())
                .replace('{x}', tileX.toString());
              return url;
            }
            else
              return undefined;
          }
        }),
      }),
      // new TileLayer({
      //   source: new TileDebug ({
      //     tileGrid: tileGrid,
      //     projection: viewProjection
      //   })
      // })
    ],
    view: new View({
      center: [0, 0],
      extent: mapExtent,
      projection: viewProjection,
      resolutions: tileGrid.getResolutions(),
      maxZoom: mapZoomLevels,
      zoom: mapZoomLevels - options.maxZoom,
      constrainResolution: true,
      showFullExtent: true,
      constrainOnlyCenter: true
    })
  });

  const createMarkersLayer = (markers: any, dataProjection: any, viewProjection: any) => {
    const features = [];

    for (let i = 0; i < markers.length; i++) {
        const item = markers[i];
        const longitude = item.x;
        const latitude = item.z;

        const feature = new Feature({
          geometry: new Point(transform([longitude, latitude], dataProjection, viewProjection))
        });

        const style = new Style();
        if (item.image)
          style.setImage(new Icon({
            src: item.image,
            anchor: item.imageAnchor,
            scale: item.imageScale
          }));

        feature.setStyle(style);

        features.push(feature);
    }

    const vectorSource = new Vector({
        features: features
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    return vectorLayer;
  }
  
  map.on('click', function(evt){
    map.getLayers().forEach(layer => {
      if (layer.get('name') && layer.get('name') == 'guess_marker'){
        console.log('remove')
          map.removeLayer(layer)
      }
    });
    
    customMarkers.markers[0] = {
      x: evt.coordinate[0],
      z: -evt.coordinate[1],
      image: "/src/lib/icons/custom.pin.png",
      imageAnchor: [0.5, 1],
      imageScale: 0.5,
    }

    const markersLayer = createMarkersLayer(customMarkers.markers, dataProjection, viewProjection);

    markersLayer.set('name', 'guess_marker');

    map.addLayer(markersLayer);
  })

  return map;
}

export default OLmap;