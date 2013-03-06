/*
 *
 * ColorConverter
 * Version   0.03
 * License:   MIT
 * Simon Waldherr
 *
 */

var convRGBtoHSL = function(RGB) {
  "use strict";
  var r = Math.max(Math.min(RGB[0] / 255, 1), 0),
      g = Math.max(Math.min(RGB[1] / 255, 1), 0),
      b = Math.max(Math.min(RGB[2] / 255, 1), 0),
      max = Math.max(r, g, b), 
      min = Math.min(r, g, b),
      d, h, s, l = (max + min) / 2;
  if(max !== min) {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if(max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }
    h = h / 6;
  } else {
    h = s = 0;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

var convHSLtoRGB = function(HSL) {
  "use strict";
  var h = Math.max(Math.min(HSL[0], 360), 0) / 360,
      s = Math.max(Math.min(HSL[1], 100), 0) / 100,
      l = Math.max(Math.min(HSL[2], 100), 0) / 100,
      v, min, sv, six, fract, vsfract, r, g, b;
  if (l <= 0.5) {
    v = l * (1 + s);
  } else {
    v = l + s - l * s;
  }
  if(v === 0) {
    return [0, 0, 0];
  }
  min = 2 * l - v;
  sv = (v - min) / v;
  h = 6 * h;
  six = Math.floor(h);
  fract = h - six;
  vsfract = v * sv * fract;
  if (six === 0 || six === 6) {
    r = v;
    g = min + vsfract; 
    b = min;
  }
  else if (six === 1) {
    r = v - vsfract;
    g = v;
    b = min;
  }
  else if (six === 2) {
    r = min;
    g = v;
    b = min + vsfract;
  }
  else if (six === 3) {
    r = min;
    g = v - vsfract;
    b = v;
  }
  else if (six === 4) {
    r = min + vsfract;
    g = min;
    b = v;
  }
  else if (six === 5) {
    r = v;
    g = min;
    b = v - vsfract;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

var convHEXtoRGB = function(hex) {
  "use strict";
  if((hex.length < 2)||(hex.length > 6)) {
    return false;
  }
  var values = hex.split(''),
      r, g, b;
  if(hex.length === 2) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = r;
    b = r;
  } else if(hex.length === 3) {
    r = parseInt(values[0].toString(), 16);
    g = parseInt(values[1].toString(), 16);
    b = parseInt(values[2].toString(), 16);
  } else if(hex.length === 6) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = parseInt(values[2].toString() + values[3].toString(), 16);
    b = parseInt(values[4].toString() + values[5].toString(), 16);
  } else {
    return false;
  }
  return [r, g, b];
};

var convRGBtoHEX = function(RGB) {
  "use strict";
  var hexr = Math.max(Math.min(parseInt(RGB[0], 10), 255), 0),
      hexg = Math.max(Math.min(parseInt(RGB[1], 10), 255), 0),
      hexb = Math.max(Math.min(parseInt(RGB[2], 10), 255), 0);
  hexr = hexr > 15 ? hexr.toString(16) : '0'+hexr.toString(16);
  hexg = hexg > 15 ? hexg.toString(16) : '0'+hexg.toString(16);
  hexb = hexb > 15 ? hexb.toString(16) : '0'+hexb.toString(16);
  return hexr+hexg+hexb;
};

var convRGBtoYUV = function(RGB) {
  "use strict";
  var r = RGB[0],
      g = RGB[1],
      b = RGB[2],
      y, u, v;
  y = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  u = Math.round((b - y) * 0.493);
  v = Math.round((r - y) * 0.877);
  return [y, u, v];
};

var convYUVtoRGB = function(YUV) {
  "use strict";
  var y = parseInt(YUV[0], 10),
      u = parseInt(YUV[1], 10),
      v = parseInt(YUV[2], 10),
      r, g, b;
  r = Math.round(y + v / 0.877);
  g = Math.round(y - 0.39466 * u - 0.5806 * v);
  b = Math.round(y + u / 0.493);
  return [r, g, b];
};

var convHSLtoHEX = function(HSL) {
  "use strict";
  return convRGBtoHEX( convHSLtoRGB( HSL ) );
};

var convHEXtoHSL = function(hex) {
  "use strict";
  return convRGBtoHSL( convHEXtoRGB( hex ) );
};
