const calculate = function(lat1, lng1, lat2, lng2) {
    const earthRadius = 3958.75; // miles (or 6371.0 kilometers)
    const dLat = toRadians(lat2-lat1);
    const dLng = toRadians(lng2-lng1);
    const sindLat = Math.sin(dLat / 2);
    const sindLng = Math.sin(dLng / 2);
    const a = Math.pow(sindLat, 2) + Math.pow(sindLng, 2)
            * Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const dist = earthRadius * c;

    return dist;
};
const toDegrees = function (angle) {
  return angle * (180 / Math.PI);
};
const toRadians = function (angle) {
  return angle * (Math.PI / 180);
};
module.exports = calculate;