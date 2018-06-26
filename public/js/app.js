(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/actions/BoardActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stop = exports.start = exports.reset = exports.flip = exports.clear = undefined;

var _reduxActions = require('redux-actions');

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Board Actions
 * @desc Binding of actions to respective ActionTypes
 */
var clear = exports.clear = (0, _reduxActions.createAction)(types.CLEAR);
var flip = exports.flip = (0, _reduxActions.createAction)(types.FLIP);
var reset = exports.reset = (0, _reduxActions.createAction)(types.RESET);
var start = exports.start = (0, _reduxActions.createAction)(types.START);
var stop = exports.stop = (0, _reduxActions.createAction)(types.STOP);
});

;require.register("js/app.js", function(exports, require, module) {
'use strict';

var _uikitIcons = require('uikit/dist/js/uikit-icons');

var _uikitIcons2 = _interopRequireDefault(_uikitIcons);

var _uikit = require('uikit/dist/js/uikit');

var _uikit2 = _interopRequireDefault(_uikit);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _App = require('./containers/App');

var _App2 = _interopRequireDefault(_App);

var _Store = require('./store/Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _Store2.default)();
_uikit2.default.use(_uikitIcons2.default);

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_App2.default, null)
), document.getElementById('gameboard'));
});

;require.register("js/components/Block.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Block Component
 * @desc Generates a block element in the game board
 */

var onMouseEvent = function onMouseEvent(flip, on) {
  return function () {
    flip(on);
  };
};

var Block = function Block(_ref) {
  var on = _ref.on,
      flip = _ref.flip,
      color = _ref.color;
  return _react2.default.createElement('div', {
    className: 'board-block',
    onMouseDown: onMouseEvent(flip, on),
    style: { backgroundColor: on ? color : null }
  });
};

Block.propTypes = {
  on: _propTypes2.default.bool,
  flip: _propTypes2.default.func.isRequired,
  color: _propTypes2.default.string
};

Block.defaultProps = {
  on: false,
  color: '#FFF'
};

exports.default = Block;
});

;require.register("js/components/Board.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardShape = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Board Component
 * @desc Generates the board element in the game
 */

var renderBlock = function renderBlock(_flip, y) {
  return function (on, x) {
    return _react2.default.createElement(_Block2.default, {
      key: x,
      on: on,
      flip: function flip(on) {
        return _flip({
          coordinates: { y: y, x: x },
          current: on
        });
      }
    });
  };
};

var renderRow = function renderRow(flip) {
  return function (row, y) {
    return _react2.default.createElement(
      'div',
      { className: 'board-row', key: y },
      row.map(renderBlock(flip, y))
    );
  };
};

var Board = function Board(_ref) {
  var data = _ref.data,
      flip = _ref.flip;
  return _react2.default.createElement(
    'div',
    { className: 'board' },
    data.map(renderRow(flip))
  );
};

var BoardShape = exports.BoardShape = _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.bool));

Board.propTypes = {
  data: BoardShape.isRequired,
  flip: _propTypes2.default.func.isRequired
};

exports.default = Board;
});

;require.register("js/components/Controls.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Controls Component
 * @desc Generates the controls of the game
 */

var Controls = function (_PureComponent) {
  _inherits(Controls, _PureComponent);

  function Controls() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Controls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controls.__proto__ || Object.getPrototypeOf(Controls)).call.apply(_ref, [this].concat(args))), _this), _this.handleClickReset = function () {
      _this.stop();
      _this.props.actions.reset();
    }, _this.handleClickToggle = function () {
      if (_this.props.controls.label === 'STOP') {
        _this.stop();
      } else {
        if (_this.props.controls.clear) {
          _this.props.actions.reset();
        }
        window.interval = window.setInterval(_this.props.actions.start, 100);
      }
    }, _this.handleClickClear = function () {
      _this.stop();
      _this.props.actions.clear();
    }, _this.stop = function () {
      _this.props.actions.stop();
      clearInterval(window.interval);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Controls, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'controls uk-button-group' },
        _react2.default.createElement(
          'button',
          {
            className: 'uk-button uk-button-default uk-margin-right',
            onClick: this.handleClickToggle
          },
          this.props.controls.label
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'uk-button uk-button-default uk-margin-right',
            onClick: this.handleClickReset
          },
          'RESET'
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'uk-button uk-button-default',
            onClick: this.handleClickClear
          },
          'CLEAR'
        )
      );
    }
  }]);

  return Controls;
}(_react.PureComponent);

exports.default = Controls;


Controls.propTypes = {
  actions: _propTypes2.default.object.isRequired,
  controls: _propTypes2.default.object.isRequired
};
});

