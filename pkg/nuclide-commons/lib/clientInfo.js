Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isRunningInTest = isRunningInTest;
exports.isRunningInClient = isRunningInClient;
exports.getAtomNuclideDir = getAtomNuclideDir;
exports.getAtomVersion = getAtomVersion;
exports.getNuclideVersion = getNuclideVersion;
exports.getNuclideRealDir = getNuclideRealDir;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _once = require('./once');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var NUCLIDE_PACKAGE_JSON_PATH = require.resolve('../../../package.json');
var NUCLIDE_BASEDIR = _path2['default'].dirname(NUCLIDE_PACKAGE_JSON_PATH);

var pkgJson = JSON.parse(_fs2['default'].readFileSync(NUCLIDE_PACKAGE_JSON_PATH));

// "Development" is defined as working from source - not packaged code.
// apm/npm and internal releases don't package the base `.flowconfig`, so
// we use this to figure if we're packaged or not.
var isDevelopment = (0, _once.once)(function () {
  try {
    _fs2['default'].statSync(_path2['default'].join(NUCLIDE_BASEDIR, '.flowconfig'));
    return true;
  } catch (err) {
    return false;
  }
});

exports.isDevelopment = isDevelopment;

function isRunningInTest() {
  if (isRunningInClient()) {
    return atom.inSpecMode();
  } else {
    return process.env.NODE_ENV === 'test';
  }
}

function isRunningInClient() {
  return typeof atom !== 'undefined';
}

// This path may be a symlink.

function getAtomNuclideDir() {
  if (!isRunningInClient()) {
    throw Error('Not running in Atom.');
  }
  var nuclidePackageModule = atom.packages.getLoadedPackage('nuclide');
  (0, _assert2['default'])(nuclidePackageModule);
  return nuclidePackageModule.path;
}

function getAtomVersion() {
  if (!isRunningInClient()) {
    throw Error('Not running in Atom.');
  }
  return atom.getVersion();
}

function getNuclideVersion() {
  return pkgJson.version;
}

