/* eslint-disable */

import _ from 'lodash';

export default function () {
  return function (params) {
    var originalPostMessage = window.postMessage;

    var patchedPostMessage = function(message, targetOrigin, transfer) {
      originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = function() {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };

    window.postMessage = patchedPostMessage;

    window.postMessage("INJECTED SCRIPT EXECUTING! ");
    var latLng = params.latLng;
    var gmapCoordinateRegex = params.gmapCoordinateRegex;
    var API_KEY = params.API_KEY;
    var system = {
      handshake: function () {
        return Object.keys(window);
      }
    };

    window.initMap = function () {
      var mapElement = document.getElementById('map');
      // window.postMessage('MAP INITIATED' + JSON.stringify(latLng));
      // try {
      //   window.gmap = new google.maps.Map(mapElement, {
      //     center: latLng,
      //     zoom: 18,
      //   });
      // } catch (e) {
      //   window.postMessage('ERROR: ' + JSON.stringify(e));
      // }
      // window.gmap = new google.maps.Map(document.getElementById('map'), {
      //   center: latLng,
      //   zoom: 18,
      //   zoomControl: false,
      //   mapTypeControl: false,
      //   scaleControl: false,
      //   streetViewControl: false,
      //   rotateControl: false,
      //   fullscreenControl: false,
      //   clickableIcons: true,
      //   draggable: true,
      //   gestureHandling: 'greedy'
      // });
    };

    document.addEventListener('message', function(e) {
      window.postMessage(e.data);
    });

    window.gmap = null;
    window.placesService = null;



    var pathtoscript = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&libraries=places&callback=initMap';
    loadScript(pathtoscript);
  };
}