;require.register("js/constants/ActionTypes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * ActionTypes
 * @desc List of ActionTypes 
 */
var CLEAR = exports.CLEAR = 'CLEAR';
var FLIP = exports.FLIP = 'FLIP';
var RESET = exports.RESET = 'RESET';
var START = exports.START = 'START';
var STOP = exports.STOP = 'STOP';
});

;require.register("js/containers/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _BoardActions = require('../actions/BoardActions');

var BoardActions = _interopRequireWildcard(_BoardActions);

var _Board = require('../components/Board');

var _Board2 = _interopRequireDefault(_Board);

var _Controls = require('../components/Controls');

var _Controls2 = _interopRequireDefault(_Controls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Application Container
 * @desc Container for the application components
 * @param {object} props - properties of the application
 */
var App = function App(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Board2.default, {
      data: props.board,
      flip: props.actions.flip
    }),
    _react2.default.createElement(_Controls2.default, {
      actions: props.actions,
      controls: props.controls
    })
  );
};

App.propTypes = {
  actions: _propTypes2.default.object.isRequired,
  board: _Board.BoardShape.isRequired,
  controls: _propTypes2.default.object.isRequired

  // map the state and dispatch actions
};exports.default = (0, _reactRedux.connect)(function (state) {
  return _extends({}, state);
}, function (dispatch) {
  return { actions: (0, _redux.bindActionCreators)(BoardActions, dispatch) };
})(App);
});

;require.register("js/libs/board.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeEmptyBoard = exports.makeBoard = undefined;

var _ramda = require('ramda');

var FALSE = (0, _ramda.always)(false);

/**
 * @desc returns a multidimensional array that respresents the game board
 * @param {function} blockState - function to determine block state
 * @return {array}
 */
var makeBoard = exports.makeBoard = (0, _ramda.curry)(function (blockState, size) {
  var r = (0, _ramda.range)(0, size);
  return r.map(function (y) {
    return r.map(function (x) {
      return blockState(y, x);
    });
  });
});

var makeEmptyBoard = exports.makeEmptyBoard = makeBoard(FALSE);
});

;require.register("js/libs/engine.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextState = exports.flip = exports.process = exports.getNeighbors = undefined;

var _helpers = require('./helpers');

var helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @desc gets the current count of neighbors for a designated block
 * @param {array} board - dataset representing the game board
 * @param {object} coordinates - coordinate pair to define block
 * @param {int} coordinates.y - y coordinate
 * @param {int} coordinates.x - x coordinate
 * @return {int}
 */
var getNeighbors = exports.getNeighbors = function getNeighbors(board, coordinates) {
  return helpers.getPlots(coordinates).map(helpers.getBlockState(board)).reduce(function (a, b) {
    return a + b;
  });
};

/**
 * @desc determines block state based on its neighbors
 * @param {bool} on - designated state of block
 * @param {int} neighbors - number of neighbors
 * @return {bool}
 */
var process = exports.process = function process(on, neighbors) {
  return on ? neighbors >= 2 && neighbors <= 3 : neighbors === 3;
};

/**
 * @desc switches a blocks current state
 * @param {object} coordinates - coordinate pair to define block
 * @param {int} coordinates.y - y coordinate
 * @param {int} coordinates.x - x coordinate
 * @param {bool} current - designated state of block
 * @param {array} board - dataset representing the game board
 * @return {array}
 */
var flip = exports.flip = function flip(_ref, current, board) {
  var y = _ref.y,
      x = _ref.x;
  return helpers.set(y, helpers.set(x, !current, board[y]), board);
};

/**
 * @desc performs process methods on each block and returns a new board state
 * @param {array} board - dataset representing the game board
 * @return {array}
 */
var nextState = exports.nextState = function nextState(board) {
  return board.map(function (row, y) {
    return row.map(function (column, x) {
      return process(column, getNeighbors(board, { y: y, x: x }));
    });
  });
};
});