function getNuclideRealDir() {
  return NUCLIDE_BASEDIR;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudEluZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBV2UsSUFBSTs7OztzQkFDRyxRQUFROzs7O29CQUNYLFFBQVE7O29CQUNWLE1BQU07Ozs7QUFFdkIsSUFBTSx5QkFBeUIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDM0UsSUFBTSxlQUFlLEdBQUcsa0JBQUssT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7O0FBRWhFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQUcsWUFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzs7Ozs7QUFLaEUsSUFBTSxhQUFhLEdBQUcsZ0JBQUssWUFBb0I7QUFDcEQsTUFBSTtBQUNGLG9CQUFHLFFBQVEsQ0FBQyxrQkFBSyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDdkQsV0FBTyxJQUFJLENBQUM7R0FDYixDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ1osV0FBTyxLQUFLLENBQUM7R0FDZDtDQUNGLENBQUMsQ0FBQzs7OztBQUVJLFNBQVMsZUFBZSxHQUFZO0FBQ3pDLE1BQUksaUJBQWlCLEVBQUUsRUFBRTtBQUN2QixXQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUMxQixNQUFNO0FBQ0wsV0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUM7R0FDeEM7Q0FDRjs7QUFFTSxTQUFTLGlCQUFpQixHQUFZO0FBQzNDLFNBQU8sT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFDO0NBQ3BDOzs7O0FBR00sU0FBUyxpQkFBaUIsR0FBVztBQUMxQyxNQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtBQUN4QixVQUFNLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0dBQ3JDO0FBQ0QsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZFLDJCQUFVLG9CQUFvQixDQUFDLENBQUM7QUFDaEMsU0FBTyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Q0FDbEM7O0FBRU0sU0FBUyxjQUFjLEdBQVc7QUFDdkMsTUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7QUFDeEIsVUFBTSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztHQUNyQztBQUNELFNBQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0NBQzFCOztBQUVNLFNBQVMsaUJBQWlCLEdBQVc7QUFDMUMsU0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO0NBQ3hCOztBQUVNLFNBQVMsaUJBQWlCLEdBQVc7QUFDMUMsU0FBTyxlQUFlLENBQUM7Q0FDeEIiLCJmaWxlIjoiY2xpZW50SW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQge29uY2V9IGZyb20gJy4vb25jZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgTlVDTElERV9QQUNLQUdFX0pTT05fUEFUSCA9IHJlcXVpcmUucmVzb2x2ZSgnLi4vLi4vLi4vcGFja2FnZS5qc29uJyk7XG5jb25zdCBOVUNMSURFX0JBU0VESVIgPSBwYXRoLmRpcm5hbWUoTlVDTElERV9QQUNLQUdFX0pTT05fUEFUSCk7XG5cbmNvbnN0IHBrZ0pzb24gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhOVUNMSURFX1BBQ0tBR0VfSlNPTl9QQVRIKSk7XG5cbi8vIFwiRGV2ZWxvcG1lbnRcIiBpcyBkZWZpbmVkIGFzIHdvcmtpbmcgZnJvbSBzb3VyY2UgLSBub3QgcGFja2FnZWQgY29kZS5cbi8vIGFwbS9ucG0gYW5kIGludGVybmFsIHJlbGVhc2VzIGRvbid0IHBhY2thZ2UgdGhlIGJhc2UgYC5mbG93Y29uZmlnYCwgc29cbi8vIHdlIHVzZSB0aGlzIHRvIGZpZ3VyZSBpZiB3ZSdyZSBwYWNrYWdlZCBvciBub3QuXG5leHBvcnQgY29uc3QgaXNEZXZlbG9wbWVudCA9IG9uY2UoZnVuY3Rpb24oKTogYm9vbGVhbiB7XG4gIHRyeSB7XG4gICAgZnMuc3RhdFN5bmMocGF0aC5qb2luKE5VQ0xJREVfQkFTRURJUiwgJy5mbG93Y29uZmlnJykpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNSdW5uaW5nSW5UZXN0KCk6IGJvb2xlYW4ge1xuICBpZiAoaXNSdW5uaW5nSW5DbGllbnQoKSkge1xuICAgIHJldHVybiBhdG9tLmluU3BlY01vZGUoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSdW5uaW5nSW5DbGllbnQoKTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgYXRvbSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8vIFRoaXMgcGF0aCBtYXkgYmUgYSBzeW1saW5rLlxuZXhwb3J0IGZ1bmN0aW9uIGdldEF0b21OdWNsaWRlRGlyKCk6IHN0cmluZyB7XG4gIGlmICghaXNSdW5uaW5nSW5DbGllbnQoKSkge1xuICAgIHRocm93IEVycm9yKCdOb3QgcnVubmluZyBpbiBBdG9tLicpO1xuICB9XG4gIGNvbnN0IG51Y2xpZGVQYWNrYWdlTW9kdWxlID0gYXRvbS5wYWNrYWdlcy5nZXRMb2FkZWRQYWNrYWdlKCdudWNsaWRlJyk7XG4gIGludmFyaWFudChudWNsaWRlUGFja2FnZU1vZHVsZSk7XG4gIHJldHVybiBudWNsaWRlUGFja2FnZU1vZHVsZS5wYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXRvbVZlcnNpb24oKTogc3RyaW5nIHtcbiAgaWYgKCFpc1J1bm5pbmdJbkNsaWVudCgpKSB7XG4gICAgdGhyb3cgRXJyb3IoJ05vdCBydW5uaW5nIGluIEF0b20uJyk7XG4gIH1cbiAgcmV0dXJuIGF0b20uZ2V0VmVyc2lvbigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVjbGlkZVZlcnNpb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBrZ0pzb24udmVyc2lvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE51Y2xpZGVSZWFsRGlyKCk6IHN0cmluZyB7XG4gIHJldHVybiBOVUNMSURFX0JBU0VESVI7XG59XG4iXX0=