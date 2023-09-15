import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ'

const OLmap = (id: string) => {
    const map = new Map({
      target: id,
      layers: [
        new TileLayer({
          source: new XYZ({
            // projection: viewProjection,
            // tileGrid: tileGrid,
            // tilePixelRatio: dpiScale,
            // tileSize: worldTileSize / dpiScale,
            url:
              '/src/tiles/zoom.{z}/{xd}/{yd}/tile.{x}.{y}.jpeg'
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    return map;
  }

export default OLmap;