;require.register("js/libs/helpers.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @desc returns an array arrays of neighboring plots from provided coordinates
 * @param {object} coordinates - coordinate pair to define block
 * @param {int} coordinates.y - y coordinate
 * @param {int} coordinates.x - x coordinate
 * @return {array}
 */
var getPlots = exports.getPlots = function getPlots(_ref) {
  var y = _ref.y,
      x = _ref.x;
  return [-1, 0, 1].reduce(function (a, $y, i, offset) {
    return offset.reduce(function (b, $x) {
      return $x || $y ? [].concat(_toConsumableArray(b), [[y + $y, x + $x]]) : b;
    }, a);
  }, []);
};

/**
 * @desc returns appropriate index keys
 * @param {int} size - length of board array
 * @param {int} key - index value of board array
 * @return {array}
 */
var getFixedKey = exports.getFixedKey = function getFixedKey(size) {
  return function (key) {
    if (key === -1) {
      return size - 1;
    }
    if (key === size) {
      return 0;
    }
    return key;
  };
};

/**
 * @desc returns array of corrected keys
 * @param {int} size - length of board array
 * @param {array} keys - coordinate pair to define block
 * @return {array}
 */
var getKeys = exports.getKeys = function getKeys(size, keys) {
  return keys.map(getFixedKey(size));
};

/**
 * @desc returns value from index position
 * @param {array} board - dataset representing the game board
 * @param {array} coordinates - coordinate pair to define block
 * @return {bool}
 */
var getBlockState = exports.getBlockState = function getBlockState(board) {
  return function (coordinates) {
    return function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          y = _ref3[0],
          x = _ref3[1];

      return board[y][x];
    }(getKeys(board.length, coordinates)) || false;
  };
};

/**
 * @desc returns a randomized boolean value
 * @param {int} y - coordinate from multidimensional array
 * @param {int} x - coordinate from multidimensional array
 * @return {bool}
 */
var randomizer = exports.randomizer = function randomizer(y, x) {
  return Math.random(x + y) < 0.33;
};

/**
 * @desc creates an immutable array of arrays with new row replacement
 * @param {int} i - index of value
 * @param {array} value - value to set
 * @param {array} array - intial array of arrays
 * @return {array}
 */
var set = exports.set = function set(i, value, array) {
  return [].concat(_toConsumableArray(array.slice(0, i)), [value], _toConsumableArray(array.slice(i + 1)));
};
});

;require.register("js/reducers/board.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandlers;

var _reduxActions = require('redux-actions');

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

var _engine = require('../libs/engine');

var _board = require('../libs/board');

var _helpers = require('../libs/helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Board Reducer
 * @desc Reducer for the game board
 * @param {object} actionHandlers - reducerMap for the game board
 * @param {object} DEFAULT - default state
 */
var BOARD_SIZE = 30;
var DEFAULT = (0, _board.makeBoard)(_helpers.randomizer, BOARD_SIZE);
var actionHandlers = (_actionHandlers = {}, _defineProperty(_actionHandlers, types.CLEAR, function () {
  return (0, _board.makeEmptyBoard)(BOARD_SIZE, BOARD_SIZE);
}), _defineProperty(_actionHandlers, types.FLIP, function (state, _ref) {
  var payload = _ref.payload;
  return (0, _engine.flip)(payload.coordinates, payload.current, state);
}), _defineProperty(_actionHandlers, types.RESET, function () {
  return (0, _board.makeBoard)(_helpers.randomizer, BOARD_SIZE);
}), _defineProperty(_actionHandlers, types.START, _engine.nextState), _actionHandlers);

exports.default = (0, _reduxActions.handleActions)(actionHandlers, DEFAULT);
});

;require.register("js/reducers/controls.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionHandlers;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('redux-actions');

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Controls Reducer
 * @desc Reducer for the game controls
 * @param {object} actionHandlers - reducerMap for the game controls
 * @param {object} DEFAULT - default state
 */
var DEFAULT = {
  label: 'START',
  clear: false
};

var actionHandlers = (_actionHandlers = {}, _defineProperty(_actionHandlers, types.CLEAR, function (state) {
  return _extends({}, state, {
    label: 'START',
    clear: true
  });
}), _defineProperty(_actionHandlers, types.RESET, function (state) {
  return _extends({}, state, {
    label: 'START',
    clear: false
  });
}), _defineProperty(_actionHandlers, types.START, function (state) {
  return _extends({}, state, {
    label: 'STOP',
    clear: false
  });
}), _defineProperty(_actionHandlers, types.STOP, function (state) {
  return _extends({}, state, {
    label: 'START',
    clear: false
  });
}), _actionHandlers);

exports.default = (0, _reduxActions.handleActions)(actionHandlers, DEFAULT);
});

;require.register("js/reducers/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _controls = require('./controls');

var _controls2 = _interopRequireDefault(_controls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Root Reducer
 * @desc Reducer that combines the other application reducers
 * @param {object} reducers - the reducers to combine
 */
var reducer = (0, _redux.combineReducers)({
  board: _board2.default,
  controls: _controls2.default
});

exports.default = reducer;
});

;require.register("js/store/Store.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Application Store
 * @desc returns the applications store
 * @param {object} intialState - default dataset for the application store
 */
exports.default = function (initialState) {
  return (0, _redux.createStore)(_reducers2.default, initialState);
};
});

;require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('js/app');
//# sourceMappingURL=app.js.map