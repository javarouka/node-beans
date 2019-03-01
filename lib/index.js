function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import path from 'path';
// const requireDir = require('require-dir');
// const parent = module.parent;
// const getScanDirectory = (dir) => {
//     const parent = module.parent;
//     if (!parent) {
//         return path.resolve(__dirname, dir);
//     }
//     const parentFile = parent.filename;
//     const parentDir = path.dirname(parentFile);
//     return path.resolve(parentDir, dir);
// };
// const scanDir = getScanDirectory('./');
// console.info('controller scan directory # ', scanDir);
export class C {
  constructor() {
    _defineProperty(this, "x", 10);

    _defineProperty(this, "getX", () => this.x);

    _defineProperty(this, "setX", newVal => {
      this.x = newVal;
    });
  }

}
export let x = new C();
export let y = _objectSpread({}, {
  some: "value"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJDIiwieCIsIm5ld1ZhbCIsInkiLCJzb21lIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBLE9BQU8sTUFBTUEsQ0FBTixDQUFRO0FBQUE7QUFBQSwrQkFDQyxFQUREOztBQUFBLGtDQUVKLE1BQU0sS0FBS0MsQ0FGUDs7QUFBQSxrQ0FHSEMsTUFBRCxJQUFvQjtBQUFFLFdBQUtELENBQUwsR0FBU0MsTUFBVDtBQUFrQixLQUhwQztBQUFBOztBQUFBO0FBTWYsT0FBTyxJQUFJRCxDQUFDLEdBQUcsSUFBSUQsQ0FBSixFQUFSO0FBQ1AsT0FBTyxJQUFJRyxDQUFDLHFCQUFRO0FBQUVDLEVBQUFBLElBQUksRUFBRTtBQUFSLENBQVIsQ0FBTCIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuLy8gY29uc3QgcmVxdWlyZURpciA9IHJlcXVpcmUoJ3JlcXVpcmUtZGlyJyk7XHJcbi8vIGNvbnN0IHBhcmVudCA9IG1vZHVsZS5wYXJlbnQ7XHJcblxyXG4vLyBjb25zdCBnZXRTY2FuRGlyZWN0b3J5ID0gKGRpcikgPT4ge1xyXG4vLyAgICAgY29uc3QgcGFyZW50ID0gbW9kdWxlLnBhcmVudDtcclxuLy8gICAgIGlmICghcGFyZW50KSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGRpcik7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgY29uc3QgcGFyZW50RmlsZSA9IHBhcmVudC5maWxlbmFtZTtcclxuLy8gICAgIGNvbnN0IHBhcmVudERpciA9IHBhdGguZGlybmFtZShwYXJlbnRGaWxlKTtcclxuLy8gICAgIHJldHVybiBwYXRoLnJlc29sdmUocGFyZW50RGlyLCBkaXIpO1xyXG4vLyB9O1xyXG5cclxuLy8gY29uc3Qgc2NhbkRpciA9IGdldFNjYW5EaXJlY3RvcnkoJy4vJyk7XHJcbi8vIGNvbnNvbGUuaW5mbygnY29udHJvbGxlciBzY2FuIGRpcmVjdG9yeSAjICcsIHNjYW5EaXIpO1xyXG5leHBvcnQgY2xhc3MgQyB7XHJcbiAgICBwcml2YXRlIHggPSAxMFxyXG4gICAgZ2V0WCA9ICgpID0+IHRoaXMueDtcclxuICAgIHNldFggPSAobmV3VmFsOiBudW1iZXIpID0+IHsgdGhpcy54ID0gbmV3VmFsOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgeCA9IG5ldyBDKCk7XHJcbmV4cG9ydCBsZXQgeSA9IHsgLi4ueyBzb21lOiBcInZhbHVlXCIgfSB9Il19