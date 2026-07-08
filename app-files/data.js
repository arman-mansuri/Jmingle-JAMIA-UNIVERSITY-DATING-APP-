var APP_DATA = {
  "scenes": [
    {
      "id": "0-eco_dept",
      "name": "eco_dept",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "yaw": 1.792761440846772,
        "pitch": -0.06719331741499168,
        "fov": 1.5181490153448571
      },
      "linkHotspots": [
        {
          "yaw": -3.047771446005159,
          "pitch": 0.21869683469223844,
          "rotation": 6.283185307179586,
          "target": "1-eco_right"
        },
        {
          "yaw": -0.1356268582612863,
          "pitch": 0.3673631474234753,
          "rotation": 0,
          "target": "8-eco_left"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-eco_right",
      "name": "eco_right",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 2.8053047608651482,
          "pitch": 0.10945491997601664,
          "rotation": 4.71238898038469,
          "target": "0-eco_dept"
        },
        {
          "yaw": -2.9610736290277444,
          "pitch": 0.027454222891281077,
          "rotation": 0,
          "target": "2-commerce_right"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-commerce_right",
      "name": "commerce_right",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -2.9813693470554483,
          "pitch": 0.3169369842481782,
          "rotation": 12.566370614359176,
          "target": "4-commerce_dept"
        },
        {
          "yaw": 1.5740218612189345,
          "pitch": 0.32597660603392953,
          "rotation": 0,
          "target": "1-eco_right"
        },
        {
          "yaw": -1.5857092115926896,
          "pitch": 0.3888303598252705,
          "rotation": 0,
          "target": "3-dastarkan"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-dastarkan",
      "name": "dastarkan",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -2.916010660701666,
          "pitch": 0.25176298268269015,
          "rotation": 0,
          "target": "12-nano_dept"
        },
        {
          "yaw": 1.7665552386190457,
          "pitch": 0.20884725094844114,
          "rotation": 0,
          "target": "10-phycis_dept"
        },
        {
          "yaw": 0.10463592173208447,
          "pitch": 0.4380306296272529,
          "rotation": 0,
          "target": "2-commerce_right"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-commerce_dept",
      "name": "commerce_dept",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -3.1038339571293516,
          "pitch": 0.17180257963702594,
          "rotation": 0,
          "target": "5-commerceleft"
        },
        {
          "yaw": -0.027333683823206556,
          "pitch": 0.3168772547695795,
          "rotation": 0,
          "target": "2-commerce_right"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-commerceleft",
      "name": "commerceleft",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -2.851009063437248,
          "pitch": 0.17468640638383803,
          "rotation": 7.0685834705770345,
          "target": "6-canteen-2"
        },
        {
          "yaw": 1.5620773974710032,
          "pitch": 0.33512591506755207,
          "rotation": 0,
          "target": "4-commerce_dept"
        },
        {
          "yaw": 0.17184232926152987,
          "pitch": 0.48793309754615066,
          "rotation": 0,
          "target": "10-phycis_dept"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-canteen-2",
      "name": "canteen 2",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 2.867809032195394,
          "pitch": 0.08199221716088267,
          "rotation": 0,
          "target": "7-canteen-1"
        },
        {
          "yaw": 2.2083303601705975,
          "pitch": 0.24393306670349268,
          "rotation": 4.71238898038469,
          "target": "5-commerceleft"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-canteen-1",
      "name": "canteen 1",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.026186173281503855,
          "pitch": 0.5290099347501211,
          "rotation": 0,
          "target": "6-canteen-2"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "8-eco_left",
      "name": "eco_left",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 2.4007240184108536,
          "pitch": 0.294690597189188,
          "rotation": 6.283185307179586,
          "target": "0-eco_dept"
        },
        {
          "yaw": -0.5513829975453337,
          "pitch": 0.46159748390413924,
          "rotation": 0,
          "target": "9-socio_dept"
        },
        {
          "yaw": 1.0028344474839024,
          "pitch": 0.3957237084736178,
          "rotation": 0,
          "target": "5-commerceleft"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "9-socio_dept",
      "name": "socio_dept",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 3.1252424762709046,
          "pitch": 0.3788754135010173,
          "rotation": 0,
          "target": "8-eco_left"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "10-phycis_dept",
      "name": "phycis_dept",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -3.083335760162095,
          "pitch": 0.298818407197615,
          "rotation": 0,
          "target": "5-commerceleft"
        },
        {
          "yaw": 0.03954724539241283,
          "pitch": 0.31866843531153677,
          "rotation": 0,
          "target": "11-compsci_dept"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "11-compsci_dept",
      "name": "compsci_dept",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -3.0244078906108935,
          "pitch": 0.0749456300248923,
          "rotation": 0.7853981633974483,
          "target": "13-polytech_dept"
        },
        {
          "yaw": 0.006071466363154698,
          "pitch": 0.45588600527578294,
          "rotation": 0,
          "target": "10-phycis_dept"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "12-nano_dept",
      "name": "nano_dept",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -3.133661237781224,
          "pitch": 0.16412893478540447,
          "rotation": 6.283185307179586,
          "target": "3-dastarkan"
        },
        {
          "yaw": -0.11585853149160563,
          "pitch": 0.2569995813827113,
          "rotation": 5.497787143782138,
          "target": "13-polytech_dept"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "13-polytech_dept",
      "name": "polytech_dept",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 832,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -3.024968306157275,
          "pitch": 0.04578691220636344,
          "rotation": 7.0685834705770345,
          "target": "12-nano_dept"
        },
        {
          "yaw": 0.09679674996734988,
          "pitch": 0.28187290471377224,
          "rotation": 5.497787143782138,
          "target": "11-compsci_dept"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": true
  }
};
