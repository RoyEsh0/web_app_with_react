import L from 'leaflet';

L.Marker.include({
  _setPos: function (pos) {
    L.Marker.prototype._setPos.call(this, pos);
    if (this.options.rotationAngle) {
      this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = 'center';
      this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.rotationAngle + 'deg)';
    }
  }
});

export default L;
