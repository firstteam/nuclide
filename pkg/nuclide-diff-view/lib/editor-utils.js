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

exports.buildLineRangesWithOffsets = buildLineRangesWithOffsets;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nuclideCommons = require('../../nuclide-commons');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

/*
 * @param screenLines The original screen lines before adding offsets.
 * @param lineOffsets The offset map from buffer line numbers to the number of lines of offset
 *   requested there.
 * @param startBufferRow The buffer row at which the next range of screen lines is started.
 * @param endBufferRow The buffer row at which the next range of screen lines is ended.
 * @param emptyLineFactory A custom function to create a new empty line, representing an offset
 *   screen line.
 */

function buildLineRangesWithOffsets(screenLines, lineOffsets, startBufferRow, endBufferRow, emptyLineFactory) {

  var offsetLineNumbers = _nuclideCommons.array.from(lineOffsets.keys()).sort(function (x, y) {
    return x - y;
  });
  var priorScreenLine = startBufferRow;
  var newRegions = [];
  var newScreenLines = [];

  var captureScreenLinesRegion = function captureScreenLinesRegion(toScreenLine) {
    if (toScreenLine < priorScreenLine) {
      return;
    }
    var numberOfRows = toScreenLine - priorScreenLine;
    if (numberOfRows > 0) {
      // Add the portion of the original screenLines until toScreenLine.
      newScreenLines.push.apply(newScreenLines, screenLines.slice(priorScreenLine - startBufferRow, toScreenLine - startBufferRow));
      // This is normal 1 to 1 buffer to screen row region.
      newRegions.push({ bufferRows: numberOfRows, screenRows: numberOfRows });
    }
    priorScreenLine = toScreenLine + 1;
  };

  // Construct the new screen lines and regions, by adding empty lines at the offset lines
  // and returning ranges with screenRows = bufferRows + offsetLines.
  for (var offsetLineNumber of offsetLineNumbers) {
    if (offsetLineNumber < priorScreenLine || offsetLineNumber >= endBufferRow) {
      continue;
    }
    var offsetLines = lineOffsets.get(offsetLineNumber);
    captureScreenLinesRegion(offsetLineNumber - 1);
    // Add empty screen lines to represent offsets.
    (0, _assert2['default'])(offsetLines);
    for (var i = 0; i < offsetLines; i++) {
      newScreenLines.push(emptyLineFactory());
    }
    var startOffsetBufferLineNumber = offsetLineNumber - startBufferRow - 1;
    // TODO: fix when we have more control on the buffer to screen line mapping
    // Currently, if we have offsets at the begining of the file, the gutter numbering would be
    // confusing because it considers the first offset line is the line to be numbered.
    if (startOffsetBufferLineNumber >= 0) {
      // The buffer line should be inserted above the empty offset lines added.
      newScreenLines.splice(newScreenLines.length - offsetLines, 0, screenLines[startOffsetBufferLineNumber]);
    } else {
      // startOffsetBufferLineNumber = -1 in case the offsets are in the begining of the file.
      newScreenLines.push(screenLines[0]);
      priorScreenLine++;
    }
    newRegions.push({ bufferRows: 1, screenRows: offsetLines + 1 });
  }

  // Capture a single region to the end of the screen lines.
  captureScreenLinesRegion(endBufferRow);

  return { regions: newRegions, screenLines: newScreenLines };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRvci11dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzhCQWFvQix1QkFBdUI7O3NCQUNyQixRQUFROzs7Ozs7Ozs7Ozs7OztBQVd2QixTQUFTLDBCQUEwQixDQUN0QyxXQUF1QixFQUN2QixXQUFzQixFQUN0QixjQUFzQixFQUN0QixZQUFvQixFQUNwQixnQkFBMkIsRUFDRjs7QUFFM0IsTUFBTSxpQkFBaUIsR0FBRyxzQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7V0FBSyxDQUFDLEdBQUcsQ0FBQztHQUFBLENBQUMsQ0FBQztBQUMvRSxNQUFJLGVBQWUsR0FBRyxjQUFjLENBQUM7QUFDckMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQzs7QUFFMUIsTUFBTSx3QkFBd0IsR0FBRyxTQUEzQix3QkFBd0IsQ0FBSSxZQUFZLEVBQWE7QUFDekQsUUFBSSxZQUFZLEdBQUcsZUFBZSxFQUFFO0FBQ2xDLGFBQU87S0FDUjtBQUNELFFBQU0sWUFBWSxHQUFHLFlBQVksR0FBRyxlQUFlLENBQUM7QUFDcEQsUUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFOztBQUVwQixvQkFBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQ3ZCLGNBQWMsRUFDZCxXQUFXLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxjQUFjLEVBQUUsWUFBWSxHQUFHLGNBQWMsQ0FBQyxDQUNuRixDQUFDOztBQUVGLGdCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztLQUN2RTtBQUNELG1CQUFlLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztHQUNwQyxDQUFDOzs7O0FBSUYsT0FBSyxJQUFNLGdCQUFnQixJQUFJLGlCQUFpQixFQUFFO0FBQ2hELFFBQUksZ0JBQWdCLEdBQUcsZUFBZSxJQUFJLGdCQUFnQixJQUFJLFlBQVksRUFBRTtBQUMxRSxlQUFTO0tBQ1Y7QUFDRCxRQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDdEQsNEJBQXdCLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0FBRS9DLDZCQUFVLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZCLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEMsb0JBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0tBQ3pDO0FBQ0QsUUFBTSwyQkFBMkIsR0FBRyxnQkFBZ0IsR0FBRyxjQUFjLEdBQUcsQ0FBQyxDQUFDOzs7O0FBSTFFLFFBQUksMkJBQTJCLElBQUksQ0FBQyxFQUFFOztBQUVwQyxvQkFBYyxDQUFDLE1BQU0sQ0FDbkIsY0FBYyxDQUFDLE1BQU0sR0FBRyxXQUFXLEVBQ25DLENBQUMsRUFDRCxXQUFXLENBQUMsMkJBQTJCLENBQUMsQ0FDekMsQ0FBQztLQUNILE1BQU07O0FBRUwsb0JBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMscUJBQWUsRUFBRSxDQUFDO0tBQ25CO0FBQ0QsY0FBVSxDQUFDLElBQUksQ0FBQyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0dBQy9EOzs7QUFHRCwwQkFBd0IsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFdkMsU0FBTyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBQyxDQUFDO0NBQzNEIiwiZmlsZSI6ImVkaXRvci11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtMaW5lUmFuZ2VzV2l0aE9mZnNldHMsIE9mZnNldE1hcH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCB7YXJyYXl9IGZyb20gJy4uLy4uL251Y2xpZGUtY29tbW9ucyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2Fzc2VydCc7XG5cbi8qXG4gKiBAcGFyYW0gc2NyZWVuTGluZXMgVGhlIG9yaWdpbmFsIHNjcmVlbiBsaW5lcyBiZWZvcmUgYWRkaW5nIG9mZnNldHMuXG4gKiBAcGFyYW0gbGluZU9mZnNldHMgVGhlIG9mZnNldCBtYXAgZnJvbSBidWZmZXIgbGluZSBudW1iZXJzIHRvIHRoZSBudW1iZXIgb2YgbGluZXMgb2Ygb2Zmc2V0XG4gKiAgIHJlcXVlc3RlZCB0aGVyZS5cbiAqIEBwYXJhbSBzdGFydEJ1ZmZlclJvdyBUaGUgYnVmZmVyIHJvdyBhdCB3aGljaCB0aGUgbmV4dCByYW5nZSBvZiBzY3JlZW4gbGluZXMgaXMgc3RhcnRlZC5cbiAqIEBwYXJhbSBlbmRCdWZmZXJSb3cgVGhlIGJ1ZmZlciByb3cgYXQgd2hpY2ggdGhlIG5leHQgcmFuZ2Ugb2Ygc2NyZWVuIGxpbmVzIGlzIGVuZGVkLlxuICogQHBhcmFtIGVtcHR5TGluZUZhY3RvcnkgQSBjdXN0b20gZnVuY3Rpb24gdG8gY3JlYXRlIGEgbmV3IGVtcHR5IGxpbmUsIHJlcHJlc2VudGluZyBhbiBvZmZzZXRcbiAqICAgc2NyZWVuIGxpbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZExpbmVSYW5nZXNXaXRoT2Zmc2V0cyhcbiAgICBzY3JlZW5MaW5lczogQXJyYXk8YW55PixcbiAgICBsaW5lT2Zmc2V0czogT2Zmc2V0TWFwLFxuICAgIHN0YXJ0QnVmZmVyUm93OiBudW1iZXIsXG4gICAgZW5kQnVmZmVyUm93OiBudW1iZXIsXG4gICAgZW1wdHlMaW5lRmFjdG9yeTogKCkgPT4gYW55XG4gICAgKTogTGluZVJhbmdlc1dpdGhPZmZzZXRzIHtcblxuICBjb25zdCBvZmZzZXRMaW5lTnVtYmVycyA9IGFycmF5LmZyb20obGluZU9mZnNldHMua2V5cygpKS5zb3J0KCh4LCB5KSA9PiB4IC0geSk7XG4gIGxldCBwcmlvclNjcmVlbkxpbmUgPSBzdGFydEJ1ZmZlclJvdztcbiAgY29uc3QgbmV3UmVnaW9ucyA9IFtdO1xuICBjb25zdCBuZXdTY3JlZW5MaW5lcyA9IFtdO1xuXG4gIGNvbnN0IGNhcHR1cmVTY3JlZW5MaW5lc1JlZ2lvbiA9ICh0b1NjcmVlbkxpbmU6IG51bWJlcikgPT4ge1xuICAgIGlmICh0b1NjcmVlbkxpbmUgPCBwcmlvclNjcmVlbkxpbmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbnVtYmVyT2ZSb3dzID0gdG9TY3JlZW5MaW5lIC0gcHJpb3JTY3JlZW5MaW5lO1xuICAgIGlmIChudW1iZXJPZlJvd3MgPiAwKSB7XG4gICAgICAvLyBBZGQgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHNjcmVlbkxpbmVzIHVudGlsIHRvU2NyZWVuTGluZS5cbiAgICAgIG5ld1NjcmVlbkxpbmVzLnB1c2guYXBwbHkoXG4gICAgICAgIG5ld1NjcmVlbkxpbmVzLFxuICAgICAgICBzY3JlZW5MaW5lcy5zbGljZShwcmlvclNjcmVlbkxpbmUgLSBzdGFydEJ1ZmZlclJvdywgdG9TY3JlZW5MaW5lIC0gc3RhcnRCdWZmZXJSb3cpXG4gICAgICApO1xuICAgICAgLy8gVGhpcyBpcyBub3JtYWwgMSB0byAxIGJ1ZmZlciB0byBzY3JlZW4gcm93IHJlZ2lvbi5cbiAgICAgIG5ld1JlZ2lvbnMucHVzaCh7YnVmZmVyUm93czogbnVtYmVyT2ZSb3dzLCBzY3JlZW5Sb3dzOiBudW1iZXJPZlJvd3N9KTtcbiAgICB9XG4gICAgcHJpb3JTY3JlZW5MaW5lID0gdG9TY3JlZW5MaW5lICsgMTtcbiAgfTtcblxuICAvLyBDb25zdHJ1Y3QgdGhlIG5ldyBzY3JlZW4gbGluZXMgYW5kIHJlZ2lvbnMsIGJ5IGFkZGluZyBlbXB0eSBsaW5lcyBhdCB0aGUgb2Zmc2V0IGxpbmVzXG4gIC8vIGFuZCByZXR1cm5pbmcgcmFuZ2VzIHdpdGggc2NyZWVuUm93cyA9IGJ1ZmZlclJvd3MgKyBvZmZzZXRMaW5lcy5cbiAgZm9yIChjb25zdCBvZmZzZXRMaW5lTnVtYmVyIG9mIG9mZnNldExpbmVOdW1iZXJzKSB7XG4gICAgaWYgKG9mZnNldExpbmVOdW1iZXIgPCBwcmlvclNjcmVlbkxpbmUgfHwgb2Zmc2V0TGluZU51bWJlciA+PSBlbmRCdWZmZXJSb3cpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCBvZmZzZXRMaW5lcyA9IGxpbmVPZmZzZXRzLmdldChvZmZzZXRMaW5lTnVtYmVyKTtcbiAgICBjYXB0dXJlU2NyZWVuTGluZXNSZWdpb24ob2Zmc2V0TGluZU51bWJlciAtIDEpO1xuICAgIC8vIEFkZCBlbXB0eSBzY3JlZW4gbGluZXMgdG8gcmVwcmVzZW50IG9mZnNldHMuXG4gICAgaW52YXJpYW50KG9mZnNldExpbmVzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZnNldExpbmVzOyBpKyspIHtcbiAgICAgIG5ld1NjcmVlbkxpbmVzLnB1c2goZW1wdHlMaW5lRmFjdG9yeSgpKTtcbiAgICB9XG4gICAgY29uc3Qgc3RhcnRPZmZzZXRCdWZmZXJMaW5lTnVtYmVyID0gb2Zmc2V0TGluZU51bWJlciAtIHN0YXJ0QnVmZmVyUm93IC0gMTtcbiAgICAvLyBUT0RPOiBmaXggd2hlbiB3ZSBoYXZlIG1vcmUgY29udHJvbCBvbiB0aGUgYnVmZmVyIHRvIHNjcmVlbiBsaW5lIG1hcHBpbmdcbiAgICAvLyBDdXJyZW50bHksIGlmIHdlIGhhdmUgb2Zmc2V0cyBhdCB0aGUgYmVnaW5pbmcgb2YgdGhlIGZpbGUsIHRoZSBndXR0ZXIgbnVtYmVyaW5nIHdvdWxkIGJlXG4gICAgLy8gY29uZnVzaW5nIGJlY2F1c2UgaXQgY29uc2lkZXJzIHRoZSBmaXJzdCBvZmZzZXQgbGluZSBpcyB0aGUgbGluZSB0byBiZSBudW1iZXJlZC5cbiAgICBpZiAoc3RhcnRPZmZzZXRCdWZmZXJMaW5lTnVtYmVyID49IDApIHtcbiAgICAgIC8vIFRoZSBidWZmZXIgbGluZSBzaG91bGQgYmUgaW5zZXJ0ZWQgYWJvdmUgdGhlIGVtcHR5IG9mZnNldCBsaW5lcyBhZGRlZC5cbiAgICAgIG5ld1NjcmVlbkxpbmVzLnNwbGljZShcbiAgICAgICAgbmV3U2NyZWVuTGluZXMubGVuZ3RoIC0gb2Zmc2V0TGluZXMsXG4gICAgICAgIDAsXG4gICAgICAgIHNjcmVlbkxpbmVzW3N0YXJ0T2Zmc2V0QnVmZmVyTGluZU51bWJlcl1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN0YXJ0T2Zmc2V0QnVmZmVyTGluZU51bWJlciA9IC0xIGluIGNhc2UgdGhlIG9mZnNldHMgYXJlIGluIHRoZSBiZWdpbmluZyBvZiB0aGUgZmlsZS5cbiAgICAgIG5ld1NjcmVlbkxpbmVzLnB1c2goc2NyZWVuTGluZXNbMF0pO1xuICAgICAgcHJpb3JTY3JlZW5MaW5lKys7XG4gICAgfVxuICAgIG5ld1JlZ2lvbnMucHVzaCh7YnVmZmVyUm93czogMSwgc2NyZWVuUm93czogb2Zmc2V0TGluZXMgKyAxfSk7XG4gIH1cblxuICAvLyBDYXB0dXJlIGEgc2luZ2xlIHJlZ2lvbiB0byB0aGUgZW5kIG9mIHRoZSBzY3JlZW4gbGluZXMuXG4gIGNhcHR1cmVTY3JlZW5MaW5lc1JlZ2lvbihlbmRCdWZmZXJSb3cpO1xuXG4gIHJldHVybiB7cmVnaW9uczogbmV3UmVnaW9ucywgc2NyZWVuTGluZXM6IG5ld1NjcmVlbkxpbmVzfTtcbn1cbiJdfQ==