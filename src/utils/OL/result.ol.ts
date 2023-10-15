import {Feature, Map, View} from 'ol';
import Projection from 'ol/proj/Projection.js';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ'
import TileGrid from 'ol/tilegrid/TileGrid';
import { boundingExtent } from 'ol/extent';
import { addCoordinateTransforms, fromLonLat, transform } from 'ol/proj';
import { LineString, Point } from 'ol/geom';
import Vector from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import VectorLayer from 'ol/layer/Vector';
import type { Marker, MarkersConfig } from './ol.ts';
import type { PageData } from '../../routes/[mapId]/$types.d.ts';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

const ResultOLmap = (id: string, regions: any, location: PageData | null, markers: MarkersConfig) => {
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
    markers: markers,
  }

  if (markers && location && location.cords) {
    const expandedMarkers = [...markers.markers, {
      x: location.cords.x,
      z: location.cords.z,
      image: "/src/lib/icons/flag.png",
      imageAnchor: [0.5, 1],
      imageScale: 0.5,
    }]
  
    markers.markers = expandedMarkers;
  }

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
    ],
    view: new View({
      center: markers?.markers ? fromLonLat([markers?.markers[0].x, -markers?.markers[0].z], viewProjection) : [0, 0],
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

  const createMarkersLayer = (markers: Marker[], dataProjection: Projection, viewProjection: any) => {
    const features = [];

    for (let i = 0; i < markers.length; i++) {
        const item = markers[i];
        const longitude = item.x;
        const latitude = item.z;

        const feature = new Feature({
          geometry: new Point(transform([longitude, latitude], dataProjection, viewProjection))
        });

        const style = new Style();

        if (item.image) {
          style.setImage(new Icon({
            src: item.image,
            anchor: item.imageAnchor,
            scale: item.imageScale
          }));
        }

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

  if (markers?.markers) {
    const guess = new Point([markers?.markers[0].x, -markers?.markers[0].z]);
    const loc = new Point([markers?.markers[1].x, -markers?.markers[1].z]);
  
    const line = new LineString([loc.getCoordinates(),guess.getCoordinates()]);

    const style = new Style({
      fill: new Fill({
        color: [255, 255, 255, 255]
      }),
      stroke: new Stroke({
        color: [255, 255, 255, 255],
        width: 5,
        lineCap: 'round'
      })
    });

    const vector = new Vector({
      features: [new Feature(line)],
    });

    const vectorLayer = new VectorLayer({
      source: vector,
      style: style,
    });

    map.addLayer(vectorLayer);
  }
  
  if (markers?.markers) {
    const markersLayer = createMarkersLayer(markers.markers, dataProjection, viewProjection);

    markersLayer.set('name', 'markers');

    map.addLayer(markersLayer);
  }

  return map;
}

export default ResultOLmap;