Object.defineProperty(exports, '__esModule', {
  value: true
});

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

exports['default'] = createBoundTextBuffer;

var _atom = require('atom');

/**
 * Create a text buffer that's bound to the process.
 */

function createBoundTextBuffer(processOutputStore, outputHandler) {

  var buffer = new _atom.TextBuffer({
    load: false,
    text: ''
  });

  var update = function update(data) {
    if (outputHandler) {
      outputHandler(buffer, data);
    } else {
      // `{undo: 'skip'}` disables the TextEditor's "undo system".
      buffer.append(data, { undo: 'skip' });
    }
  };

  // Update the text buffer with the initial contents of the store.
  update(processOutputStore.getStdout() || '');
  update(processOutputStore.getStderr() || '');

  var disposable = new _atom.CompositeDisposable(processOutputStore.observeStdout(update), processOutputStore.observeStderr(update));

  buffer.onDidDestroy(function () {
    return disposable.dispose();
  });

  return buffer;
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUJvdW5kVGV4dEJ1ZmZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7cUJBbUJ3QixxQkFBcUI7O29CQUxDLE1BQU07Ozs7OztBQUtyQyxTQUFTLHFCQUFxQixDQUMzQyxrQkFBc0MsRUFDdEMsYUFBb0MsRUFDeEI7O0FBRVosTUFBTSxNQUFNLEdBQUcscUJBQWU7QUFDNUIsUUFBSSxFQUFFLEtBQUs7QUFDWCxRQUFJLEVBQUUsRUFBRTtHQUNULENBQUMsQ0FBQzs7QUFFSCxNQUFNLE1BQU0sR0FBRyxTQUFULE1BQU0sQ0FBRyxJQUFJLEVBQUk7QUFDckIsUUFBSSxhQUFhLEVBQUU7QUFDakIsbUJBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDN0IsTUFBTTs7QUFFTCxZQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO0tBQ3JDO0dBQ0YsQ0FBQzs7O0FBR0YsUUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLFFBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7QUFFN0MsTUFBTSxVQUFVLEdBQUcsOEJBQ2pCLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFDeEMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUN6QyxDQUFDOztBQUVGLFFBQU0sQ0FBQyxZQUFZLENBQUM7V0FBTSxVQUFVLENBQUMsT0FBTyxFQUFFO0dBQUEsQ0FBQyxDQUFDOztBQUVoRCxTQUFPLE1BQU0sQ0FBQztDQUNmIiwiZmlsZSI6ImNyZWF0ZUJvdW5kVGV4dEJ1ZmZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtQcm9jZXNzT3V0cHV0SGFuZGxlcn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgdHlwZSB7UHJvY2Vzc091dHB1dFN0b3JlfSBmcm9tICcuLi8uLi9udWNsaWRlLXByb2Nlc3Mtb3V0cHV0LXN0b3JlJztcblxuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlLCBUZXh0QnVmZmVyfSBmcm9tICdhdG9tJztcblxuLyoqXG4gKiBDcmVhdGUgYSB0ZXh0IGJ1ZmZlciB0aGF0J3MgYm91bmQgdG8gdGhlIHByb2Nlc3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUJvdW5kVGV4dEJ1ZmZlcihcbiAgcHJvY2Vzc091dHB1dFN0b3JlOiBQcm9jZXNzT3V0cHV0U3RvcmUsXG4gIG91dHB1dEhhbmRsZXI6ID9Qcm9jZXNzT3V0cHV0SGFuZGxlcixcbik6IFRleHRCdWZmZXIge1xuXG4gIGNvbnN0IGJ1ZmZlciA9IG5ldyBUZXh0QnVmZmVyKHtcbiAgICBsb2FkOiBmYWxzZSxcbiAgICB0ZXh0OiAnJyxcbiAgfSk7XG5cbiAgY29uc3QgdXBkYXRlID0gZGF0YSA9PiB7XG4gICAgaWYgKG91dHB1dEhhbmRsZXIpIHtcbiAgICAgIG91dHB1dEhhbmRsZXIoYnVmZmVyLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYHt1bmRvOiAnc2tpcCd9YCBkaXNhYmxlcyB0aGUgVGV4dEVkaXRvcidzIFwidW5kbyBzeXN0ZW1cIi5cbiAgICAgIGJ1ZmZlci5hcHBlbmQoZGF0YSwge3VuZG86ICdza2lwJ30pO1xuICAgIH1cbiAgfTtcblxuICAvLyBVcGRhdGUgdGhlIHRleHQgYnVmZmVyIHdpdGggdGhlIGluaXRpYWwgY29udGVudHMgb2YgdGhlIHN0b3JlLlxuICB1cGRhdGUocHJvY2Vzc091dHB1dFN0b3JlLmdldFN0ZG91dCgpIHx8ICcnKTtcbiAgdXBkYXRlKHByb2Nlc3NPdXRwdXRTdG9yZS5nZXRTdGRlcnIoKSB8fCAnJyk7XG5cbiAgY29uc3QgZGlzcG9zYWJsZSA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKFxuICAgIHByb2Nlc3NPdXRwdXRTdG9yZS5vYnNlcnZlU3Rkb3V0KHVwZGF0ZSksXG4gICAgcHJvY2Vzc091dHB1dFN0b3JlLm9ic2VydmVTdGRlcnIodXBkYXRlKSxcbiAgKTtcblxuICBidWZmZXIub25EaWREZXN0cm95KCgpID0+IGRpc3Bvc2FibGUuZGlzcG9zZSgpKTtcblxuICByZXR1cm4gYnVmZmVyO1xufVxuIl19