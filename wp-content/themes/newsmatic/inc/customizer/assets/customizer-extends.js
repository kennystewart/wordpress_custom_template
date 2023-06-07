/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js");
  /* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Tokenizer.js");
  /* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Utility.js");
  /* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Enum.js");
  /* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Serializer.js");
  /* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Middleware.js");
  /* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Parser.js");
  /* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
  /* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");
  
  
  
  
  
  var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
    var previous = 0;
    var character = 0;
  
    while (true) {
      previous = character;
      character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)(); // &\f
  
      if (previous === 38 && character === 12) {
        points[index] = 1;
      }
  
      if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
        break;
      }
  
      (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)();
    }
  
    return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.slice)(begin, stylis__WEBPACK_IMPORTED_MODULE_3__.position);
  };
  
  var toRules = function toRules(parsed, points) {
    // pretend we've started with a comma
    var index = -1;
    var character = 44;
  
    do {
      switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
        case 0:
          // &\f
          if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 12) {
            // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
            // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
            // and when it should just concatenate the outer and inner selectors
            // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
            points[index] = 1;
          }
  
          parsed[index] += identifierWithPointTracking(stylis__WEBPACK_IMPORTED_MODULE_3__.position - 1, points, index);
          break;
  
        case 2:
          parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.delimit)(character);
          break;
  
        case 4:
          // comma
          if (character === 44) {
            // colon
            parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 58 ? '&\f' : '';
            points[index] = parsed[index].length;
            break;
          }
  
        // fallthrough
  
        default:
          parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_4__.from)(character);
      }
    } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)());
  
    return parsed;
  };
  
  var getRules = function getRules(value, points) {
    return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_3__.alloc)(value), points));
  }; // WeakSet would be more appropriate, but only WeakMap is supported in IE11
  
  
  var fixedElements = /* #__PURE__ */new WeakMap();
  var compat = function compat(element) {
    if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
    // negative .length indicates that this rule has been already prefixed
    element.length < 1) {
      return;
    }
  
    var value = element.value,
        parent = element.parent;
    var isImplicitRule = element.column === parent.column && element.line === parent.line;
  
    while (parent.type !== 'rule') {
      parent = parent.parent;
      if (!parent) return;
    } // short-circuit for the simplest case
  
  
    if (element.props.length === 1 && value.charCodeAt(0) !== 58
    /* colon */
    && !fixedElements.get(parent)) {
      return;
    } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
    // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"
  
  
    if (isImplicitRule) {
      return;
    }
  
    fixedElements.set(element, true);
    var points = [];
    var rules = getRules(value, points);
    var parentRules = parent.props;
  
    for (var i = 0, k = 0; i < rules.length; i++) {
      for (var j = 0; j < parentRules.length; j++, k++) {
        element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
      }
    }
  };
  var removeLabel = function removeLabel(element) {
    if (element.type === 'decl') {
      var value = element.value;
  
      if ( // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98) {
        // this ignores label
        element["return"] = '';
        element.value = '';
      }
    }
  };
  var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
  
  var isIgnoringComment = function isIgnoringComment(element) {
    return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
  };
  
  var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
    return function (element, index, children) {
      if (element.type !== 'rule' || cache.compat) return;
      var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
  
      if (unsafePseudoClasses) {
        var isNested = element.parent === children[0]; // in nested rules comments become children of the "auto-inserted" rule
        //
        // considering this input:
        // .a {
        //   .b /* comm */ {}
        //   color: hotpink;
        // }
        // we get output corresponding to this:
        // .a {
        //   & {
        //     /* comm */
        //     color: hotpink;
        //   }
        //   .b {}
        // }
  
        var commentContainer = isNested ? children[0].children : // global rule at the root level
        children;
  
        for (var i = commentContainer.length - 1; i >= 0; i--) {
          var node = commentContainer[i];
  
          if (node.line < element.line) {
            break;
          } // it is quite weird but comments are *usually* put at `column: element.column - 1`
          // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
          // this will also match inputs like this:
          // .a {
          //   /* comm */
          //   .b {}
          // }
          //
          // but that is fine
          //
          // it would be the easiest to change the placement of the comment to be the first child of the rule:
          // .a {
          //   .b { /* comm */ }
          // }
          // with such inputs we wouldn't have to search for the comment at all
          // TODO: consider changing this comment placement in the next major version
  
  
          if (node.column < element.column) {
            if (isIgnoringComment(node)) {
              return;
            }
  
            break;
          }
        }
  
        unsafePseudoClasses.forEach(function (unsafePseudoClass) {
          console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
        });
      }
    };
  };
  
  var isImportRule = function isImportRule(element) {
    return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
  };
  
  var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
    for (var i = index - 1; i >= 0; i--) {
      if (!isImportRule(children[i])) {
        return true;
      }
    }
  
    return false;
  }; // use this to remove incorrect elements from further processing
  // so they don't get handed to the `sheet` (or anything else)
  // as that could potentially lead to additional logs which in turn could be overhelming to the user
  
  
  var nullifyElement = function nullifyElement(element) {
    element.type = '';
    element.value = '';
    element["return"] = '';
    element.children = '';
    element.props = '';
  };
  
  var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
    if (!isImportRule(element)) {
      return;
    }
  
    if (element.parent) {
      console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
      nullifyElement(element);
    } else if (isPrependedWithRegularRules(index, children)) {
      console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
      nullifyElement(element);
    }
  };
  
  /* eslint-disable no-fallthrough */
  
  function prefix(value, length) {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.hash)(value, length)) {
      // color-adjust
      case 5103:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'print-' + value + value;
      // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
  
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
  
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
  
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
  
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + value;
      // appearance, user-select, transform, hyphens, text-size-adjust
  
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MOZ + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + value + value;
      // flex, flex-direction
  
      case 6828:
      case 4268:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + value + value;
      // order
  
      case 6165:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-' + value + value;
      // align-items
  
      case 5187:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(\w+).+(:[^]+)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'box-$1$2' + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-$1$2') + value;
      // align-self
  
      case 5443:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-item-' + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /flex-|-self/, '') + value;
      // align-content
  
      case 4675:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-line-pack' + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /align-content|flex-|-self/, '') + value;
      // flex-shrink
  
      case 5548:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, 'shrink', 'negative') + value;
      // flex-basis
  
      case 5292:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, 'basis', 'preferred-size') + value;
      // flex-grow
  
      case 6060:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'box-' + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, '-grow', '') + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, 'grow', 'positive') + value;
      // transition
  
      case 4554:
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /([^-])(transform)/g, '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$2') + value;
      // cursor
  
      case 6187:
        return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(zoom-|grab)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$1'), /(image-set)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$1'), value, '') + value;
      // background, background-image
  
      case 5495:
      case 3959:
        return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(image-set\([^]*)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$1' + '$`$1');
      // justify-content
  
      case 4968:
        return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(.+:)(flex-)?(.*)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'box-pack:$3' + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + value;
      // (margin|padding)-inline-(start|end)
  
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(.+)-inline(.+)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$1$2') + value;
      // (min|max)?(width|height|inline-size|block-size)
  
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        // stretch, max-content, min-content, fill-available
        if ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.strlen)(value) - 1 - length > 6) switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            // -
            if ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 4) !== 45) break;
          // (f)ill-available, (f)it-content
  
          case 102:
            return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$2-$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.MOZ + ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
          // (s)tretch
  
          case 115:
            return ~(0,stylis__WEBPACK_IMPORTED_MODULE_4__.indexof)(value, 'stretch') ? prefix((0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, 'stretch', 'fill-available'), length) + value : value;
        }
        break;
      // position: sticky
  
      case 4949:
        // (s)ticky?
        if ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 1) !== 115) break;
      // display: (flex|inline-flex)
  
      case 6444:
        switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, (0,stylis__WEBPACK_IMPORTED_MODULE_4__.strlen)(value) - 3 - (~(0,stylis__WEBPACK_IMPORTED_MODULE_4__.indexof)(value, '!important') && 10))) {
          // stic(k)y
          case 107:
            return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, ':', ':' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT) + value;
          // (inline-)?fl(e)x
  
          case 101:
            return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$2$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + '$2box$3') + value;
        }
  
        break;
      // writing-mode
  
      case 5936:
        switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 11)) {
          // vertical-l(r)
          case 114:
            return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
          // vertical-r(l)
  
          case 108:
            return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
          // horizontal(-)tb
  
          case 45:
            return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
        }
  
        return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + value + value;
    }
  
    return value;
  }
  
  var prefixer = function prefixer(element, index, children, callback) {
    if (element.length > -1) if (!element["return"]) switch (element.type) {
      case stylis__WEBPACK_IMPORTED_MODULE_5__.DECLARATION:
        element["return"] = prefix(element.value, element.length);
        break;
  
      case stylis__WEBPACK_IMPORTED_MODULE_5__.KEYFRAMES:
        return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
          value: (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(element.value, '@', '@' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT)
        })], callback);
  
      case stylis__WEBPACK_IMPORTED_MODULE_5__.RULESET:
        if (element.length) return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.combine)(element.props, function (value) {
          switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.match)(value, /(::plac\w+|:read-\w+)/)) {
            // :read-(only|write)
            case ':read-only':
            case ':read-write':
              return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
                props: [(0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /:(read-\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_5__.MOZ + '$1')]
              })], callback);
            // :placeholder
  
            case '::placeholder':
              return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
                props: [(0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'input-$1')]
              }), (0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
                props: [(0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_5__.MOZ + '$1')]
              }), (0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
                props: [(0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /:(plac\w+)/, stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'input-$1')]
              })], callback);
          }
  
          return '';
        });
    }
  };
  
  var defaultStylisPlugins = [prefixer];
  
  var createCache = function createCache(options) {
    var key = options.key;
  
    if ( true && !key) {
      throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
    }
  
    if ( key === 'css') {
      var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
      // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
      // note this very very intentionally targets all style elements regardless of the key to ensure
      // that creating a cache works inside of render of a React component
  
      Array.prototype.forEach.call(ssrStyles, function (node) {
        // we want to only move elements which have a space in the data-emotion attribute value
        // because that indicates that it is an Emotion 11 server-side rendered style elements
        // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
        // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
        // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
        // will not result in the Emotion 10 styles being destroyed
        var dataEmotionAttribute = node.getAttribute('data-emotion');
  
        if (dataEmotionAttribute.indexOf(' ') === -1) {
          return;
        }
        document.head.appendChild(node);
        node.setAttribute('data-s', '');
      });
    }
  
    var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  
    if (true) {
      // $FlowFixMe
      if (/[^a-z-]/.test(key)) {
        throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
      }
    }
  
    var inserted = {};
    var container;
    var nodesToHydrate = [];
  
    {
      container = options.container || document.head;
      Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
        var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe
  
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
  
        nodesToHydrate.push(node);
      });
    }
  
    var _insert;
  
    var omnipresentPlugins = [compat, removeLabel];
  
    if (true) {
      omnipresentPlugins.push(createUnsafeSelectorsAlarm({
        get compat() {
          return cache.compat;
        }
  
      }), incorrectImportAlarm);
    }
  
    {
      var currentSheet;
      var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_6__.stringify,  true ? function (element) {
        if (!element.root) {
          if (element["return"]) {
            currentSheet.insert(element["return"]);
          } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_5__.COMMENT) {
            // insert empty rule in non-production environments
            // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
            currentSheet.insert(element.value + "{}");
          }
        }
      } : 0];
      var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_7__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
  
      var stylis = function stylis(styles) {
        return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_8__.compile)(styles), serializer);
      };
  
      _insert = function insert(selector, serialized, sheet, shouldCache) {
        currentSheet = sheet;
  
        if ( true && serialized.map !== undefined) {
          currentSheet = {
            insert: function insert(rule) {
              sheet.insert(rule + serialized.map);
            }
          };
        }
  
        stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
  
        if (shouldCache) {
          cache.inserted[serialized.name] = true;
        }
      };
    }
  
    var cache = {
      key: key,
      sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
        key: key,
        container: container,
        nonce: options.nonce,
        speedy: options.speedy,
        prepend: options.prepend,
        insertionPoint: options.insertionPoint
      }),
      nonce: options.nonce,
      inserted: inserted,
      registered: {},
      insert: _insert
    };
    cache.sheet.hydrate(nodesToHydrate);
    return cache;
  };
  
  /* harmony default export */ __webpack_exports__["default"] = (createCache);
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js":
  /*!*************************************************************!*\
    !*** ./node_modules/@emotion/hash/dist/emotion-hash.esm.js ***!
    \*************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* eslint-disable */
  // Inspired by https://github.com/garycourt/murmurhash-js
  // Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
  function murmur2(str) {
    // 'm' and 'r' are mixing constants generated offline.
    // They're not really 'magic', they just happen to work well.
    // const m = 0x5bd1e995;
    // const r = 24;
    // Initialize the hash
    var h = 0; // Mix 4 bytes at a time into the hash
  
    var k,
        i = 0,
        len = str.length;
  
    for (; len >= 4; ++i, len -= 4) {
      k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
      k =
      /* Math.imul(k, m): */
      (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
      k ^=
      /* k >>> r: */
      k >>> 24;
      h =
      /* Math.imul(k, m): */
      (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    } // Handle the last few bytes of the input array
  
  
    switch (len) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
  
      case 2:
        h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
  
      case 1:
        h ^= str.charCodeAt(i) & 0xff;
        h =
        /* Math.imul(h, m): */
        (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    } // Do a few final mixes of the hash to ensure the last few
    // bytes are well-incorporated.
  
  
    h ^= h >>> 13;
    h =
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
    return ((h ^ h >>> 15) >>> 0).toString(36);
  }
  
  /* harmony default export */ __webpack_exports__["default"] = (murmur2);
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
    \*******************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  function memoize(fn) {
    var cache = Object.create(null);
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  }
  
  /* harmony default export */ __webpack_exports__["default"] = (memoize);
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js":
  /*!*****************************************************************************************************!*\
    !*** ./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js ***!
    \*****************************************************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
  /* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__);
  
  
  // this file isolates this package that is not tree-shakeable
  // and if this module doesn't actually contain any logic of its own
  // then Rollup just use 'hoist-non-react-statics' directly in other chunks
  
  var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
    return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default()(targetComponent, sourceComponent);
  });
  
  /* harmony default export */ __webpack_exports__["default"] = (hoistNonReactStatics);
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js":
  /*!**********************************************************************************!*\
    !*** ./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js ***!
    \**********************************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "C": function() { return /* binding */ CacheProvider; },
  /* harmony export */   "E": function() { return /* binding */ Emotion; },
  /* harmony export */   "T": function() { return /* binding */ ThemeContext; },
  /* harmony export */   "_": function() { return /* binding */ __unsafe_useEmotionCache; },
  /* harmony export */   "a": function() { return /* binding */ ThemeProvider; },
  /* harmony export */   "b": function() { return /* binding */ withTheme; },
  /* harmony export */   "c": function() { return /* binding */ createEmotionProps; },
  /* harmony export */   "h": function() { return /* binding */ hasOwnProperty; },
  /* harmony export */   "u": function() { return /* binding */ useTheme; },
  /* harmony export */   "w": function() { return /* binding */ withEmotionCache; }
  /* harmony export */ });
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
  /* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
  /* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
  /* harmony import */ var _isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js");
  /* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
  /* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
  /* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");
  
  
  
  
  
  
  
  
  
  var hasOwnProperty = {}.hasOwnProperty;
  
  var EmotionCacheContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)( // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== 'undefined' ? /* #__PURE__ */(0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({
    key: 'css'
  }) : null);
  
  if (true) {
    EmotionCacheContext.displayName = 'EmotionCacheContext';
  }
  
  var CacheProvider = EmotionCacheContext.Provider;
  var __unsafe_useEmotionCache = function useEmotionCache() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
  };
  
  var withEmotionCache = function withEmotionCache(func) {
    // $FlowFixMe
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
      // the cache will never be null in the browser
      var cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
      return func(props, cache, ref);
    });
  };
  
  var ThemeContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
  
  if (true) {
    ThemeContext.displayName = 'EmotionThemeContext';
  }
  
  var useTheme = function useTheme() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
  };
  
  var getTheme = function getTheme(outerTheme, theme) {
    if (typeof theme === 'function') {
      var mergedTheme = theme(outerTheme);
  
      if ( true && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
        throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
      }
  
      return mergedTheme;
    }
  
    if ( true && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
      throw new Error('[ThemeProvider] Please make your theme prop a plain object');
    }
  
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, outerTheme, theme);
  };
  
  var createCacheWithTheme = /* #__PURE__ */(0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (outerTheme) {
    return (0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (theme) {
      return getTheme(outerTheme, theme);
    });
  });
  var ThemeProvider = function ThemeProvider(props) {
    var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
  
    if (props.theme !== theme) {
      theme = createCacheWithTheme(theme)(props.theme);
    }
  
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ThemeContext.Provider, {
      value: theme
    }, props.children);
  };
  function withTheme(Component) {
    var componentName = Component.displayName || Component.name || 'Component';
  
    var render = function render(props, ref) {
      var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
      return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
        theme: theme,
        ref: ref
      }, props));
    }; // $FlowFixMe
  
  
    var WithTheme = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(render);
    WithTheme.displayName = "WithTheme(" + componentName + ")";
    return (0,_isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__["default"])(WithTheme, Component);
  }
  
  var getLastPart = function getLastPart(functionName) {
    // The match may be something like 'Object.createEmotionProps' or
    // 'Loader.prototype.render'
    var parts = functionName.split('.');
    return parts[parts.length - 1];
  };
  
  var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine(line) {
    // V8
    var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
    if (match) return getLastPart(match[1]); // Safari / Firefox
  
    match = /^([A-Za-z0-9$.]+)@/.exec(line);
    if (match) return getLastPart(match[1]);
    return undefined;
  };
  
  var internalReactFunctionNames = /* #__PURE__ */new Set(['renderWithHooks', 'processChild', 'finishClassComponent', 'renderToString']); // These identifiers come from error stacks, so they have to be valid JS
  // identifiers, thus we only need to replace what is a valid character for JS,
  // but not for CSS.
  
  var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
    return identifier.replace(/\$/g, '-');
  };
  
  var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
    if (!stackTrace) return undefined;
    var lines = stackTrace.split('\n');
  
    for (var i = 0; i < lines.length; i++) {
      var functionName = getFunctionNameFromStackTraceLine(lines[i]); // The first line of V8 stack traces is just "Error"
  
      if (!functionName) continue; // If we reach one of these, we have gone too far and should quit
  
      if (internalReactFunctionNames.has(functionName)) break; // The component name is the first function in the stack that starts with an
      // uppercase letter
  
      if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
    }
  
    return undefined;
  };
  
  var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
  var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
  var createEmotionProps = function createEmotionProps(type, props) {
    if ( true && typeof props.css === 'string' && // check if there is a css declaration
    props.css.indexOf(':') !== -1) {
      throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
    }
  
    var newProps = {};
  
    for (var key in props) {
      if (hasOwnProperty.call(props, key)) {
        newProps[key] = props[key];
      }
    }
  
    newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when
    // the label hasn't already been computed
  
    if ( true && !!props.css && (typeof props.css !== 'object' || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)) {
      var label = getLabelFromStackTrace(new Error().stack);
      if (label) newProps[labelPropName] = label;
    }
  
    return newProps;
  };
  
  var Insertion = function Insertion(_ref) {
    var cache = _ref.cache,
        serialized = _ref.serialized,
        isStringTag = _ref.isStringTag;
    (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.registerStyles)(cache, serialized, isStringTag);
    var rules = (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_6__.useInsertionEffectAlwaysWithSyncFallback)(function () {
      return (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.insertStyles)(cache, serialized, isStringTag);
    });
  
    return null;
  };
  
  var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
    var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
    // not passing the registered cache to serializeStyles because it would
    // make certain babel optimisations not possible
  
    if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
      cssProp = cache.registered[cssProp];
    }
  
    var WrappedComponent = props[typePropName];
    var registeredStyles = [cssProp];
    var className = '';
  
    if (typeof props.className === 'string') {
      className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
    } else if (props.className != null) {
      className = props.className + " ";
    }
  
    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)(registeredStyles, undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext));
  
    if ( true && serialized.name.indexOf('-') === -1) {
      var labelFromStack = props[labelPropName];
  
      if (labelFromStack) {
        serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)([serialized, 'label:' + labelFromStack + ';']);
      }
    }
  
    className += cache.key + "-" + serialized.name;
    var newProps = {};
  
    for (var key in props) {
      if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
        newProps[key] = props[key];
      }
    }
  
    newProps.ref = ref;
    newProps.className = className;
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
      cache: cache,
      serialized: serialized,
      isStringTag: typeof WrappedComponent === 'string'
    }), /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, newProps));
  });
  
  if (true) {
    Emotion.displayName = 'EmotionCssPropInternal';
  }
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js":
  /*!***********************************************************************!*\
    !*** ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js ***!
    \***********************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "CacheProvider": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.C; },
  /* harmony export */   "ClassNames": function() { return /* binding */ ClassNames; },
  /* harmony export */   "Global": function() { return /* binding */ Global; },
  /* harmony export */   "ThemeContext": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T; },
  /* harmony export */   "ThemeProvider": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.a; },
  /* harmony export */   "__unsafe_useEmotionCache": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__._; },
  /* harmony export */   "createElement": function() { return /* binding */ jsx; },
  /* harmony export */   "css": function() { return /* binding */ css; },
  /* harmony export */   "jsx": function() { return /* binding */ jsx; },
  /* harmony export */   "keyframes": function() { return /* binding */ keyframes; },
  /* harmony export */   "useTheme": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.u; },
  /* harmony export */   "withEmotionCache": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w; },
  /* harmony export */   "withTheme": function() { return /* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.b; }
  /* harmony export */ });
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
  /* harmony import */ var _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emotion-element-6a883da9.browser.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js");
  /* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
  /* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
  /* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
  /* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);
  /* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
  /* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
  /* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");
  
  
  
  
  
  
  
  
  
  
  
  
  var pkg = {
    name: "@emotion/react",
    version: "11.10.5",
    main: "dist/emotion-react.cjs.js",
    module: "dist/emotion-react.esm.js",
    browser: {
      "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
    },
    exports: {
      ".": {
        module: {
          worker: "./dist/emotion-react.worker.esm.js",
          browser: "./dist/emotion-react.browser.esm.js",
          "default": "./dist/emotion-react.esm.js"
        },
        "default": "./dist/emotion-react.cjs.js"
      },
      "./jsx-runtime": {
        module: {
          worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
          browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
          "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
        },
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
      },
      "./_isolated-hnrs": {
        module: {
          worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
          browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
          "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
        },
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
      },
      "./jsx-dev-runtime": {
        module: {
          worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
          browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
          "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
        },
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
      },
      "./package.json": "./package.json",
      "./types/css-prop": "./types/css-prop.d.ts",
      "./macro": "./macro.js"
    },
    types: "types/index.d.ts",
    files: [
      "src",
      "dist",
      "jsx-runtime",
      "jsx-dev-runtime",
      "_isolated-hnrs",
      "types/*.d.ts",
      "macro.js",
      "macro.d.ts",
      "macro.js.flow"
    ],
    sideEffects: false,
    author: "Emotion Contributors",
    license: "MIT",
    scripts: {
      "test:typescript": "dtslint types"
    },
    dependencies: {
      "@babel/runtime": "^7.18.3",
      "@emotion/babel-plugin": "^11.10.5",
      "@emotion/cache": "^11.10.5",
      "@emotion/serialize": "^1.1.1",
      "@emotion/use-insertion-effect-with-fallbacks": "^1.0.0",
      "@emotion/utils": "^1.2.0",
      "@emotion/weak-memoize": "^0.3.0",
      "hoist-non-react-statics": "^3.3.1"
    },
    peerDependencies: {
      "@babel/core": "^7.0.0",
      react: ">=16.8.0"
    },
    peerDependenciesMeta: {
      "@babel/core": {
        optional: true
      },
      "@types/react": {
        optional: true
      }
    },
    devDependencies: {
      "@babel/core": "^7.18.5",
      "@definitelytyped/dtslint": "0.0.112",
      "@emotion/css": "11.10.5",
      "@emotion/css-prettifier": "1.1.1",
      "@emotion/server": "11.10.0",
      "@emotion/styled": "11.10.5",
      "html-tag-names": "^1.1.2",
      react: "16.14.0",
      "svg-tag-names": "^1.1.1",
      typescript: "^4.5.5"
    },
    repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
    publishConfig: {
      access: "public"
    },
    "umd:main": "dist/emotion-react.umd.min.js",
    preconstruct: {
      entrypoints: [
        "./index.js",
        "./jsx-runtime.js",
        "./jsx-dev-runtime.js",
        "./_isolated-hnrs.js"
      ],
      umdName: "emotionReact",
      exports: {
        envConditions: [
          "browser",
          "worker"
        ],
        extra: {
          "./types/css-prop": "./types/css-prop.d.ts",
          "./macro": "./macro.js"
        }
      }
    }
  };
  
  var jsx = function jsx(type, props) {
    var args = arguments;
  
    if (props == null || !_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.h.call(props, 'css')) {
      // $FlowFixMe
      return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(undefined, args);
    }
  
    var argsLength = args.length;
    var createElementArgArray = new Array(argsLength);
    createElementArgArray[0] = _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.E;
    createElementArgArray[1] = (0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.c)(type, props);
  
    for (var i = 2; i < argsLength; i++) {
      createElementArgArray[i] = args[i];
    } // $FlowFixMe
  
  
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(null, createElementArgArray);
  };
  
  var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
  // initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
  // initial client-side render from SSR, use place of hydrating tag
  
  var Global = /* #__PURE__ */(0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
    if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
    // probably using the custom createElement which
    // means it will be turned into a className prop
    // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
    props.className || props.css)) {
      console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
      warnedAboutCssPropForGlobal = true;
    }
  
    var styles = props.styles;
    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)([styles], undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T));
    // but it is based on a constant that will never change at runtime
    // it's effectively like having two implementations and switching them out
    // so it's not actually breaking anything
  
  
    var sheetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__.useInsertionEffectWithLayoutFallback)(function () {
      var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675
  
      var sheet = new cache.sheet.constructor({
        key: key,
        nonce: cache.sheet.nonce,
        container: cache.sheet.container,
        speedy: cache.sheet.isSpeedy
      });
      var rehydrating = false; // $FlowFixMe
  
      var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");
  
      if (cache.sheet.tags.length) {
        sheet.before = cache.sheet.tags[0];
      }
  
      if (node !== null) {
        rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s
  
        node.setAttribute('data-emotion', key);
        sheet.hydrate([node]);
      }
  
      sheetRef.current = [sheet, rehydrating];
      return function () {
        sheet.flush();
      };
    }, [cache]);
    (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__.useInsertionEffectWithLayoutFallback)(function () {
      var sheetRefCurrent = sheetRef.current;
      var sheet = sheetRefCurrent[0],
          rehydrating = sheetRefCurrent[1];
  
      if (rehydrating) {
        sheetRefCurrent[1] = false;
        return;
      }
  
      if (serialized.next !== undefined) {
        // insert keyframes
        (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized.next, true);
      }
  
      if (sheet.tags.length) {
        // if this doesn't exist then it will be null so the style element will be appended
        var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
        sheet.before = element;
        sheet.flush();
      }
  
      cache.insert("", serialized, sheet, false);
    }, [cache, serialized.name]);
    return null;
  });
  
  if (true) {
    Global.displayName = 'EmotionGlobal';
  }
  
  function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
  
    return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args);
  }
  
  var keyframes = function keyframes() {
    var insertable = css.apply(void 0, arguments);
    var name = "animation-" + insertable.name; // $FlowFixMe
  
    return {
      name: name,
      styles: "@keyframes " + name + "{" + insertable.styles + "}",
      anim: 1,
      toString: function toString() {
        return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
      }
    };
  };
  
  var classnames = function classnames(args) {
    var len = args.length;
    var i = 0;
    var cls = '';
  
    for (; i < len; i++) {
      var arg = args[i];
      if (arg == null) continue;
      var toAdd = void 0;
  
      switch (typeof arg) {
        case 'boolean':
          break;
  
        case 'object':
          {
            if (Array.isArray(arg)) {
              toAdd = classnames(arg);
            } else {
              if ( true && arg.styles !== undefined && arg.name !== undefined) {
                console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
              }
  
              toAdd = '';
  
              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += ' ');
                  toAdd += k;
                }
              }
            }
  
            break;
          }
  
        default:
          {
            toAdd = arg;
          }
      }
  
      if (toAdd) {
        cls && (cls += ' ');
        cls += toAdd;
      }
    }
  
    return cls;
  };
  
  function merge(registered, css, className) {
    var registeredStyles = [];
    var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.getRegisteredStyles)(registered, registeredStyles, className);
  
    if (registeredStyles.length < 2) {
      return className;
    }
  
    return rawClassName + css(registeredStyles);
  }
  
  var Insertion = function Insertion(_ref) {
    var cache = _ref.cache,
        serializedArr = _ref.serializedArr;
    var rules = (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__.useInsertionEffectAlwaysWithSyncFallback)(function () {
  
      for (var i = 0; i < serializedArr.length; i++) {
        var res = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serializedArr[i], false);
      }
    });
  
    return null;
  };
  
  var ClassNames = /* #__PURE__ */(0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
    var hasRendered = false;
    var serializedArr = [];
  
    var css = function css() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('css can only be used during render');
      }
  
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args, cache.registered);
      serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`
  
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.registerStyles)(cache, serialized, false);
      return cache.key + "-" + serialized.name;
    };
  
    var cx = function cx() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('cx can only be used during render');
      }
  
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
  
      return merge(cache.registered, css, classnames(args));
    };
  
    var content = {
      css: css,
      cx: cx,
      theme: (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T)
    };
    var ele = props.children(content);
    hasRendered = true;
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
      cache: cache,
      serializedArr: serializedArr
    }), ele);
  });
  
  if (true) {
    ClassNames.displayName = 'EmotionClassNames';
  }
  
  if (true) {
    var isBrowser = "object" !== 'undefined'; // #1727, #2905 for some reason Jest and Vitest evaluate modules twice if some consuming module gets mocked
  
    var isTestEnv = typeof jest !== 'undefined' || typeof vi !== 'undefined';
  
    if (isBrowser && !isTestEnv) {
      // globalThis has wide browser support - https://caniuse.com/?search=globalThis, Node.js 12 and later
      var globalContext = // $FlowIgnore
      typeof globalThis !== 'undefined' ? globalThis // eslint-disable-line no-undef
      : isBrowser ? window : __webpack_require__.g;
      var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";
  
      if (globalContext[globalKey]) {
        console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
      }
  
      globalContext[globalKey] = true;
    }
  }
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js":
  /*!*******************************************************************************!*\
    !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js ***!
    \*******************************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "serializeStyles": function() { return /* binding */ serializeStyles; }
  /* harmony export */ });
  /* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js");
  /* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
  /* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");
  
  
  
  
  var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
  var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
  var hyphenateRegex = /[A-Z]|^ms/g;
  var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
  
  var isCustomProperty = function isCustomProperty(property) {
    return property.charCodeAt(1) === 45;
  };
  
  var isProcessableValue = function isProcessableValue(value) {
    return value != null && typeof value !== 'boolean';
  };
  
  var processStyleName = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function (styleName) {
    return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
  });
  
  var processStyleValue = function processStyleValue(key, value) {
    switch (key) {
      case 'animation':
      case 'animationName':
        {
          if (typeof value === 'string') {
            return value.replace(animationRegex, function (match, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
    }
  
    if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
      return value + 'px';
    }
  
    return value;
  };
  
  if (true) {
    var contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
    var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
    var oldProcessStyleValue = processStyleValue;
    var msPattern = /^-ms-/;
    var hyphenPattern = /-(.)/g;
    var hyphenatedCache = {};
  
    processStyleValue = function processStyleValue(key, value) {
      if (key === 'content') {
        if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
          throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
        }
      }
  
      var processed = oldProcessStyleValue(key, value);
  
      if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
        hyphenatedCache[key] = true;
        console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
          return _char.toUpperCase();
        }) + "?");
      }
  
      return processed;
    };
  }
  
  var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';
  
  function handleInterpolation(mergedProps, registered, interpolation) {
    if (interpolation == null) {
      return '';
    }
  
    if (interpolation.__emotion_styles !== undefined) {
      if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
        throw new Error(noComponentSelectorMessage);
      }
  
      return interpolation;
    }
  
    switch (typeof interpolation) {
      case 'boolean':
        {
          return '';
        }
  
      case 'object':
        {
          if (interpolation.anim === 1) {
            cursor = {
              name: interpolation.name,
              styles: interpolation.styles,
              next: cursor
            };
            return interpolation.name;
          }
  
          if (interpolation.styles !== undefined) {
            var next = interpolation.next;
  
            if (next !== undefined) {
              // not the most efficient thing ever but this is a pretty rare case
              // and there will be very few iterations of this generally
              while (next !== undefined) {
                cursor = {
                  name: next.name,
                  styles: next.styles,
                  next: cursor
                };
                next = next.next;
              }
            }
  
            var styles = interpolation.styles + ";";
  
            if ( true && interpolation.map !== undefined) {
              styles += interpolation.map;
            }
  
            return styles;
          }
  
          return createStringFromObject(mergedProps, registered, interpolation);
        }
  
      case 'function':
        {
          if (mergedProps !== undefined) {
            var previousCursor = cursor;
            var result = interpolation(mergedProps);
            cursor = previousCursor;
            return handleInterpolation(mergedProps, registered, result);
          } else if (true) {
            console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
          }
  
          break;
        }
  
      case 'string':
        if (true) {
          var matched = [];
          var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
            var fakeVarName = "animation" + matched.length;
            matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
            return "${" + fakeVarName + "}";
          });
  
          if (matched.length) {
            console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
          }
        }
  
        break;
    } // finalize string values (regular strings and functions interpolated into css calls)
  
  
    if (registered == null) {
      return interpolation;
    }
  
    var cached = registered[interpolation];
    return cached !== undefined ? cached : interpolation;
  }
  
  function createStringFromObject(mergedProps, registered, obj) {
    var string = '';
  
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
      }
    } else {
      for (var _key in obj) {
        var value = obj[_key];
  
        if (typeof value !== 'object') {
          if (registered != null && registered[value] !== undefined) {
            string += _key + "{" + registered[value] + "}";
          } else if (isProcessableValue(value)) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
          }
        } else {
          if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
            throw new Error(noComponentSelectorMessage);
          }
  
          if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue(value[_i])) {
                string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation(mergedProps, registered, value);
  
            switch (_key) {
              case 'animation':
              case 'animationName':
                {
                  string += processStyleName(_key) + ":" + interpolated + ";";
                  break;
                }
  
              default:
                {
                  if ( true && _key === 'undefined') {
                    console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                  }
  
                  string += _key + "{" + interpolated + "}";
                }
            }
          }
        }
      }
    }
  
    return string;
  }
  
  var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
  var sourceMapPattern;
  
  if (true) {
    sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
  } // this is the cursor for keyframes
  // keyframes are stored on the SerializedStyles object as a linked list
  
  
  var cursor;
  var serializeStyles = function serializeStyles(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
      return args[0];
    }
  
    var stringMode = true;
    var styles = '';
    cursor = undefined;
    var strings = args[0];
  
    if (strings == null || strings.raw === undefined) {
      stringMode = false;
      styles += handleInterpolation(mergedProps, registered, strings);
    } else {
      if ( true && strings[0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
  
      styles += strings[0];
    } // we start at 1 since we've already handled the first arg
  
  
    for (var i = 1; i < args.length; i++) {
      styles += handleInterpolation(mergedProps, registered, args[i]);
  
      if (stringMode) {
        if ( true && strings[i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
  
        styles += strings[i];
      }
    }
  
    var sourceMap;
  
    if (true) {
      styles = styles.replace(sourceMapPattern, function (match) {
        sourceMap = match;
        return '';
      });
    } // using a global regex with .exec is stateful so lastIndex has to be reset each time
  
  
    labelPattern.lastIndex = 0;
    var identifierName = '';
    var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5
  
    while ((match = labelPattern.exec(styles)) !== null) {
      identifierName += '-' + // $FlowFixMe we know it's not null
      match[1];
    }
  
    var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles) + identifierName;
  
    if (true) {
      // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
      return {
        name: name,
        styles: styles,
        map: sourceMap,
        next: cursor,
        toString: function toString() {
          return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
        }
      };
    }
  
    return {
      name: name,
      styles: styles,
      next: cursor
    };
  };
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js":
  /*!***********************************************************************!*\
    !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js ***!
    \***********************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "StyleSheet": function() { return /* binding */ StyleSheet; }
  /* harmony export */ });
  /*
  
  Based off glamor's StyleSheet, thanks Sunil ❤️
  
  high performance StyleSheet for css-in-js systems
  
  - uses multiple style tags behind the scenes for millions of rules
  - uses `insertRule` for appending in production for *much* faster performance
  
  // usage
  
  import { StyleSheet } from '@emotion/sheet'
  
  let styleSheet = new StyleSheet({ key: '', container: document.head })
  
  styleSheet.insert('#box { border: 1px solid red; }')
  - appends a css rule into the stylesheet
  
  styleSheet.flush()
  - empties the stylesheet of all its contents
  
  */
  // $FlowFixMe
  function sheetForTag(tag) {
    if (tag.sheet) {
      // $FlowFixMe
      return tag.sheet;
    } // this weirdness brought to you by firefox
  
    /* istanbul ignore next */
  
  
    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        // $FlowFixMe
        return document.styleSheets[i];
      }
    }
  }
  
  function createStyleElement(options) {
    var tag = document.createElement('style');
    tag.setAttribute('data-emotion', options.key);
  
    if (options.nonce !== undefined) {
      tag.setAttribute('nonce', options.nonce);
    }
  
    tag.appendChild(document.createTextNode(''));
    tag.setAttribute('data-s', '');
    return tag;
  }
  
  var StyleSheet = /*#__PURE__*/function () {
    // Using Node instead of HTMLElement since container may be a ShadowRoot
    function StyleSheet(options) {
      var _this = this;
  
      this._insertTag = function (tag) {
        var before;
  
        if (_this.tags.length === 0) {
          if (_this.insertionPoint) {
            before = _this.insertionPoint.nextSibling;
          } else if (_this.prepend) {
            before = _this.container.firstChild;
          } else {
            before = _this.before;
          }
        } else {
          before = _this.tags[_this.tags.length - 1].nextSibling;
        }
  
        _this.container.insertBefore(tag, before);
  
        _this.tags.push(tag);
      };
  
      this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
      this.tags = [];
      this.ctr = 0;
      this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets
  
      this.key = options.key;
      this.container = options.container;
      this.prepend = options.prepend;
      this.insertionPoint = options.insertionPoint;
      this.before = null;
    }
  
    var _proto = StyleSheet.prototype;
  
    _proto.hydrate = function hydrate(nodes) {
      nodes.forEach(this._insertTag);
    };
  
    _proto.insert = function insert(rule) {
      // the max length is how many rules we have per style tag, it's 65000 in speedy mode
      // it's 1 in dev because we insert source maps that map a single rule to a location
      // and you can only have one source map per style tag
      if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
        this._insertTag(createStyleElement(this));
      }
  
      var tag = this.tags[this.tags.length - 1];
  
      if (true) {
        var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
  
        if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
          // this would only cause problem in speedy mode
          // but we don't want enabling speedy to affect the observable behavior
          // so we report this error at all times
          console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
        }
        this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
      }
  
      if (this.isSpeedy) {
        var sheet = sheetForTag(tag);
  
        try {
          // this is the ultrafast version, works across browsers
          // the big drawback is that the css won't be editable in devtools
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
          if ( true && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
            console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
          }
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }
  
      this.ctr++;
    };
  
    _proto.flush = function flush() {
      // $FlowFixMe
      this.tags.forEach(function (tag) {
        return tag.parentNode && tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
  
      if (true) {
        this._alreadyInsertedOrderInsensitiveRule = false;
      }
    };
  
    return StyleSheet;
  }();
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js ***!
    \*********************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };
  
  /* harmony default export */ __webpack_exports__["default"] = (unitlessKeys);
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js":
  /*!***********************************************************************************************************************************!*\
    !*** ./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js ***!
    \***********************************************************************************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "useInsertionEffectAlwaysWithSyncFallback": function() { return /* binding */ useInsertionEffectAlwaysWithSyncFallback; },
  /* harmony export */   "useInsertionEffectWithLayoutFallback": function() { return /* binding */ useInsertionEffectWithLayoutFallback; }
  /* harmony export */ });
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
  
  
  
  var syncFallback = function syncFallback(create) {
    return create();
  };
  
  var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] : false;
  var useInsertionEffectAlwaysWithSyncFallback =  useInsertionEffect || syncFallback;
  var useInsertionEffectWithLayoutFallback = useInsertionEffect || react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
  /*!***********************************************************************!*\
    !*** ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
    \***********************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "getRegisteredStyles": function() { return /* binding */ getRegisteredStyles; },
  /* harmony export */   "insertStyles": function() { return /* binding */ insertStyles; },
  /* harmony export */   "registerStyles": function() { return /* binding */ registerStyles; }
  /* harmony export */ });
  var isBrowser = "object" !== 'undefined';
  function getRegisteredStyles(registered, registeredStyles, classNames) {
    var rawClassName = '';
    classNames.split(' ').forEach(function (className) {
      if (registered[className] !== undefined) {
        registeredStyles.push(registered[className] + ";");
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }
  var registerStyles = function registerStyles(cache, serialized, isStringTag) {
    var className = cache.key + "-" + serialized.name;
  
    if ( // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false || // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser === false ) && cache.registered[className] === undefined) {
      cache.registered[className] = serialized.styles;
    }
  };
  var insertStyles = function insertStyles(cache, serialized, isStringTag) {
    registerStyles(cache, serialized, isStringTag);
    var className = cache.key + "-" + serialized.name;
  
    if (cache.inserted[serialized.name] === undefined) {
      var current = serialized;
  
      do {
        var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);
  
        current = current.next;
      } while (current !== undefined);
    }
  };
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js":
  /*!*****************************************************************************!*\
    !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
    \*****************************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  var weakMemoize = function weakMemoize(func) {
    // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
    var cache = new WeakMap();
    return function (arg) {
      if (cache.has(arg)) {
        // $FlowFixMe
        return cache.get(arg);
      }
  
      var ret = func(arg);
      cache.set(arg, ret);
      return ret;
    };
  };
  
  /* harmony default export */ __webpack_exports__["default"] = (weakMemoize);
  
  
  /***/ }),
  
  /***/ "./src/asyncPostsMultiSelect.js":
  /*!**************************************!*\
    !*** ./src/asyncPostsMultiSelect.js ***!
    \**************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "NewsmaticPostsMultiselect": function() { return /* binding */ NewsmaticPostsMultiselect; }
  /* harmony export */ });
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var react_select_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select/async */ "./node_modules/react-select/async/dist/react-select-async.esm.js");
  
  const {
    useState,
    useEffect
  } = wp.element;
  const {
    customize
  } = wp;
  const {
    __
  } = wp.i18n;
  const {
    escapeHTML
  } = wp.escapeHtml;
  
  var ajaxurl = customizerControlsObject.ajaxUrl,
    _wpnonce = customizerControlsObject._wpnonce;
  
  // Multiselect posts control
  const NewsmaticPostsMultiselect = props => {
    const [multiselect, setMultiselect] = useState(JSON.parse(props.value));
    const {
      choices
    } = customize.settings.controls[props.setting];
    useEffect(() => {
      customize.value(props.setting)(JSON.stringify(multiselect));
    }, [multiselect]);
    const getPosts = async key => {
      let postsArray = [];
      await jQuery.ajax({
        method: 'post',
        url: ajaxurl,
        data: {
          'action': 'newsmatic_get_multicheckbox_posts_simple_array',
          '_wpnonce': _wpnonce,
          'search': key
        },
        success: function (response) {
          if (response.data) {
            postsArray = response.data;
          }
        }
      });
      return postsArray;
    };
    const promiseOptions = inputValue => new Promise(resolve => {
      setTimeout(() => {
        resolve(getPosts(inputValue));
      }, 1000);
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, choices && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_select_async__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isMulti: true,
      inputId: "newsmatic-search-in-select",
      isSearchable: true,
      heading: customize.settings.controls[props.setting].label,
      placeholder: __(escapeHTML('Type to search . . '), 'newsmatic'),
      value: multiselect,
      defaultOptions: choices,
      loadOptions: promiseOptions,
      onChange: newMultiselect => setMultiselect(newMultiselect)
    }));
  };
  
  /***/ }),
  
  /***/ "./src/borderComponent.js":
  /*!********************************!*\
    !*** ./src/borderComponent.js ***!
    \********************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "NewsmaticBorder": function() { return /* binding */ NewsmaticBorder; }
  /* harmony export */ });
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
  /* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
  /* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/index.es.js");
  
  const {
    ColorPicker,
    ColorIndicator,
    Dropdown,
    SelectControl
  } = wp.components;
  
  const {
    useState,
    useEffect
  } = wp.element;
  const {
    escapeHTML
  } = wp.escapeHtml;
  const {
    __
  } = wp.i18n;
  const {
    customize
  } = wp;
  
  const NewsmaticBorder = props => {
    const [border, setBorder] = useState(props.value);
    const [type, setType] = useState(border.type);
    const [color, setColor] = useState(border.color);
    const [width, setWidth] = useState(border.width);
    const types = [{
      label: __(escapeHTML("None"), "newsmatic"),
      value: 'none'
    }, {
      label: __(escapeHTML("Dotted"), "newsmatic"),
      value: 'dotted'
    }, {
      label: __(escapeHTML("Dashed"), "newsmatic"),
      value: 'dashed'
    }, {
      label: __(escapeHTML("Solid"), "newsmatic"),
      value: 'solid'
    }];
    useEffect(() => {
      let newBorder = {
        type: type,
        color: color,
        width: width
      };
      setBorder(newBorder);
      customize.value(props.setting)(newBorder);
    }, [type, color, width]);
    function getBackground(color) {
      if (color == null) return;
      if (color.includes('preset')) {
        return 'var(' + color + ')';
      } else {
        return color;
      }
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "customize-control-title"
    }, customize.settings.controls[props.setting].label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-inner"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      value: type,
      options: types,
      onChange: newType => setType(newType)
    }), type != 'none' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-end'
      },
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
          className: color == null && "null-color",
          "data-tip": __(escapeHTML('initial'), 'newsmatic'),
          colorValue: getBackground(color),
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "preset-colors"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
        className: "preset-colors-inner"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-1' && 'active',
        "data-tip": __(escapeHTML('color 1'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-1)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-1')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-2' && 'active',
        "data-tip": __(escapeHTML('color 2'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-2)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-2')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-3' && 'active',
        "data-tip": __(escapeHTML('color 3'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-3)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-3')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-4' && 'active',
        "data-tip": __(escapeHTML('color 4'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-4)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-4')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-5' && 'active',
        "data-tip": __(escapeHTML('color 5'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-5)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-5')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-6' && 'active',
        "data-tip": __(escapeHTML('color 6'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-6)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-6')
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
        color: color,
        onChange: newColor => setColor(newColor),
        enableAlpha: true
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
        effect: "solid"
      }))
    })));
  };
  
  /***/ }),
  
  /***/ "./src/boxShadowComponent.js":
  /*!***********************************!*\
    !*** ./src/boxShadowComponent.js ***!
    \***********************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "NewsmaticBoxShadow": function() { return /* binding */ NewsmaticBoxShadow; }
  /* harmony export */ });
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/index.es.js");
  
  const {
    Dropdown,
    RangeControl,
    ColorIndicator,
    ColorPicker,
    SelectControl,
    ButtonGroup,
    Button
  } = wp.components;
  const {
    escapeHTML
  } = wp.escapeHtml;
  const {
    __
  } = wp.i18n;
  const {
    useState,
    useEffect
  } = wp.element;
  const {
    customize
  } = wp;
  
  const NewsmaticBoxShadow = props => {
    const [boxShadow, setBoxShadow] = useState(props.value);
    const [option, setOption] = useState(boxShadow.option);
    const [hoffset, setHoffset] = useState(boxShadow.hoffset);
    const [voffset, setVoffset] = useState(boxShadow.voffset);
    const [blur, setBlur] = useState(boxShadow.blur);
    const [spread, setSpread] = useState(boxShadow.spread);
    const [type, setType] = useState(boxShadow.type);
    const [color, setColor] = useState(boxShadow.color);
    useEffect(() => {
      const newValue = {
        option: option,
        hoffset: hoffset,
        voffset: voffset,
        blur: blur,
        spread: spread,
        type: type,
        color: color
      };
      setBoxShadow(JSON.parse(JSON.stringify(newValue)));
      customize.value(props.setting)(JSON.parse(JSON.stringify(newValue)));
    }, [option, hoffset, voffset, blur, spread, type, color]);
    const toDefault = () => {
      setFontFamily(props.value.option);
      setFontFamily(props.value.hoffset);
      setFontWeight(props.value.voffset);
      setFontSize(props.value.blur);
      setLineHeight(props.value.spread);
      setLetterSpacing(props.value.type);
      setTextTransform(props.value.color);
    };
    const options = [{
      label: __(escapeHTML("None"), "newsmatic"),
      value: 'none'
    }, {
      label: __(escapeHTML("Adjust"), "newsmatic"),
      value: 'adjust'
    }];
    function getBackground(color) {
      if (color == null) return;
      if (color.includes('preset')) {
        return 'var(' + color + ')';
      } else {
        return color;
      }
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "control-title"
    }, customize.settings.controls[props.setting].label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "reset-button components-button is-secondary is-small",
      onClick: () => toDefault()
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicon dashicons dashicons-image-rotate"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-inner-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-start'
      },
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "box-shadow-value-holder"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "box-shadow-summ-value",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "summ-vals"
        }, option == 'none' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "summ-val"
        }, __(escapeHTML('None'), 'newsmatic')), option == 'adjust' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "summ-val"
        }, `${hoffset}H`), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null, "/"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "summ-val"
        }, `${voffset}V`), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null, "/"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "summ-val"
        }, `${blur}px`), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null, "/"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "summ-val"
        }, `${spread}px`))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "append-icon dashicons dashicons-ellipsis"
        })));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
        className: "inner-fields"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "inner-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
        value: option,
        options: options,
        onChange: newOption => setOption(newOption)
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "inner-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
        label: __(escapeHTML('Horizontal Offset (px)'), 'newsmatic'),
        value: hoffset,
        onChange: newHoffset => setHoffset(newHoffset),
        min: -100,
        max: 100,
        step: 1
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "inner-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
        label: __(escapeHTML('Vertical Offset (px)'), 'newsmatic'),
        value: voffset,
        onChange: newVoffset => setVoffset(newVoffset),
        min: -100,
        max: 100,
        step: 1
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "inner-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
        label: __(escapeHTML('Blur (px)'), 'newsmatic'),
        value: blur,
        onChange: newBlur => setBlur(newBlur),
        min: -100,
        max: 100,
        step: 1
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "inner-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
        label: __(escapeHTML('Spread (px)'), 'newsmatic'),
        value: spread,
        onChange: newSpread => setSpread(newSpread),
        min: -100,
        max: 100,
        step: 1
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "inner-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, {
        className: "control-inner"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
        variant: type == 'outset' ? 'primary' : 'secondary',
        onClick: () => setType('outset')
      }, __(escapeHTML('Outset'), 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
        variant: type == 'inset' ? 'primary' : 'secondary',
        onClick: () => setType('inset')
      }, __(escapeHTML('Inset'), 'newsmatic')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_1__["default"], {
        effect: "solid"
      }))
    }), option == 'adjust' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-end'
      },
      renderToggle: _ref2 => {
        let {
          isOpen,
          onToggle
        } = _ref2;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
          className: color == null && "null-color",
          "data-tip": __(escapeHTML('initial'), 'newsmatic'),
          colorValue: getBackground(color),
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "preset-colors"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
        className: "preset-colors-inner"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-1' && 'active',
        "data-tip": __(escapeHTML('color 1'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-1)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-1')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-2' && 'active',
        "data-tip": __(escapeHTML('color 2'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-2)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-2')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-3' && 'active',
        "data-tip": __(escapeHTML('color 3'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-3)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-3')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-4' && 'active',
        "data-tip": __(escapeHTML('color 4'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-4)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-4')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-5' && 'active',
        "data-tip": __(escapeHTML('color 5'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-5)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-5')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-6' && 'active',
        "data-tip": __(escapeHTML('color 6'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-6)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-6')
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
        color: color,
        onChange: newColor => setColor(newColor),
        enableAlpha: true
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_1__["default"], {
        effect: "solid"
      }))
    })));
  };
  
  /***/ }),
  
  /***/ "./src/repeaterComponent.js":
  /*!**********************************!*\
    !*** ./src/repeaterComponent.js ***!
    \**********************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "NewsmaticBlockRepeater": function() { return /* binding */ NewsmaticBlockRepeater; }
  /* harmony export */ });
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var react_sortable_hoc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-sortable-hoc */ "./node_modules/react-sortable-hoc/dist/react-sortable-hoc.esm.js");
  /* harmony import */ var array_move__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! array-move */ "./node_modules/array-move/index.js");
  /* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
  /* harmony import */ var react_select_async__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select/async */ "./node_modules/react-select/async/dist/react-select-async.esm.js");
  /* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
  /* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
  
  const {
    Card,
    CardHeader,
    CardBody,
    ToggleControl,
    TextControl,
    Button,
    SelectControl,
    Dashicon,
    FormTokenField,
    Dropdown,
    CheckboxControl,
    RangeControl,
    ResponsiveWrapper,
    ButtonGroup,
    TextareaControl
  } = wp.components;
  const {
    useState,
    useEffect
  } = wp.element;
  const {
    escapeHTML
  } = wp.escapeHtml;
  const {
    __
  } = wp.i18n;
  const {
    customize
  } = wp;
  const {
    MediaUpload
  } = wp.blockEditor;
  
  
  
  
  var ajaxurl = customizerControlsObject.ajaxUrl,
    _wpnonce = customizerControlsObject._wpnonce;
  
  
  // Block repeater control 
  const NewsmaticBlockRepeater = props => {
    const [repeater, setRepeater] = useState(JSON.parse(props.value));
    useEffect(() => {
      customize.value(props.setting)(JSON.stringify(repeater));
    }, [repeater]);
    function updateItemVisibility(itemKey) {
      let newRepeater = JSON.parse(JSON.stringify(repeater));
      newRepeater[itemKey]['option'] = newRepeater[itemKey]['option'] ? false : true;
      setRepeater(JSON.parse(JSON.stringify(newRepeater)));
    }
    const onSortEnd = e => {
      var newRepeater = (0,array_move__WEBPACK_IMPORTED_MODULE_2__.arrayMoveImmutable)(repeater, e.oldIndex, e.newIndex);
      setRepeater(newRepeater);
    };
    function removeBlock(key) {
      if (key !== -1) repeater.splice(key, 1);
      setRepeater(JSON.parse(JSON.stringify(repeater)));
    }
    function updateValue(key, block) {
      repeater[key] = block;
      setRepeater(JSON.parse(JSON.stringify(repeater)));
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "customize-control-title"
    }, customize.settings.controls[props.setting].label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "customize-control-description"
    }, customize.settings.controls[props.setting].description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockSortableList, {
      onSortEnd: onSortEnd,
      hideSortableGhost: false,
      repeater: repeater,
      removeBlock: removeBlock,
      updateValue: updateValue,
      props: props,
      updateItemVisibility: updateItemVisibility
    }));
  };
  const PostBlock = props => {
    const [option, setOption] = useState(props.props.option);
    const [visible, setVisible] = useState(props.props.option);
    const [title, setTitle] = useState(props.props.title);
    const [blockId, setBlockId] = useState(props.props.blockId);
    const [thumbOption, setThumbOption] = useState(props.props.thumbOption);
    const [dateOption, setDateOption] = useState(props.props.dateOption);
    const [authorOption, setAuthorOption] = useState(props.props.authorOption);
    const [categoryOption, setCategoryOption] = useState(props.props.categoryOption);
    const [commentOption, setCommentOption] = useState(props.props.commentOption);
    const [excerptOption, setExcerptOption] = useState(props.props.excerptOption);
    const [excerptLength, setExcerptLength] = useState(props.props.excerptLength);
    const [query, setQuery] = useState(props.props.query);
    const [buttonOption, setButtonOption] = useState(props.props.buttonOption);
    const [viewallOption, setViewallOption] = useState(props.props.viewallOption);
    const [viewallUrl, setViewallUrl] = useState(props.props.viewallUrl);
    const [column, setColumn] = useState(props.props.column || 'two');
    const [columns, setColumns] = useState(props.props.columns || 4);
    const [dots, setDots] = useState(props.props.dots);
    const [loop, setLoop] = useState(props.props.loop);
    const [arrows, setArrows] = useState(props.props.arrows);
    const [auto, setAuto] = useState(props.props.auto);
    const [layout, setLayout] = useState(props.props.layout);
  
    // update parent value
    useEffect(() => {
      let postBlockData = {
        'type': props.props.type,
        'option': option,
        'title': title,
        'blockId': blockId,
        'dateOption': dateOption,
        'authorOption': authorOption,
        'categoryOption': categoryOption,
        'commentOption': commentOption,
        'excerptOption': excerptOption,
        'excerptLength': excerptLength,
        'query': query,
        'buttonOption': buttonOption,
        'viewallOption': viewallOption,
        'viewallUrl': viewallUrl,
        'layout': layout
      };
      if (props.props.type == 'news-list' || props.props.type == 'news-grid') {
        postBlockData.column = column;
        postBlockData.thumbOption = thumbOption;
      }
      if (props.props.type == 'news-carousel') {
        postBlockData.columns = columns;
        postBlockData.dots = dots;
        postBlockData.loop = loop;
        postBlockData.arrows = arrows;
        postBlockData.auto = auto;
      }
      props.updateValue(props.itemKey, postBlockData);
    }, [option, title, blockId, dateOption, authorOption, categoryOption, commentOption, excerptOption, excerptLength, buttonOption, viewallOption, viewallUrl, thumbOption, column, columns, layout, query, dots, loop, arrows, auto]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `block-item block--${props.props.option ? "visibility" : "hidden"}`,
      elevation: 4,
      isRounded: false,
      size: "x-small"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "control-title"
    }, escapeHTML(props.props.type.replace('-', ' '))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-start'
      },
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "setting-icon dashicons dashicons-admin-generic",
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "block-content"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
        label: __(escapeHTML('Block Title'), 'newsmatic'),
        value: title,
        onChange: newValue => setTitle(newValue)
      }), (props.props.type == 'news-list' || props.props.type == 'news-grid') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
        label: __(escapeHTML('Show post thumbnail'), 'newsmatic'),
        checked: thumbOption,
        onChange: newToggle => setThumbOption(newToggle)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
        label: __(escapeHTML('Show post date'), 'newsmatic'),
        checked: dateOption,
        onChange: newToggle => setDateOption(newToggle)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
        label: __(escapeHTML('Show post author'), 'newsmatic'),
        checked: authorOption,
        onChange: newToggle => setAuthorOption(newToggle)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
        label: __(escapeHTML('Show post category'), 'newsmatic'),
        checked: categoryOption,
        onChange: newToggle => setCategoryOption(newToggle)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
        label: __(escapeHTML('Show post comment'), 'newsmatic'),
        checked: commentOption,
        onChange: newToggle => setCommentOption(newToggle)
      }), props.props.type != 'news-carousel' && props.props.type != 'news-filter' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
        label: __(escapeHTML('Show read more button'), 'newsmatic'),
        checked: buttonOption,
        onChange: newToggle => setButtonOption(newToggle)
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PostQuery, {
        query: props.props.query,
        setParentQuery: setQuery
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
        label: __(escapeHTML('Show view all icon'), 'newsmatic'),
        checked: viewallOption,
        onChange: newToggle => setViewallOption(newToggle)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
        label: __(escapeHTML('Block ID Attribute'), 'newsmatic'),
        value: blockId,
        onChange: newValue => setBlockId(newValue)
      }))
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `display-icon dashicons dashicons-${props.props.option ? "visibility" : "hidden"}`,
      onClick: () => props.updateItemVisibility(props.itemKey)
    })));
  };
  const PostAdBlock = props => {
    const [option, setOption] = useState(props.props.option);
    const [visible, setVisible] = useState(props.props.option);
    const [media, setMedia] = useState(props.props.media);
    const [url, setUrl] = useState(props.props.url);
    const [targetAttr, setTargetAttr] = useState(props.props.targetAttr);
    const [relAttr, setRelAttr] = useState(props.props.relAttr);
    const [blockId, setBlockId] = useState(props.props.blockId);
  
    // update parent value
    useEffect(() => {
      let postBlockData = {
        'type': props.props.type,
        'option': option,
        'media': media,
        'url': url,
        'targetAttr': targetAttr,
        'relAttr': relAttr,
        'blockId': blockId
      };
      props.updateValue(props.itemKey, postBlockData);
    }, [option, media, url, targetAttr, relAttr, blockId]);
    function removeBlock() {
      setVisible(false);
      props.removeBlock(props.itemKey);
    }
    const removeMedia = () => {
      setMedia({
        media_id: 0,
        media_url: ''
      });
    };
    const onSelectMedia = newMedia => {
      setMedia({
        media_id: newMedia.id,
        media_url: newMedia.url
      });
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `block-item block--${props.props.option ? "visibility" : "hidden"}`,
      elevation: 4,
      isRounded: false,
      size: "x-small"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "control-title"
    }, escapeHTML(props.props.type.replace('-', ' '))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-start'
      },
      renderToggle: _ref2 => {
        let {
          isOpen,
          onToggle
        } = _ref2;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "setting-icon dashicons dashicons-admin-generic",
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "block-content"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "media-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
        onSelect: onSelectMedia,
        value: media.media_id,
        allowedTypes: ['image'],
        render: _ref3 => {
          let {
            open
          } = _ref3;
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            className: media.media_id == 0 ? 'media-field-image__toggle' : 'media-field-image__preview',
            onClick: open
          }, media.media_id == 0 && __('Upload an image', 'newsmatic'), media != undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ResponsiveWrapper, {
            naturalWidth: 200,
            naturalHeight: 200
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            src: media.media_url
          })));
        }
      }), media.media_id != 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
        title: __('Replace image', 'newsmatic'),
        value: media.media_id,
        onSelect: onSelectMedia,
        allowedTypes: ['image'],
        render: _ref4 => {
          let {
            open
          } = _ref4;
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            onClick: open,
            variant: "secondary",
            isLink: true,
            isLarge: true
          }, __('Replace image', 'newsmatic'));
        }
      }), media.media_id != 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
        onClick: removeMedia,
        isLink: true,
        isDestructive: true
      }, __('Remove image', 'newsmatic'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
        label: __(escapeHTML('URL'), 'newsmatic'),
        value: url,
        onChange: newUrl => setUrl(newUrl)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
        label: __(escapeHTML('Ad link open in'), 'newsmatic'),
        value: targetAttr,
        options: [{
          label: __(escapeHTML('Open link in new tab'), 'newsmatic'),
          value: '_blank'
        }, {
          label: __(escapeHTML('Open link in same tab'), 'newsmatic'),
          value: '_self'
        }],
        onChange: newTargetAttr => setTargetAttr(newTargetAttr)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
        label: __(escapeHTML('Link rel attribute value'), 'newsmatic'),
        value: relAttr,
        options: [{
          label: __(escapeHTML('nofollow'), 'newsmatic'),
          value: 'nofollow'
        }, {
          label: __(escapeHTML('noopener'), 'newsmatic'),
          value: 'noopener'
        }, {
          label: __(escapeHTML('noreferrer'), 'newsmatic'),
          value: 'noreferrer'
        }],
        onChange: newRelAttr => setRelAttr(newRelAttr)
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
        label: __(escapeHTML('Block ID Attribute'), 'newsmatic'),
        value: blockId,
        onChange: newValue => setBlockId(newValue)
      }))
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `display-icon dashicons dashicons-${props.props.option ? "visibility" : "hidden"}`,
      onClick: () => props.updateItemVisibility(props.itemKey)
    })));
  };
  const PostQuery = props => {
    const [order, setOrder] = useState(props.query.order);
    const [count, setCount] = useState(props.query.count);
    const [postFilter, setPostFilter] = useState(props.query.postFilter);
    const [dateFilter, setDateFilter] = useState(props.query.dateFilter);
    const [categories, setCategories] = useState(props.query.categories);
    const [posts, setPosts] = useState(props.query.posts);
    const [ids, setIds] = useState(props.query.ids);
    const choices = customizerControlsObject.categories;
    const postChoices = customizerControlsObject.posts;
    useEffect(() => {
      props.setParentQuery({
        order: order,
        count: count,
        categories: categories,
        posts: posts,
        postFilter: postFilter,
        dateFilter: dateFilter,
        ids: ids
      });
    }, [order, count, ids, postFilter, dateFilter, posts, categories]);
    const getPosts = async key => {
      let postsArray = [];
      await jQuery.ajax({
        method: 'post',
        url: ajaxurl,
        data: {
          'action': 'newsmatic_get_multicheckbox_posts_simple_array',
          '_wpnonce': _wpnonce,
          'search': key
        },
        success: function (response) {
          if (response.data) {
            postsArray = response.data;
          }
        }
      });
      return postsArray;
    };
    const promiseOptions = inputValue => new Promise(resolve => {
      setTimeout(() => {
        resolve(getPosts(inputValue));
      }, 1000);
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "post-query-field"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "post-query-field-label"
    }, __(escapeHTML('Posts query'), 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'top-start'
      },
      renderToggle: _ref5 => {
        let {
          isOpen,
          onToggle
        } = _ref5;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
          className: "popover-trigger",
          icon: "edit",
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
        label: __(escapeHTML('Orderby'), 'newsmatic'),
        value: order,
        options: [{
          label: __(escapeHTML('Newest - Oldest'), 'newsmatic'),
          value: 'date-desc'
        }, {
          label: __(escapeHTML('Oldest - Newest'), 'newsmatic'),
          value: 'date-asc'
        }, {
          label: __(escapeHTML('A - Z'), 'newsmatic'),
          value: 'title-asc'
        }, {
          label: __(escapeHTML('Z - A'), 'newsmatic'),
          value: 'title-desc'
        }, {
          label: __(escapeHTML('Random'), 'newsmatic'),
          value: 'rand-desc'
        }],
        onChange: newOrder => setOrder(newOrder)
      }), postFilter == 'category' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalNumberControl, {
        label: __(escapeHTML('Number of posts to display'), 'newsmatic'),
        isShiftStepEnabled: true,
        onChange: newNumber => setCount(newNumber),
        shiftStep: 5,
        value: count
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(FormTokenField, {
        label: __(escapeHTML('Exclude post ids'), 'newsmatic'),
        value: ids,
        onChange: newids => setIds(newids)
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "radio-bubbles column-2"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: postFilter == 'category' ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setPostFilter('category')
      }, __(escapeHTML('By category'), 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: postFilter == 'title' ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setPostFilter('title')
      }, __(escapeHTML('By title'), 'newsmatic'))), choices && categories && postFilter == 'category' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
        isMulti: true,
        inputId: "newsmatic-search-in-select",
        isSearchable: true,
        heading: __(escapeHTML('Post categories'), 'newsmatic'),
        placeholder: __(escapeHTML('Type to search . . '), 'newsmatic'),
        value: categories,
        options: choices,
        onChange: newCategories => setCategories(newCategories)
      }), postFilter == 'title' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_select_async__WEBPACK_IMPORTED_MODULE_3__["default"], {
        isMulti: true,
        inputId: "newsmatic-search-in-select",
        isSearchable: true,
        heading: __(escapeHTML('Posts titles'), 'newsmatic'),
        placeholder: __(escapeHTML('Type to search . . '), 'newsmatic'),
        value: posts,
        defaultOptions: postChoices,
        loadOptions: promiseOptions,
        onChange: newPosts => setPosts(newPosts)
      }), postFilter == 'category' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "radio-bubbles column-4"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: dateFilter == 'all' ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setDateFilter('all')
      }, __(escapeHTML('All'), 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: dateFilter == 'last-seven-days' ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setDateFilter('last-seven-days')
      }, __(escapeHTML('Last 7 days'), 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: dateFilter == 'today' ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setDateFilter('today')
      }, __(escapeHTML('Today'), 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: dateFilter == 'this-week' ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setDateFilter('this-week')
      }, __(escapeHTML('This Week'), 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: dateFilter == 'last-week' ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setDateFilter('last-week')
      }, __(escapeHTML('Last Week'), 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: dateFilter == 'this-month' ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setDateFilter('this-month')
      }, __(escapeHTML('This Month'), 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: dateFilter == 'last-month' ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setDateFilter('last-month')
      }, __(escapeHTML('Last Month'), 'newsmatic')))))
    })));
  };
  const blockSortList = _ref6 => {
    let {
      repeater,
      removeBlock,
      updateValue,
      props,
      updateItemVisibility
    } = _ref6;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "blocks-wrap"
    }, repeater && repeater.map((block, index) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockSortableItem, {
        item: block,
        key: key,
        index: index,
        disabled: !block.option,
        itemKey: index,
        props: block,
        removeBlock: removeBlock,
        updateValue: updateValue,
        setting: props.setting,
        updateItemVisibility: updateItemVisibility
      });
    }));
  };
  const blockSortItem = _ref7 => {
    let {
      props,
      itemKey,
      removeBlock,
      updateValue,
      setting,
      updateItemVisibility
    } = _ref7;
    switch (props.type) {
      case "ad-block":
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PostAdBlock, {
          props: props,
          itemKey: itemKey,
          removeBlock: removeBlock,
          updateValue: updateValue,
          setting: setting,
          updateItemVisibility: updateItemVisibility
        });
        break;
      default:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PostBlock, {
          props: props,
          itemKey: itemKey,
          removeBlock: removeBlock,
          updateValue: updateValue,
          setting: setting,
          updateItemVisibility: updateItemVisibility
        });
    }
  };
  const BlockSortableList = (0,react_sortable_hoc__WEBPACK_IMPORTED_MODULE_1__.SortableContainer)(blockSortList);
  const BlockSortableItem = (0,react_sortable_hoc__WEBPACK_IMPORTED_MODULE_1__.SortableElement)(blockSortItem);
  
  /***/ }),
  
  /***/ "./src/sortComponent.js":
  /*!******************************!*\
    !*** ./src/sortComponent.js ***!
    \******************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "NewsmaticItemSort": function() { return /* binding */ NewsmaticItemSort; }
  /* harmony export */ });
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var react_sortable_hoc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-sortable-hoc */ "./node_modules/react-sortable-hoc/dist/react-sortable-hoc.esm.js");
  /* harmony import */ var array_move__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! array-move */ "./node_modules/array-move/index.js");
  
  const {
    useState,
    useEffect
  } = wp.element;
  const {
    escapeHTML
  } = wp.escapeHtml;
  const {
    customize
  } = wp;
  
  
  const NewsmaticItemSort = props => {
    const [items, setItems] = useState(props.value);
    const [setting, setSetting] = useState(props.setting);
    const [fields, setFields] = useState(customize.control(props.setting).params.fields);
    useEffect(() => {
      customize.value(props.setting)(items);
    }, [items]);
    const onSortEnd = e => {
      var newItems = (0,array_move__WEBPACK_IMPORTED_MODULE_2__.arrayMoveImmutable)(items, e.oldIndex, e.newIndex);
      setItems(newItems);
    };
    function updateItemVisibility(itemKey) {
      let newItems = JSON.parse(JSON.stringify(items));
      newItems[itemKey]['option'] = newItems[itemKey]['option'] ? false : true;
      setItems(JSON.parse(JSON.stringify(newItems)));
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "customize-control-title"
    }, customize.settings.controls[props.setting].label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "customize-control-description"
    }, customize.settings.controls[props.setting].description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "items-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SortableList, {
      items: items,
      fields: fields,
      setting: setting,
      onSortEnd: onSortEnd,
      hideSortableGhost: false,
      updateItemVisibility: updateItemVisibility
    })));
  };
  const sortList = _ref => {
    let {
      items,
      fields,
      setting,
      updateItemVisibility
    } = _ref;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "sort-list"
    }, items.map((key, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SortableItem, {
        item: key,
        index: i,
        disabled: !key.option,
        setting: setting,
        itemKey: i,
        updateItemVisibility: updateItemVisibility,
        fields: fields
      });
    }));
  };
  const sortItem = _ref2 => {
    let {
      item,
      itemKey,
      fields,
      setting,
      updateItemVisibility
    } = _ref2;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `sort-item ${item.value} ${item.option ? 'visible' : 'invisible'}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "sort-title"
    }, escapeHTML(fields[item.value].label)), setting == 'banner_section_order' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `trigger-icon dashicons dashicons-menu`
    }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `trigger-icon dashicons dashicons-${item.option ? 'visibility' : 'hidden'}`,
      onClick: () => updateItemVisibility(itemKey)
    }));
  };
  const SortableList = (0,react_sortable_hoc__WEBPACK_IMPORTED_MODULE_1__.SortableContainer)(sortList);
  const SortableItem = (0,react_sortable_hoc__WEBPACK_IMPORTED_MODULE_1__.SortableElement)(sortItem);
  
  /***/ }),
  
  /***/ "./src/typographyComponent.js":
  /*!************************************!*\
    !*** ./src/typographyComponent.js ***!
    \************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "NewsmaticTypography": function() { return /* binding */ NewsmaticTypography; }
  /* harmony export */ });
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
  /* harmony import */ var _assets_googleFonts_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/googleFonts.json */ "../assets/googleFonts.json");
  /* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/index.es.js");
  
  const {
    Dropdown,
    RangeControl,
    Dashicon
  } = wp.components;
  const {
    escapeHTML
  } = wp.escapeHtml;
  const {
    __
  } = wp.i18n;
  const {
    useState,
    useEffect
  } = wp.element;
  const {
    customize
  } = wp;
  
  
  
  const NewsmaticTypography = props => {
    const [typography, setTypography] = useState(props.value);
    const [fontFamily, setFontFamily] = useState(typography.font_family);
    const [fontFamilies, setFontFamilies] = useState([]);
    const [fontWeight, setFontWeight] = useState(typography.font_weight);
    const [fontWeights, setFontWeights] = useState([]);
    const [fontSize, setFontSize] = useState(typography.font_size);
    const [lineHeight, setLineHeight] = useState(typography.line_height);
    const [letterSpacing, setLetterSpacing] = useState(typography.letter_spacing);
    const [textTransform, setTextTransform] = useState(typography.text_transform);
    const [textDecoration, setTextDecoration] = useState(typography.text_decoration);
    const [icon, setIcon] = useState('desktop');
    useEffect(() => {
      const newRepeater = {
        font_family: fontFamily,
        font_weight: fontWeight,
        font_size: fontSize,
        line_height: lineHeight,
        letter_spacing: letterSpacing,
        text_transform: textTransform,
        text_decoration: textDecoration
      };
      setTypography(JSON.parse(JSON.stringify(newRepeater)));
      customize.value(props.setting)(JSON.parse(JSON.stringify(newRepeater)));
    }, [fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, textTransform, textDecoration]);
    useEffect(() => {
      const fonts = FontFamilyArray();
      setFontFamilies(fonts);
    }, []);
    useEffect(() => {
      let weights = FontWeightsArray(fontFamily);
      var data = weights.find(function (ele) {
        return ele.value === fontWeight.value;
      });
      if (!data) {
        setFontWeight(weights[0]);
      }
      setFontWeights(weights);
    }, [fontFamily]);
    const toDefault = () => {
      setFontFamily(props.value.font_family);
      setFontWeight(props.value.font_weight);
      setFontSize(props.value.font_size);
      setLineHeight(props.value.line_height);
      setLetterSpacing(props.value.letter_spacing);
      setTextTransform(props.value.text_transform);
      setTextDecoration(props.value.text_decoration);
    };
    const toDefaultFontSize = () => {
      setFontSize(props.value.font_size);
    };
    const toDefaultLineHeight = () => {
      setLineHeight(props.value.line_height);
    };
    const toDefaultLetterSpacing = () => {
      setLetterSpacing(props.value.letter_spacing);
    };
    const updateIcon = newIcon => {
      const footer = document.getElementById("customize-footer-actions");
      if (newIcon == 'tablet') {
        setIcon('tablet');
        footer.getElementsByClassName("preview-tablet")[0].click();
      }
      if (newIcon == 'smartphone') {
        setIcon('smartphone');
        footer.getElementsByClassName("preview-mobile")[0].click();
      }
      if (newIcon == 'desktop') {
        setIcon('desktop');
        footer.getElementsByClassName("preview-desktop")[0].click();
      }
    };
    const triggerDevice = device => {
      if (device == 'mobile') {
        setIcon('smartphone');
      } else {
        setIcon(device);
      }
    };
    useEffect(() => {
      const resFooter = document.getElementById("customize-footer-actions");
      const resFooterClass = resFooter.getElementsByClassName("devices-wrapper");
      const buttons = resFooterClass[0].getElementsByTagName("button");
      for (const button of buttons) {
        button.addEventListener("click", function () {
          const currentDevice = button.getAttribute("data-device");
          triggerDevice(currentDevice);
        });
      }
    }, []);
    const updateFontsize = newFontsize => {
      fontSize[icon] = newFontsize;
      setFontSize(JSON.parse(JSON.stringify(fontSize)));
    };
    const updateLineHeight = newLineheight => {
      lineHeight[icon] = newLineheight;
      setLineHeight(JSON.parse(JSON.stringify(lineHeight)));
    };
    const updateLetterSpacing = newLetterspacing => {
      letterSpacing[icon] = newLetterspacing;
      setLetterSpacing(JSON.parse(JSON.stringify(letterSpacing)));
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "control-title"
    }, customize.settings.controls[props.setting].label, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "reset-button components-button is-secondary is-small",
      onClick: () => toDefault()
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicon dashicons dashicons-image-rotate"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom'
      },
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "typo-value-holder"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "typo-summ-value",
          onClick: onToggle,
          "aria-expanded": isOpen
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "summ-vals"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "summ-val"
        }, fontFamily.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null, "/"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "summ-val"
        }, `${fontSize[icon]}px`), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null, "/"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "summ-val"
        }, fontWeight.label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "append-icon dashicons dashicons-ellipsis"
        })));
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
        className: "typo-fields"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "typo-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "inner-field font-family",
        inputId: "newsmatic-search-in-select",
        isSearchable: true,
        value: fontFamily,
        placeholder: __(escapeHTML('Search . .'), 'newsmatic'),
        options: fontFamilies,
        onChange: newFont => setFontFamily(newFont)
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "typo-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "inner-field font-weight",
        inputId: "newsmatic-search-in-select",
        isSearchable: false,
        value: fontWeight,
        options: fontWeights,
        onChange: newFont => setFontWeight(newFont)
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "typo-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        class: "reset-button components-button is-secondary is-small",
        onClick: () => toDefaultFontSize()
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        class: "dashicon dashicons dashicons-image-rotate"
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "responsive-icons"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        className: `responsive-trigger ${icon == 'desktop' && "isActive"}`,
        "data-tip": __(escapeHTML('Desktop'), 'newsmatic'),
        icon: "desktop",
        onClick: () => updateIcon("desktop")
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        className: `responsive-trigger ${icon == 'tablet' && "isActive"}`,
        "data-tip": __(escapeHTML('Tablet'), 'newsmatic'),
        icon: "tablet",
        onClick: () => updateIcon("tablet")
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        className: `responsive-trigger ${icon == 'smartphone' && "isActive"}`,
        "data-tip": __(escapeHTML('Mobile'), 'newsmatic'),
        icon: "smartphone",
        onClick: () => updateIcon("smartphone")
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
        label: __(escapeHTML('Font Size (px)'), 'newsmatic'),
        value: fontSize[icon],
        onChange: newRange => updateFontsize(newRange),
        min: 1,
        max: 100,
        step: 1
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "typo-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        class: "reset-button components-button is-secondary is-small",
        onClick: () => toDefaultLineHeight()
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        class: "dashicon dashicons dashicons-image-rotate"
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "responsive-icons"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        className: `responsive-trigger ${icon == 'desktop' && "isActive"}`,
        "data-tip": __(escapeHTML('Desktop'), 'newsmatic'),
        icon: "desktop",
        onClick: () => updateIcon("desktop")
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        className: `responsive-trigger ${icon == 'tablet' && "isActive"}`,
        "data-tip": __(escapeHTML('Tablet'), 'newsmatic'),
        icon: "tablet",
        onClick: () => updateIcon("tablet")
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        className: `responsive-trigger ${icon == 'smartphone' && "isActive"}`,
        "data-tip": __(escapeHTML('Mobile'), 'newsmatic'),
        icon: "smartphone",
        onClick: () => updateIcon("smartphone")
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
        label: __(escapeHTML('Line Height (px)'), 'newsmatic'),
        value: lineHeight[icon],
        onChange: newRange => updateLineHeight(newRange),
        min: 1,
        max: 100,
        step: 1
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "typo-field"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        class: "reset-button components-button is-secondary is-small",
        onClick: () => toDefaultLetterSpacing()
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        class: "dashicon dashicons dashicons-image-rotate"
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "responsive-icons"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        className: `responsive-trigger ${icon == 'desktop' && "isActive"}`,
        "data-tip": __(escapeHTML('Desktop'), 'newsmatic'),
        icon: "desktop",
        onClick: () => updateIcon("desktop")
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        className: `responsive-trigger ${icon == 'tablet' && "isActive"}`,
        "data-tip": __(escapeHTML('Tablet'), 'newsmatic'),
        icon: "tablet",
        onClick: () => updateIcon("tablet")
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
        className: `responsive-trigger ${icon == 'smartphone' && "isActive"}`,
        "data-tip": __(escapeHTML('Mobile'), 'newsmatic'),
        icon: "smartphone",
        onClick: () => updateIcon("smartphone")
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
        label: __(escapeHTML('Letter Spacing (px)'), 'newsmatic'),
        value: letterSpacing[icon],
        onChange: newRange => updateLetterSpacing(newRange),
        min: 0,
        max: 5,
        step: 1
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "typo-field field-group"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "inner-field text-transform"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: textTransform == 'unset' && 'isActive',
        "data-tip": __(escapeHTML('Unset'), 'newsmatic'),
        onClick: () => setTextTransform('unset')
      }, "N"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: textTransform == 'capitalize' && 'isActive',
        "data-tip": __(escapeHTML('Capitalize'), 'newsmatic'),
        onClick: () => setTextTransform('capitalize')
      }, "Aa"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: textTransform == 'uppercase' && 'isActive',
        "data-tip": __(escapeHTML('Uppercase'), 'newsmatic'),
        onClick: () => setTextTransform('uppercase')
      }, "AA"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: textTransform == 'lowercase' && 'isActive',
        "data-tip": __(escapeHTML('Lowercase'), 'newsmatic'),
        onClick: () => setTextTransform('lowercase')
      }, "aa")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "inner-field text-decoration"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: textDecoration == 'none' && 'isActive',
        "data-tip": __(escapeHTML('None'), 'newsmatic'),
        onClick: () => setTextDecoration('none')
      }, "Aa"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: textDecoration == 'line-through' && 'isActive',
        "data-tip": __(escapeHTML('Line Through'), 'newsmatic'),
        onClick: () => setTextDecoration('line-through')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strike", null, "Aa")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: textDecoration == 'underline' && 'isActive',
        "data-tip": __(escapeHTML('Underline'), 'newsmatic'),
        onClick: () => setTextDecoration('underline')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("u", null, "Aa")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
        effect: "solid"
      }))
    }));
  };
  const FontFamilyArray = () => {
    let families = [];
    if (_assets_googleFonts_json__WEBPACK_IMPORTED_MODULE_1__) {
      families = Object.keys(_assets_googleFonts_json__WEBPACK_IMPORTED_MODULE_1__).map(font => {
        return {
          value: font,
          label: font
        };
      });
    }
    return families;
  };
  const FontWeightsArray = family => {
    const weights = _assets_googleFonts_json__WEBPACK_IMPORTED_MODULE_1__[family.value].variants.normal;
    let weightsOptions = [];
    if (weights) {
      let label = "Regular 400";
      weightsOptions = Object.keys(weights).map(weight => {
        if (weight == 400) {
          label = "Regular 400";
        } else if (weight == 100) {
          label = "Thin 100";
        } else if (weight == 300) {
          label = "Light 300";
        } else if (weight == 500) {
          label = "Medium 500";
        } else if (weight == 600) {
          label = "SemiBold 600";
        } else if (weight == 700) {
          label = "Bold 700";
        } else if (weight == 900) {
          label = "Black 900";
        } else {
          label = weight;
        }
        return {
          value: weight,
          label: label
        };
      });
    }
    return weightsOptions;
  };
  
  /***/ }),
  
  /***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
  /*!**********************************************************************************!*\
    !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
    \**********************************************************************************/
  /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
  
  "use strict";
  
  
  var reactIs = __webpack_require__(/*! react-is */ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js");
  
  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
  
  function getStatics(component) {
    // React v16.11 and below
    if (reactIs.isMemo(component)) {
      return MEMO_STATICS;
    } // React v16.12 and above
  
  
    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
  }
  
  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);
  
        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }
  
      var keys = getOwnPropertyNames(sourceComponent);
  
      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }
  
      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);
  
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
  
        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
  
          try {
            // Avoid failures from read-only properties
            defineProperty(targetComponent, key, descriptor);
          } catch (e) {}
        }
      }
    }
  
    return targetComponent;
  }
  
  module.exports = hoistNonReactStatics;
  
  
  /***/ }),
  
  /***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js":
  /*!************************************************************************************************!*\
    !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js ***!
    \************************************************************************************************/
  /***/ (function(__unused_webpack_module, exports) {
  
  "use strict";
  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  
  
  
  
  
  if (true) {
    (function() {
  'use strict';
  
  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?
  
  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
  
  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }
  
  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;
  
      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;
  
          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;
  
            default:
              var $$typeofType = type && type.$$typeof;
  
              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;
  
                default:
                  return $$typeof;
              }
  
          }
  
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }
  
    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode
  
  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated
  
  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint
  
        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }
  
    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }
  
  exports.AsyncMode = AsyncMode;
  exports.ConcurrentMode = ConcurrentMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Lazy = Lazy;
  exports.Memo = Memo;
  exports.Portal = Portal;
  exports.Profiler = Profiler;
  exports.StrictMode = StrictMode;
  exports.Suspense = Suspense;
  exports.isAsyncMode = isAsyncMode;
  exports.isConcurrentMode = isConcurrentMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isLazy = isLazy;
  exports.isMemo = isMemo;
  exports.isPortal = isPortal;
  exports.isProfiler = isProfiler;
  exports.isStrictMode = isStrictMode;
  exports.isSuspense = isSuspense;
  exports.isValidElementType = isValidElementType;
  exports.typeOf = typeOf;
    })();
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js":
  /*!*****************************************************************************!*\
    !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/index.js ***!
    \*****************************************************************************/
  /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
  
  "use strict";
  
  
  if (false) {} else {
    module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js");
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/invariant/browser.js":
  /*!*******************************************!*\
    !*** ./node_modules/invariant/browser.js ***!
    \*******************************************/
  /***/ (function(module) {
  
  "use strict";
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  
  
  
  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */
  
  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (true) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }
  
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
        error.name = 'Invariant Violation';
      }
  
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
  
  module.exports = invariant;
  
  
  /***/ }),
  
  /***/ "./node_modules/memoize-one/dist/memoize-one.esm.js":
  /*!**********************************************************!*\
    !*** ./node_modules/memoize-one/dist/memoize-one.esm.js ***!
    \**********************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ memoizeOne; }
  /* harmony export */ });
  var safeIsNaN = Number.isNaN ||
      function ponyfill(value) {
          return typeof value === 'number' && value !== value;
      };
  function isEqual(first, second) {
      if (first === second) {
          return true;
      }
      if (safeIsNaN(first) && safeIsNaN(second)) {
          return true;
      }
      return false;
  }
  function areInputsEqual(newInputs, lastInputs) {
      if (newInputs.length !== lastInputs.length) {
          return false;
      }
      for (var i = 0; i < newInputs.length; i++) {
          if (!isEqual(newInputs[i], lastInputs[i])) {
              return false;
          }
      }
      return true;
  }
  
  function memoizeOne(resultFn, isEqual) {
      if (isEqual === void 0) { isEqual = areInputsEqual; }
      var cache = null;
      function memoized() {
          var newArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              newArgs[_i] = arguments[_i];
          }
          if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
              return cache.lastResult;
          }
          var lastResult = resultFn.apply(this, newArgs);
          cache = {
              lastResult: lastResult,
              lastArgs: newArgs,
              lastThis: this,
          };
          return lastResult;
      }
      memoized.clear = function clear() {
          cache = null;
      };
      return memoized;
  }
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/object-assign/index.js":
  /*!*********************************************!*\
    !*** ./node_modules/object-assign/index.js ***!
    \*********************************************/
  /***/ (function(module) {
  
  "use strict";
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  
  
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  
  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }
  
    return Object(val);
  }
  
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
  
      // Detect buggy property enumeration order in older V8 versions.
  
      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }
  
      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }
  
      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join('') !==
          'abcdefghijklmnopqrst') {
        return false;
      }
  
      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }
  
  module.exports = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;
  
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
  
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
  
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }
  
    return to;
  };
  
  
  /***/ }),
  
  /***/ "./node_modules/prop-types/checkPropTypes.js":
  /*!***************************************************!*\
    !*** ./node_modules/prop-types/checkPropTypes.js ***!
    \***************************************************/
  /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
  
  "use strict";
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  
  
  
  var printWarning = function() {};
  
  if (true) {
    var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
    var loggedTypeFailures = {};
    var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
  
    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) { /**/ }
    };
  }
  
  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if (true) {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
                'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || 'React class') + ': type specification of ' +
              location + ' `' + typeSpecName + '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
            );
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;
  
            var stack = getStack ? getStack() : '';
  
            printWarning(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }
  
  /**
   * Resets warning cache when testing.
   *
   * @private
   */
  checkPropTypes.resetWarningCache = function() {
    if (true) {
      loggedTypeFailures = {};
    }
  }
  
  module.exports = checkPropTypes;
  
  
  /***/ }),
  
  /***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
  /*!************************************************************!*\
    !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
    \************************************************************/
  /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
  
  "use strict";
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  
  
  
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
  var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
  
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
  var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");
  
  var printWarning = function() {};
  
  if (true) {
    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }
  
  function emptyFunctionThatReturnsNull() {
    return null;
  }
  
  module.exports = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
  
    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }
  
    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */
  
    var ANONYMOUS = '<<anonymous>>';
  
    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bigint: createPrimitiveTypeChecker('bigint'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),
  
      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
    };
  
    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/
  
    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message, data) {
      this.message = message;
      this.data = data && typeof data === 'object' ? data: {};
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;
  
    function createChainableTypeChecker(validate) {
      if (true) {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;
  
        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
            );
            err.name = 'Invariant Violation';
            throw err;
          } else if ( true && typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning(
                'You are manually calling a React.PropTypes validation ' +
                'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }
  
      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);
  
      return chainedCheckType;
    }
  
    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);
  
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
            {expectedType: expectedType}
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
  
    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }
  
    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
  
    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
  
    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!ReactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
  
    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
  
    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        if (true) {
          if (arguments.length > 1) {
            printWarning(
              'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
              'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
            );
          } else {
            printWarning('Invalid argument supplied to oneOf, expected an array.');
          }
        }
        return emptyFunctionThatReturnsNull;
      }
  
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }
  
        var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
          var type = getPreciseType(value);
          if (type === 'symbol') {
            return String(value);
          }
          return value;
        });
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }
  
    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (has(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
  
    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
         true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
        return emptyFunctionThatReturnsNull;
      }
  
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }
  
      function validate(props, propName, componentName, location, propFullName) {
        var expectedTypes = [];
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
          if (checkerResult == null) {
            return null;
          }
          if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
            expectedTypes.push(checkerResult.data.expectedType);
          }
        }
        var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
      }
      return createChainableTypeChecker(validate);
    }
  
    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
  
    function invalidValidatorError(componentName, location, propFullName, key, type) {
      return new PropTypeError(
        (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
        'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
      );
    }
  
    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (typeof checker !== 'function') {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
  
    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        // We need to check all keys in case some are required but missing from props.
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (has(shapeTypes, key) && typeof checker !== 'function') {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          if (!checker) {
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
              '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
  
      return createChainableTypeChecker(validate);
    }
  
    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }
  
          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }
  
          return true;
        default:
          return false;
      }
    }
  
    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }
  
      // falsy value can't be a Symbol
      if (!propValue) {
        return false;
      }
  
      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }
  
      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }
  
      return false;
    }
  
    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }
  
    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }
  
    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;
        default:
          return type;
      }
    }
  
    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }
  
    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;
  
    return ReactPropTypes;
  };
  
  
  /***/ }),
  
  /***/ "./node_modules/prop-types/index.js":
  /*!******************************************!*\
    !*** ./node_modules/prop-types/index.js ***!
    \******************************************/
  /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
  
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  
  if (true) {
    var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
  
    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
  } else {}
  
  
  /***/ }),
  
  /***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
  /*!*************************************************************!*\
    !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
    \*************************************************************/
  /***/ (function(module) {
  
  "use strict";
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  
  
  
  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  
  module.exports = ReactPropTypesSecret;
  
  
  /***/ }),
  
  /***/ "./node_modules/prop-types/lib/has.js":
  /*!********************************************!*\
    !*** ./node_modules/prop-types/lib/has.js ***!
    \********************************************/
  /***/ (function(module) {
  
  module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  
  
  /***/ }),
  
  /***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
  /*!***********************************************************************************!*\
    !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
    \***********************************************************************************/
  /***/ (function(__unused_webpack_module, exports) {
  
  "use strict";
  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  
  
  
  
  
  if (true) {
    (function() {
  'use strict';
  
  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?
  
  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
  
  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }
  
  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;
  
      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;
  
          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;
  
            default:
              var $$typeofType = type && type.$$typeof;
  
              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;
  
                default:
                  return $$typeof;
              }
  
          }
  
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }
  
    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode
  
  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated
  
  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint
  
        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }
  
    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }
  
  exports.AsyncMode = AsyncMode;
  exports.ConcurrentMode = ConcurrentMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Lazy = Lazy;
  exports.Memo = Memo;
  exports.Portal = Portal;
  exports.Profiler = Profiler;
  exports.StrictMode = StrictMode;
  exports.Suspense = Suspense;
  exports.isAsyncMode = isAsyncMode;
  exports.isConcurrentMode = isConcurrentMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isLazy = isLazy;
  exports.isMemo = isMemo;
  exports.isPortal = isPortal;
  exports.isProfiler = isProfiler;
  exports.isStrictMode = isStrictMode;
  exports.isSuspense = isSuspense;
  exports.isValidElementType = isValidElementType;
  exports.typeOf = typeOf;
    })();
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/prop-types/node_modules/react-is/index.js":
  /*!****************************************************************!*\
    !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
    \****************************************************************/
  /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
  
  "use strict";
  
  
  if (false) {} else {
    module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/react-select/async/dist/react-select-async.esm.js":
  /*!************************************************************************!*\
    !*** ./node_modules/react-select/async/dist/react-select-async.esm.js ***!
    \************************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "useAsync": function() { return /* reexport safe */ _dist_useAsync_5d308f11_esm_js__WEBPACK_IMPORTED_MODULE_2__.u; }
  /* harmony export */ });
  /* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
  /* harmony import */ var _dist_Select_13909c3f_esm_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../dist/Select-13909c3f.esm.js */ "./node_modules/react-select/dist/Select-13909c3f.esm.js");
  /* harmony import */ var _dist_useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../dist/useStateManager-7e1e8489.esm.js */ "./node_modules/react-select/dist/useStateManager-7e1e8489.esm.js");
  /* harmony import */ var _dist_useAsync_5d308f11_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dist/useAsync-5d308f11.esm.js */ "./node_modules/react-select/dist/useAsync-5d308f11.esm.js");
  /* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
  /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
  /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
  /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
  /* harmony import */ var _babel_runtime_helpers_createSuper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
  /* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
  /* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
  /* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
  /* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
  /* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
  /* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-dom */ "react-dom");
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_14__);
  /* harmony import */ var use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! use-isomorphic-layout-effect */ "./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js");
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var AsyncSelect = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (props, ref) {
    var stateManagedProps = (0,_dist_useAsync_5d308f11_esm_js__WEBPACK_IMPORTED_MODULE_2__.u)(props);
    var selectProps = (0,_dist_useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_16__.u)(stateManagedProps);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_dist_Select_13909c3f_esm_js__WEBPACK_IMPORTED_MODULE_17__.S, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      ref: ref
    }, selectProps));
  });
  
  /* harmony default export */ __webpack_exports__["default"] = (AsyncSelect);
  
  
  /***/ }),
  
  /***/ "./node_modules/react-select/dist/Select-13909c3f.esm.js":
  /*!***************************************************************!*\
    !*** ./node_modules/react-select/dist/Select-13909c3f.esm.js ***!
    \***************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "S": function() { return /* binding */ Select; },
  /* harmony export */   "a": function() { return /* binding */ defaultProps; },
  /* harmony export */   "b": function() { return /* binding */ getOptionLabel$1; },
  /* harmony export */   "c": function() { return /* binding */ createFilter; },
  /* harmony export */   "d": function() { return /* binding */ defaultTheme; },
  /* harmony export */   "g": function() { return /* binding */ getOptionValue$1; },
  /* harmony export */   "m": function() { return /* binding */ mergeStyles; }
  /* harmony export */ });
  /* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
  /* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
  /* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
  /* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
  /* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
  /* harmony import */ var _babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
  /* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
  /* harmony import */ var _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./index-9f7dc477.esm.js */ "./node_modules/react-select/dist/index-9f7dc477.esm.js");
  /* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
  /* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
  /* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
  
  // Assistive text to describe visual elements. Hidden for sighted users.
  var _ref =  false ? 0 : {
    name: "1f43avz-a11yText-A11yText",
    styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
  };
  var A11yText = function A11yText(props) {
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      css: _ref
    }, props));
  };
  
  var defaultAriaLiveMessages = {
    guidance: function guidance(props) {
      var isSearchable = props.isSearchable,
        isMulti = props.isMulti,
        isDisabled = props.isDisabled,
        tabSelectsValue = props.tabSelectsValue,
        context = props.context;
      switch (context) {
        case 'menu':
          return "Use Up and Down to choose options".concat(isDisabled ? '' : ', press Enter to select the currently focused option', ", press Escape to exit the menu").concat(tabSelectsValue ? ', press Tab to select the option and exit the menu' : '', ".");
        case 'input':
          return "".concat(props['aria-label'] || 'Select', " is focused ").concat(isSearchable ? ',type to refine list' : '', ", press Down to open the menu, ").concat(isMulti ? ' press left to focus selected values' : '');
        case 'value':
          return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
        default:
          return '';
      }
    },
    onChange: function onChange(props) {
      var action = props.action,
        _props$label = props.label,
        label = _props$label === void 0 ? '' : _props$label,
        labels = props.labels,
        isDisabled = props.isDisabled;
      switch (action) {
        case 'deselect-option':
        case 'pop-value':
        case 'remove-value':
          return "option ".concat(label, ", deselected.");
        case 'clear':
          return 'All selected options have been cleared.';
        case 'initial-input-focus':
          return "option".concat(labels.length > 1 ? 's' : '', " ").concat(labels.join(','), ", selected.");
        case 'select-option':
          return isDisabled ? "option ".concat(label, " is disabled. Select another option.") : "option ".concat(label, ", selected.");
        default:
          return '';
      }
    },
    onFocus: function onFocus(props) {
      var context = props.context,
        focused = props.focused,
        options = props.options,
        _props$label2 = props.label,
        label = _props$label2 === void 0 ? '' : _props$label2,
        selectValue = props.selectValue,
        isDisabled = props.isDisabled,
        isSelected = props.isSelected;
      var getArrayIndex = function getArrayIndex(arr, item) {
        return arr && arr.length ? "".concat(arr.indexOf(item) + 1, " of ").concat(arr.length) : '';
      };
      if (context === 'value' && selectValue) {
        return "value ".concat(label, " focused, ").concat(getArrayIndex(selectValue, focused), ".");
      }
      if (context === 'menu') {
        var disabled = isDisabled ? ' disabled' : '';
        var status = "".concat(isSelected ? 'selected' : 'focused').concat(disabled);
        return "option ".concat(label, " ").concat(status, ", ").concat(getArrayIndex(options, focused), ".");
      }
      return '';
    },
    onFilter: function onFilter(props) {
      var inputValue = props.inputValue,
        resultsMessage = props.resultsMessage;
      return "".concat(resultsMessage).concat(inputValue ? ' for search term ' + inputValue : '', ".");
    }
  };
  
  var LiveRegion = function LiveRegion(props) {
    var ariaSelection = props.ariaSelection,
      focusedOption = props.focusedOption,
      focusedValue = props.focusedValue,
      focusableOptions = props.focusableOptions,
      isFocused = props.isFocused,
      selectValue = props.selectValue,
      selectProps = props.selectProps,
      id = props.id;
    var ariaLiveMessages = selectProps.ariaLiveMessages,
      getOptionLabel = selectProps.getOptionLabel,
      inputValue = selectProps.inputValue,
      isMulti = selectProps.isMulti,
      isOptionDisabled = selectProps.isOptionDisabled,
      isSearchable = selectProps.isSearchable,
      menuIsOpen = selectProps.menuIsOpen,
      options = selectProps.options,
      screenReaderStatus = selectProps.screenReaderStatus,
      tabSelectsValue = selectProps.tabSelectsValue;
    var ariaLabel = selectProps['aria-label'];
    var ariaLive = selectProps['aria-live'];
  
    // Update aria live message configuration when prop changes
    var messages = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
      return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, defaultAriaLiveMessages), ariaLiveMessages || {});
    }, [ariaLiveMessages]);
  
    // Update aria live selected option when prop changes
    var ariaSelected = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
      var message = '';
      if (ariaSelection && messages.onChange) {
        var option = ariaSelection.option,
          selectedOptions = ariaSelection.options,
          removedValue = ariaSelection.removedValue,
          removedValues = ariaSelection.removedValues,
          value = ariaSelection.value;
        // select-option when !isMulti does not return option so we assume selected option is value
        var asOption = function asOption(val) {
          return !Array.isArray(val) ? val : null;
        };
  
        // If there is just one item from the action then get its label
        var selected = removedValue || option || asOption(value);
        var label = selected ? getOptionLabel(selected) : '';
  
        // If there are multiple items from the action then return an array of labels
        var multiSelected = selectedOptions || removedValues || undefined;
        var labels = multiSelected ? multiSelected.map(getOptionLabel) : [];
        var onChangeProps = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({
          // multiSelected items are usually items that have already been selected
          // or set by the user as a default value so we assume they are not disabled
          isDisabled: selected && isOptionDisabled(selected, selectValue),
          label: label,
          labels: labels
        }, ariaSelection);
        message = messages.onChange(onChangeProps);
      }
      return message;
    }, [ariaSelection, messages, isOptionDisabled, selectValue, getOptionLabel]);
    var ariaFocused = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
      var focusMsg = '';
      var focused = focusedOption || focusedValue;
      var isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));
      if (focused && messages.onFocus) {
        var onFocusProps = {
          focused: focused,
          label: getOptionLabel(focused),
          isDisabled: isOptionDisabled(focused, selectValue),
          isSelected: isSelected,
          options: options,
          context: focused === focusedOption ? 'menu' : 'value',
          selectValue: selectValue
        };
        focusMsg = messages.onFocus(onFocusProps);
      }
      return focusMsg;
    }, [focusedOption, focusedValue, getOptionLabel, isOptionDisabled, messages, options, selectValue]);
    var ariaResults = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
      var resultsMsg = '';
      if (menuIsOpen && options.length && messages.onFilter) {
        var resultsMessage = screenReaderStatus({
          count: focusableOptions.length
        });
        resultsMsg = messages.onFilter({
          inputValue: inputValue,
          resultsMessage: resultsMessage
        });
      }
      return resultsMsg;
    }, [focusableOptions, inputValue, menuIsOpen, messages, options, screenReaderStatus]);
    var ariaGuidance = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
      var guidanceMsg = '';
      if (messages.guidance) {
        var context = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
        guidanceMsg = messages.guidance({
          'aria-label': ariaLabel,
          context: context,
          isDisabled: focusedOption && isOptionDisabled(focusedOption, selectValue),
          isMulti: isMulti,
          isSearchable: isSearchable,
          tabSelectsValue: tabSelectsValue
        });
      }
      return guidanceMsg;
    }, [ariaLabel, focusedOption, focusedValue, isMulti, isOptionDisabled, isSearchable, menuIsOpen, messages, selectValue, tabSelectsValue]);
    var ariaContext = "".concat(ariaFocused, " ").concat(ariaResults, " ").concat(ariaGuidance);
    var ScreenReaderText = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
      id: "aria-selection"
    }, ariaSelected), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
      id: "aria-context"
    }, ariaContext));
    var isInitialFocus = (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus';
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(A11yText, {
      id: id
    }, isInitialFocus && ScreenReaderText), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(A11yText, {
      "aria-live": ariaLive,
      "aria-atomic": "false",
      "aria-relevant": "additions text"
    }, isFocused && !isInitialFocus && ScreenReaderText));
  };
  
  var diacritics = [{
    base: 'A',
    letters: "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"
  }, {
    base: 'AA',
    letters: "\uA732"
  }, {
    base: 'AE',
    letters: "\xC6\u01FC\u01E2"
  }, {
    base: 'AO',
    letters: "\uA734"
  }, {
    base: 'AU',
    letters: "\uA736"
  }, {
    base: 'AV',
    letters: "\uA738\uA73A"
  }, {
    base: 'AY',
    letters: "\uA73C"
  }, {
    base: 'B',
    letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"
  }, {
    base: 'C',
    letters: "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E"
  }, {
    base: 'D',
    letters: "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779"
  }, {
    base: 'DZ',
    letters: "\u01F1\u01C4"
  }, {
    base: 'Dz',
    letters: "\u01F2\u01C5"
  }, {
    base: 'E',
    letters: "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"
  }, {
    base: 'F',
    letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B"
  }, {
    base: 'G',
    letters: "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"
  }, {
    base: 'H',
    letters: "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"
  }, {
    base: 'I',
    letters: "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"
  }, {
    base: 'J',
    letters: "J\u24BF\uFF2A\u0134\u0248"
  }, {
    base: 'K',
    letters: "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"
  }, {
    base: 'L',
    letters: "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"
  }, {
    base: 'LJ',
    letters: "\u01C7"
  }, {
    base: 'Lj',
    letters: "\u01C8"
  }, {
    base: 'M',
    letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"
  }, {
    base: 'N',
    letters: "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"
  }, {
    base: 'NJ',
    letters: "\u01CA"
  }, {
    base: 'Nj',
    letters: "\u01CB"
  }, {
    base: 'O',
    letters: "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C"
  }, {
    base: 'OI',
    letters: "\u01A2"
  }, {
    base: 'OO',
    letters: "\uA74E"
  }, {
    base: 'OU',
    letters: "\u0222"
  }, {
    base: 'P',
    letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"
  }, {
    base: 'Q',
    letters: "Q\u24C6\uFF31\uA756\uA758\u024A"
  }, {
    base: 'R',
    letters: "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"
  }, {
    base: 'S',
    letters: "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"
  }, {
    base: 'T',
    letters: "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"
  }, {
    base: 'TZ',
    letters: "\uA728"
  }, {
    base: 'U',
    letters: "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"
  }, {
    base: 'V',
    letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"
  }, {
    base: 'VY',
    letters: "\uA760"
  }, {
    base: 'W',
    letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"
  }, {
    base: 'X',
    letters: "X\u24CD\uFF38\u1E8A\u1E8C"
  }, {
    base: 'Y',
    letters: "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"
  }, {
    base: 'Z',
    letters: "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"
  }, {
    base: 'a',
    letters: "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"
  }, {
    base: 'aa',
    letters: "\uA733"
  }, {
    base: 'ae',
    letters: "\xE6\u01FD\u01E3"
  }, {
    base: 'ao',
    letters: "\uA735"
  }, {
    base: 'au',
    letters: "\uA737"
  }, {
    base: 'av',
    letters: "\uA739\uA73B"
  }, {
    base: 'ay',
    letters: "\uA73D"
  }, {
    base: 'b',
    letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"
  }, {
    base: 'c',
    letters: "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184"
  }, {
    base: 'd',
    letters: "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"
  }, {
    base: 'dz',
    letters: "\u01F3\u01C6"
  }, {
    base: 'e',
    letters: "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"
  }, {
    base: 'f',
    letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C"
  }, {
    base: 'g',
    letters: "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"
  }, {
    base: 'h',
    letters: "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"
  }, {
    base: 'hv',
    letters: "\u0195"
  }, {
    base: 'i',
    letters: "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"
  }, {
    base: 'j',
    letters: "j\u24D9\uFF4A\u0135\u01F0\u0249"
  }, {
    base: 'k',
    letters: "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"
  }, {
    base: 'l',
    letters: "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"
  }, {
    base: 'lj',
    letters: "\u01C9"
  }, {
    base: 'm',
    letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"
  }, {
    base: 'n',
    letters: "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"
  }, {
    base: 'nj',
    letters: "\u01CC"
  }, {
    base: 'o',
    letters: "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275"
  }, {
    base: 'oi',
    letters: "\u01A3"
  }, {
    base: 'ou',
    letters: "\u0223"
  }, {
    base: 'oo',
    letters: "\uA74F"
  }, {
    base: 'p',
    letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"
  }, {
    base: 'q',
    letters: "q\u24E0\uFF51\u024B\uA757\uA759"
  }, {
    base: 'r',
    letters: "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"
  }, {
    base: 's',
    letters: "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"
  }, {
    base: 't',
    letters: "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"
  }, {
    base: 'tz',
    letters: "\uA729"
  }, {
    base: 'u',
    letters: "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"
  }, {
    base: 'v',
    letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"
  }, {
    base: 'vy',
    letters: "\uA761"
  }, {
    base: 'w',
    letters: "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"
  }, {
    base: 'x',
    letters: "x\u24E7\uFF58\u1E8B\u1E8D"
  }, {
    base: 'y',
    letters: "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"
  }, {
    base: 'z',
    letters: "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"
  }];
  var anyDiacritic = new RegExp('[' + diacritics.map(function (d) {
    return d.letters;
  }).join('') + ']', 'g');
  var diacriticToBase = {};
  for (var i = 0; i < diacritics.length; i++) {
    var diacritic = diacritics[i];
    for (var j = 0; j < diacritic.letters.length; j++) {
      diacriticToBase[diacritic.letters[j]] = diacritic.base;
    }
  }
  var stripDiacritics = function stripDiacritics(str) {
    return str.replace(anyDiacritic, function (match) {
      return diacriticToBase[match];
    });
  };
  
  var memoizedStripDiacriticsForInput = (0,memoize_one__WEBPACK_IMPORTED_MODULE_10__["default"])(stripDiacritics);
  var trimString = function trimString(str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var defaultStringify = function defaultStringify(option) {
    return "".concat(option.label, " ").concat(option.value);
  };
  var createFilter = function createFilter(config) {
    return function (option, rawInput) {
      // eslint-disable-next-line no-underscore-dangle
      if (option.data.__isNew__) return true;
      var _ignoreCase$ignoreAcc = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({
          ignoreCase: true,
          ignoreAccents: true,
          stringify: defaultStringify,
          trim: true,
          matchFrom: 'any'
        }, config),
        ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
        ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
        stringify = _ignoreCase$ignoreAcc.stringify,
        trim = _ignoreCase$ignoreAcc.trim,
        matchFrom = _ignoreCase$ignoreAcc.matchFrom;
      var input = trim ? trimString(rawInput) : rawInput;
      var candidate = trim ? trimString(stringify(option)) : stringify(option);
      if (ignoreCase) {
        input = input.toLowerCase();
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        input = memoizedStripDiacriticsForInput(input);
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
    };
  };
  
  var _excluded = ["innerRef"];
  function DummyInput(_ref) {
    var innerRef = _ref.innerRef,
      props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref, _excluded);
    // Remove animation props not meant for HTML elements
    var filteredProps = (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.r)(props, 'onExited', 'in', 'enter', 'exit', 'appear');
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      ref: innerRef
    }, filteredProps, {
      css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.css)({
        label: 'dummyInput',
        // get rid of any default styles
        background: 0,
        border: 0,
        // important! this hides the flashing cursor
        caretColor: 'transparent',
        fontSize: 'inherit',
        gridArea: '1 / 1 / 2 / 3',
        outline: 0,
        padding: 0,
        // important! without `width` browsers won't allow focus
        width: 1,
        // remove cursor on desktop
        color: 'transparent',
        // remove cursor on mobile whilst maintaining "scroll into view" behaviour
        left: -100,
        opacity: 0,
        position: 'relative',
        transform: 'scale(.01)'
      },  false ? 0 : ";label:DummyInput;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgcmVtb3ZlUHJvcHMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIER1bW15SW5wdXQoe1xuICBpbm5lclJlZixcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW5wdXQnXSAmIHtcbiAgcmVhZG9ubHkgaW5uZXJSZWY6IFJlZjxIVE1MSW5wdXRFbGVtZW50Pjtcbn0pIHtcbiAgLy8gUmVtb3ZlIGFuaW1hdGlvbiBwcm9wcyBub3QgbWVhbnQgZm9yIEhUTUwgZWxlbWVudHNcbiAgY29uc3QgZmlsdGVyZWRQcm9wcyA9IHJlbW92ZVByb3BzKFxuICAgIHByb3BzLFxuICAgICdvbkV4aXRlZCcsXG4gICAgJ2luJyxcbiAgICAnZW50ZXInLFxuICAgICdleGl0JyxcbiAgICAnYXBwZWFyJ1xuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGlucHV0XG4gICAgICByZWY9e2lubmVyUmVmfVxuICAgICAgey4uLmZpbHRlcmVkUHJvcHN9XG4gICAgICBjc3M9e3tcbiAgICAgICAgbGFiZWw6ICdkdW1teUlucHV0JyxcbiAgICAgICAgLy8gZ2V0IHJpZCBvZiBhbnkgZGVmYXVsdCBzdHlsZXNcbiAgICAgICAgYmFja2dyb3VuZDogMCxcbiAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHRoaXMgaGlkZXMgdGhlIGZsYXNoaW5nIGN1cnNvclxuICAgICAgICBjYXJldENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICAgICBncmlkQXJlYTogJzEgLyAxIC8gMiAvIDMnLFxuICAgICAgICBvdXRsaW5lOiAwLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHdpdGhvdXQgYHdpZHRoYCBicm93c2VycyB3b24ndCBhbGxvdyBmb2N1c1xuICAgICAgICB3aWR0aDogMSxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIGRlc2t0b3BcbiAgICAgICAgY29sb3I6ICd0cmFuc3BhcmVudCcsXG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnNvciBvbiBtb2JpbGUgd2hpbHN0IG1haW50YWluaW5nIFwic2Nyb2xsIGludG8gdmlld1wiIGJlaGF2aW91clxuICAgICAgICBsZWZ0OiAtMTAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoLjAxKScsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59XG4iXX0= */")
    }));
  }
  
  var cancelScroll = function cancelScroll(event) {
    event.preventDefault();
    event.stopPropagation();
  };
  function useScrollCapture(_ref) {
    var isEnabled = _ref.isEnabled,
      onBottomArrive = _ref.onBottomArrive,
      onBottomLeave = _ref.onBottomLeave,
      onTopArrive = _ref.onTopArrive,
      onTopLeave = _ref.onTopLeave;
    var isBottom = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(false);
    var isTop = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(false);
    var touchStart = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(0);
    var scrollTarget = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
    var handleEventDelta = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (event, delta) {
      if (scrollTarget.current === null) return;
      var _scrollTarget$current = scrollTarget.current,
        scrollTop = _scrollTarget$current.scrollTop,
        scrollHeight = _scrollTarget$current.scrollHeight,
        clientHeight = _scrollTarget$current.clientHeight;
      var target = scrollTarget.current;
      var isDeltaPositive = delta > 0;
      var availableScroll = scrollHeight - clientHeight - scrollTop;
      var shouldCancelScroll = false;
  
      // reset bottom/top flags
      if (availableScroll > delta && isBottom.current) {
        if (onBottomLeave) onBottomLeave(event);
        isBottom.current = false;
      }
      if (isDeltaPositive && isTop.current) {
        if (onTopLeave) onTopLeave(event);
        isTop.current = false;
      }
  
      // bottom limit
      if (isDeltaPositive && delta > availableScroll) {
        if (onBottomArrive && !isBottom.current) {
          onBottomArrive(event);
        }
        target.scrollTop = scrollHeight;
        shouldCancelScroll = true;
        isBottom.current = true;
  
        // top limit
      } else if (!isDeltaPositive && -delta > scrollTop) {
        if (onTopArrive && !isTop.current) {
          onTopArrive(event);
        }
        target.scrollTop = 0;
        shouldCancelScroll = true;
        isTop.current = true;
      }
  
      // cancel scroll
      if (shouldCancelScroll) {
        cancelScroll(event);
      }
    }, [onBottomArrive, onBottomLeave, onTopArrive, onTopLeave]);
    var onWheel = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (event) {
      handleEventDelta(event, event.deltaY);
    }, [handleEventDelta]);
    var onTouchStart = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (event) {
      // set touch start so we can calculate touchmove delta
      touchStart.current = event.changedTouches[0].clientY;
    }, []);
    var onTouchMove = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (event) {
      var deltaY = touchStart.current - event.changedTouches[0].clientY;
      handleEventDelta(event, deltaY);
    }, [handleEventDelta]);
    var startListening = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (el) {
      // bail early if no element is available to attach to
      if (!el) return;
      var notPassive = _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.s ? {
        passive: false
      } : false;
      el.addEventListener('wheel', onWheel, notPassive);
      el.addEventListener('touchstart', onTouchStart, notPassive);
      el.addEventListener('touchmove', onTouchMove, notPassive);
    }, [onTouchMove, onTouchStart, onWheel]);
    var stopListening = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (el) {
      // bail early if no element is available to detach from
      if (!el) return;
      el.removeEventListener('wheel', onWheel, false);
      el.removeEventListener('touchstart', onTouchStart, false);
      el.removeEventListener('touchmove', onTouchMove, false);
    }, [onTouchMove, onTouchStart, onWheel]);
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(function () {
      if (!isEnabled) return;
      var element = scrollTarget.current;
      startListening(element);
      return function () {
        stopListening(element);
      };
    }, [isEnabled, startListening, stopListening]);
    return function (element) {
      scrollTarget.current = element;
    };
  }
  
  var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
  var LOCK_STYLES = {
    boxSizing: 'border-box',
    // account for possible declaration `width: 100%;` on body
    overflow: 'hidden',
    position: 'relative',
    height: '100%'
  };
  function preventTouchMove(e) {
    e.preventDefault();
  }
  function allowTouchMove(e) {
    e.stopPropagation();
  }
  function preventInertiaScroll() {
    var top = this.scrollTop;
    var totalScroll = this.scrollHeight;
    var currentScroll = top + this.offsetHeight;
    if (top === 0) {
      this.scrollTop = 1;
    } else if (currentScroll === totalScroll) {
      this.scrollTop = top - 1;
    }
  }
  
  // `ontouchstart` check works on most browsers
  // `maxTouchPoints` works on IE10/11 and Surface
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }
  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  var activeScrollLocks = 0;
  var listenerOptions = {
    capture: false,
    passive: false
  };
  function useScrollLock(_ref) {
    var isEnabled = _ref.isEnabled,
      _ref$accountForScroll = _ref.accountForScrollbars,
      accountForScrollbars = _ref$accountForScroll === void 0 ? true : _ref$accountForScroll;
    var originalStyles = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)({});
    var scrollTarget = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
    var addScrollLock = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (touchScrollTarget) {
      if (!canUseDOM) return;
      var target = document.body;
      var targetStyle = target && target.style;
      if (accountForScrollbars) {
        // store any styles already applied to the body
        STYLE_KEYS.forEach(function (key) {
          var val = targetStyle && targetStyle[key];
          originalStyles.current[key] = val;
        });
      }
  
      // apply the lock styles and padding if this is the first scroll lock
      if (accountForScrollbars && activeScrollLocks < 1) {
        var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0;
        var clientWidth = document.body ? document.body.clientWidth : 0;
        var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
        Object.keys(LOCK_STYLES).forEach(function (key) {
          var val = LOCK_STYLES[key];
          if (targetStyle) {
            targetStyle[key] = val;
          }
        });
        if (targetStyle) {
          targetStyle.paddingRight = "".concat(adjustedPadding, "px");
        }
      }
  
      // account for touch devices
      if (target && isTouchDevice()) {
        // Mobile Safari ignores { overflow: hidden } declaration on the body.
        target.addEventListener('touchmove', preventTouchMove, listenerOptions);
  
        // Allow scroll on provided target
        if (touchScrollTarget) {
          touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, listenerOptions);
          touchScrollTarget.addEventListener('touchmove', allowTouchMove, listenerOptions);
        }
      }
  
      // increment active scroll locks
      activeScrollLocks += 1;
    }, [accountForScrollbars]);
    var removeScrollLock = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (touchScrollTarget) {
      if (!canUseDOM) return;
      var target = document.body;
      var targetStyle = target && target.style;
  
      // safely decrement active scroll locks
      activeScrollLocks = Math.max(activeScrollLocks - 1, 0);
  
      // reapply original body styles, if any
      if (accountForScrollbars && activeScrollLocks < 1) {
        STYLE_KEYS.forEach(function (key) {
          var val = originalStyles.current[key];
          if (targetStyle) {
            targetStyle[key] = val;
          }
        });
      }
  
      // remove touch listeners
      if (target && isTouchDevice()) {
        target.removeEventListener('touchmove', preventTouchMove, listenerOptions);
        if (touchScrollTarget) {
          touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, listenerOptions);
          touchScrollTarget.removeEventListener('touchmove', allowTouchMove, listenerOptions);
        }
      }
    }, [accountForScrollbars]);
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(function () {
      if (!isEnabled) return;
      var element = scrollTarget.current;
      addScrollLock(element);
      return function () {
        removeScrollLock(element);
      };
    }, [isEnabled, addScrollLock, removeScrollLock]);
    return function (element) {
      scrollTarget.current = element;
    };
  }
  
  function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
  var blurSelectInput = function blurSelectInput() {
    return document.activeElement && document.activeElement.blur();
  };
  var _ref2 =  false ? 0 : {
    name: "bp8cua-ScrollManager",
    styles: "position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9ICgpID0+XG4gIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmJsdXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2Nyb2xsTWFuYWdlcih7XG4gIGNoaWxkcmVuLFxuICBsb2NrRW5hYmxlZCxcbiAgY2FwdHVyZUVuYWJsZWQgPSB0cnVlLFxuICBvbkJvdHRvbUFycml2ZSxcbiAgb25Cb3R0b21MZWF2ZSxcbiAgb25Ub3BBcnJpdmUsXG4gIG9uVG9wTGVhdmUsXG59OiBQcm9wcykge1xuICBjb25zdCBzZXRTY3JvbGxDYXB0dXJlVGFyZ2V0ID0gdXNlU2Nyb2xsQ2FwdHVyZSh7XG4gICAgaXNFbmFibGVkOiBjYXB0dXJlRW5hYmxlZCxcbiAgICBvbkJvdHRvbUFycml2ZSxcbiAgICBvbkJvdHRvbUxlYXZlLFxuICAgIG9uVG9wQXJyaXZlLFxuICAgIG9uVG9wTGVhdmUsXG4gIH0pO1xuICBjb25zdCBzZXRTY3JvbGxMb2NrVGFyZ2V0ID0gdXNlU2Nyb2xsTG9jayh7IGlzRW5hYmxlZDogbG9ja0VuYWJsZWQgfSk7XG5cbiAgY29uc3QgdGFyZ2V0UmVmOiBSZWZDYWxsYmFjazxIVE1MRWxlbWVudD4gPSAoZWxlbWVudCkgPT4ge1xuICAgIHNldFNjcm9sbENhcHR1cmVUYXJnZXQoZWxlbWVudCk7XG4gICAgc2V0U2Nyb2xsTG9ja1RhcmdldChlbGVtZW50KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIHtsb2NrRW5hYmxlZCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBvbkNsaWNrPXtibHVyU2VsZWN0SW5wdXR9XG4gICAgICAgICAgY3NzPXt7IHBvc2l0aW9uOiAnZml4ZWQnLCBsZWZ0OiAwLCBib3R0b206IDAsIHJpZ2h0OiAwLCB0b3A6IDAgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7Y2hpbGRyZW4odGFyZ2V0UmVmKX1cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufVxuIl19 */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__
  };
  function ScrollManager(_ref) {
    var children = _ref.children,
      lockEnabled = _ref.lockEnabled,
      _ref$captureEnabled = _ref.captureEnabled,
      captureEnabled = _ref$captureEnabled === void 0 ? true : _ref$captureEnabled,
      onBottomArrive = _ref.onBottomArrive,
      onBottomLeave = _ref.onBottomLeave,
      onTopArrive = _ref.onTopArrive,
      onTopLeave = _ref.onTopLeave;
    var setScrollCaptureTarget = useScrollCapture({
      isEnabled: captureEnabled,
      onBottomArrive: onBottomArrive,
      onBottomLeave: onBottomLeave,
      onTopArrive: onTopArrive,
      onTopLeave: onTopLeave
    });
    var setScrollLockTarget = useScrollLock({
      isEnabled: lockEnabled
    });
    var targetRef = function targetRef(element) {
      setScrollCaptureTarget(element);
      setScrollLockTarget(element);
    };
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, null, lockEnabled && (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      onClick: blurSelectInput,
      css: _ref2
    }), children(targetRef));
  }
  
  var formatGroupLabel = function formatGroupLabel(group) {
    return group.label;
  };
  var getOptionLabel$1 = function getOptionLabel(option) {
    return option.label;
  };
  var getOptionValue$1 = function getOptionValue(option) {
    return option.value;
  };
  var isOptionDisabled = function isOptionDisabled(option) {
    return !!option.isDisabled;
  };
  
  var defaultStyles = {
    clearIndicator: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.a,
    container: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.b,
    control: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.d,
    dropdownIndicator: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.e,
    group: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.g,
    groupHeading: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.f,
    indicatorsContainer: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.i,
    indicatorSeparator: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.h,
    input: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.j,
    loadingIndicator: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.l,
    loadingMessage: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.k,
    menu: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.m,
    menuList: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.n,
    menuPortal: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.o,
    multiValue: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.p,
    multiValueLabel: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.q,
    multiValueRemove: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.t,
    noOptionsMessage: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.u,
    option: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.v,
    placeholder: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.w,
    singleValue: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.x,
    valueContainer: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.y
  };
  
  // Merge Utility
  // Allows consumers to extend a base Select with additional styles
  
  function mergeStyles(source) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // initialize with source styles
    var styles = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, source);
  
    // massage in target styles
    Object.keys(target).forEach(function (keyAsString) {
      var key = keyAsString;
      if (source[key]) {
        styles[key] = function (rsCss, props) {
          return target[key](source[key](rsCss, props), props);
        };
      } else {
        styles[key] = target[key];
      }
    });
    return styles;
  }
  
  var colors = {
    primary: '#2684FF',
    primary75: '#4C9AFF',
    primary50: '#B2D4FF',
    primary25: '#DEEBFF',
    danger: '#DE350B',
    dangerLight: '#FFBDAD',
    neutral0: 'hsl(0, 0%, 100%)',
    neutral5: 'hsl(0, 0%, 95%)',
    neutral10: 'hsl(0, 0%, 90%)',
    neutral20: 'hsl(0, 0%, 80%)',
    neutral30: 'hsl(0, 0%, 70%)',
    neutral40: 'hsl(0, 0%, 60%)',
    neutral50: 'hsl(0, 0%, 50%)',
    neutral60: 'hsl(0, 0%, 40%)',
    neutral70: 'hsl(0, 0%, 30%)',
    neutral80: 'hsl(0, 0%, 20%)',
    neutral90: 'hsl(0, 0%, 10%)'
  };
  var borderRadius = 4;
  // Used to calculate consistent margin/padding on elements
  var baseUnit = 4;
  // The minimum height of the control
  var controlHeight = 38;
  // The amount of space between the control and menu */
  var menuGutter = baseUnit * 2;
  var spacing = {
    baseUnit: baseUnit,
    controlHeight: controlHeight,
    menuGutter: menuGutter
  };
  var defaultTheme = {
    borderRadius: borderRadius,
    colors: colors,
    spacing: spacing
  };
  
  var defaultProps = {
    'aria-live': 'polite',
    backspaceRemovesValue: true,
    blurInputOnSelect: (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.z)(),
    captureMenuScroll: !(0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.z)(),
    closeMenuOnSelect: true,
    closeMenuOnScroll: false,
    components: {},
    controlShouldRenderValue: true,
    escapeClearsValue: false,
    filterOption: createFilter(),
    formatGroupLabel: formatGroupLabel,
    getOptionLabel: getOptionLabel$1,
    getOptionValue: getOptionValue$1,
    isDisabled: false,
    isLoading: false,
    isMulti: false,
    isRtl: false,
    isSearchable: true,
    isOptionDisabled: isOptionDisabled,
    loadingMessage: function loadingMessage() {
      return 'Loading...';
    },
    maxMenuHeight: 300,
    minMenuHeight: 140,
    menuIsOpen: false,
    menuPlacement: 'bottom',
    menuPosition: 'absolute',
    menuShouldBlockScroll: false,
    menuShouldScrollIntoView: !(0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.A)(),
    noOptionsMessage: function noOptionsMessage() {
      return 'No options';
    },
    openMenuOnFocus: false,
    openMenuOnClick: true,
    options: [],
    pageSize: 5,
    placeholder: 'Select...',
    screenReaderStatus: function screenReaderStatus(_ref) {
      var count = _ref.count;
      return "".concat(count, " result").concat(count !== 1 ? 's' : '', " available");
    },
    styles: {},
    tabIndex: 0,
    tabSelectsValue: true
  };
  function toCategorizedOption(props, option, selectValue, index) {
    var isDisabled = _isOptionDisabled(props, option, selectValue);
    var isSelected = _isOptionSelected(props, option, selectValue);
    var label = getOptionLabel(props, option);
    var value = getOptionValue(props, option);
    return {
      type: 'option',
      data: option,
      isDisabled: isDisabled,
      isSelected: isSelected,
      label: label,
      value: value,
      index: index
    };
  }
  function buildCategorizedOptions(props, selectValue) {
    return props.options.map(function (groupOrOption, groupOrOptionIndex) {
      if ('options' in groupOrOption) {
        var categorizedOptions = groupOrOption.options.map(function (option, optionIndex) {
          return toCategorizedOption(props, option, selectValue, optionIndex);
        }).filter(function (categorizedOption) {
          return isFocusable(props, categorizedOption);
        });
        return categorizedOptions.length > 0 ? {
          type: 'group',
          data: groupOrOption,
          options: categorizedOptions,
          index: groupOrOptionIndex
        } : undefined;
      }
      var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
      return isFocusable(props, categorizedOption) ? categorizedOption : undefined;
    }).filter(_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.G);
  }
  function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
    return categorizedOptions.reduce(function (optionsAccumulator, categorizedOption) {
      if (categorizedOption.type === 'group') {
        optionsAccumulator.push.apply(optionsAccumulator, (0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_6__["default"])(categorizedOption.options.map(function (option) {
          return option.data;
        })));
      } else {
        optionsAccumulator.push(categorizedOption.data);
      }
      return optionsAccumulator;
    }, []);
  }
  function buildFocusableOptions(props, selectValue) {
    return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
  }
  function isFocusable(props, categorizedOption) {
    var _props$inputValue = props.inputValue,
      inputValue = _props$inputValue === void 0 ? '' : _props$inputValue;
    var data = categorizedOption.data,
      isSelected = categorizedOption.isSelected,
      label = categorizedOption.label,
      value = categorizedOption.value;
    return (!shouldHideSelectedOptions(props) || !isSelected) && _filterOption(props, {
      label: label,
      value: value,
      data: data
    }, inputValue);
  }
  function getNextFocusedValue(state, nextSelectValue) {
    var focusedValue = state.focusedValue,
      lastSelectValue = state.selectValue;
    var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);
    if (lastFocusedIndex > -1) {
      var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);
      if (nextFocusedIndex > -1) {
        // the focused value is still in the selectValue, return it
        return focusedValue;
      } else if (lastFocusedIndex < nextSelectValue.length) {
        // the focusedValue is not present in the next selectValue array by
        // reference, so return the new value at the same index
        return nextSelectValue[lastFocusedIndex];
      }
    }
    return null;
  }
  function getNextFocusedOption(state, options) {
    var lastFocusedOption = state.focusedOption;
    return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
  }
  var getOptionLabel = function getOptionLabel(props, data) {
    return props.getOptionLabel(data);
  };
  var getOptionValue = function getOptionValue(props, data) {
    return props.getOptionValue(data);
  };
  function _isOptionDisabled(props, option, selectValue) {
    return typeof props.isOptionDisabled === 'function' ? props.isOptionDisabled(option, selectValue) : false;
  }
  function _isOptionSelected(props, option, selectValue) {
    if (selectValue.indexOf(option) > -1) return true;
    if (typeof props.isOptionSelected === 'function') {
      return props.isOptionSelected(option, selectValue);
    }
    var candidate = getOptionValue(props, option);
    return selectValue.some(function (i) {
      return getOptionValue(props, i) === candidate;
    });
  }
  function _filterOption(props, option, inputValue) {
    return props.filterOption ? props.filterOption(option, inputValue) : true;
  }
  var shouldHideSelectedOptions = function shouldHideSelectedOptions(props) {
    var hideSelectedOptions = props.hideSelectedOptions,
      isMulti = props.isMulti;
    if (hideSelectedOptions === undefined) return isMulti;
    return hideSelectedOptions;
  };
  var instanceId = 1;
  var Select = /*#__PURE__*/function (_Component) {
    (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Select, _Component);
    var _super = (0,_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__["default"])(Select);
    // Misc. Instance Properties
    // ------------------------------
  
    // TODO
  
    // Refs
    // ------------------------------
  
    // Lifecycle
    // ------------------------------
  
    function Select(_props) {
      var _this;
      (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Select);
      _this = _super.call(this, _props);
      _this.state = {
        ariaSelection: null,
        focusedOption: null,
        focusedValue: null,
        inputIsHidden: false,
        isFocused: false,
        selectValue: [],
        clearFocusValueOnUpdate: false,
        prevWasFocused: false,
        inputIsHiddenAfterUpdate: undefined,
        prevProps: undefined
      };
      _this.blockOptionHover = false;
      _this.isComposing = false;
      _this.commonProps = void 0;
      _this.initialTouchX = 0;
      _this.initialTouchY = 0;
      _this.instancePrefix = '';
      _this.openAfterFocus = false;
      _this.scrollToFocusedOptionOnUpdate = false;
      _this.userIsDragging = void 0;
      _this.controlRef = null;
      _this.getControlRef = function (ref) {
        _this.controlRef = ref;
      };
      _this.focusedOptionRef = null;
      _this.getFocusedOptionRef = function (ref) {
        _this.focusedOptionRef = ref;
      };
      _this.menuListRef = null;
      _this.getMenuListRef = function (ref) {
        _this.menuListRef = ref;
      };
      _this.inputRef = null;
      _this.getInputRef = function (ref) {
        _this.inputRef = ref;
      };
      _this.focus = _this.focusInput;
      _this.blur = _this.blurInput;
      _this.onChange = function (newValue, actionMeta) {
        var _this$props = _this.props,
          onChange = _this$props.onChange,
          name = _this$props.name;
        actionMeta.name = name;
        _this.ariaOnChange(newValue, actionMeta);
        onChange(newValue, actionMeta);
      };
      _this.setValue = function (newValue, action, option) {
        var _this$props2 = _this.props,
          closeMenuOnSelect = _this$props2.closeMenuOnSelect,
          isMulti = _this$props2.isMulti,
          inputValue = _this$props2.inputValue;
        _this.onInputChange('', {
          action: 'set-value',
          prevInputValue: inputValue
        });
        if (closeMenuOnSelect) {
          _this.setState({
            inputIsHiddenAfterUpdate: !isMulti
          });
          _this.onMenuClose();
        }
        // when the select value should change, we should reset focusedValue
        _this.setState({
          clearFocusValueOnUpdate: true
        });
        _this.onChange(newValue, {
          action: action,
          option: option
        });
      };
      _this.selectOption = function (newValue) {
        var _this$props3 = _this.props,
          blurInputOnSelect = _this$props3.blurInputOnSelect,
          isMulti = _this$props3.isMulti,
          name = _this$props3.name;
        var selectValue = _this.state.selectValue;
        var deselected = isMulti && _this.isOptionSelected(newValue, selectValue);
        var isDisabled = _this.isOptionDisabled(newValue, selectValue);
        if (deselected) {
          var candidate = _this.getOptionValue(newValue);
          _this.setValue((0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.B)(selectValue.filter(function (i) {
            return _this.getOptionValue(i) !== candidate;
          })), 'deselect-option', newValue);
        } else if (!isDisabled) {
          // Select option if option is not disabled
          if (isMulti) {
            _this.setValue((0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.B)([].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_6__["default"])(selectValue), [newValue])), 'select-option', newValue);
          } else {
            _this.setValue((0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.C)(newValue), 'select-option');
          }
        } else {
          _this.ariaOnChange((0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.C)(newValue), {
            action: 'select-option',
            option: newValue,
            name: name
          });
          return;
        }
        if (blurInputOnSelect) {
          _this.blurInput();
        }
      };
      _this.removeValue = function (removedValue) {
        var isMulti = _this.props.isMulti;
        var selectValue = _this.state.selectValue;
        var candidate = _this.getOptionValue(removedValue);
        var newValueArray = selectValue.filter(function (i) {
          return _this.getOptionValue(i) !== candidate;
        });
        var newValue = (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.D)(isMulti, newValueArray, newValueArray[0] || null);
        _this.onChange(newValue, {
          action: 'remove-value',
          removedValue: removedValue
        });
        _this.focusInput();
      };
      _this.clearValue = function () {
        var selectValue = _this.state.selectValue;
        _this.onChange((0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.D)(_this.props.isMulti, [], null), {
          action: 'clear',
          removedValues: selectValue
        });
      };
      _this.popValue = function () {
        var isMulti = _this.props.isMulti;
        var selectValue = _this.state.selectValue;
        var lastSelectedValue = selectValue[selectValue.length - 1];
        var newValueArray = selectValue.slice(0, selectValue.length - 1);
        var newValue = (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.D)(isMulti, newValueArray, newValueArray[0] || null);
        _this.onChange(newValue, {
          action: 'pop-value',
          removedValue: lastSelectedValue
        });
      };
      _this.getValue = function () {
        return _this.state.selectValue;
      };
      _this.cx = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.E.apply(void 0, [_this.props.classNamePrefix].concat(args));
      };
      _this.getOptionLabel = function (data) {
        return getOptionLabel(_this.props, data);
      };
      _this.getOptionValue = function (data) {
        return getOptionValue(_this.props, data);
      };
      _this.getStyles = function (key, props) {
        var base = defaultStyles[key](props);
        base.boxSizing = 'border-box';
        var custom = _this.props.styles[key];
        return custom ? custom(base, props) : base;
      };
      _this.getElementId = function (element) {
        return "".concat(_this.instancePrefix, "-").concat(element);
      };
      _this.getComponents = function () {
        return (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.F)(_this.props);
      };
      _this.buildCategorizedOptions = function () {
        return buildCategorizedOptions(_this.props, _this.state.selectValue);
      };
      _this.getCategorizedOptions = function () {
        return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
      };
      _this.buildFocusableOptions = function () {
        return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
      };
      _this.getFocusableOptions = function () {
        return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
      };
      _this.ariaOnChange = function (value, actionMeta) {
        _this.setState({
          ariaSelection: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({
            value: value
          }, actionMeta)
        });
      };
      _this.onMenuMouseDown = function (event) {
        if (event.button !== 0) {
          return;
        }
        event.stopPropagation();
        event.preventDefault();
        _this.focusInput();
      };
      _this.onMenuMouseMove = function (event) {
        _this.blockOptionHover = false;
      };
      _this.onControlMouseDown = function (event) {
        // Event captured by dropdown indicator
        if (event.defaultPrevented) {
          return;
        }
        var openMenuOnClick = _this.props.openMenuOnClick;
        if (!_this.state.isFocused) {
          if (openMenuOnClick) {
            _this.openAfterFocus = true;
          }
          _this.focusInput();
        } else if (!_this.props.menuIsOpen) {
          if (openMenuOnClick) {
            _this.openMenu('first');
          }
        } else {
          if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            _this.onMenuClose();
          }
        }
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
          event.preventDefault();
        }
      };
      _this.onDropdownIndicatorMouseDown = function (event) {
        // ignore mouse events that weren't triggered by the primary button
        if (event && event.type === 'mousedown' && event.button !== 0) {
          return;
        }
        if (_this.props.isDisabled) return;
        var _this$props4 = _this.props,
          isMulti = _this$props4.isMulti,
          menuIsOpen = _this$props4.menuIsOpen;
        _this.focusInput();
        if (menuIsOpen) {
          _this.setState({
            inputIsHiddenAfterUpdate: !isMulti
          });
          _this.onMenuClose();
        } else {
          _this.openMenu('first');
        }
        event.preventDefault();
      };
      _this.onClearIndicatorMouseDown = function (event) {
        // ignore mouse events that weren't triggered by the primary button
        if (event && event.type === 'mousedown' && event.button !== 0) {
          return;
        }
        _this.clearValue();
        event.preventDefault();
        _this.openAfterFocus = false;
        if (event.type === 'touchend') {
          _this.focusInput();
        } else {
          setTimeout(function () {
            return _this.focusInput();
          });
        }
      };
      _this.onScroll = function (event) {
        if (typeof _this.props.closeMenuOnScroll === 'boolean') {
          if (event.target instanceof HTMLElement && (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.H)(event.target)) {
            _this.props.onMenuClose();
          }
        } else if (typeof _this.props.closeMenuOnScroll === 'function') {
          if (_this.props.closeMenuOnScroll(event)) {
            _this.props.onMenuClose();
          }
        }
      };
      _this.onCompositionStart = function () {
        _this.isComposing = true;
      };
      _this.onCompositionEnd = function () {
        _this.isComposing = false;
      };
      _this.onTouchStart = function (_ref2) {
        var touches = _ref2.touches;
        var touch = touches && touches.item(0);
        if (!touch) {
          return;
        }
        _this.initialTouchX = touch.clientX;
        _this.initialTouchY = touch.clientY;
        _this.userIsDragging = false;
      };
      _this.onTouchMove = function (_ref3) {
        var touches = _ref3.touches;
        var touch = touches && touches.item(0);
        if (!touch) {
          return;
        }
        var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
        var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
        var moveThreshold = 5;
        _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
      };
      _this.onTouchEnd = function (event) {
        if (_this.userIsDragging) return;
  
        // close the menu if the user taps outside
        // we're checking on event.target here instead of event.currentTarget, because we want to assert information
        // on events on child elements, not the document (which we've attached this handler to).
        if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
          _this.blurInput();
        }
  
        // reset move vars
        _this.initialTouchX = 0;
        _this.initialTouchY = 0;
      };
      _this.onControlTouchEnd = function (event) {
        if (_this.userIsDragging) return;
        _this.onControlMouseDown(event);
      };
      _this.onClearIndicatorTouchEnd = function (event) {
        if (_this.userIsDragging) return;
        _this.onClearIndicatorMouseDown(event);
      };
      _this.onDropdownIndicatorTouchEnd = function (event) {
        if (_this.userIsDragging) return;
        _this.onDropdownIndicatorMouseDown(event);
      };
      _this.handleInputChange = function (event) {
        var prevInputValue = _this.props.inputValue;
        var inputValue = event.currentTarget.value;
        _this.setState({
          inputIsHiddenAfterUpdate: false
        });
        _this.onInputChange(inputValue, {
          action: 'input-change',
          prevInputValue: prevInputValue
        });
        if (!_this.props.menuIsOpen) {
          _this.onMenuOpen();
        }
      };
      _this.onInputFocus = function (event) {
        if (_this.props.onFocus) {
          _this.props.onFocus(event);
        }
        _this.setState({
          inputIsHiddenAfterUpdate: false,
          isFocused: true
        });
        if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
          _this.openMenu('first');
        }
        _this.openAfterFocus = false;
      };
      _this.onInputBlur = function (event) {
        var prevInputValue = _this.props.inputValue;
        if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
          _this.inputRef.focus();
          return;
        }
        if (_this.props.onBlur) {
          _this.props.onBlur(event);
        }
        _this.onInputChange('', {
          action: 'input-blur',
          prevInputValue: prevInputValue
        });
        _this.onMenuClose();
        _this.setState({
          focusedValue: null,
          isFocused: false
        });
      };
      _this.onOptionHover = function (focusedOption) {
        if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
          return;
        }
        _this.setState({
          focusedOption: focusedOption
        });
      };
      _this.shouldHideSelectedOptions = function () {
        return shouldHideSelectedOptions(_this.props);
      };
      _this.onKeyDown = function (event) {
        var _this$props5 = _this.props,
          isMulti = _this$props5.isMulti,
          backspaceRemovesValue = _this$props5.backspaceRemovesValue,
          escapeClearsValue = _this$props5.escapeClearsValue,
          inputValue = _this$props5.inputValue,
          isClearable = _this$props5.isClearable,
          isDisabled = _this$props5.isDisabled,
          menuIsOpen = _this$props5.menuIsOpen,
          onKeyDown = _this$props5.onKeyDown,
          tabSelectsValue = _this$props5.tabSelectsValue,
          openMenuOnFocus = _this$props5.openMenuOnFocus;
        var _this$state = _this.state,
          focusedOption = _this$state.focusedOption,
          focusedValue = _this$state.focusedValue,
          selectValue = _this$state.selectValue;
        if (isDisabled) return;
        if (typeof onKeyDown === 'function') {
          onKeyDown(event);
          if (event.defaultPrevented) {
            return;
          }
        }
  
        // Block option hover events when the user has just pressed a key
        _this.blockOptionHover = true;
        switch (event.key) {
          case 'ArrowLeft':
            if (!isMulti || inputValue) return;
            _this.focusValue('previous');
            break;
          case 'ArrowRight':
            if (!isMulti || inputValue) return;
            _this.focusValue('next');
            break;
          case 'Delete':
          case 'Backspace':
            if (inputValue) return;
            if (focusedValue) {
              _this.removeValue(focusedValue);
            } else {
              if (!backspaceRemovesValue) return;
              if (isMulti) {
                _this.popValue();
              } else if (isClearable) {
                _this.clearValue();
              }
            }
            break;
          case 'Tab':
            if (_this.isComposing) return;
            if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption ||
            // don't capture the event if the menu opens on focus and the focused
            // option is already selected; it breaks the flow of navigation
            openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
              return;
            }
            _this.selectOption(focusedOption);
            break;
          case 'Enter':
            if (event.keyCode === 229) {
              // ignore the keydown event from an Input Method Editor(IME)
              // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
              break;
            }
            if (menuIsOpen) {
              if (!focusedOption) return;
              if (_this.isComposing) return;
              _this.selectOption(focusedOption);
              break;
            }
            return;
          case 'Escape':
            if (menuIsOpen) {
              _this.setState({
                inputIsHiddenAfterUpdate: false
              });
              _this.onInputChange('', {
                action: 'menu-close',
                prevInputValue: inputValue
              });
              _this.onMenuClose();
            } else if (isClearable && escapeClearsValue) {
              _this.clearValue();
            }
            break;
          case ' ':
            // space
            if (inputValue) {
              return;
            }
            if (!menuIsOpen) {
              _this.openMenu('first');
              break;
            }
            if (!focusedOption) return;
            _this.selectOption(focusedOption);
            break;
          case 'ArrowUp':
            if (menuIsOpen) {
              _this.focusOption('up');
            } else {
              _this.openMenu('last');
            }
            break;
          case 'ArrowDown':
            if (menuIsOpen) {
              _this.focusOption('down');
            } else {
              _this.openMenu('first');
            }
            break;
          case 'PageUp':
            if (!menuIsOpen) return;
            _this.focusOption('pageup');
            break;
          case 'PageDown':
            if (!menuIsOpen) return;
            _this.focusOption('pagedown');
            break;
          case 'Home':
            if (!menuIsOpen) return;
            _this.focusOption('first');
            break;
          case 'End':
            if (!menuIsOpen) return;
            _this.focusOption('last');
            break;
          default:
            return;
        }
        event.preventDefault();
      };
      _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);
      _this.state.selectValue = (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.I)(_props.value);
      return _this;
    }
    (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Select, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.startListeningComposition();
        this.startListeningToTouch();
        if (this.props.closeMenuOnScroll && document && document.addEventListener) {
          // Listen to all scroll events, and filter them out inside of 'onScroll'
          document.addEventListener('scroll', this.onScroll, true);
        }
        if (this.props.autoFocus) {
          this.focusInput();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props6 = this.props,
          isDisabled = _this$props6.isDisabled,
          menuIsOpen = _this$props6.menuIsOpen;
        var isFocused = this.state.isFocused;
        if (
        // ensure focus is restored correctly when the control becomes enabled
        isFocused && !isDisabled && prevProps.isDisabled ||
        // ensure focus is on the Input when the menu opens
        isFocused && menuIsOpen && !prevProps.menuIsOpen) {
          this.focusInput();
        }
        if (isFocused && isDisabled && !prevProps.isDisabled) {
          // ensure select state gets blurred in case Select is programmatically disabled while focused
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            isFocused: false
          }, this.onMenuClose);
        } else if (!isFocused && !isDisabled && prevProps.isDisabled && this.inputRef === document.activeElement) {
          // ensure select state gets focused in case Select is programatically re-enabled while focused (Firefox)
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            isFocused: true
          });
        }
  
        // scroll the focused option into view if necessary
        if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
          (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.J)(this.menuListRef, this.focusedOptionRef);
          this.scrollToFocusedOptionOnUpdate = false;
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.stopListeningComposition();
        this.stopListeningToTouch();
        document.removeEventListener('scroll', this.onScroll, true);
      }
  
      // ==============================
      // Consumer Handlers
      // ==============================
    }, {
      key: "onMenuOpen",
      value: function onMenuOpen() {
        this.props.onMenuOpen();
      }
    }, {
      key: "onMenuClose",
      value: function onMenuClose() {
        this.onInputChange('', {
          action: 'menu-close',
          prevInputValue: this.props.inputValue
        });
        this.props.onMenuClose();
      }
    }, {
      key: "onInputChange",
      value: function onInputChange(newValue, actionMeta) {
        this.props.onInputChange(newValue, actionMeta);
      }
  
      // ==============================
      // Methods
      // ==============================
    }, {
      key: "focusInput",
      value: function focusInput() {
        if (!this.inputRef) return;
        this.inputRef.focus();
      }
    }, {
      key: "blurInput",
      value: function blurInput() {
        if (!this.inputRef) return;
        this.inputRef.blur();
      }
  
      // aliased for consumers
    }, {
      key: "openMenu",
      value: function openMenu(focusOption) {
        var _this2 = this;
        var _this$state2 = this.state,
          selectValue = _this$state2.selectValue,
          isFocused = _this$state2.isFocused;
        var focusableOptions = this.buildFocusableOptions();
        var openAtIndex = focusOption === 'first' ? 0 : focusableOptions.length - 1;
        if (!this.props.isMulti) {
          var selectedIndex = focusableOptions.indexOf(selectValue[0]);
          if (selectedIndex > -1) {
            openAtIndex = selectedIndex;
          }
        }
  
        // only scroll if the menu isn't already open
        this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
        this.setState({
          inputIsHiddenAfterUpdate: false,
          focusedValue: null,
          focusedOption: focusableOptions[openAtIndex]
        }, function () {
          return _this2.onMenuOpen();
        });
      }
    }, {
      key: "focusValue",
      value: function focusValue(direction) {
        var _this$state3 = this.state,
          selectValue = _this$state3.selectValue,
          focusedValue = _this$state3.focusedValue;
  
        // Only multiselects support value focusing
        if (!this.props.isMulti) return;
        this.setState({
          focusedOption: null
        });
        var focusedIndex = selectValue.indexOf(focusedValue);
        if (!focusedValue) {
          focusedIndex = -1;
        }
        var lastIndex = selectValue.length - 1;
        var nextFocus = -1;
        if (!selectValue.length) return;
        switch (direction) {
          case 'previous':
            if (focusedIndex === 0) {
              // don't cycle from the start to the end
              nextFocus = 0;
            } else if (focusedIndex === -1) {
              // if nothing is focused, focus the last value first
              nextFocus = lastIndex;
            } else {
              nextFocus = focusedIndex - 1;
            }
            break;
          case 'next':
            if (focusedIndex > -1 && focusedIndex < lastIndex) {
              nextFocus = focusedIndex + 1;
            }
            break;
        }
        this.setState({
          inputIsHidden: nextFocus !== -1,
          focusedValue: selectValue[nextFocus]
        });
      }
    }, {
      key: "focusOption",
      value: function focusOption() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
        var pageSize = this.props.pageSize;
        var focusedOption = this.state.focusedOption;
        var options = this.getFocusableOptions();
        if (!options.length) return;
        var nextFocus = 0; // handles 'first'
        var focusedIndex = options.indexOf(focusedOption);
        if (!focusedOption) {
          focusedIndex = -1;
        }
        if (direction === 'up') {
          nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
        } else if (direction === 'down') {
          nextFocus = (focusedIndex + 1) % options.length;
        } else if (direction === 'pageup') {
          nextFocus = focusedIndex - pageSize;
          if (nextFocus < 0) nextFocus = 0;
        } else if (direction === 'pagedown') {
          nextFocus = focusedIndex + pageSize;
          if (nextFocus > options.length - 1) nextFocus = options.length - 1;
        } else if (direction === 'last') {
          nextFocus = options.length - 1;
        }
        this.scrollToFocusedOptionOnUpdate = true;
        this.setState({
          focusedOption: options[nextFocus],
          focusedValue: null
        });
      }
    }, {
      key: "getTheme",
      value:
      // ==============================
      // Getters
      // ==============================
  
      function getTheme() {
        // Use the default theme if there are no customisations.
        if (!this.props.theme) {
          return defaultTheme;
        }
        // If the theme prop is a function, assume the function
        // knows how to merge the passed-in default theme with
        // its own modifications.
        if (typeof this.props.theme === 'function') {
          return this.props.theme(defaultTheme);
        }
        // Otherwise, if a plain theme object was passed in,
        // overlay it with the default theme.
        return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, defaultTheme), this.props.theme);
      }
    }, {
      key: "getCommonProps",
      value: function getCommonProps() {
        var clearValue = this.clearValue,
          cx = this.cx,
          getStyles = this.getStyles,
          getValue = this.getValue,
          selectOption = this.selectOption,
          setValue = this.setValue,
          props = this.props;
        var isMulti = props.isMulti,
          isRtl = props.isRtl,
          options = props.options;
        var hasValue = this.hasValue();
        return {
          clearValue: clearValue,
          cx: cx,
          getStyles: getStyles,
          getValue: getValue,
          hasValue: hasValue,
          isMulti: isMulti,
          isRtl: isRtl,
          options: options,
          selectOption: selectOption,
          selectProps: props,
          setValue: setValue,
          theme: this.getTheme()
        };
      }
    }, {
      key: "hasValue",
      value: function hasValue() {
        var selectValue = this.state.selectValue;
        return selectValue.length > 0;
      }
    }, {
      key: "hasOptions",
      value: function hasOptions() {
        return !!this.getFocusableOptions().length;
      }
    }, {
      key: "isClearable",
      value: function isClearable() {
        var _this$props7 = this.props,
          isClearable = _this$props7.isClearable,
          isMulti = _this$props7.isMulti;
  
        // single select, by default, IS NOT clearable
        // multi select, by default, IS clearable
        if (isClearable === undefined) return isMulti;
        return isClearable;
      }
    }, {
      key: "isOptionDisabled",
      value: function isOptionDisabled(option, selectValue) {
        return _isOptionDisabled(this.props, option, selectValue);
      }
    }, {
      key: "isOptionSelected",
      value: function isOptionSelected(option, selectValue) {
        return _isOptionSelected(this.props, option, selectValue);
      }
    }, {
      key: "filterOption",
      value: function filterOption(option, inputValue) {
        return _filterOption(this.props, option, inputValue);
      }
    }, {
      key: "formatOptionLabel",
      value: function formatOptionLabel(data, context) {
        if (typeof this.props.formatOptionLabel === 'function') {
          var _inputValue = this.props.inputValue;
          var _selectValue = this.state.selectValue;
          return this.props.formatOptionLabel(data, {
            context: context,
            inputValue: _inputValue,
            selectValue: _selectValue
          });
        } else {
          return this.getOptionLabel(data);
        }
      }
    }, {
      key: "formatGroupLabel",
      value: function formatGroupLabel(data) {
        return this.props.formatGroupLabel(data);
      }
  
      // ==============================
      // Mouse Handlers
      // ==============================
    }, {
      key: "startListeningComposition",
      value:
      // ==============================
      // Composition Handlers
      // ==============================
  
      function startListeningComposition() {
        if (document && document.addEventListener) {
          document.addEventListener('compositionstart', this.onCompositionStart, false);
          document.addEventListener('compositionend', this.onCompositionEnd, false);
        }
      }
    }, {
      key: "stopListeningComposition",
      value: function stopListeningComposition() {
        if (document && document.removeEventListener) {
          document.removeEventListener('compositionstart', this.onCompositionStart);
          document.removeEventListener('compositionend', this.onCompositionEnd);
        }
      }
    }, {
      key: "startListeningToTouch",
      value:
      // ==============================
      // Touch Handlers
      // ==============================
  
      function startListeningToTouch() {
        if (document && document.addEventListener) {
          document.addEventListener('touchstart', this.onTouchStart, false);
          document.addEventListener('touchmove', this.onTouchMove, false);
          document.addEventListener('touchend', this.onTouchEnd, false);
        }
      }
    }, {
      key: "stopListeningToTouch",
      value: function stopListeningToTouch() {
        if (document && document.removeEventListener) {
          document.removeEventListener('touchstart', this.onTouchStart);
          document.removeEventListener('touchmove', this.onTouchMove);
          document.removeEventListener('touchend', this.onTouchEnd);
        }
      }
    }, {
      key: "renderInput",
      value:
      // ==============================
      // Renderers
      // ==============================
      function renderInput() {
        var _this$props8 = this.props,
          isDisabled = _this$props8.isDisabled,
          isSearchable = _this$props8.isSearchable,
          inputId = _this$props8.inputId,
          inputValue = _this$props8.inputValue,
          tabIndex = _this$props8.tabIndex,
          form = _this$props8.form,
          menuIsOpen = _this$props8.menuIsOpen;
        var _this$getComponents = this.getComponents(),
          Input = _this$getComponents.Input;
        var _this$state4 = this.state,
          inputIsHidden = _this$state4.inputIsHidden,
          ariaSelection = _this$state4.ariaSelection;
        var commonProps = this.commonProps;
        var id = inputId || this.getElementId('input');
  
        // aria attributes makes the JSX "noisy", separated for clarity
        var ariaAttributes = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({
          'aria-autocomplete': 'list',
          'aria-expanded': menuIsOpen,
          'aria-haspopup': true,
          'aria-errormessage': this.props['aria-errormessage'],
          'aria-invalid': this.props['aria-invalid'],
          'aria-label': this.props['aria-label'],
          'aria-labelledby': this.props['aria-labelledby'],
          role: 'combobox'
        }, menuIsOpen && {
          'aria-controls': this.getElementId('listbox'),
          'aria-owns': this.getElementId('listbox')
        }), !isSearchable && {
          'aria-readonly': true
        }), this.hasValue() ? (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus' && {
          'aria-describedby': this.getElementId('live-region')
        } : {
          'aria-describedby': this.getElementId('placeholder')
        });
        if (!isSearchable) {
          // use a dummy input to maintain focus/blur functionality
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(DummyInput, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
            id: id,
            innerRef: this.getInputRef,
            onBlur: this.onInputBlur,
            onChange: _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.K,
            onFocus: this.onInputFocus,
            disabled: isDisabled,
            tabIndex: tabIndex,
            inputMode: "none",
            form: form,
            value: ""
          }, ariaAttributes));
        }
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Input, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          autoCapitalize: "none",
          autoComplete: "off",
          autoCorrect: "off",
          id: id,
          innerRef: this.getInputRef,
          isDisabled: isDisabled,
          isHidden: inputIsHidden,
          onBlur: this.onInputBlur,
          onChange: this.handleInputChange,
          onFocus: this.onInputFocus,
          spellCheck: "false",
          tabIndex: tabIndex,
          form: form,
          type: "text",
          value: inputValue
        }, ariaAttributes));
      }
    }, {
      key: "renderPlaceholderOrValue",
      value: function renderPlaceholderOrValue() {
        var _this3 = this;
        var _this$getComponents2 = this.getComponents(),
          MultiValue = _this$getComponents2.MultiValue,
          MultiValueContainer = _this$getComponents2.MultiValueContainer,
          MultiValueLabel = _this$getComponents2.MultiValueLabel,
          MultiValueRemove = _this$getComponents2.MultiValueRemove,
          SingleValue = _this$getComponents2.SingleValue,
          Placeholder = _this$getComponents2.Placeholder;
        var commonProps = this.commonProps;
        var _this$props9 = this.props,
          controlShouldRenderValue = _this$props9.controlShouldRenderValue,
          isDisabled = _this$props9.isDisabled,
          isMulti = _this$props9.isMulti,
          inputValue = _this$props9.inputValue,
          placeholder = _this$props9.placeholder;
        var _this$state5 = this.state,
          selectValue = _this$state5.selectValue,
          focusedValue = _this$state5.focusedValue,
          isFocused = _this$state5.isFocused;
        if (!this.hasValue() || !controlShouldRenderValue) {
          return inputValue ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Placeholder, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
            key: "placeholder",
            isDisabled: isDisabled,
            isFocused: isFocused,
            innerProps: {
              id: this.getElementId('placeholder')
            }
          }), placeholder);
        }
        if (isMulti) {
          return selectValue.map(function (opt, index) {
            var isOptionFocused = opt === focusedValue;
            var key = "".concat(_this3.getOptionLabel(opt), "-").concat(_this3.getOptionValue(opt));
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(MultiValue, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
              components: {
                Container: MultiValueContainer,
                Label: MultiValueLabel,
                Remove: MultiValueRemove
              },
              isFocused: isOptionFocused,
              isDisabled: isDisabled,
              key: key,
              index: index,
              removeProps: {
                onClick: function onClick() {
                  return _this3.removeValue(opt);
                },
                onTouchEnd: function onTouchEnd() {
                  return _this3.removeValue(opt);
                },
                onMouseDown: function onMouseDown(e) {
                  e.preventDefault();
                }
              },
              data: opt
            }), _this3.formatOptionLabel(opt, 'value'));
          });
        }
        if (inputValue) {
          return null;
        }
        var singleValue = selectValue[0];
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(SingleValue, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          data: singleValue,
          isDisabled: isDisabled
        }), this.formatOptionLabel(singleValue, 'value'));
      }
    }, {
      key: "renderClearIndicator",
      value: function renderClearIndicator() {
        var _this$getComponents3 = this.getComponents(),
          ClearIndicator = _this$getComponents3.ClearIndicator;
        var commonProps = this.commonProps;
        var _this$props10 = this.props,
          isDisabled = _this$props10.isDisabled,
          isLoading = _this$props10.isLoading;
        var isFocused = this.state.isFocused;
        if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
          return null;
        }
        var innerProps = {
          onMouseDown: this.onClearIndicatorMouseDown,
          onTouchEnd: this.onClearIndicatorTouchEnd,
          'aria-hidden': 'true'
        };
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(ClearIndicator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          innerProps: innerProps,
          isFocused: isFocused
        }));
      }
    }, {
      key: "renderLoadingIndicator",
      value: function renderLoadingIndicator() {
        var _this$getComponents4 = this.getComponents(),
          LoadingIndicator = _this$getComponents4.LoadingIndicator;
        var commonProps = this.commonProps;
        var _this$props11 = this.props,
          isDisabled = _this$props11.isDisabled,
          isLoading = _this$props11.isLoading;
        var isFocused = this.state.isFocused;
        if (!LoadingIndicator || !isLoading) return null;
        var innerProps = {
          'aria-hidden': 'true'
        };
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(LoadingIndicator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          innerProps: innerProps,
          isDisabled: isDisabled,
          isFocused: isFocused
        }));
      }
    }, {
      key: "renderIndicatorSeparator",
      value: function renderIndicatorSeparator() {
        var _this$getComponents5 = this.getComponents(),
          DropdownIndicator = _this$getComponents5.DropdownIndicator,
          IndicatorSeparator = _this$getComponents5.IndicatorSeparator;
  
        // separator doesn't make sense without the dropdown indicator
        if (!DropdownIndicator || !IndicatorSeparator) return null;
        var commonProps = this.commonProps;
        var isDisabled = this.props.isDisabled;
        var isFocused = this.state.isFocused;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(IndicatorSeparator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          isDisabled: isDisabled,
          isFocused: isFocused
        }));
      }
    }, {
      key: "renderDropdownIndicator",
      value: function renderDropdownIndicator() {
        var _this$getComponents6 = this.getComponents(),
          DropdownIndicator = _this$getComponents6.DropdownIndicator;
        if (!DropdownIndicator) return null;
        var commonProps = this.commonProps;
        var isDisabled = this.props.isDisabled;
        var isFocused = this.state.isFocused;
        var innerProps = {
          onMouseDown: this.onDropdownIndicatorMouseDown,
          onTouchEnd: this.onDropdownIndicatorTouchEnd,
          'aria-hidden': 'true'
        };
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(DropdownIndicator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          innerProps: innerProps,
          isDisabled: isDisabled,
          isFocused: isFocused
        }));
      }
    }, {
      key: "renderMenu",
      value: function renderMenu() {
        var _this4 = this;
        var _this$getComponents7 = this.getComponents(),
          Group = _this$getComponents7.Group,
          GroupHeading = _this$getComponents7.GroupHeading,
          Menu = _this$getComponents7.Menu,
          MenuList = _this$getComponents7.MenuList,
          MenuPortal = _this$getComponents7.MenuPortal,
          LoadingMessage = _this$getComponents7.LoadingMessage,
          NoOptionsMessage = _this$getComponents7.NoOptionsMessage,
          Option = _this$getComponents7.Option;
        var commonProps = this.commonProps;
        var focusedOption = this.state.focusedOption;
        var _this$props12 = this.props,
          captureMenuScroll = _this$props12.captureMenuScroll,
          inputValue = _this$props12.inputValue,
          isLoading = _this$props12.isLoading,
          loadingMessage = _this$props12.loadingMessage,
          minMenuHeight = _this$props12.minMenuHeight,
          maxMenuHeight = _this$props12.maxMenuHeight,
          menuIsOpen = _this$props12.menuIsOpen,
          menuPlacement = _this$props12.menuPlacement,
          menuPosition = _this$props12.menuPosition,
          menuPortalTarget = _this$props12.menuPortalTarget,
          menuShouldBlockScroll = _this$props12.menuShouldBlockScroll,
          menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView,
          noOptionsMessage = _this$props12.noOptionsMessage,
          onMenuScrollToTop = _this$props12.onMenuScrollToTop,
          onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
        if (!menuIsOpen) return null;
  
        // TODO: Internal Option Type here
        var render = function render(props, id) {
          var type = props.type,
            data = props.data,
            isDisabled = props.isDisabled,
            isSelected = props.isSelected,
            label = props.label,
            value = props.value;
          var isFocused = focusedOption === data;
          var onHover = isDisabled ? undefined : function () {
            return _this4.onOptionHover(data);
          };
          var onSelect = isDisabled ? undefined : function () {
            return _this4.selectOption(data);
          };
          var optionId = "".concat(_this4.getElementId('option'), "-").concat(id);
          var innerProps = {
            id: optionId,
            onClick: onSelect,
            onMouseMove: onHover,
            onMouseOver: onHover,
            tabIndex: -1
          };
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Option, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
            innerProps: innerProps,
            data: data,
            isDisabled: isDisabled,
            isSelected: isSelected,
            key: optionId,
            label: label,
            type: type,
            value: value,
            isFocused: isFocused,
            innerRef: isFocused ? _this4.getFocusedOptionRef : undefined
          }), _this4.formatOptionLabel(props.data, 'menu'));
        };
        var menuUI;
        if (this.hasOptions()) {
          menuUI = this.getCategorizedOptions().map(function (item) {
            if (item.type === 'group') {
              var _data = item.data,
                options = item.options,
                groupIndex = item.index;
              var groupId = "".concat(_this4.getElementId('group'), "-").concat(groupIndex);
              var headingId = "".concat(groupId, "-heading");
              return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Group, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
                key: groupId,
                data: _data,
                options: options,
                Heading: GroupHeading,
                headingProps: {
                  id: headingId,
                  data: item.data
                },
                label: _this4.formatGroupLabel(item.data)
              }), item.options.map(function (option) {
                return render(option, "".concat(groupIndex, "-").concat(option.index));
              }));
            } else if (item.type === 'option') {
              return render(item, "".concat(item.index));
            }
          });
        } else if (isLoading) {
          var message = loadingMessage({
            inputValue: inputValue
          });
          if (message === null) return null;
          menuUI = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(LoadingMessage, commonProps, message);
        } else {
          var _message = noOptionsMessage({
            inputValue: inputValue
          });
          if (_message === null) return null;
          menuUI = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(NoOptionsMessage, commonProps, _message);
        }
        var menuPlacementProps = {
          minMenuHeight: minMenuHeight,
          maxMenuHeight: maxMenuHeight,
          menuPlacement: menuPlacement,
          menuPosition: menuPosition,
          menuShouldScrollIntoView: menuShouldScrollIntoView
        };
        var menuElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.M, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, menuPlacementProps), function (_ref4) {
          var ref = _ref4.ref,
            _ref4$placerProps = _ref4.placerProps,
            placement = _ref4$placerProps.placement,
            maxHeight = _ref4$placerProps.maxHeight;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Menu, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, menuPlacementProps, {
            innerRef: ref,
            innerProps: {
              onMouseDown: _this4.onMenuMouseDown,
              onMouseMove: _this4.onMenuMouseMove,
              id: _this4.getElementId('listbox')
            },
            isLoading: isLoading,
            placement: placement
          }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(ScrollManager, {
            captureEnabled: captureMenuScroll,
            onTopArrive: onMenuScrollToTop,
            onBottomArrive: onMenuScrollToBottom,
            lockEnabled: menuShouldBlockScroll
          }, function (scrollTargetRef) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(MenuList, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
              innerRef: function innerRef(instance) {
                _this4.getMenuListRef(instance);
                scrollTargetRef(instance);
              },
              isLoading: isLoading,
              maxHeight: maxHeight,
              focusedOption: focusedOption
            }), menuUI);
          }));
        });
  
        // positioning behaviour is almost identical for portalled and fixed,
        // so we use the same component. the actual portalling logic is forked
        // within the component based on `menuPosition`
        return menuPortalTarget || menuPosition === 'fixed' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(MenuPortal, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          appendTo: menuPortalTarget,
          controlElement: this.controlRef,
          menuPlacement: menuPlacement,
          menuPosition: menuPosition
        }), menuElement) : menuElement;
      }
    }, {
      key: "renderFormField",
      value: function renderFormField() {
        var _this5 = this;
        var _this$props13 = this.props,
          delimiter = _this$props13.delimiter,
          isDisabled = _this$props13.isDisabled,
          isMulti = _this$props13.isMulti,
          name = _this$props13.name;
        var selectValue = this.state.selectValue;
        if (!name || isDisabled) return;
        if (isMulti) {
          if (delimiter) {
            var value = selectValue.map(function (opt) {
              return _this5.getOptionValue(opt);
            }).join(delimiter);
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", {
              name: name,
              type: "hidden",
              value: value
            });
          } else {
            var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
              return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", {
                key: "i-".concat(i),
                name: name,
                type: "hidden",
                value: _this5.getOptionValue(opt)
              });
            }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", {
              name: name,
              type: "hidden"
            });
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("div", null, input);
          }
        } else {
          var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", {
            name: name,
            type: "hidden",
            value: _value
          });
        }
      }
    }, {
      key: "renderLiveRegion",
      value: function renderLiveRegion() {
        var commonProps = this.commonProps;
        var _this$state6 = this.state,
          ariaSelection = _this$state6.ariaSelection,
          focusedOption = _this$state6.focusedOption,
          focusedValue = _this$state6.focusedValue,
          isFocused = _this$state6.isFocused,
          selectValue = _this$state6.selectValue;
        var focusableOptions = this.getFocusableOptions();
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(LiveRegion, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          id: this.getElementId('live-region'),
          ariaSelection: ariaSelection,
          focusedOption: focusedOption,
          focusedValue: focusedValue,
          isFocused: isFocused,
          selectValue: selectValue,
          focusableOptions: focusableOptions
        }));
      }
    }, {
      key: "render",
      value: function render() {
        var _this$getComponents8 = this.getComponents(),
          Control = _this$getComponents8.Control,
          IndicatorsContainer = _this$getComponents8.IndicatorsContainer,
          SelectContainer = _this$getComponents8.SelectContainer,
          ValueContainer = _this$getComponents8.ValueContainer;
        var _this$props14 = this.props,
          className = _this$props14.className,
          id = _this$props14.id,
          isDisabled = _this$props14.isDisabled,
          menuIsOpen = _this$props14.menuIsOpen;
        var isFocused = this.state.isFocused;
        var commonProps = this.commonProps = this.getCommonProps();
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(SelectContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          className: className,
          innerProps: {
            id: id,
            onKeyDown: this.onKeyDown
          },
          isDisabled: isDisabled,
          isFocused: isFocused
        }), this.renderLiveRegion(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Control, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          innerRef: this.getControlRef,
          innerProps: {
            onMouseDown: this.onControlMouseDown,
            onTouchEnd: this.onControlTouchEnd
          },
          isDisabled: isDisabled,
          isFocused: isFocused,
          menuIsOpen: menuIsOpen
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(ValueContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          isDisabled: isDisabled
        }), this.renderPlaceholderOrValue(), this.renderInput()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(IndicatorsContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          isDisabled: isDisabled
        }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        var prevProps = state.prevProps,
          clearFocusValueOnUpdate = state.clearFocusValueOnUpdate,
          inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate,
          ariaSelection = state.ariaSelection,
          isFocused = state.isFocused,
          prevWasFocused = state.prevWasFocused;
        var options = props.options,
          value = props.value,
          menuIsOpen = props.menuIsOpen,
          inputValue = props.inputValue,
          isMulti = props.isMulti;
        var selectValue = (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.I)(value);
        var newMenuOptionsState = {};
        if (prevProps && (value !== prevProps.value || options !== prevProps.options || menuIsOpen !== prevProps.menuIsOpen || inputValue !== prevProps.inputValue)) {
          var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];
          var focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
          var focusedOption = getNextFocusedOption(state, focusableOptions);
          newMenuOptionsState = {
            selectValue: selectValue,
            focusedOption: focusedOption,
            focusedValue: focusedValue,
            clearFocusValueOnUpdate: false
          };
        }
        // some updates should toggle the state of the input visibility
        var newInputIsHiddenState = inputIsHiddenAfterUpdate != null && props !== prevProps ? {
          inputIsHidden: inputIsHiddenAfterUpdate,
          inputIsHiddenAfterUpdate: undefined
        } : {};
        var newAriaSelection = ariaSelection;
        var hasKeptFocus = isFocused && prevWasFocused;
        if (isFocused && !hasKeptFocus) {
          // If `value` or `defaultValue` props are not empty then announce them
          // when the Select is initially focused
          newAriaSelection = {
            value: (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_11__.D)(isMulti, selectValue, selectValue[0] || null),
            options: selectValue,
            action: 'initial-input-focus'
          };
          hasKeptFocus = !prevWasFocused;
        }
  
        // If the 'initial-input-focus' action has been set already
        // then reset the ariaSelection to null
        if ((ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus') {
          newAriaSelection = null;
        }
        return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, newMenuOptionsState), newInputIsHiddenState), {}, {
          prevProps: props,
          ariaSelection: newAriaSelection,
          prevWasFocused: hasKeptFocus
        });
      }
    }]);
    return Select;
  }(react__WEBPACK_IMPORTED_MODULE_7__.Component);
  Select.defaultProps = defaultProps;
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/react-select/dist/index-9f7dc477.esm.js":
  /*!**************************************************************!*\
    !*** ./node_modules/react-select/dist/index-9f7dc477.esm.js ***!
    \**************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "A": function() { return /* binding */ isMobileDevice; },
  /* harmony export */   "B": function() { return /* binding */ multiValueAsValue; },
  /* harmony export */   "C": function() { return /* binding */ singleValueAsValue; },
  /* harmony export */   "D": function() { return /* binding */ valueTernary; },
  /* harmony export */   "E": function() { return /* binding */ classNames; },
  /* harmony export */   "F": function() { return /* binding */ defaultComponents; },
  /* harmony export */   "G": function() { return /* binding */ notNullish; },
  /* harmony export */   "H": function() { return /* binding */ isDocumentElement; },
  /* harmony export */   "I": function() { return /* binding */ cleanValue; },
  /* harmony export */   "J": function() { return /* binding */ scrollIntoView; },
  /* harmony export */   "K": function() { return /* binding */ noop; },
  /* harmony export */   "L": function() { return /* binding */ handleInputChange; },
  /* harmony export */   "M": function() { return /* binding */ MenuPlacer; },
  /* harmony export */   "a": function() { return /* binding */ clearIndicatorCSS; },
  /* harmony export */   "b": function() { return /* binding */ containerCSS; },
  /* harmony export */   "c": function() { return /* binding */ components; },
  /* harmony export */   "d": function() { return /* binding */ css$1; },
  /* harmony export */   "e": function() { return /* binding */ dropdownIndicatorCSS; },
  /* harmony export */   "f": function() { return /* binding */ groupHeadingCSS; },
  /* harmony export */   "g": function() { return /* binding */ groupCSS; },
  /* harmony export */   "h": function() { return /* binding */ indicatorSeparatorCSS; },
  /* harmony export */   "i": function() { return /* binding */ indicatorsContainerCSS; },
  /* harmony export */   "j": function() { return /* binding */ inputCSS; },
  /* harmony export */   "k": function() { return /* binding */ loadingMessageCSS; },
  /* harmony export */   "l": function() { return /* binding */ loadingIndicatorCSS; },
  /* harmony export */   "m": function() { return /* binding */ menuCSS; },
  /* harmony export */   "n": function() { return /* binding */ menuListCSS; },
  /* harmony export */   "o": function() { return /* binding */ menuPortalCSS; },
  /* harmony export */   "p": function() { return /* binding */ multiValueCSS; },
  /* harmony export */   "q": function() { return /* binding */ multiValueLabelCSS; },
  /* harmony export */   "r": function() { return /* binding */ removeProps; },
  /* harmony export */   "s": function() { return /* binding */ supportsPassiveEvents; },
  /* harmony export */   "t": function() { return /* binding */ multiValueRemoveCSS; },
  /* harmony export */   "u": function() { return /* binding */ noOptionsMessageCSS; },
  /* harmony export */   "v": function() { return /* binding */ optionCSS; },
  /* harmony export */   "w": function() { return /* binding */ placeholderCSS; },
  /* harmony export */   "x": function() { return /* binding */ css; },
  /* harmony export */   "y": function() { return /* binding */ valueContainerCSS; },
  /* harmony export */   "z": function() { return /* binding */ isTouchCapable; }
  /* harmony export */ });
  /* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
  /* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
  /* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
  /* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
  /* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
  /* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
  /* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
  /* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dom */ "react-dom");
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_8__);
  /* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @floating-ui/dom */ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.mjs");
  /* harmony import */ var use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! use-isomorphic-layout-effect */ "./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js");
  
  
  
  
  
  
  
  
  
  
  
  
  
  var _excluded$3 = ["className", "clearValue", "cx", "getStyles", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"];
  // ==============================
  // NO OP
  // ==============================
  
  var noop = function noop() {};
  
  // ==============================
  // Class Name Prefixer
  // ==============================
  
  /**
   String representation of component state for styling with class names.
  
   Expects an array of strings OR a string/object pair:
   - className(['comp', 'comp-arg', 'comp-arg-2'])
     @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
   - className('comp', { some: true, state: false })
     @returns 'react-select__comp react-select__comp--some'
  */
  function applyPrefixToName(prefix, name) {
    if (!name) {
      return prefix;
    } else if (name[0] === '-') {
      return prefix + name;
    } else {
      return prefix + '__' + name;
    }
  }
  function classNames(prefix, state, className) {
    var arr = [className];
    if (state && prefix) {
      for (var key in state) {
        if (state.hasOwnProperty(key) && state[key]) {
          arr.push("".concat(applyPrefixToName(prefix, key)));
        }
      }
    }
    return arr.filter(function (i) {
      return i;
    }).map(function (i) {
      return String(i).trim();
    }).join(' ');
  }
  // ==============================
  // Clean Value
  // ==============================
  
  var cleanValue = function cleanValue(value) {
    if (isArray(value)) return value.filter(Boolean);
    if ((0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__["default"])(value) === 'object' && value !== null) return [value];
    return [];
  };
  
  // ==============================
  // Clean Common Props
  // ==============================
  
  var cleanCommonProps = function cleanCommonProps(props) {
    //className
    props.className;
      props.clearValue;
      props.cx;
      props.getStyles;
      props.getValue;
      props.hasValue;
      props.isMulti;
      props.isRtl;
      props.options;
      props.selectOption;
      props.selectProps;
      props.setValue;
      props.theme;
      var innerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(props, _excluded$3);
    return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, innerProps);
  };
  
  // ==============================
  // Handle Input Change
  // ==============================
  
  function handleInputChange(inputValue, actionMeta, onInputChange) {
    if (onInputChange) {
      var _newValue = onInputChange(inputValue, actionMeta);
      if (typeof _newValue === 'string') return _newValue;
    }
    return inputValue;
  }
  
  // ==============================
  // Scroll Helpers
  // ==============================
  
  function isDocumentElement(el) {
    return [document.documentElement, document.body, window].indexOf(el) > -1;
  }
  
  // Normalized Scroll Top
  // ------------------------------
  
  function normalizedHeight(el) {
    if (isDocumentElement(el)) {
      return window.innerHeight;
    }
    return el.clientHeight;
  }
  
  // Normalized scrollTo & scrollTop
  // ------------------------------
  
  function getScrollTop(el) {
    if (isDocumentElement(el)) {
      return window.pageYOffset;
    }
    return el.scrollTop;
  }
  function scrollTo(el, top) {
    // with a scroll distance, we perform scroll on the element
    if (isDocumentElement(el)) {
      window.scrollTo(0, top);
      return;
    }
    el.scrollTop = top;
  }
  
  // Get Scroll Parent
  // ------------------------------
  
  function getScrollParent(element) {
    var style = getComputedStyle(element);
    var excludeStaticParent = style.position === 'absolute';
    var overflowRx = /(auto|scroll)/;
    if (style.position === 'fixed') return document.documentElement;
    for (var parent = element; parent = parent.parentElement;) {
      style = getComputedStyle(parent);
      if (excludeStaticParent && style.position === 'static') {
        continue;
      }
      if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
        return parent;
      }
    }
    return document.documentElement;
  }
  
  // Animated Scroll To
  // ------------------------------
  
  /**
    @param t: time (elapsed)
    @param b: initial value
    @param c: amount of change
    @param d: duration
  */
  function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }
  function animatedScrollTo(element, to) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    var start = getScrollTop(element);
    var change = to - start;
    var increment = 10;
    var currentTime = 0;
    function animateScroll() {
      currentTime += increment;
      var val = easeOutCubic(currentTime, start, change, duration);
      scrollTo(element, val);
      if (currentTime < duration) {
        window.requestAnimationFrame(animateScroll);
      } else {
        callback(element);
      }
    }
    animateScroll();
  }
  
  // Scroll Into View
  // ------------------------------
  
  function scrollIntoView(menuEl, focusedEl) {
    var menuRect = menuEl.getBoundingClientRect();
    var focusedRect = focusedEl.getBoundingClientRect();
    var overScroll = focusedEl.offsetHeight / 3;
    if (focusedRect.bottom + overScroll > menuRect.bottom) {
      scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
    } else if (focusedRect.top - overScroll < menuRect.top) {
      scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
    }
  }
  
  // ==============================
  // Get bounding client object
  // ==============================
  
  // cannot get keys using array notation with DOMRect
  function getBoundingClientObj(element) {
    var rect = element.getBoundingClientRect();
    return {
      bottom: rect.bottom,
      height: rect.height,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width
    };
  }
  
  // ==============================
  // Touch Capability Detector
  // ==============================
  
  function isTouchCapable() {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  }
  
  // ==============================
  // Mobile Device Detector
  // ==============================
  
  function isMobileDevice() {
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    } catch (e) {
      return false;
    }
  }
  
  // ==============================
  // Passive Event Detector
  // ==============================
  
  // https://github.com/rafgraph/detect-it/blob/main/src/index.ts#L19-L36
  var passiveOptionAccessed = false;
  var options = {
    get passive() {
      return passiveOptionAccessed = true;
    }
  };
  // check for SSR
  var w = typeof window !== 'undefined' ? window : {};
  if (w.addEventListener && w.removeEventListener) {
    w.addEventListener('p', noop, options);
    w.removeEventListener('p', noop, false);
  }
  var supportsPassiveEvents = passiveOptionAccessed;
  function notNullish(item) {
    return item != null;
  }
  function isArray(arg) {
    return Array.isArray(arg);
  }
  function valueTernary(isMulti, multiValue, singleValue) {
    return isMulti ? multiValue : singleValue;
  }
  function singleValueAsValue(singleValue) {
    return singleValue;
  }
  function multiValueAsValue(multiValue) {
    return multiValue;
  }
  var removeProps = function removeProps(propsObj) {
    for (var _len = arguments.length, properties = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      properties[_key - 1] = arguments[_key];
    }
    var propsMap = Object.entries(propsObj).filter(function (_ref) {
      var _ref2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref, 1),
        key = _ref2[0];
      return !properties.includes(key);
    });
    return propsMap.reduce(function (newProps, _ref3) {
      var _ref4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];
      newProps[key] = val;
      return newProps;
    }, {});
  };
  
  function getMenuPlacement(_ref) {
    var preferredMaxHeight = _ref.maxHeight,
      menuEl = _ref.menuEl,
      minHeight = _ref.minHeight,
      preferredPlacement = _ref.placement,
      shouldScroll = _ref.shouldScroll,
      isFixedPosition = _ref.isFixedPosition,
      theme = _ref.theme;
    var spacing = theme.spacing;
    var scrollParent = getScrollParent(menuEl);
    var defaultState = {
      placement: 'bottom',
      maxHeight: preferredMaxHeight
    };
  
    // something went wrong, return default state
    if (!menuEl || !menuEl.offsetParent) return defaultState;
  
    // we can't trust `scrollParent.scrollHeight` --> it may increase when
    // the menu is rendered
    var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
      scrollHeight = _scrollParent$getBoun.height;
    var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
      menuBottom = _menuEl$getBoundingCl.bottom,
      menuHeight = _menuEl$getBoundingCl.height,
      menuTop = _menuEl$getBoundingCl.top;
    var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
      containerTop = _menuEl$offsetParent$.top;
    var viewHeight = isFixedPosition ? window.innerHeight : normalizedHeight(scrollParent);
    var scrollTop = getScrollTop(scrollParent);
    var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
    var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
    var viewSpaceAbove = containerTop - marginTop;
    var viewSpaceBelow = viewHeight - menuTop;
    var scrollSpaceAbove = viewSpaceAbove + scrollTop;
    var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
    var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
    var scrollUp = scrollTop + menuTop - marginTop;
    var scrollDuration = 160;
    switch (preferredPlacement) {
      case 'auto':
      case 'bottom':
        // 1: the menu will fit, do nothing
        if (viewSpaceBelow >= menuHeight) {
          return {
            placement: 'bottom',
            maxHeight: preferredMaxHeight
          };
        }
  
        // 2: the menu will fit, if scrolled
        if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
          if (shouldScroll) {
            animatedScrollTo(scrollParent, scrollDown, scrollDuration);
          }
          return {
            placement: 'bottom',
            maxHeight: preferredMaxHeight
          };
        }
  
        // 3: the menu will fit, if constrained
        if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
          if (shouldScroll) {
            animatedScrollTo(scrollParent, scrollDown, scrollDuration);
          }
  
          // we want to provide as much of the menu as possible to the user,
          // so give them whatever is available below rather than the minHeight.
          var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
          return {
            placement: 'bottom',
            maxHeight: constrainedHeight
          };
        }
  
        // 4. Forked beviour when there isn't enough space below
  
        // AUTO: flip the menu, render above
        if (preferredPlacement === 'auto' || isFixedPosition) {
          // may need to be constrained after flipping
          var _constrainedHeight = preferredMaxHeight;
          var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;
          if (spaceAbove >= minHeight) {
            _constrainedHeight = Math.min(spaceAbove - marginBottom - spacing.controlHeight, preferredMaxHeight);
          }
          return {
            placement: 'top',
            maxHeight: _constrainedHeight
          };
        }
  
        // BOTTOM: allow browser to increase scrollable area and immediately set scroll
        if (preferredPlacement === 'bottom') {
          if (shouldScroll) {
            scrollTo(scrollParent, scrollDown);
          }
          return {
            placement: 'bottom',
            maxHeight: preferredMaxHeight
          };
        }
        break;
      case 'top':
        // 1: the menu will fit, do nothing
        if (viewSpaceAbove >= menuHeight) {
          return {
            placement: 'top',
            maxHeight: preferredMaxHeight
          };
        }
  
        // 2: the menu will fit, if scrolled
        if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
          if (shouldScroll) {
            animatedScrollTo(scrollParent, scrollUp, scrollDuration);
          }
          return {
            placement: 'top',
            maxHeight: preferredMaxHeight
          };
        }
  
        // 3: the menu will fit, if constrained
        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          var _constrainedHeight2 = preferredMaxHeight;
  
          // we want to provide as much of the menu as possible to the user,
          // so give them whatever is available below rather than the minHeight.
          if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
            _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
          }
          if (shouldScroll) {
            animatedScrollTo(scrollParent, scrollUp, scrollDuration);
          }
          return {
            placement: 'top',
            maxHeight: _constrainedHeight2
          };
        }
  
        // 4. not enough space, the browser WILL NOT increase scrollable area when
        // absolutely positioned element rendered above the viewport (only below).
        // Flip the menu, render below
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      default:
        throw new Error("Invalid placement provided \"".concat(preferredPlacement, "\"."));
    }
    return defaultState;
  }
  
  // Menu Component
  // ------------------------------
  
  function alignToControl(placement) {
    var placementToCSSProp = {
      bottom: 'top',
      top: 'bottom'
    };
    return placement ? placementToCSSProp[placement] : 'bottom';
  }
  var coercePlacement = function coercePlacement(p) {
    return p === 'auto' ? 'bottom' : p;
  };
  var menuCSS = function menuCSS(_ref2) {
    var _ref3;
    var placement = _ref2.placement,
      _ref2$theme = _ref2.theme,
      borderRadius = _ref2$theme.borderRadius,
      spacing = _ref2$theme.spacing,
      colors = _ref2$theme.colors;
    return _ref3 = {
      label: 'menu'
    }, (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref3, alignToControl(placement), '100%'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref3, "backgroundColor", colors.neutral0), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref3, "borderRadius", borderRadius), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref3, "boxShadow", '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref3, "marginBottom", spacing.menuGutter), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref3, "marginTop", spacing.menuGutter), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref3, "position", 'absolute'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref3, "width", '100%'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(_ref3, "zIndex", 1), _ref3;
  };
  var PortalPlacementContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.createContext)(null);
  
  // NOTE: internal only
  var MenuPlacer = function MenuPlacer(props) {
    var children = props.children,
      minMenuHeight = props.minMenuHeight,
      maxMenuHeight = props.maxMenuHeight,
      menuPlacement = props.menuPlacement,
      menuPosition = props.menuPosition,
      menuShouldScrollIntoView = props.menuShouldScrollIntoView,
      theme = props.theme;
    var _ref4 = (0,react__WEBPACK_IMPORTED_MODULE_7__.useContext)(PortalPlacementContext) || {},
      setPortalPlacement = _ref4.setPortalPlacement;
    var ref = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
    var _useState = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(maxMenuHeight),
      _useState2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState, 2),
      maxHeight = _useState2[0],
      setMaxHeight = _useState2[1];
    var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(null),
      _useState4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState3, 2),
      placement = _useState4[0],
      setPlacement = _useState4[1];
    (0,use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_9__["default"])(function () {
      var menuEl = ref.current;
      if (!menuEl) return;
  
      // DO NOT scroll if position is fixed
      var isFixedPosition = menuPosition === 'fixed';
      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
      var state = getMenuPlacement({
        maxHeight: maxMenuHeight,
        menuEl: menuEl,
        minHeight: minMenuHeight,
        placement: menuPlacement,
        shouldScroll: shouldScroll,
        isFixedPosition: isFixedPosition,
        theme: theme
      });
      setMaxHeight(state.maxHeight);
      setPlacement(state.placement);
      setPortalPlacement === null || setPortalPlacement === void 0 ? void 0 : setPortalPlacement(state.placement);
    }, [maxMenuHeight, menuPlacement, menuPosition, menuShouldScrollIntoView, minMenuHeight, setPortalPlacement, theme]);
    return children({
      ref: ref,
      placerProps: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props), {}, {
        placement: placement || coercePlacement(menuPlacement),
        maxHeight: maxHeight
      })
    });
  };
  var Menu = function Menu(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerRef = props.innerRef,
      innerProps = props.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('menu', props),
      className: cx({
        menu: true
      }, className),
      ref: innerRef
    }, innerProps), children);
  };
  
  // ==============================
  // Menu List
  // ==============================
  
  var menuListCSS = function menuListCSS(_ref5) {
    var maxHeight = _ref5.maxHeight,
      baseUnit = _ref5.theme.spacing.baseUnit;
    return {
      maxHeight: maxHeight,
      overflowY: 'auto',
      paddingBottom: baseUnit,
      paddingTop: baseUnit,
      position: 'relative',
      // required for offset[Height, Top] > keyboard scroll
      WebkitOverflowScrolling: 'touch'
    };
  };
  var MenuList = function MenuList(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      innerRef = props.innerRef,
      isMulti = props.isMulti;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('menuList', props),
      className: cx({
        'menu-list': true,
        'menu-list--is-multi': isMulti
      }, className),
      ref: innerRef
    }, innerProps), children);
  };
  
  // ==============================
  // Menu Notices
  // ==============================
  
  var noticeCSS = function noticeCSS(_ref6) {
    var _ref6$theme = _ref6.theme,
      baseUnit = _ref6$theme.spacing.baseUnit,
      colors = _ref6$theme.colors;
    return {
      color: colors.neutral40,
      padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px"),
      textAlign: 'center'
    };
  };
  var noOptionsMessageCSS = noticeCSS;
  var loadingMessageCSS = noticeCSS;
  var NoOptionsMessage = function NoOptionsMessage(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('noOptionsMessage', props),
      className: cx({
        'menu-notice': true,
        'menu-notice--no-options': true
      }, className)
    }, innerProps), children);
  };
  NoOptionsMessage.defaultProps = {
    children: 'No options'
  };
  var LoadingMessage = function LoadingMessage(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('loadingMessage', props),
      className: cx({
        'menu-notice': true,
        'menu-notice--loading': true
      }, className)
    }, innerProps), children);
  };
  LoadingMessage.defaultProps = {
    children: 'Loading...'
  };
  
  // ==============================
  // Menu Portal
  // ==============================
  
  var menuPortalCSS = function menuPortalCSS(_ref7) {
    var rect = _ref7.rect,
      offset = _ref7.offset,
      position = _ref7.position;
    return {
      left: rect.left,
      position: position,
      top: offset,
      width: rect.width,
      zIndex: 1
    };
  };
  var MenuPortal = function MenuPortal(_ref8) {
    var appendTo = _ref8.appendTo,
      children = _ref8.children,
      className = _ref8.className,
      controlElement = _ref8.controlElement,
      cx = _ref8.cx,
      innerProps = _ref8.innerProps,
      menuPlacement = _ref8.menuPlacement,
      menuPosition = _ref8.menuPosition,
      getStyles = _ref8.getStyles;
    var menuPortalRef = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
    var cleanupRef = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
    var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(coercePlacement(menuPlacement)),
      _useState6 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState5, 2),
      placement = _useState6[0],
      setPortalPlacement = _useState6[1];
    var portalPlacementContext = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
      return {
        setPortalPlacement: setPortalPlacement
      };
    }, []);
    var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(null),
      _useState8 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState7, 2),
      computedPosition = _useState8[0],
      setComputedPosition = _useState8[1];
    var updateComputedPosition = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function () {
      if (!controlElement) return;
      var rect = getBoundingClientObj(controlElement);
      var scrollDistance = menuPosition === 'fixed' ? 0 : window.pageYOffset;
      var offset = rect[placement] + scrollDistance;
      if (offset !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset) || rect.left !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left) || rect.width !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width)) {
        setComputedPosition({
          offset: offset,
          rect: rect
        });
      }
    }, [controlElement, menuPosition, placement, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width]);
    (0,use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_9__["default"])(function () {
      updateComputedPosition();
    }, [updateComputedPosition]);
    var runAutoUpdate = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function () {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (controlElement && menuPortalRef.current) {
        cleanupRef.current = (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_11__.autoUpdate)(controlElement, menuPortalRef.current, updateComputedPosition, {
          elementResize: 'ResizeObserver' in window
        });
      }
    }, [controlElement, updateComputedPosition]);
    (0,use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_9__["default"])(function () {
      runAutoUpdate();
    }, [runAutoUpdate]);
    var setMenuPortalElement = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (menuPortalElement) {
      menuPortalRef.current = menuPortalElement;
      runAutoUpdate();
    }, [runAutoUpdate]);
  
    // bail early if required elements aren't present
    if (!appendTo && menuPosition !== 'fixed' || !computedPosition) return null;
  
    // same wrapper element whether fixed or portalled
    var menuWrapper = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      ref: setMenuPortalElement,
      css: getStyles('menuPortal', {
        offset: computedPosition.offset,
        position: menuPosition,
        rect: computedPosition.rect
      }),
      className: cx({
        'menu-portal': true
      }, className)
    }, innerProps), children);
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(PortalPlacementContext.Provider, {
      value: portalPlacementContext
    }, appendTo ? /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_8__.createPortal)(menuWrapper, appendTo) : menuWrapper);
  };
  
  var containerCSS = function containerCSS(_ref) {
    var isDisabled = _ref.isDisabled,
      isRtl = _ref.isRtl;
    return {
      label: 'container',
      direction: isRtl ? 'rtl' : undefined,
      pointerEvents: isDisabled ? 'none' : undefined,
      // cancel mouse events when disabled
      position: 'relative'
    };
  };
  var SelectContainer = function SelectContainer(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      isRtl = props.isRtl;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('container', props),
      className: cx({
        '--is-disabled': isDisabled,
        '--is-rtl': isRtl
      }, className)
    }, innerProps), children);
  };
  
  // ==============================
  // Value Container
  // ==============================
  
  var valueContainerCSS = function valueContainerCSS(_ref2) {
    var spacing = _ref2.theme.spacing,
      isMulti = _ref2.isMulti,
      hasValue = _ref2.hasValue,
      controlShouldRenderValue = _ref2.selectProps.controlShouldRenderValue;
    return {
      alignItems: 'center',
      display: isMulti && hasValue && controlShouldRenderValue ? 'flex' : 'grid',
      flex: 1,
      flexWrap: 'wrap',
      padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px"),
      WebkitOverflowScrolling: 'touch',
      position: 'relative',
      overflow: 'hidden'
    };
  };
  var ValueContainer = function ValueContainer(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      innerProps = props.innerProps,
      isMulti = props.isMulti,
      getStyles = props.getStyles,
      hasValue = props.hasValue;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('valueContainer', props),
      className: cx({
        'value-container': true,
        'value-container--is-multi': isMulti,
        'value-container--has-value': hasValue
      }, className)
    }, innerProps), children);
  };
  
  // ==============================
  // Indicator Container
  // ==============================
  
  var indicatorsContainerCSS = function indicatorsContainerCSS() {
    return {
      alignItems: 'center',
      alignSelf: 'stretch',
      display: 'flex',
      flexShrink: 0
    };
  };
  var IndicatorsContainer = function IndicatorsContainer(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      innerProps = props.innerProps,
      getStyles = props.getStyles;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('indicatorsContainer', props),
      className: cx({
        indicators: true
      }, className)
    }, innerProps), children);
  };
  
  var _templateObject;
  var _excluded$2 = ["size"];
  function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
  var _ref2 =  false ? 0 : {
    name: "tj5bde-Svg",
    styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0ZvY3VzZWQsXG4gIHRoZW1lOiB7XG4gICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIGNvbG9ycyxcbiAgfSxcbn06XG4gIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuXG4gICc6aG92ZXInOiB7XG4gICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBkcm9wZG93bkluZGljYXRvckNTUyA9IGJhc2VDU1M7XG5leHBvcnQgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBEcm9wZG93bkluZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+XG4pID0+IHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBjeCwgZ2V0U3R5bGVzLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e2dldFN0eWxlcygnZHJvcGRvd25JbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17Z2V0U3R5bGVzKCdjbGVhckluZGljYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0Rpc2FibGVkLFxuICB0aGVtZToge1xuICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICBjb2xvcnMsXG4gIH0sXG59OiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvclNlcGFyYXRvcicsXG4gIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgbWFyZ2luQm90dG9tOiBiYXNlVW5pdCAqIDIsXG4gIG1hcmdpblRvcDogYmFzZVVuaXQgKiAyLFxuICB3aWR0aDogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaXNGb2N1c2VkLFxuICBzaXplLFxuICB0aGVtZToge1xuICAgIGNvbG9ycyxcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gIH0sXG59OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgZm9udFNpemU6IHNpemUsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIG1hcmdpblJpZ2h0OiBzaXplLFxuICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcywgaXNSdGwgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2xvYWRpbmdJbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5Mb2FkaW5nSW5kaWNhdG9yLmRlZmF1bHRQcm9wcyA9IHsgc2l6ZTogNCB9O1xuIl19 */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__
  };
  // ==============================
  // Dropdown & Clear Icons
  // ==============================
  
  var Svg = function Svg(_ref) {
    var size = _ref.size,
      props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref, _excluded$2);
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("svg", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      height: size,
      width: size,
      viewBox: "0 0 20 20",
      "aria-hidden": "true",
      focusable: "false",
      css: _ref2
    }, props));
  };
  var CrossIcon = function CrossIcon(props) {
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(Svg, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      size: 20
    }, props), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
      d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
    }));
  };
  var DownChevron = function DownChevron(props) {
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(Svg, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      size: 20
    }, props), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
      d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
    }));
  };
  
  // ==============================
  // Dropdown & Clear Buttons
  // ==============================
  
  var baseCSS = function baseCSS(_ref3) {
    var isFocused = _ref3.isFocused,
      _ref3$theme = _ref3.theme,
      baseUnit = _ref3$theme.spacing.baseUnit,
      colors = _ref3$theme.colors;
    return {
      label: 'indicatorContainer',
      color: isFocused ? colors.neutral60 : colors.neutral20,
      display: 'flex',
      padding: baseUnit * 2,
      transition: 'color 150ms',
      ':hover': {
        color: isFocused ? colors.neutral80 : colors.neutral40
      }
    };
  };
  var dropdownIndicatorCSS = baseCSS;
  var DropdownIndicator = function DropdownIndicator(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('dropdownIndicator', props),
      className: cx({
        indicator: true,
        'dropdown-indicator': true
      }, className)
    }, innerProps), children || (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(DownChevron, null));
  };
  var clearIndicatorCSS = baseCSS;
  var ClearIndicator = function ClearIndicator(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('clearIndicator', props),
      className: cx({
        indicator: true,
        'clear-indicator': true
      }, className)
    }, innerProps), children || (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(CrossIcon, null));
  };
  
  // ==============================
  // Separator
  // ==============================
  
  var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref4) {
    var isDisabled = _ref4.isDisabled,
      _ref4$theme = _ref4.theme,
      baseUnit = _ref4$theme.spacing.baseUnit,
      colors = _ref4$theme.colors;
    return {
      label: 'indicatorSeparator',
      alignSelf: 'stretch',
      backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
      marginBottom: baseUnit * 2,
      marginTop: baseUnit * 2,
      width: 1
    };
  };
  var IndicatorSeparator = function IndicatorSeparator(props) {
    var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, innerProps, {
      css: getStyles('indicatorSeparator', props),
      className: cx({
        'indicator-separator': true
      }, className)
    }));
  };
  
  // ==============================
  // Loading
  // ==============================
  
  var loadingDotAnimations = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.keyframes)(_templateObject || (_templateObject = (0,_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_2__["default"])(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"])));
  var loadingIndicatorCSS = function loadingIndicatorCSS(_ref5) {
    var isFocused = _ref5.isFocused,
      size = _ref5.size,
      _ref5$theme = _ref5.theme,
      colors = _ref5$theme.colors,
      baseUnit = _ref5$theme.spacing.baseUnit;
    return {
      label: 'loadingIndicator',
      color: isFocused ? colors.neutral60 : colors.neutral20,
      display: 'flex',
      padding: baseUnit * 2,
      transition: 'color 150ms',
      alignSelf: 'center',
      fontSize: size,
      lineHeight: 1,
      marginRight: size,
      textAlign: 'center',
      verticalAlign: 'middle'
    };
  };
  var LoadingDot = function LoadingDot(_ref6) {
    var delay = _ref6.delay,
      offset = _ref6.offset;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
      css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.css)({
        animation: "".concat(loadingDotAnimations, " 1s ease-in-out ").concat(delay, "ms infinite;"),
        backgroundColor: 'currentColor',
        borderRadius: '1em',
        display: 'inline-block',
        marginLeft: offset ? '1em' : undefined,
        height: '1em',
        verticalAlign: 'top',
        width: '1em'
      },  false ? 0 : ";label:LoadingDot;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFQSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0ZvY3VzZWQsXG4gIHRoZW1lOiB7XG4gICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIGNvbG9ycyxcbiAgfSxcbn06XG4gIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuXG4gICc6aG92ZXInOiB7XG4gICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBkcm9wZG93bkluZGljYXRvckNTUyA9IGJhc2VDU1M7XG5leHBvcnQgY29uc3QgRHJvcGRvd25JbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBEcm9wZG93bkluZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+XG4pID0+IHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBjeCwgZ2V0U3R5bGVzLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e2dldFN0eWxlcygnZHJvcGRvd25JbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17Z2V0U3R5bGVzKCdjbGVhckluZGljYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpc0Rpc2FibGVkLFxuICB0aGVtZToge1xuICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICBjb2xvcnMsXG4gIH0sXG59OiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvclNlcGFyYXRvcicsXG4gIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgbWFyZ2luQm90dG9tOiBiYXNlVW5pdCAqIDIsXG4gIG1hcmdpblRvcDogYmFzZVVuaXQgKiAyLFxuICB3aWR0aDogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaXNGb2N1c2VkLFxuICBzaXplLFxuICB0aGVtZToge1xuICAgIGNvbG9ycyxcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gIH0sXG59OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgZm9udFNpemU6IHNpemUsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIG1hcmdpblJpZ2h0OiBzaXplLFxuICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcywgaXNSdGwgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2xvYWRpbmdJbmRpY2F0b3InLCBwcm9wcyl9XG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5Mb2FkaW5nSW5kaWNhdG9yLmRlZmF1bHRQcm9wcyA9IHsgc2l6ZTogNCB9O1xuIl19 */")
    });
  };
  var LoadingIndicator = function LoadingIndicator(props) {
    var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isRtl = props.isRtl;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('loadingIndicator', props),
      className: cx({
        indicator: true,
        'loading-indicator': true
      }, className)
    }, innerProps), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(LoadingDot, {
      delay: 0,
      offset: isRtl
    }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(LoadingDot, {
      delay: 160,
      offset: true
    }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(LoadingDot, {
      delay: 320,
      offset: !isRtl
    }));
  };
  LoadingIndicator.defaultProps = {
    size: 4
  };
  
  var css$1 = function css(_ref) {
    var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      _ref$theme = _ref.theme,
      colors = _ref$theme.colors,
      borderRadius = _ref$theme.borderRadius,
      spacing = _ref$theme.spacing;
    return {
      label: 'control',
      alignItems: 'center',
      backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
      borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
      borderRadius: borderRadius,
      borderStyle: 'solid',
      borderWidth: 1,
      boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : undefined,
      cursor: 'default',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      minHeight: spacing.controlHeight,
      outline: '0 !important',
      position: 'relative',
      transition: 'all 100ms',
      '&:hover': {
        borderColor: isFocused ? colors.primary : colors.neutral30
      }
    };
  };
  var Control = function Control(props) {
    var children = props.children,
      cx = props.cx,
      getStyles = props.getStyles,
      className = props.className,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      innerRef = props.innerRef,
      innerProps = props.innerProps,
      menuIsOpen = props.menuIsOpen;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      ref: innerRef,
      css: getStyles('control', props),
      className: cx({
        control: true,
        'control--is-disabled': isDisabled,
        'control--is-focused': isFocused,
        'control--menu-is-open': menuIsOpen
      }, className)
    }, innerProps), children);
  };
  
  var _excluded$1 = ["data"];
  var groupCSS = function groupCSS(_ref) {
    var spacing = _ref.theme.spacing;
    return {
      paddingBottom: spacing.baseUnit * 2,
      paddingTop: spacing.baseUnit * 2
    };
  };
  var Group = function Group(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      Heading = props.Heading,
      headingProps = props.headingProps,
      innerProps = props.innerProps,
      label = props.label,
      theme = props.theme,
      selectProps = props.selectProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('group', props),
      className: cx({
        group: true
      }, className)
    }, innerProps), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(Heading, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, headingProps, {
      selectProps: selectProps,
      theme: theme,
      getStyles: getStyles,
      cx: cx
    }), label), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", null, children));
  };
  var groupHeadingCSS = function groupHeadingCSS(_ref2) {
    var spacing = _ref2.theme.spacing;
    return {
      label: 'group',
      color: '#999',
      cursor: 'default',
      display: 'block',
      fontSize: '75%',
      fontWeight: 500,
      marginBottom: '0.25em',
      paddingLeft: spacing.baseUnit * 3,
      paddingRight: spacing.baseUnit * 3,
      textTransform: 'uppercase'
    };
  };
  var GroupHeading = function GroupHeading(props) {
    var getStyles = props.getStyles,
      cx = props.cx,
      className = props.className;
    var _cleanCommonProps = cleanCommonProps(props);
      _cleanCommonProps.data;
      var innerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(_cleanCommonProps, _excluded$1);
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('groupHeading', props),
      className: cx({
        'group-heading': true
      }, className)
    }, innerProps));
  };
  
  var _excluded = ["innerRef", "isDisabled", "isHidden", "inputClassName"];
  var inputCSS = function inputCSS(_ref) {
    var isDisabled = _ref.isDisabled,
      value = _ref.value,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
    return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
      margin: spacing.baseUnit / 2,
      paddingBottom: spacing.baseUnit / 2,
      paddingTop: spacing.baseUnit / 2,
      visibility: isDisabled ? 'hidden' : 'visible',
      color: colors.neutral80,
      // force css to recompute when value change due to @emotion bug.
      // We can remove it whenever the bug is fixed.
      transform: value ? 'translateZ(0)' : ''
    }, containerStyle);
  };
  var spacingStyle = {
    gridArea: '1 / 2',
    font: 'inherit',
    minWidth: '2px',
    border: 0,
    margin: 0,
    outline: 0,
    padding: 0
  };
  var containerStyle = {
    flex: '1 1 auto',
    display: 'inline-grid',
    gridArea: '1 / 1 / 2 / 3',
    gridTemplateColumns: '0 min-content',
    '&:after': (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
      content: 'attr(data-value) " "',
      visibility: 'hidden',
      whiteSpace: 'pre'
    }, spacingStyle)
  };
  var inputStyle = function inputStyle(isHidden) {
    return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
      label: 'input',
      color: 'inherit',
      background: 0,
      opacity: isHidden ? 0 : 1,
      width: '100%'
    }, spacingStyle);
  };
  var Input = function Input(props) {
    var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      value = props.value;
    var _cleanCommonProps = cleanCommonProps(props),
      innerRef = _cleanCommonProps.innerRef,
      isDisabled = _cleanCommonProps.isDisabled,
      isHidden = _cleanCommonProps.isHidden,
      inputClassName = _cleanCommonProps.inputClassName,
      innerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(_cleanCommonProps, _excluded);
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: cx({
        'input-container': true
      }, className),
      css: getStyles('input', props),
      "data-value": value || ''
    }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      className: cx({
        input: true
      }, inputClassName),
      ref: innerRef,
      style: inputStyle(isHidden),
      disabled: isDisabled
    }, innerProps)));
  };
  
  var multiValueCSS = function multiValueCSS(_ref) {
    var _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      borderRadius = _ref$theme.borderRadius,
      colors = _ref$theme.colors;
    return {
      label: 'multiValue',
      backgroundColor: colors.neutral10,
      borderRadius: borderRadius / 2,
      display: 'flex',
      margin: spacing.baseUnit / 2,
      minWidth: 0 // resolves flex/text-overflow bug
    };
  };
  
  var multiValueLabelCSS = function multiValueLabelCSS(_ref2) {
    var _ref2$theme = _ref2.theme,
      borderRadius = _ref2$theme.borderRadius,
      colors = _ref2$theme.colors,
      cropWithEllipsis = _ref2.cropWithEllipsis;
    return {
      borderRadius: borderRadius / 2,
      color: colors.neutral80,
      fontSize: '85%',
      overflow: 'hidden',
      padding: 3,
      paddingLeft: 6,
      textOverflow: cropWithEllipsis || cropWithEllipsis === undefined ? 'ellipsis' : undefined,
      whiteSpace: 'nowrap'
    };
  };
  var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3) {
    var _ref3$theme = _ref3.theme,
      spacing = _ref3$theme.spacing,
      borderRadius = _ref3$theme.borderRadius,
      colors = _ref3$theme.colors,
      isFocused = _ref3.isFocused;
    return {
      alignItems: 'center',
      borderRadius: borderRadius / 2,
      backgroundColor: isFocused ? colors.dangerLight : undefined,
      display: 'flex',
      paddingLeft: spacing.baseUnit,
      paddingRight: spacing.baseUnit,
      ':hover': {
        backgroundColor: colors.dangerLight,
        color: colors.danger
      }
    };
  };
  var MultiValueGeneric = function MultiValueGeneric(_ref4) {
    var children = _ref4.children,
      innerProps = _ref4.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", innerProps, children);
  };
  var MultiValueContainer = MultiValueGeneric;
  var MultiValueLabel = MultiValueGeneric;
  function MultiValueRemove(_ref5) {
    var children = _ref5.children,
      innerProps = _ref5.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      role: "button"
    }, innerProps), children || (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(CrossIcon, {
      size: 14
    }));
  }
  var MultiValue = function MultiValue(props) {
    var children = props.children,
      className = props.className,
      components = props.components,
      cx = props.cx,
      data = props.data,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      removeProps = props.removeProps,
      selectProps = props.selectProps;
    var Container = components.Container,
      Label = components.Label,
      Remove = components.Remove;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(_emotion_react__WEBPACK_IMPORTED_MODULE_10__.ClassNames, null, function (_ref6) {
      var css = _ref6.css,
        emotionCx = _ref6.cx;
      return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(Container, {
        data: data,
        innerProps: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
          className: emotionCx(css(getStyles('multiValue', props)), cx({
            'multi-value': true,
            'multi-value--is-disabled': isDisabled
          }, className))
        }, innerProps),
        selectProps: selectProps
      }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(Label, {
        data: data,
        innerProps: {
          className: emotionCx(css(getStyles('multiValueLabel', props)), cx({
            'multi-value__label': true
          }, className))
        },
        selectProps: selectProps
      }, children), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)(Remove, {
        data: data,
        innerProps: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
          className: emotionCx(css(getStyles('multiValueRemove', props)), cx({
            'multi-value__remove': true
          }, className)),
          'aria-label': "Remove ".concat(children || 'option')
        }, removeProps),
        selectProps: selectProps
      }));
    });
  };
  
  var optionCSS = function optionCSS(_ref) {
    var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
    return {
      label: 'option',
      backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
      color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
      cursor: 'default',
      display: 'block',
      fontSize: 'inherit',
      padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
      width: '100%',
      userSelect: 'none',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
      // provide some affordance on touch devices
      ':active': {
        backgroundColor: !isDisabled ? isSelected ? colors.primary : colors.primary50 : undefined
      }
    };
  };
  var Option = function Option(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      isSelected = props.isSelected,
      innerRef = props.innerRef,
      innerProps = props.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('option', props),
      className: cx({
        option: true,
        'option--is-disabled': isDisabled,
        'option--is-focused': isFocused,
        'option--is-selected': isSelected
      }, className),
      ref: innerRef,
      "aria-disabled": isDisabled
    }, innerProps), children);
  };
  
  var placeholderCSS = function placeholderCSS(_ref) {
    var _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
    return {
      label: 'placeholder',
      color: colors.neutral50,
      gridArea: '1 / 1 / 2 / 3',
      marginLeft: spacing.baseUnit / 2,
      marginRight: spacing.baseUnit / 2
    };
  };
  var Placeholder = function Placeholder(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('placeholder', props),
      className: cx({
        placeholder: true
      }, className)
    }, innerProps), children);
  };
  
  var css = function css(_ref) {
    var isDisabled = _ref.isDisabled,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
    return {
      label: 'singleValue',
      color: isDisabled ? colors.neutral40 : colors.neutral80,
      gridArea: '1 / 1 / 2 / 3',
      marginLeft: spacing.baseUnit / 2,
      marginRight: spacing.baseUnit / 2,
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
  };
  var SingleValue = function SingleValue(props) {
    var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      innerProps = props.innerProps;
    return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      css: getStyles('singleValue', props),
      className: cx({
        'single-value': true,
        'single-value--is-disabled': isDisabled
      }, className)
    }, innerProps), children);
  };
  
  var components = {
    ClearIndicator: ClearIndicator,
    Control: Control,
    DropdownIndicator: DropdownIndicator,
    DownChevron: DownChevron,
    CrossIcon: CrossIcon,
    Group: Group,
    GroupHeading: GroupHeading,
    IndicatorsContainer: IndicatorsContainer,
    IndicatorSeparator: IndicatorSeparator,
    Input: Input,
    LoadingIndicator: LoadingIndicator,
    Menu: Menu,
    MenuList: MenuList,
    MenuPortal: MenuPortal,
    LoadingMessage: LoadingMessage,
    NoOptionsMessage: NoOptionsMessage,
    MultiValue: MultiValue,
    MultiValueContainer: MultiValueContainer,
    MultiValueLabel: MultiValueLabel,
    MultiValueRemove: MultiValueRemove,
    Option: Option,
    Placeholder: Placeholder,
    SelectContainer: SelectContainer,
    SingleValue: SingleValue,
    ValueContainer: ValueContainer
  };
  var defaultComponents = function defaultComponents(props) {
    return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, components), props.components);
  };
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/react-select/dist/react-select.esm.js":
  /*!************************************************************!*\
    !*** ./node_modules/react-select/dist/react-select.esm.js ***!
    \************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "NonceProvider": function() { return /* binding */ NonceProvider; },
  /* harmony export */   "components": function() { return /* reexport safe */ _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_5__.c; },
  /* harmony export */   "createFilter": function() { return /* reexport safe */ _Select_13909c3f_esm_js__WEBPACK_IMPORTED_MODULE_3__.c; },
  /* harmony export */   "defaultTheme": function() { return /* reexport safe */ _Select_13909c3f_esm_js__WEBPACK_IMPORTED_MODULE_3__.d; },
  /* harmony export */   "mergeStyles": function() { return /* reexport safe */ _Select_13909c3f_esm_js__WEBPACK_IMPORTED_MODULE_3__.m; },
  /* harmony export */   "useStateManager": function() { return /* reexport safe */ _useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_0__.u; }
  /* harmony export */ });
  /* harmony import */ var _useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useStateManager-7e1e8489.esm.js */ "./node_modules/react-select/dist/useStateManager-7e1e8489.esm.js");
  /* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
  /* harmony import */ var _Select_13909c3f_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Select-13909c3f.esm.js */ "./node_modules/react-select/dist/Select-13909c3f.esm.js");
  /* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js");
  /* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
  /* harmony import */ var _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index-9f7dc477.esm.js */ "./node_modules/react-select/dist/index-9f7dc477.esm.js");
  /* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
  /* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
  /* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
  /* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
  /* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
  /* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
  /* harmony import */ var _babel_runtime_helpers_createSuper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime/helpers/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
  /* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
  /* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
  /* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
  /* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-dom */ "react-dom");
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_17__);
  /* harmony import */ var use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! use-isomorphic-layout-effect */ "./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js");
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var StateManagedSelect = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function (props, ref) {
    var baseSelectProps = (0,_useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_0__.u)(props);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_Select_13909c3f_esm_js__WEBPACK_IMPORTED_MODULE_3__.S, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      ref: ref
    }, baseSelectProps));
  });
  
  var NonceProvider = (function (_ref) {
    var nonce = _ref.nonce,
      children = _ref.children,
      cacheKey = _ref.cacheKey;
    var emotionCache = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(function () {
      return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_4__["default"])({
        key: cacheKey,
        nonce: nonce
      });
    }, [cacheKey, nonce]);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_19__.C, {
      value: emotionCache
    }, children);
  });
  
  /* harmony default export */ __webpack_exports__["default"] = (StateManagedSelect);
  
  
  
  /***/ }),
  
  /***/ "./node_modules/react-select/dist/useAsync-5d308f11.esm.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/react-select/dist/useAsync-5d308f11.esm.js ***!
    \*****************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "u": function() { return /* binding */ useAsync; }
  /* harmony export */ });
  /* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
  /* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
  /* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
  /* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
  /* harmony import */ var _index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index-9f7dc477.esm.js */ "./node_modules/react-select/dist/index-9f7dc477.esm.js");
  
  
  
  
  
  
  
  var _excluded = ["defaultOptions", "cacheOptions", "loadOptions", "options", "isLoading", "onInputChange", "filterOption"];
  function useAsync(_ref) {
    var _ref$defaultOptions = _ref.defaultOptions,
      propsDefaultOptions = _ref$defaultOptions === void 0 ? false : _ref$defaultOptions,
      _ref$cacheOptions = _ref.cacheOptions,
      cacheOptions = _ref$cacheOptions === void 0 ? false : _ref$cacheOptions,
      propsLoadOptions = _ref.loadOptions;
      _ref.options;
      var _ref$isLoading = _ref.isLoading,
      propsIsLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      propsOnInputChange = _ref.onInputChange,
      _ref$filterOption = _ref.filterOption,
      filterOption = _ref$filterOption === void 0 ? null : _ref$filterOption,
      restSelectProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref, _excluded);
    var propsInputValue = restSelectProps.inputValue;
    var lastRequest = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(undefined);
    var mounted = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(false);
    var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined),
      _useState2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
      defaultOptions = _useState2[0],
      setDefaultOptions = _useState2[1];
    var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(typeof propsInputValue !== 'undefined' ? propsInputValue : ''),
      _useState4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
      stateInputValue = _useState4[0],
      setStateInputValue = _useState4[1];
    var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(propsDefaultOptions === true),
      _useState6 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState5, 2),
      isLoading = _useState6[0],
      setIsLoading = _useState6[1];
    var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(undefined),
      _useState8 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState7, 2),
      loadedInputValue = _useState8[0],
      setLoadedInputValue = _useState8[1];
    var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)([]),
      _useState10 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState9, 2),
      loadedOptions = _useState10[0],
      setLoadedOptions = _useState10[1];
    var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState12 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState11, 2),
      passEmptyOptions = _useState12[0],
      setPassEmptyOptions = _useState12[1];
    var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({}),
      _useState14 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState13, 2),
      optionsCache = _useState14[0],
      setOptionsCache = _useState14[1];
    var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(undefined),
      _useState16 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState15, 2),
      prevDefaultOptions = _useState16[0],
      setPrevDefaultOptions = _useState16[1];
    var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(undefined),
      _useState18 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState17, 2),
      prevCacheOptions = _useState18[0],
      setPrevCacheOptions = _useState18[1];
    if (cacheOptions !== prevCacheOptions) {
      setOptionsCache({});
      setPrevCacheOptions(cacheOptions);
    }
    if (propsDefaultOptions !== prevDefaultOptions) {
      setDefaultOptions(Array.isArray(propsDefaultOptions) ? propsDefaultOptions : undefined);
      setPrevDefaultOptions(propsDefaultOptions);
    }
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
      mounted.current = true;
      return function () {
        mounted.current = false;
      };
    }, []);
    var loadOptions = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(function (inputValue, callback) {
      if (!propsLoadOptions) return callback();
      var loader = propsLoadOptions(inputValue, callback);
      if (loader && typeof loader.then === 'function') {
        loader.then(callback, function () {
          return callback();
        });
      }
    }, [propsLoadOptions]);
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
      if (propsDefaultOptions === true) {
        loadOptions(stateInputValue, function (options) {
          if (!mounted.current) return;
          setDefaultOptions(options || []);
          setIsLoading(!!lastRequest.current);
        });
      }
      // NOTE: this effect is designed to only run when the component mounts,
      // so we don't want to include any hook dependencies
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var onInputChange = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(function (newValue, actionMeta) {
      var inputValue = (0,_index_9f7dc477_esm_js__WEBPACK_IMPORTED_MODULE_5__.L)(newValue, actionMeta, propsOnInputChange);
      if (!inputValue) {
        lastRequest.current = undefined;
        setStateInputValue('');
        setLoadedInputValue('');
        setLoadedOptions([]);
        setIsLoading(false);
        setPassEmptyOptions(false);
        return;
      }
      if (cacheOptions && optionsCache[inputValue]) {
        setStateInputValue(inputValue);
        setLoadedInputValue(inputValue);
        setLoadedOptions(optionsCache[inputValue]);
        setIsLoading(false);
        setPassEmptyOptions(false);
      } else {
        var request = lastRequest.current = {};
        setStateInputValue(inputValue);
        setIsLoading(true);
        setPassEmptyOptions(!loadedInputValue);
        loadOptions(inputValue, function (options) {
          if (!mounted) return;
          if (request !== lastRequest.current) return;
          lastRequest.current = undefined;
          setIsLoading(false);
          setLoadedInputValue(inputValue);
          setLoadedOptions(options || []);
          setPassEmptyOptions(false);
          setOptionsCache(options ? (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, optionsCache), {}, (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputValue, options)) : optionsCache);
        });
      }
    }, [cacheOptions, loadOptions, loadedInputValue, optionsCache, propsOnInputChange]);
    var options = passEmptyOptions ? [] : stateInputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
    return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, restSelectProps), {}, {
      options: options,
      isLoading: isLoading || propsIsLoading,
      onInputChange: onInputChange,
      filterOption: filterOption
    });
  }
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/react-select/dist/useStateManager-7e1e8489.esm.js":
  /*!************************************************************************!*\
    !*** ./node_modules/react-select/dist/useStateManager-7e1e8489.esm.js ***!
    \************************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "u": function() { return /* binding */ useStateManager; }
  /* harmony export */ });
  /* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
  /* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
  /* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
  
  
  
  
  
  var _excluded = ["defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value"];
  function useStateManager(_ref) {
    var _ref$defaultInputValu = _ref.defaultInputValue,
      defaultInputValue = _ref$defaultInputValu === void 0 ? '' : _ref$defaultInputValu,
      _ref$defaultMenuIsOpe = _ref.defaultMenuIsOpen,
      defaultMenuIsOpen = _ref$defaultMenuIsOpe === void 0 ? false : _ref$defaultMenuIsOpe,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
      propsInputValue = _ref.inputValue,
      propsMenuIsOpen = _ref.menuIsOpen,
      propsOnChange = _ref.onChange,
      propsOnInputChange = _ref.onInputChange,
      propsOnMenuClose = _ref.onMenuClose,
      propsOnMenuOpen = _ref.onMenuOpen,
      propsValue = _ref.value,
      restSelectProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, _excluded);
    var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(propsInputValue !== undefined ? propsInputValue : defaultInputValue),
      _useState2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
      stateInputValue = _useState2[0],
      setStateInputValue = _useState2[1];
    var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(propsMenuIsOpen !== undefined ? propsMenuIsOpen : defaultMenuIsOpen),
      _useState4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
      stateMenuIsOpen = _useState4[0],
      setStateMenuIsOpen = _useState4[1];
    var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(propsValue !== undefined ? propsValue : defaultValue),
      _useState6 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState5, 2),
      stateValue = _useState6[0],
      setStateValue = _useState6[1];
    var onChange = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function (value, actionMeta) {
      if (typeof propsOnChange === 'function') {
        propsOnChange(value, actionMeta);
      }
      setStateValue(value);
    }, [propsOnChange]);
    var onInputChange = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function (value, actionMeta) {
      var newValue;
      if (typeof propsOnInputChange === 'function') {
        newValue = propsOnInputChange(value, actionMeta);
      }
      setStateInputValue(newValue !== undefined ? newValue : value);
    }, [propsOnInputChange]);
    var onMenuOpen = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function () {
      if (typeof propsOnMenuOpen === 'function') {
        propsOnMenuOpen();
      }
      setStateMenuIsOpen(true);
    }, [propsOnMenuOpen]);
    var onMenuClose = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function () {
      if (typeof propsOnMenuClose === 'function') {
        propsOnMenuClose();
      }
      setStateMenuIsOpen(false);
    }, [propsOnMenuClose]);
    var inputValue = propsInputValue !== undefined ? propsInputValue : stateInputValue;
    var menuIsOpen = propsMenuIsOpen !== undefined ? propsMenuIsOpen : stateMenuIsOpen;
    var value = propsValue !== undefined ? propsValue : stateValue;
    return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, restSelectProps), {}, {
      inputValue: inputValue,
      menuIsOpen: menuIsOpen,
      onChange: onChange,
      onInputChange: onInputChange,
      onMenuClose: onMenuClose,
      onMenuOpen: onMenuOpen,
      value: value
    });
  }
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/react-sortable-hoc/dist/react-sortable-hoc.esm.js":
  /*!************************************************************************!*\
    !*** ./node_modules/react-sortable-hoc/dist/react-sortable-hoc.esm.js ***!
    \************************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "SortableContainer": function() { return /* binding */ sortableContainer; },
  /* harmony export */   "SortableElement": function() { return /* binding */ sortableElement; },
  /* harmony export */   "SortableHandle": function() { return /* binding */ sortableHandle; },
  /* harmony export */   "arrayMove": function() { return /* binding */ arrayMove; },
  /* harmony export */   "sortableContainer": function() { return /* binding */ sortableContainer; },
  /* harmony export */   "sortableElement": function() { return /* binding */ sortableElement; },
  /* harmony export */   "sortableHandle": function() { return /* binding */ sortableHandle; }
  /* harmony export */ });
  /* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
  /* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
  /* harmony import */ var _babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread */ "./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
  /* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
  /* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
  /* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
  /* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
  /* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
  /* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
  /* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-dom */ "react-dom");
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_11__);
  /* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
  /* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_12__);
  /* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
  /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
  /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var Manager = function () {
    function Manager() {
      (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Manager);
  
      (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(this, "refs", {});
    }
  
    (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Manager, [{
      key: "add",
      value: function add(collection, ref) {
        if (!this.refs[collection]) {
          this.refs[collection] = [];
        }
  
        this.refs[collection].push(ref);
      }
    }, {
      key: "remove",
      value: function remove(collection, ref) {
        var index = this.getIndex(collection, ref);
  
        if (index !== -1) {
          this.refs[collection].splice(index, 1);
        }
      }
    }, {
      key: "isActive",
      value: function isActive() {
        return this.active;
      }
    }, {
      key: "getActive",
      value: function getActive() {
        var _this = this;
  
        return this.refs[this.active.collection].find(function (_ref) {
          var node = _ref.node;
          return node.sortableInfo.index == _this.active.index;
        });
      }
    }, {
      key: "getIndex",
      value: function getIndex(collection, ref) {
        return this.refs[collection].indexOf(ref);
      }
    }, {
      key: "getOrderedRefs",
      value: function getOrderedRefs() {
        var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.active.collection;
        return this.refs[collection].sort(sortByIndex);
      }
    }]);
  
    return Manager;
  }();
  
  function sortByIndex(_ref2, _ref3) {
    var index1 = _ref2.node.sortableInfo.index;
    var index2 = _ref3.node.sortableInfo.index;
    return index1 - index2;
  }
  
  function arrayMove(array, from, to) {
    if (true) {
      if (typeof console !== 'undefined') {
        console.warn("Deprecation warning: arrayMove will no longer be exported by 'react-sortable-hoc' in the next major release. Please install the `array-move` package locally instead. https://www.npmjs.com/package/array-move");
      }
    }
  
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
  }
  function omit(obj, keysToOmit) {
    return Object.keys(obj).reduce(function (acc, key) {
      if (keysToOmit.indexOf(key) === -1) {
        acc[key] = obj[key];
      }
  
      return acc;
    }, {});
  }
  var events = {
    end: ['touchend', 'touchcancel', 'mouseup'],
    move: ['touchmove', 'mousemove'],
    start: ['touchstart', 'mousedown']
  };
  var vendorPrefix = function () {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return '';
    }
  
    var styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
    var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
  
    switch (pre) {
      case 'ms':
        return 'ms';
  
      default:
        return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
    }
  }();
  function setInlineStyles(node, styles) {
    Object.keys(styles).forEach(function (key) {
      node.style[key] = styles[key];
    });
  }
  function setTranslate3d(node, translate) {
    node.style["".concat(vendorPrefix, "Transform")] = translate == null ? '' : "translate3d(".concat(translate.x, "px,").concat(translate.y, "px,0)");
  }
  function setTransitionDuration(node, duration) {
    node.style["".concat(vendorPrefix, "TransitionDuration")] = duration == null ? '' : "".concat(duration, "ms");
  }
  function closest(el, fn) {
    while (el) {
      if (fn(el)) {
        return el;
      }
  
      el = el.parentNode;
    }
  
    return null;
  }
  function limit(min, max, value) {
    return Math.max(min, Math.min(value, max));
  }
  
  function getPixelValue(stringValue) {
    if (stringValue.substr(-2) === 'px') {
      return parseFloat(stringValue);
    }
  
    return 0;
  }
  
  function getElementMargin(element) {
    var style = window.getComputedStyle(element);
    return {
      bottom: getPixelValue(style.marginBottom),
      left: getPixelValue(style.marginLeft),
      right: getPixelValue(style.marginRight),
      top: getPixelValue(style.marginTop)
    };
  }
  function provideDisplayName(prefix, Component$$1) {
    var componentName = Component$$1.displayName || Component$$1.name;
    return componentName ? "".concat(prefix, "(").concat(componentName, ")") : prefix;
  }
  function getScrollAdjustedBoundingClientRect(node, scrollDelta) {
    var boundingClientRect = node.getBoundingClientRect();
    return {
      top: boundingClientRect.top + scrollDelta.top,
      left: boundingClientRect.left + scrollDelta.left
    };
  }
  function getPosition(event) {
    if (event.touches && event.touches.length) {
      return {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      return {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY
      };
    } else {
      return {
        x: event.pageX,
        y: event.pageY
      };
    }
  }
  function isTouchEvent(event) {
    return event.touches && event.touches.length || event.changedTouches && event.changedTouches.length;
  }
  function getEdgeOffset(node, parent) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      left: 0,
      top: 0
    };
  
    if (!node) {
      return undefined;
    }
  
    var nodeOffset = {
      left: offset.left + node.offsetLeft,
      top: offset.top + node.offsetTop
    };
  
    if (node.parentNode === parent) {
      return nodeOffset;
    }
  
    return getEdgeOffset(node.parentNode, parent, nodeOffset);
  }
  function getTargetIndex(newIndex, prevIndex, oldIndex) {
    if (newIndex < oldIndex && newIndex > prevIndex) {
      return newIndex - 1;
    } else if (newIndex > oldIndex && newIndex < prevIndex) {
      return newIndex + 1;
    } else {
      return newIndex;
    }
  }
  function getLockPixelOffset(_ref) {
    var lockOffset = _ref.lockOffset,
        width = _ref.width,
        height = _ref.height;
    var offsetX = lockOffset;
    var offsetY = lockOffset;
    var unit = 'px';
  
    if (typeof lockOffset === 'string') {
      var match = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);
      invariant__WEBPACK_IMPORTED_MODULE_12___default()(match !== null, 'lockOffset value should be a number or a string of a ' + 'number followed by "px" or "%". Given %s', lockOffset);
      offsetX = parseFloat(lockOffset);
      offsetY = parseFloat(lockOffset);
      unit = match[1];
    }
  
    invariant__WEBPACK_IMPORTED_MODULE_12___default()(isFinite(offsetX) && isFinite(offsetY), 'lockOffset value should be a finite. Given %s', lockOffset);
  
    if (unit === '%') {
      offsetX = offsetX * width / 100;
      offsetY = offsetY * height / 100;
    }
  
    return {
      x: offsetX,
      y: offsetY
    };
  }
  function getLockPixelOffsets(_ref2) {
    var height = _ref2.height,
        width = _ref2.width,
        lockOffset = _ref2.lockOffset;
    var offsets = Array.isArray(lockOffset) ? lockOffset : [lockOffset, lockOffset];
    invariant__WEBPACK_IMPORTED_MODULE_12___default()(offsets.length === 2, 'lockOffset prop of SortableContainer should be a single ' + 'value or an array of exactly two values. Given %s', lockOffset);
  
    var _offsets = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(offsets, 2),
        minLockOffset = _offsets[0],
        maxLockOffset = _offsets[1];
  
    return [getLockPixelOffset({
      height: height,
      lockOffset: minLockOffset,
      width: width
    }), getLockPixelOffset({
      height: height,
      lockOffset: maxLockOffset,
      width: width
    })];
  }
  
  function isScrollable(el) {
    var computedStyle = window.getComputedStyle(el);
    var overflowRegex = /(auto|scroll)/;
    var properties = ['overflow', 'overflowX', 'overflowY'];
    return properties.find(function (property) {
      return overflowRegex.test(computedStyle[property]);
    });
  }
  
  function getScrollingParent(el) {
    if (!(el instanceof HTMLElement)) {
      return null;
    } else if (isScrollable(el)) {
      return el;
    } else {
      return getScrollingParent(el.parentNode);
    }
  }
  function getContainerGridGap(element) {
    var style = window.getComputedStyle(element);
  
    if (style.display === 'grid') {
      return {
        x: getPixelValue(style.gridColumnGap),
        y: getPixelValue(style.gridRowGap)
      };
    }
  
    return {
      x: 0,
      y: 0
    };
  }
  var KEYCODE = {
    TAB: 9,
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };
  var NodeType = {
    Anchor: 'A',
    Button: 'BUTTON',
    Canvas: 'CANVAS',
    Input: 'INPUT',
    Option: 'OPTION',
    Textarea: 'TEXTAREA',
    Select: 'SELECT'
  };
  function cloneNode(node) {
    var selector = 'input, textarea, select, canvas, [contenteditable]';
    var fields = node.querySelectorAll(selector);
    var clonedNode = node.cloneNode(true);
  
    var clonedFields = (0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_13__["default"])(clonedNode.querySelectorAll(selector));
  
    clonedFields.forEach(function (field, i) {
      if (field.type !== 'file') {
        field.value = fields[i].value;
      }
  
      if (field.type === 'radio' && field.name) {
        field.name = "__sortableClone__".concat(field.name);
      }
  
      if (field.tagName === NodeType.Canvas && fields[i].width > 0 && fields[i].height > 0) {
        var destCtx = field.getContext('2d');
        destCtx.drawImage(fields[i], 0, 0);
      }
    });
    return clonedNode;
  }
  
  function sortableHandle(WrappedComponent) {
    var _class, _temp;
  
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      withRef: false
    };
    return _temp = _class = function (_React$Component) {
      (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(WithSortableHandle, _React$Component);
  
      function WithSortableHandle() {
        var _getPrototypeOf2;
  
        var _this;
  
        (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, WithSortableHandle);
  
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
  
        _this = (0,_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, (_getPrototypeOf2 = (0,_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(WithSortableHandle)).call.apply(_getPrototypeOf2, [this].concat(args)));
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "wrappedInstance", (0,react__WEBPACK_IMPORTED_MODULE_10__.createRef)());
  
        return _this;
      }
  
      (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(WithSortableHandle, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var node = (0,react_dom__WEBPACK_IMPORTED_MODULE_11__.findDOMNode)(this);
          node.sortableHandle = true;
        }
      }, {
        key: "getWrappedInstance",
        value: function getWrappedInstance() {
          invariant__WEBPACK_IMPORTED_MODULE_12___default()(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call');
          return this.wrappedInstance.current;
        }
      }, {
        key: "render",
        value: function render() {
          var ref = config.withRef ? this.wrappedInstance : null;
          return (0,react__WEBPACK_IMPORTED_MODULE_10__.createElement)(WrappedComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
            ref: ref
          }, this.props));
        }
      }]);
  
      return WithSortableHandle;
    }(react__WEBPACK_IMPORTED_MODULE_10__.Component), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "displayName", provideDisplayName('sortableHandle', WrappedComponent)), _temp;
  }
  function isSortableHandle(node) {
    return node.sortableHandle != null;
  }
  
  var AutoScroller = function () {
    function AutoScroller(container, onScrollCallback) {
      (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, AutoScroller);
  
      this.container = container;
      this.onScrollCallback = onScrollCallback;
    }
  
    (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(AutoScroller, [{
      key: "clear",
      value: function clear() {
        if (this.interval == null) {
          return;
        }
  
        clearInterval(this.interval);
        this.interval = null;
      }
    }, {
      key: "update",
      value: function update(_ref) {
        var _this = this;
  
        var translate = _ref.translate,
            minTranslate = _ref.minTranslate,
            maxTranslate = _ref.maxTranslate,
            width = _ref.width,
            height = _ref.height;
        var direction = {
          x: 0,
          y: 0
        };
        var speed = {
          x: 1,
          y: 1
        };
        var acceleration = {
          x: 10,
          y: 10
        };
        var _this$container = this.container,
            scrollTop = _this$container.scrollTop,
            scrollLeft = _this$container.scrollLeft,
            scrollHeight = _this$container.scrollHeight,
            scrollWidth = _this$container.scrollWidth,
            clientHeight = _this$container.clientHeight,
            clientWidth = _this$container.clientWidth;
        var isTop = scrollTop === 0;
        var isBottom = scrollHeight - scrollTop - clientHeight === 0;
        var isLeft = scrollLeft === 0;
        var isRight = scrollWidth - scrollLeft - clientWidth === 0;
  
        if (translate.y >= maxTranslate.y - height / 2 && !isBottom) {
          direction.y = 1;
          speed.y = acceleration.y * Math.abs((maxTranslate.y - height / 2 - translate.y) / height);
        } else if (translate.x >= maxTranslate.x - width / 2 && !isRight) {
          direction.x = 1;
          speed.x = acceleration.x * Math.abs((maxTranslate.x - width / 2 - translate.x) / width);
        } else if (translate.y <= minTranslate.y + height / 2 && !isTop) {
          direction.y = -1;
          speed.y = acceleration.y * Math.abs((translate.y - height / 2 - minTranslate.y) / height);
        } else if (translate.x <= minTranslate.x + width / 2 && !isLeft) {
          direction.x = -1;
          speed.x = acceleration.x * Math.abs((translate.x - width / 2 - minTranslate.x) / width);
        }
  
        if (this.interval) {
          this.clear();
          this.isAutoScrolling = false;
        }
  
        if (direction.x !== 0 || direction.y !== 0) {
          this.interval = setInterval(function () {
            _this.isAutoScrolling = true;
            var offset = {
              left: speed.x * direction.x,
              top: speed.y * direction.y
            };
            _this.container.scrollTop += offset.top;
            _this.container.scrollLeft += offset.left;
  
            _this.onScrollCallback(offset);
          }, 5);
        }
      }
    }]);
  
    return AutoScroller;
  }();
  
  function defaultGetHelperDimensions(_ref) {
    var node = _ref.node;
    return {
      height: node.offsetHeight,
      width: node.offsetWidth
    };
  }
  
  function defaultShouldCancelStart(event) {
    var interactiveElements = [NodeType.Input, NodeType.Textarea, NodeType.Select, NodeType.Option, NodeType.Button];
  
    if (interactiveElements.indexOf(event.target.tagName) !== -1) {
      return true;
    }
  
    if (closest(event.target, function (el) {
      return el.contentEditable === 'true';
    })) {
      return true;
    }
  
    return false;
  }
  
  var propTypes = {
    axis: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOf(['x', 'y', 'xy']),
    contentWindow: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().any),
    disableAutoscroll: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool),
    distance: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().number),
    getContainer: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    getHelperDimensions: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    helperClass: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string),
    helperContainer: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_14___default().func), typeof HTMLElement === 'undefined' ? (prop_types__WEBPACK_IMPORTED_MODULE_14___default().any) : prop_types__WEBPACK_IMPORTED_MODULE_14___default().instanceOf(HTMLElement)]),
    hideSortableGhost: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool),
    keyboardSortingTransitionDuration: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().number),
    lockAxis: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string),
    lockOffset: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_14___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string), prop_types__WEBPACK_IMPORTED_MODULE_14___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_14___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)]))]),
    lockToContainerEdges: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool),
    onSortEnd: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    onSortMove: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    onSortOver: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    onSortStart: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    pressDelay: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().number),
    pressThreshold: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().number),
    keyCodes: prop_types__WEBPACK_IMPORTED_MODULE_14___default().shape({
      lift: prop_types__WEBPACK_IMPORTED_MODULE_14___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_14___default().number)),
      drop: prop_types__WEBPACK_IMPORTED_MODULE_14___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_14___default().number)),
      cancel: prop_types__WEBPACK_IMPORTED_MODULE_14___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_14___default().number)),
      up: prop_types__WEBPACK_IMPORTED_MODULE_14___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_14___default().number)),
      down: prop_types__WEBPACK_IMPORTED_MODULE_14___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_14___default().number))
    }),
    shouldCancelStart: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    transitionDuration: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().number),
    updateBeforeSortStart: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
    useDragHandle: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool),
    useWindowAsScrollContainer: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool)
  };
  var defaultKeyCodes = {
    lift: [KEYCODE.SPACE],
    drop: [KEYCODE.SPACE],
    cancel: [KEYCODE.ESC],
    up: [KEYCODE.UP, KEYCODE.LEFT],
    down: [KEYCODE.DOWN, KEYCODE.RIGHT]
  };
  var defaultProps = {
    axis: 'y',
    disableAutoscroll: false,
    distance: 0,
    getHelperDimensions: defaultGetHelperDimensions,
    hideSortableGhost: true,
    lockOffset: '50%',
    lockToContainerEdges: false,
    pressDelay: 0,
    pressThreshold: 5,
    keyCodes: defaultKeyCodes,
    shouldCancelStart: defaultShouldCancelStart,
    transitionDuration: 300,
    useWindowAsScrollContainer: false
  };
  var omittedProps = Object.keys(propTypes);
  function validateProps(props) {
    invariant__WEBPACK_IMPORTED_MODULE_12___default()(!(props.distance && props.pressDelay), 'Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.');
  }
  
  function _finallyRethrows(body, finalizer) {
    try {
      var result = body();
    } catch (e) {
      return finalizer(true, e);
    }
  
    if (result && result.then) {
      return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
    }
  
    return finalizer(false, value);
  }
  var SortableContext = (0,react__WEBPACK_IMPORTED_MODULE_10__.createContext)({
    manager: {}
  });
  function sortableContainer(WrappedComponent) {
    var _class, _temp;
  
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      withRef: false
    };
    return _temp = _class = function (_React$Component) {
      (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(WithSortableContainer, _React$Component);
  
      function WithSortableContainer(props) {
        var _this;
  
        (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, WithSortableContainer);
  
        _this = (0,_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, (0,_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(WithSortableContainer).call(this, props));
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "state", {});
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleStart", function (event) {
          var _this$props = _this.props,
              distance = _this$props.distance,
              shouldCancelStart = _this$props.shouldCancelStart;
  
          if (event.button === 2 || shouldCancelStart(event)) {
            return;
          }
  
          _this.touched = true;
          _this.position = getPosition(event);
          var node = closest(event.target, function (el) {
            return el.sortableInfo != null;
          });
  
          if (node && node.sortableInfo && _this.nodeIsChild(node) && !_this.state.sorting) {
            var useDragHandle = _this.props.useDragHandle;
            var _node$sortableInfo = node.sortableInfo,
                index = _node$sortableInfo.index,
                collection = _node$sortableInfo.collection,
                disabled = _node$sortableInfo.disabled;
  
            if (disabled) {
              return;
            }
  
            if (useDragHandle && !closest(event.target, isSortableHandle)) {
              return;
            }
  
            _this.manager.active = {
              collection: collection,
              index: index
            };
  
            if (!isTouchEvent(event) && event.target.tagName === NodeType.Anchor) {
              event.preventDefault();
            }
  
            if (!distance) {
              if (_this.props.pressDelay === 0) {
                _this.handlePress(event);
              } else {
                _this.pressTimer = setTimeout(function () {
                  return _this.handlePress(event);
                }, _this.props.pressDelay);
              }
            }
          }
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "nodeIsChild", function (node) {
          return node.sortableInfo.manager === _this.manager;
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleMove", function (event) {
          var _this$props2 = _this.props,
              distance = _this$props2.distance,
              pressThreshold = _this$props2.pressThreshold;
  
          if (!_this.state.sorting && _this.touched && !_this._awaitingUpdateBeforeSortStart) {
            var position = getPosition(event);
            var delta = {
              x: _this.position.x - position.x,
              y: _this.position.y - position.y
            };
            var combinedDelta = Math.abs(delta.x) + Math.abs(delta.y);
            _this.delta = delta;
  
            if (!distance && (!pressThreshold || combinedDelta >= pressThreshold)) {
              clearTimeout(_this.cancelTimer);
              _this.cancelTimer = setTimeout(_this.cancel, 0);
            } else if (distance && combinedDelta >= distance && _this.manager.isActive()) {
              _this.handlePress(event);
            }
          }
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleEnd", function () {
          _this.touched = false;
  
          _this.cancel();
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "cancel", function () {
          var distance = _this.props.distance;
          var sorting = _this.state.sorting;
  
          if (!sorting) {
            if (!distance) {
              clearTimeout(_this.pressTimer);
            }
  
            _this.manager.active = null;
          }
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handlePress", function (event) {
          try {
            var active = _this.manager.getActive();
  
            var _temp6 = function () {
              if (active) {
                var _temp7 = function _temp7() {
                  var index = _node.sortableInfo.index;
                  var margin = getElementMargin(_node);
                  var gridGap = getContainerGridGap(_this.container);
  
                  var containerBoundingRect = _this.scrollContainer.getBoundingClientRect();
  
                  var dimensions = _getHelperDimensions({
                    index: index,
                    node: _node,
                    collection: _collection
                  });
  
                  _this.node = _node;
                  _this.margin = margin;
                  _this.gridGap = gridGap;
                  _this.width = dimensions.width;
                  _this.height = dimensions.height;
                  _this.marginOffset = {
                    x: _this.margin.left + _this.margin.right + _this.gridGap.x,
                    y: Math.max(_this.margin.top, _this.margin.bottom, _this.gridGap.y)
                  };
                  _this.boundingClientRect = _node.getBoundingClientRect();
                  _this.containerBoundingRect = containerBoundingRect;
                  _this.index = index;
                  _this.newIndex = index;
                  _this.axis = {
                    x: _axis.indexOf('x') >= 0,
                    y: _axis.indexOf('y') >= 0
                  };
                  _this.offsetEdge = getEdgeOffset(_node, _this.container);
  
                  if (_isKeySorting) {
                    _this.initialOffset = getPosition((0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, event, {
                      pageX: _this.boundingClientRect.left,
                      pageY: _this.boundingClientRect.top
                    }));
                  } else {
                    _this.initialOffset = getPosition(event);
                  }
  
                  _this.initialScroll = {
                    left: _this.scrollContainer.scrollLeft,
                    top: _this.scrollContainer.scrollTop
                  };
                  _this.initialWindowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                  };
                  _this.helper = _this.helperContainer.appendChild(cloneNode(_node));
                  setInlineStyles(_this.helper, {
                    boxSizing: 'border-box',
                    height: "".concat(_this.height, "px"),
                    left: "".concat(_this.boundingClientRect.left - margin.left, "px"),
                    pointerEvents: 'none',
                    position: 'fixed',
                    top: "".concat(_this.boundingClientRect.top - margin.top, "px"),
                    width: "".concat(_this.width, "px")
                  });
  
                  if (_isKeySorting) {
                    _this.helper.focus();
                  }
  
                  if (_hideSortableGhost) {
                    _this.sortableGhost = _node;
                    setInlineStyles(_node, {
                      opacity: 0,
                      visibility: 'hidden'
                    });
                  }
  
                  _this.minTranslate = {};
                  _this.maxTranslate = {};
  
                  if (_isKeySorting) {
                    var _ref = _useWindowAsScrollContainer ? {
                      top: 0,
                      left: 0,
                      width: _this.contentWindow.innerWidth,
                      height: _this.contentWindow.innerHeight
                    } : _this.containerBoundingRect,
                        containerTop = _ref.top,
                        containerLeft = _ref.left,
                        containerWidth = _ref.width,
                        containerHeight = _ref.height;
  
                    var containerBottom = containerTop + containerHeight;
                    var containerRight = containerLeft + containerWidth;
  
                    if (_this.axis.x) {
                      _this.minTranslate.x = containerLeft - _this.boundingClientRect.left;
                      _this.maxTranslate.x = containerRight - (_this.boundingClientRect.left + _this.width);
                    }
  
                    if (_this.axis.y) {
                      _this.minTranslate.y = containerTop - _this.boundingClientRect.top;
                      _this.maxTranslate.y = containerBottom - (_this.boundingClientRect.top + _this.height);
                    }
                  } else {
                    if (_this.axis.x) {
                      _this.minTranslate.x = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.left) - _this.boundingClientRect.left - _this.width / 2;
                      _this.maxTranslate.x = (_useWindowAsScrollContainer ? _this.contentWindow.innerWidth : containerBoundingRect.left + containerBoundingRect.width) - _this.boundingClientRect.left - _this.width / 2;
                    }
  
                    if (_this.axis.y) {
                      _this.minTranslate.y = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.top) - _this.boundingClientRect.top - _this.height / 2;
                      _this.maxTranslate.y = (_useWindowAsScrollContainer ? _this.contentWindow.innerHeight : containerBoundingRect.top + containerBoundingRect.height) - _this.boundingClientRect.top - _this.height / 2;
                    }
                  }
  
                  if (_helperClass) {
                    _helperClass.split(' ').forEach(function (className) {
                      return _this.helper.classList.add(className);
                    });
                  }
  
                  _this.listenerNode = event.touches ? event.target : _this.contentWindow;
  
                  if (_isKeySorting) {
                    _this.listenerNode.addEventListener('wheel', _this.handleKeyEnd, true);
  
                    _this.listenerNode.addEventListener('mousedown', _this.handleKeyEnd, true);
  
                    _this.listenerNode.addEventListener('keydown', _this.handleKeyDown);
                  } else {
                    events.move.forEach(function (eventName) {
                      return _this.listenerNode.addEventListener(eventName, _this.handleSortMove, false);
                    });
                    events.end.forEach(function (eventName) {
                      return _this.listenerNode.addEventListener(eventName, _this.handleSortEnd, false);
                    });
                  }
  
                  _this.setState({
                    sorting: true,
                    sortingIndex: index
                  });
  
                  if (_onSortStart) {
                    _onSortStart({
                      node: _node,
                      index: index,
                      collection: _collection,
                      isKeySorting: _isKeySorting,
                      nodes: _this.manager.getOrderedRefs(),
                      helper: _this.helper
                    }, event);
                  }
  
                  if (_isKeySorting) {
                    _this.keyMove(0);
                  }
                };
  
                var _this$props3 = _this.props,
                    _axis = _this$props3.axis,
                    _getHelperDimensions = _this$props3.getHelperDimensions,
                    _helperClass = _this$props3.helperClass,
                    _hideSortableGhost = _this$props3.hideSortableGhost,
                    updateBeforeSortStart = _this$props3.updateBeforeSortStart,
                    _onSortStart = _this$props3.onSortStart,
                    _useWindowAsScrollContainer = _this$props3.useWindowAsScrollContainer;
                var _node = active.node,
                    _collection = active.collection;
                var _isKeySorting = _this.manager.isKeySorting;
  
                var _temp8 = function () {
                  if (typeof updateBeforeSortStart === 'function') {
                    _this._awaitingUpdateBeforeSortStart = true;
  
                    var _temp9 = _finallyRethrows(function () {
                      var index = _node.sortableInfo.index;
                      return Promise.resolve(updateBeforeSortStart({
                        collection: _collection,
                        index: index,
                        node: _node,
                        isKeySorting: _isKeySorting
                      }, event)).then(function () {});
                    }, function (_wasThrown, _result) {
                      _this._awaitingUpdateBeforeSortStart = false;
                      if (_wasThrown) throw _result;
                      return _result;
                    });
  
                    if (_temp9 && _temp9.then) return _temp9.then(function () {});
                  }
                }();
  
                return _temp8 && _temp8.then ? _temp8.then(_temp7) : _temp7(_temp8);
              }
            }();
  
            return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
          } catch (e) {
            return Promise.reject(e);
          }
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleSortMove", function (event) {
          var onSortMove = _this.props.onSortMove;
  
          if (typeof event.preventDefault === 'function' && event.cancelable) {
            event.preventDefault();
          }
  
          _this.updateHelperPosition(event);
  
          _this.animateNodes();
  
          _this.autoscroll();
  
          if (onSortMove) {
            onSortMove(event);
          }
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleSortEnd", function (event) {
          var _this$props4 = _this.props,
              hideSortableGhost = _this$props4.hideSortableGhost,
              onSortEnd = _this$props4.onSortEnd;
          var _this$manager = _this.manager,
              collection = _this$manager.active.collection,
              isKeySorting = _this$manager.isKeySorting;
  
          var nodes = _this.manager.getOrderedRefs();
  
          if (_this.listenerNode) {
            if (isKeySorting) {
              _this.listenerNode.removeEventListener('wheel', _this.handleKeyEnd, true);
  
              _this.listenerNode.removeEventListener('mousedown', _this.handleKeyEnd, true);
  
              _this.listenerNode.removeEventListener('keydown', _this.handleKeyDown);
            } else {
              events.move.forEach(function (eventName) {
                return _this.listenerNode.removeEventListener(eventName, _this.handleSortMove);
              });
              events.end.forEach(function (eventName) {
                return _this.listenerNode.removeEventListener(eventName, _this.handleSortEnd);
              });
            }
          }
  
          _this.helper.parentNode.removeChild(_this.helper);
  
          if (hideSortableGhost && _this.sortableGhost) {
            setInlineStyles(_this.sortableGhost, {
              opacity: '',
              visibility: ''
            });
          }
  
          for (var i = 0, len = nodes.length; i < len; i++) {
            var _node2 = nodes[i];
            var el = _node2.node;
            _node2.edgeOffset = null;
            _node2.boundingClientRect = null;
            setTranslate3d(el, null);
            setTransitionDuration(el, null);
            _node2.translate = null;
          }
  
          _this.autoScroller.clear();
  
          _this.manager.active = null;
          _this.manager.isKeySorting = false;
  
          _this.setState({
            sorting: false,
            sortingIndex: null
          });
  
          if (typeof onSortEnd === 'function') {
            onSortEnd({
              collection: collection,
              newIndex: _this.newIndex,
              oldIndex: _this.index,
              isKeySorting: isKeySorting,
              nodes: nodes
            }, event);
          }
  
          _this.touched = false;
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "autoscroll", function () {
          var disableAutoscroll = _this.props.disableAutoscroll;
          var isKeySorting = _this.manager.isKeySorting;
  
          if (disableAutoscroll) {
            _this.autoScroller.clear();
  
            return;
          }
  
          if (isKeySorting) {
            var translate = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, _this.translate);
  
            var scrollX = 0;
            var scrollY = 0;
  
            if (_this.axis.x) {
              translate.x = Math.min(_this.maxTranslate.x, Math.max(_this.minTranslate.x, _this.translate.x));
              scrollX = _this.translate.x - translate.x;
            }
  
            if (_this.axis.y) {
              translate.y = Math.min(_this.maxTranslate.y, Math.max(_this.minTranslate.y, _this.translate.y));
              scrollY = _this.translate.y - translate.y;
            }
  
            _this.translate = translate;
            setTranslate3d(_this.helper, _this.translate);
            _this.scrollContainer.scrollLeft += scrollX;
            _this.scrollContainer.scrollTop += scrollY;
            return;
          }
  
          _this.autoScroller.update({
            height: _this.height,
            maxTranslate: _this.maxTranslate,
            minTranslate: _this.minTranslate,
            translate: _this.translate,
            width: _this.width
          });
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "onAutoScroll", function (offset) {
          _this.translate.x += offset.left;
          _this.translate.y += offset.top;
  
          _this.animateNodes();
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleKeyDown", function (event) {
          var keyCode = event.keyCode;
          var _this$props5 = _this.props,
              shouldCancelStart = _this$props5.shouldCancelStart,
              _this$props5$keyCodes = _this$props5.keyCodes,
              customKeyCodes = _this$props5$keyCodes === void 0 ? {} : _this$props5$keyCodes;
  
          var keyCodes = (0,_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, defaultKeyCodes, customKeyCodes);
  
          if (_this.manager.active && !_this.manager.isKeySorting || !_this.manager.active && (!keyCodes.lift.includes(keyCode) || shouldCancelStart(event) || !_this.isValidSortingTarget(event))) {
            return;
          }
  
          event.stopPropagation();
          event.preventDefault();
  
          if (keyCodes.lift.includes(keyCode) && !_this.manager.active) {
            _this.keyLift(event);
          } else if (keyCodes.drop.includes(keyCode) && _this.manager.active) {
            _this.keyDrop(event);
          } else if (keyCodes.cancel.includes(keyCode)) {
            _this.newIndex = _this.manager.active.index;
  
            _this.keyDrop(event);
          } else if (keyCodes.up.includes(keyCode)) {
            _this.keyMove(-1);
          } else if (keyCodes.down.includes(keyCode)) {
            _this.keyMove(1);
          }
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "keyLift", function (event) {
          var target = event.target;
          var node = closest(target, function (el) {
            return el.sortableInfo != null;
          });
          var _node$sortableInfo2 = node.sortableInfo,
              index = _node$sortableInfo2.index,
              collection = _node$sortableInfo2.collection;
          _this.initialFocusedNode = target;
          _this.manager.isKeySorting = true;
          _this.manager.active = {
            index: index,
            collection: collection
          };
  
          _this.handlePress(event);
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "keyMove", function (shift) {
          var nodes = _this.manager.getOrderedRefs();
  
          var lastIndex = nodes[nodes.length - 1].node.sortableInfo.index;
          var newIndex = _this.newIndex + shift;
          var prevIndex = _this.newIndex;
  
          if (newIndex < 0 || newIndex > lastIndex) {
            return;
          }
  
          _this.prevIndex = prevIndex;
          _this.newIndex = newIndex;
          var targetIndex = getTargetIndex(_this.newIndex, _this.prevIndex, _this.index);
          var target = nodes.find(function (_ref2) {
            var node = _ref2.node;
            return node.sortableInfo.index === targetIndex;
          });
          var targetNode = target.node;
          var scrollDelta = _this.containerScrollDelta;
          var targetBoundingClientRect = target.boundingClientRect || getScrollAdjustedBoundingClientRect(targetNode, scrollDelta);
          var targetTranslate = target.translate || {
            x: 0,
            y: 0
          };
          var targetPosition = {
            top: targetBoundingClientRect.top + targetTranslate.y - scrollDelta.top,
            left: targetBoundingClientRect.left + targetTranslate.x - scrollDelta.left
          };
          var shouldAdjustForSize = prevIndex < newIndex;
          var sizeAdjustment = {
            x: shouldAdjustForSize && _this.axis.x ? targetNode.offsetWidth - _this.width : 0,
            y: shouldAdjustForSize && _this.axis.y ? targetNode.offsetHeight - _this.height : 0
          };
  
          _this.handleSortMove({
            pageX: targetPosition.left + sizeAdjustment.x,
            pageY: targetPosition.top + sizeAdjustment.y,
            ignoreTransition: shift === 0
          });
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "keyDrop", function (event) {
          _this.handleSortEnd(event);
  
          if (_this.initialFocusedNode) {
            _this.initialFocusedNode.focus();
          }
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleKeyEnd", function (event) {
          if (_this.manager.active) {
            _this.keyDrop(event);
          }
        });
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "isValidSortingTarget", function (event) {
          var useDragHandle = _this.props.useDragHandle;
          var target = event.target;
          var node = closest(target, function (el) {
            return el.sortableInfo != null;
          });
          return node && node.sortableInfo && !node.sortableInfo.disabled && (useDragHandle ? isSortableHandle(target) : target.sortableInfo);
        });
  
        var manager = new Manager();
        validateProps(props);
        _this.manager = manager;
        _this.wrappedInstance = (0,react__WEBPACK_IMPORTED_MODULE_10__.createRef)();
        _this.sortableContextValue = {
          manager: manager
        };
        _this.events = {
          end: _this.handleEnd,
          move: _this.handleMove,
          start: _this.handleStart
        };
        return _this;
      }
  
      (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(WithSortableContainer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;
  
          var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;
          var container = this.getContainer();
          Promise.resolve(container).then(function (containerNode) {
            _this2.container = containerNode;
            _this2.document = _this2.container.ownerDocument || document;
            var contentWindow = _this2.props.contentWindow || _this2.document.defaultView || window;
            _this2.contentWindow = typeof contentWindow === 'function' ? contentWindow() : contentWindow;
            _this2.scrollContainer = useWindowAsScrollContainer ? _this2.document.scrollingElement || _this2.document.documentElement : getScrollingParent(_this2.container) || _this2.container;
            _this2.autoScroller = new AutoScroller(_this2.scrollContainer, _this2.onAutoScroll);
            Object.keys(_this2.events).forEach(function (key) {
              return events[key].forEach(function (eventName) {
                return _this2.container.addEventListener(eventName, _this2.events[key], false);
              });
            });
  
            _this2.container.addEventListener('keydown', _this2.handleKeyDown);
          });
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          var _this3 = this;
  
          if (this.helper && this.helper.parentNode) {
            this.helper.parentNode.removeChild(this.helper);
          }
  
          if (!this.container) {
            return;
          }
  
          Object.keys(this.events).forEach(function (key) {
            return events[key].forEach(function (eventName) {
              return _this3.container.removeEventListener(eventName, _this3.events[key]);
            });
          });
          this.container.removeEventListener('keydown', this.handleKeyDown);
        }
      }, {
        key: "updateHelperPosition",
        value: function updateHelperPosition(event) {
          var _this$props6 = this.props,
              lockAxis = _this$props6.lockAxis,
              lockOffset = _this$props6.lockOffset,
              lockToContainerEdges = _this$props6.lockToContainerEdges,
              transitionDuration = _this$props6.transitionDuration,
              _this$props6$keyboard = _this$props6.keyboardSortingTransitionDuration,
              keyboardSortingTransitionDuration = _this$props6$keyboard === void 0 ? transitionDuration : _this$props6$keyboard;
          var isKeySorting = this.manager.isKeySorting;
          var ignoreTransition = event.ignoreTransition;
          var offset = getPosition(event);
          var translate = {
            x: offset.x - this.initialOffset.x,
            y: offset.y - this.initialOffset.y
          };
          translate.y -= window.pageYOffset - this.initialWindowScroll.top;
          translate.x -= window.pageXOffset - this.initialWindowScroll.left;
          this.translate = translate;
  
          if (lockToContainerEdges) {
            var _getLockPixelOffsets = getLockPixelOffsets({
              height: this.height,
              lockOffset: lockOffset,
              width: this.width
            }),
                _getLockPixelOffsets2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_getLockPixelOffsets, 2),
                minLockOffset = _getLockPixelOffsets2[0],
                maxLockOffset = _getLockPixelOffsets2[1];
  
            var minOffset = {
              x: this.width / 2 - minLockOffset.x,
              y: this.height / 2 - minLockOffset.y
            };
            var maxOffset = {
              x: this.width / 2 - maxLockOffset.x,
              y: this.height / 2 - maxLockOffset.y
            };
            translate.x = limit(this.minTranslate.x + minOffset.x, this.maxTranslate.x - maxOffset.x, translate.x);
            translate.y = limit(this.minTranslate.y + minOffset.y, this.maxTranslate.y - maxOffset.y, translate.y);
          }
  
          if (lockAxis === 'x') {
            translate.y = 0;
          } else if (lockAxis === 'y') {
            translate.x = 0;
          }
  
          if (isKeySorting && keyboardSortingTransitionDuration && !ignoreTransition) {
            setTransitionDuration(this.helper, keyboardSortingTransitionDuration);
          }
  
          setTranslate3d(this.helper, translate);
        }
      }, {
        key: "animateNodes",
        value: function animateNodes() {
          var _this$props7 = this.props,
              transitionDuration = _this$props7.transitionDuration,
              hideSortableGhost = _this$props7.hideSortableGhost,
              onSortOver = _this$props7.onSortOver;
          var containerScrollDelta = this.containerScrollDelta,
              windowScrollDelta = this.windowScrollDelta;
          var nodes = this.manager.getOrderedRefs();
          var sortingOffset = {
            left: this.offsetEdge.left + this.translate.x + containerScrollDelta.left,
            top: this.offsetEdge.top + this.translate.y + containerScrollDelta.top
          };
          var isKeySorting = this.manager.isKeySorting;
          var prevIndex = this.newIndex;
          this.newIndex = null;
  
          for (var i = 0, len = nodes.length; i < len; i++) {
            var _node3 = nodes[i].node;
            var index = _node3.sortableInfo.index;
            var width = _node3.offsetWidth;
            var height = _node3.offsetHeight;
            var offset = {
              height: this.height > height ? height / 2 : this.height / 2,
              width: this.width > width ? width / 2 : this.width / 2
            };
            var mustShiftBackward = isKeySorting && index > this.index && index <= prevIndex;
            var mustShiftForward = isKeySorting && index < this.index && index >= prevIndex;
            var translate = {
              x: 0,
              y: 0
            };
            var edgeOffset = nodes[i].edgeOffset;
  
            if (!edgeOffset) {
              edgeOffset = getEdgeOffset(_node3, this.container);
              nodes[i].edgeOffset = edgeOffset;
  
              if (isKeySorting) {
                nodes[i].boundingClientRect = getScrollAdjustedBoundingClientRect(_node3, containerScrollDelta);
              }
            }
  
            var nextNode = i < nodes.length - 1 && nodes[i + 1];
            var prevNode = i > 0 && nodes[i - 1];
  
            if (nextNode && !nextNode.edgeOffset) {
              nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.container);
  
              if (isKeySorting) {
                nextNode.boundingClientRect = getScrollAdjustedBoundingClientRect(nextNode.node, containerScrollDelta);
              }
            }
  
            if (index === this.index) {
              if (hideSortableGhost) {
                this.sortableGhost = _node3;
                setInlineStyles(_node3, {
                  opacity: 0,
                  visibility: 'hidden'
                });
              }
  
              continue;
            }
  
            if (transitionDuration) {
              setTransitionDuration(_node3, transitionDuration);
            }
  
            if (this.axis.x) {
              if (this.axis.y) {
                if (mustShiftForward || index < this.index && (sortingOffset.left + windowScrollDelta.left - offset.width <= edgeOffset.left && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height || sortingOffset.top + windowScrollDelta.top + offset.height <= edgeOffset.top)) {
                  translate.x = this.width + this.marginOffset.x;
  
                  if (edgeOffset.left + translate.x > this.containerBoundingRect.width - offset.width) {
                    if (nextNode) {
                      translate.x = nextNode.edgeOffset.left - edgeOffset.left;
                      translate.y = nextNode.edgeOffset.top - edgeOffset.top;
                    }
                  }
  
                  if (this.newIndex === null) {
                    this.newIndex = index;
                  }
                } else if (mustShiftBackward || index > this.index && (sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top || sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top + height)) {
                  translate.x = -(this.width + this.marginOffset.x);
  
                  if (edgeOffset.left + translate.x < this.containerBoundingRect.left + offset.width) {
                    if (prevNode) {
                      translate.x = prevNode.edgeOffset.left - edgeOffset.left;
                      translate.y = prevNode.edgeOffset.top - edgeOffset.top;
                    }
                  }
  
                  this.newIndex = index;
                }
              } else {
                if (mustShiftBackward || index > this.index && sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left) {
                  translate.x = -(this.width + this.marginOffset.x);
                  this.newIndex = index;
                } else if (mustShiftForward || index < this.index && sortingOffset.left + windowScrollDelta.left <= edgeOffset.left + offset.width) {
                  translate.x = this.width + this.marginOffset.x;
  
                  if (this.newIndex == null) {
                    this.newIndex = index;
                  }
                }
              }
            } else if (this.axis.y) {
              if (mustShiftBackward || index > this.index && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top) {
                translate.y = -(this.height + this.marginOffset.y);
                this.newIndex = index;
              } else if (mustShiftForward || index < this.index && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height) {
                translate.y = this.height + this.marginOffset.y;
  
                if (this.newIndex == null) {
                  this.newIndex = index;
                }
              }
            }
  
            setTranslate3d(_node3, translate);
            nodes[i].translate = translate;
          }
  
          if (this.newIndex == null) {
            this.newIndex = this.index;
          }
  
          if (isKeySorting) {
            this.newIndex = prevIndex;
          }
  
          var oldIndex = isKeySorting ? this.prevIndex : prevIndex;
  
          if (onSortOver && this.newIndex !== oldIndex) {
            onSortOver({
              collection: this.manager.active.collection,
              index: this.index,
              newIndex: this.newIndex,
              oldIndex: oldIndex,
              isKeySorting: isKeySorting,
              nodes: nodes,
              helper: this.helper
            });
          }
        }
      }, {
        key: "getWrappedInstance",
        value: function getWrappedInstance() {
          invariant__WEBPACK_IMPORTED_MODULE_12___default()(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call');
          return this.wrappedInstance.current;
        }
      }, {
        key: "getContainer",
        value: function getContainer() {
          var getContainer = this.props.getContainer;
  
          if (typeof getContainer !== 'function') {
            return (0,react_dom__WEBPACK_IMPORTED_MODULE_11__.findDOMNode)(this);
          }
  
          return getContainer(config.withRef ? this.getWrappedInstance() : undefined);
        }
      }, {
        key: "render",
        value: function render() {
          var ref = config.withRef ? this.wrappedInstance : null;
          return (0,react__WEBPACK_IMPORTED_MODULE_10__.createElement)(SortableContext.Provider, {
            value: this.sortableContextValue
          }, (0,react__WEBPACK_IMPORTED_MODULE_10__.createElement)(WrappedComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
            ref: ref
          }, omit(this.props, omittedProps))));
        }
      }, {
        key: "helperContainer",
        get: function get() {
          var helperContainer = this.props.helperContainer;
  
          if (typeof helperContainer === 'function') {
            return helperContainer();
          }
  
          return this.props.helperContainer || this.document.body;
        }
      }, {
        key: "containerScrollDelta",
        get: function get() {
          var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;
  
          if (useWindowAsScrollContainer) {
            return {
              left: 0,
              top: 0
            };
          }
  
          return {
            left: this.scrollContainer.scrollLeft - this.initialScroll.left,
            top: this.scrollContainer.scrollTop - this.initialScroll.top
          };
        }
      }, {
        key: "windowScrollDelta",
        get: function get() {
          return {
            left: this.contentWindow.pageXOffset - this.initialWindowScroll.left,
            top: this.contentWindow.pageYOffset - this.initialWindowScroll.top
          };
        }
      }]);
  
      return WithSortableContainer;
    }(react__WEBPACK_IMPORTED_MODULE_10__.Component), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "displayName", provideDisplayName('sortableList', WrappedComponent)), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "defaultProps", defaultProps), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "propTypes", propTypes), _temp;
  }
  
  var propTypes$1 = {
    index: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().number.isRequired),
    collection: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_14___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)]),
    disabled: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool)
  };
  var omittedProps$1 = Object.keys(propTypes$1);
  function sortableElement(WrappedComponent) {
    var _class, _temp;
  
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      withRef: false
    };
    return _temp = _class = function (_React$Component) {
      (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(WithSortableElement, _React$Component);
  
      function WithSortableElement() {
        var _getPrototypeOf2;
  
        var _this;
  
        (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, WithSortableElement);
  
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
  
        _this = (0,_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, (_getPrototypeOf2 = (0,_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(WithSortableElement)).call.apply(_getPrototypeOf2, [this].concat(args)));
  
        (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "wrappedInstance", (0,react__WEBPACK_IMPORTED_MODULE_10__.createRef)());
  
        return _this;
      }
  
      (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(WithSortableElement, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.register();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          if (this.node) {
            if (prevProps.index !== this.props.index) {
              this.node.sortableInfo.index = this.props.index;
            }
  
            if (prevProps.disabled !== this.props.disabled) {
              this.node.sortableInfo.disabled = this.props.disabled;
            }
          }
  
          if (prevProps.collection !== this.props.collection) {
            this.unregister(prevProps.collection);
            this.register();
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.unregister();
        }
      }, {
        key: "register",
        value: function register() {
          var _this$props = this.props,
              collection = _this$props.collection,
              disabled = _this$props.disabled,
              index = _this$props.index;
          var node = (0,react_dom__WEBPACK_IMPORTED_MODULE_11__.findDOMNode)(this);
          node.sortableInfo = {
            collection: collection,
            disabled: disabled,
            index: index,
            manager: this.context.manager
          };
          this.node = node;
          this.ref = {
            node: node
          };
          this.context.manager.add(collection, this.ref);
        }
      }, {
        key: "unregister",
        value: function unregister() {
          var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.collection;
          this.context.manager.remove(collection, this.ref);
        }
      }, {
        key: "getWrappedInstance",
        value: function getWrappedInstance() {
          invariant__WEBPACK_IMPORTED_MODULE_12___default()(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call');
          return this.wrappedInstance.current;
        }
      }, {
        key: "render",
        value: function render() {
          var ref = config.withRef ? this.wrappedInstance : null;
          return (0,react__WEBPACK_IMPORTED_MODULE_10__.createElement)(WrappedComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
            ref: ref
          }, omit(this.props, omittedProps$1)));
        }
      }]);
  
      return WithSortableElement;
    }(react__WEBPACK_IMPORTED_MODULE_10__.Component), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "displayName", provideDisplayName('sortableElement', WrappedComponent)), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "contextType", SortableContext), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "propTypes", propTypes$1), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "defaultProps", {
      collection: 0
    }), _temp;
  }
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/react-tooltip/dist/index.es.js":
  /*!*****************************************************!*\
    !*** ./node_modules/react-tooltip/dist/index.es.js ***!
    \*****************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ ReactTooltip; }
  /* harmony export */ });
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
  /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
  /* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
  
  
  
  
  function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};
  
  var check = function (it) {
    return it && it.Math == Math && it;
  };
  
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$a =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();
  
  var objectGetOwnPropertyDescriptor = {};
  
  var fails$9 = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };
  
  var fails$8 = fails$9;
  
  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$8(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });
  
  var fails$7 = fails$9;
  
  var functionBindNative = !fails$7(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });
  
  var NATIVE_BIND$2 = functionBindNative;
  
  var call$4 = Function.prototype.call;
  
  var functionCall = NATIVE_BIND$2 ? call$4.bind(call$4) : function () {
    return call$4.apply(call$4, arguments);
  };
  
  var objectPropertyIsEnumerable = {};
  
  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  
  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);
  
  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;
  
  var createPropertyDescriptor$2 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  
  var NATIVE_BIND$1 = functionBindNative;
  
  var FunctionPrototype$1 = Function.prototype;
  var call$3 = FunctionPrototype$1.call;
  var uncurryThisWithBind = NATIVE_BIND$1 && FunctionPrototype$1.bind.bind(call$3, call$3);
  
  var functionUncurryThisRaw = function (fn) {
    return NATIVE_BIND$1 ? uncurryThisWithBind(fn) : function () {
      return call$3.apply(fn, arguments);
    };
  };
  
  var uncurryThisRaw$1 = functionUncurryThisRaw;
  
  var toString$1 = uncurryThisRaw$1({}.toString);
  var stringSlice = uncurryThisRaw$1(''.slice);
  
  var classofRaw$2 = function (it) {
    return stringSlice(toString$1(it), 8, -1);
  };
  
  var classofRaw$1 = classofRaw$2;
  var uncurryThisRaw = functionUncurryThisRaw;
  
  var functionUncurryThis = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw$1(fn) === 'Function') return uncurryThisRaw(fn);
  };
  
  var uncurryThis$9 = functionUncurryThis;
  var fails$6 = fails$9;
  var classof$3 = classofRaw$2;
  
  var $Object$3 = Object;
  var split = uncurryThis$9(''.split);
  
  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$6(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$3('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$3(it) == 'String' ? split(it, '') : $Object$3(it);
  } : $Object$3;
  
  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined$2 = function (it) {
    return it === null || it === undefined;
  };
  
  var isNullOrUndefined$1 = isNullOrUndefined$2;
  
  var $TypeError$5 = TypeError;
  
  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$2 = function (it) {
    if (isNullOrUndefined$1(it)) throw $TypeError$5("Can't call method on " + it);
    return it;
  };
  
  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$1 = requireObjectCoercible$2;
  
  var toIndexedObject$4 = function (it) {
    return IndexedObject$1(requireObjectCoercible$1(it));
  };
  
  var documentAll$2 = typeof document == 'object' && document.all;
  
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;
  
  var documentAll_1 = {
    all: documentAll$2,
    IS_HTMLDDA: IS_HTMLDDA
  };
  
  var $documentAll$1 = documentAll_1;
  
  var documentAll$1 = $documentAll$1.all;
  
  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$c = $documentAll$1.IS_HTMLDDA ? function (argument) {
    return typeof argument == 'function' || argument === documentAll$1;
  } : function (argument) {
    return typeof argument == 'function';
  };
  
  var isCallable$b = isCallable$c;
  var $documentAll = documentAll_1;
  
  var documentAll = $documentAll.all;
  
  var isObject$6 = $documentAll.IS_HTMLDDA ? function (it) {
    return typeof it == 'object' ? it !== null : isCallable$b(it) || it === documentAll;
  } : function (it) {
    return typeof it == 'object' ? it !== null : isCallable$b(it);
  };
  
  var global$9 = global$a;
  var isCallable$a = isCallable$c;
  
  var aFunction = function (argument) {
    return isCallable$a(argument) ? argument : undefined;
  };
  
  var getBuiltIn$5 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$9[namespace]) : global$9[namespace] && global$9[namespace][method];
  };
  
  var uncurryThis$8 = functionUncurryThis;
  
  var objectIsPrototypeOf = uncurryThis$8({}.isPrototypeOf);
  
  var getBuiltIn$4 = getBuiltIn$5;
  
  var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';
  
  var global$8 = global$a;
  var userAgent = engineUserAgent;
  
  var process = global$8.process;
  var Deno = global$8.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;
  
  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }
  
  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }
  
  var engineV8Version = version;
  
  /* eslint-disable es/no-symbol -- required for testing */
  
  var V8_VERSION = engineV8Version;
  var fails$5 = fails$9;
  
  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$5(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION && V8_VERSION < 41;
  });
  
  /* eslint-disable es/no-symbol -- required for testing */
  
  var NATIVE_SYMBOL$1 = symbolConstructorDetection;
  
  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';
  
  var getBuiltIn$3 = getBuiltIn$5;
  var isCallable$9 = isCallable$c;
  var isPrototypeOf = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  
  var $Object$2 = Object;
  
  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$3('Symbol');
    return isCallable$9($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
  };
  
  var $String$1 = String;
  
  var tryToString$1 = function (argument) {
    try {
      return $String$1(argument);
    } catch (error) {
      return 'Object';
    }
  };
  
  var isCallable$8 = isCallable$c;
  var tryToString = tryToString$1;
  
  var $TypeError$4 = TypeError;
  
  // `Assert: IsCallable(argument) is true`
  var aCallable$2 = function (argument) {
    if (isCallable$8(argument)) return argument;
    throw $TypeError$4(tryToString(argument) + ' is not a function');
  };
  
  var aCallable$1 = aCallable$2;
  var isNullOrUndefined = isNullOrUndefined$2;
  
  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$1 = function (V, P) {
    var func = V[P];
    return isNullOrUndefined(func) ? undefined : aCallable$1(func);
  };
  
  var call$2 = functionCall;
  var isCallable$7 = isCallable$c;
  var isObject$5 = isObject$6;
  
  var $TypeError$3 = TypeError;
  
  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$7(fn = input.toString) && !isObject$5(val = call$2(fn, input))) return val;
    if (isCallable$7(fn = input.valueOf) && !isObject$5(val = call$2(fn, input))) return val;
    if (pref !== 'string' && isCallable$7(fn = input.toString) && !isObject$5(val = call$2(fn, input))) return val;
    throw $TypeError$3("Can't convert object to primitive value");
  };
  
  var shared$3 = {exports: {}};
  
  var global$7 = global$a;
  
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$2 = Object.defineProperty;
  
  var defineGlobalProperty$3 = function (key, value) {
    try {
      defineProperty$2(global$7, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$7[key] = value;
    } return value;
  };
  
  var global$6 = global$a;
  var defineGlobalProperty$2 = defineGlobalProperty$3;
  
  var SHARED = '__core-js_shared__';
  var store$3 = global$6[SHARED] || defineGlobalProperty$2(SHARED, {});
  
  var sharedStore = store$3;
  
  var store$2 = sharedStore;
  
  (shared$3.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.25.5',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.25.5/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });
  
  var requireObjectCoercible = requireObjectCoercible$2;
  
  var $Object$1 = Object;
  
  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$2 = function (argument) {
    return $Object$1(requireObjectCoercible(argument));
  };
  
  var uncurryThis$7 = functionUncurryThis;
  var toObject$1 = toObject$2;
  
  var hasOwnProperty = uncurryThis$7({}.hasOwnProperty);
  
  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$1(it), key);
  };
  
  var uncurryThis$6 = functionUncurryThis;
  
  var id = 0;
  var postfix = Math.random();
  var toString = uncurryThis$6(1.0.toString);
  
  var uid$2 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
  };
  
  var global$5 = global$a;
  var shared$2 = shared$3.exports;
  var hasOwn$6 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = symbolConstructorDetection;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  
  var WellKnownSymbolsStore = shared$2('wks');
  var Symbol$1 = global$5.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
  
  var wellKnownSymbol$5 = function (name) {
    if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    } return WellKnownSymbolsStore[name];
  };
  
  var call$1 = functionCall;
  var isObject$4 = isObject$6;
  var isSymbol$1 = isSymbol$2;
  var getMethod = getMethod$1;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$4 = wellKnownSymbol$5;
  
  var $TypeError$2 = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$4('toPrimitive');
  
  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$4(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$1(exoticToPrim, input, pref);
      if (!isObject$4(result) || isSymbol$1(result)) return result;
      throw $TypeError$2("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };
  
  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;
  
  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$2 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };
  
  var global$4 = global$a;
  var isObject$3 = isObject$6;
  
  var document$1 = global$4.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$3(document$1) && isObject$3(document$1.createElement);
  
  var documentCreateElement$1 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };
  
  var DESCRIPTORS$7 = descriptors;
  var fails$4 = fails$9;
  var createElement = documentCreateElement$1;
  
  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$7 && !fails$4(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });
  
  var DESCRIPTORS$6 = descriptors;
  var call = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$1 = createPropertyDescriptor$2;
  var toIndexedObject$3 = toIndexedObject$4;
  var toPropertyKey$1 = toPropertyKey$2;
  var hasOwn$5 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$3(O);
    P = toPropertyKey$1(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$5(O, P)) return createPropertyDescriptor$1(!call(propertyIsEnumerableModule.f, O, P), O[P]);
  };
  
  var objectDefineProperty = {};
  
  var DESCRIPTORS$5 = descriptors;
  var fails$3 = fails$9;
  
  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$3(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });
  
  var isObject$2 = isObject$6;
  
  var $String = String;
  var $TypeError$1 = TypeError;
  
  // `Assert: Type(argument) is Object`
  var anObject$4 = function (argument) {
    if (isObject$2(argument)) return argument;
    throw $TypeError$1($String(argument) + ' is not an object');
  };
  
  var DESCRIPTORS$4 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$3 = anObject$4;
  var toPropertyKey = toPropertyKey$2;
  
  var $TypeError = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';
  
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$3(O);
    P = toPropertyKey(P);
    anObject$3(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$3(O);
    P = toPropertyKey(P);
    anObject$3(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  
  var DESCRIPTORS$3 = descriptors;
  var definePropertyModule$3 = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$2;
  
  var createNonEnumerableProperty$2 = DESCRIPTORS$3 ? function (object, key, value) {
    return definePropertyModule$3.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };
  
  var makeBuiltIn$2 = {exports: {}};
  
  var DESCRIPTORS$2 = descriptors;
  var hasOwn$4 = hasOwnProperty_1;
  
  var FunctionPrototype = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;
  
  var EXISTS = hasOwn$4(FunctionPrototype, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || (DESCRIPTORS$2 && getDescriptor(FunctionPrototype, 'name').configurable));
  
  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };
  
  var uncurryThis$5 = functionUncurryThis;
  var isCallable$6 = isCallable$c;
  var store$1 = sharedStore;
  
  var functionToString = uncurryThis$5(Function.toString);
  
  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$6(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }
  
  var inspectSource$2 = store$1.inspectSource;
  
  var global$3 = global$a;
  var isCallable$5 = isCallable$c;
  
  var WeakMap$1 = global$3.WeakMap;
  
  var weakMapBasicDetection = isCallable$5(WeakMap$1) && /native code/.test(String(WeakMap$1));
  
  var shared$1 = shared$3.exports;
  var uid = uid$2;
  
  var keys = shared$1('keys');
  
  var sharedKey$2 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };
  
  var hiddenKeys$4 = {};
  
  var NATIVE_WEAK_MAP = weakMapBasicDetection;
  var global$2 = global$a;
  var isObject$1 = isObject$6;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$2;
  var hasOwn$3 = hasOwnProperty_1;
  var shared = sharedStore;
  var sharedKey$1 = sharedKey$2;
  var hiddenKeys$3 = hiddenKeys$4;
  
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$1 = global$2.TypeError;
  var WeakMap = global$2.WeakMap;
  var set, get, has;
  
  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };
  
  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };
  
  if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set = function (it, metadata) {
      if (store.has(it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get = function (it) {
      return store.get(it) || {};
    };
    has = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey$1('state');
    hiddenKeys$3[STATE] = true;
    set = function (it, metadata) {
      if (hasOwn$3(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$1(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn$3(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$3(it, STATE);
    };
  }
  
  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };
  
  var fails$2 = fails$9;
  var isCallable$4 = isCallable$c;
  var hasOwn$2 = hasOwnProperty_1;
  var DESCRIPTORS$1 = descriptors;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var inspectSource$1 = inspectSource$2;
  var InternalStateModule = internalState;
  
  var enforceInternalState = InternalStateModule.enforce;
  var getInternalState = InternalStateModule.get;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$1 = Object.defineProperty;
  
  var CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$2(function () {
    return defineProperty$1(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });
  
  var TEMPLATE = String(String).split('String');
  
  var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      if (DESCRIPTORS$1) defineProperty$1(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, 'arity') && value.length !== options.arity) {
      defineProperty$1(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn$2(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS$1) defineProperty$1(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState(value);
    if (!hasOwn$2(state, 'source')) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    } return value;
  };
  
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn$1(function toString() {
    return isCallable$4(this) && getInternalState(this).source || inspectSource$1(this);
  }, 'toString');
  
  var isCallable$3 = isCallable$c;
  var definePropertyModule$2 = objectDefineProperty;
  var makeBuiltIn = makeBuiltIn$2.exports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;
  
  var defineBuiltIn$1 = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$3(value)) makeBuiltIn(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty$1(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];
        else if (O[key]) simple = true;
      } catch (error) { /* empty */ }
      if (simple) O[key] = value;
      else definePropertyModule$2.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    } return O;
  };
  
  var objectGetOwnPropertyNames = {};
  
  var ceil = Math.ceil;
  var floor = Math.floor;
  
  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
  };
  
  var trunc = mathTrunc;
  
  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$2 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
  };
  
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;
  
  var max = Math.max;
  var min$1 = Math.min;
  
  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toIntegerOrInfinity$1(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };
  
  var toIntegerOrInfinity = toIntegerOrInfinity$2;
  
  var min = Math.min;
  
  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$1 = function (argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };
  
  var toLength = toLength$1;
  
  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$2 = function (obj) {
    return toLength(obj.length);
  };
  
  var toIndexedObject$2 = toIndexedObject$4;
  var toAbsoluteIndex = toAbsoluteIndex$1;
  var lengthOfArrayLike$1 = lengthOfArrayLike$2;
  
  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$2($this);
      var length = lengthOfArrayLike$1(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };
  
  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$1(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$1(false)
  };
  
  var uncurryThis$4 = functionUncurryThis;
  var hasOwn$1 = hasOwnProperty_1;
  var toIndexedObject$1 = toIndexedObject$4;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;
  
  var push$1 = uncurryThis$4([].push);
  
  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$1(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
      ~indexOf(result, key) || push$1(result, key);
    }
    return result;
  };
  
  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];
  
  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;
  
  var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');
  
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };
  
  var objectGetOwnPropertySymbols = {};
  
  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
  
  var getBuiltIn$2 = getBuiltIn$5;
  var uncurryThis$3 = functionUncurryThis;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$2 = anObject$4;
  
  var concat = uncurryThis$3([].concat);
  
  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$2(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
  };
  
  var hasOwn = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$1 = objectDefineProperty;
  
  var copyConstructorProperties$1 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$1.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };
  
  var fails$1 = fails$9;
  var isCallable$2 = isCallable$c;
  
  var replacement = /#|\.prototype\./;
  
  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$2(detection) ? fails$1(detection)
      : !!detection;
  };
  
  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };
  
  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';
  
  var isForced_1 = isForced$1;
  
  var global$1 = global$a;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty = createNonEnumerableProperty$2;
  var defineBuiltIn = defineBuiltIn$1;
  var defineGlobalProperty = defineGlobalProperty$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced = isForced_1;
  
  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$1;
    } else if (STATIC) {
      target = global$1[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = (global$1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      defineBuiltIn(target, key, sourceProperty, options);
    }
  };
  
  var uncurryThis$2 = functionUncurryThis;
  var aCallable = aCallable$2;
  var NATIVE_BIND = functionBindNative;
  
  var bind$1 = uncurryThis$2(uncurryThis$2.bind);
  
  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };
  
  var classof$2 = classofRaw$2;
  
  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$1 = Array.isArray || function isArray(argument) {
    return classof$2(argument) == 'Array';
  };
  
  var wellKnownSymbol$3 = wellKnownSymbol$5;
  
  var TO_STRING_TAG$1 = wellKnownSymbol$3('toStringTag');
  var test = {};
  
  test[TO_STRING_TAG$1] = 'z';
  
  var toStringTagSupport = String(test) === '[object z]';
  
  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var isCallable$1 = isCallable$c;
  var classofRaw = classofRaw$2;
  var wellKnownSymbol$2 = wellKnownSymbol$5;
  
  var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');
  var $Object = Object;
  
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';
  
  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };
  
  // getting tag from ES6+ `Object.prototype.toString`
  var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable$1(O.callee) ? 'Arguments' : result;
  };
  
  var uncurryThis$1 = functionUncurryThis;
  var fails = fails$9;
  var isCallable = isCallable$c;
  var classof = classof$1;
  var getBuiltIn$1 = getBuiltIn$5;
  var inspectSource = inspectSource$2;
  
  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn$1('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = uncurryThis$1(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
  
  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };
  
  isConstructorLegacy.sham = true;
  
  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$1 = !construct || fails(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;
  
  var isArray = isArray$1;
  var isConstructor = isConstructor$1;
  var isObject = isObject$6;
  var wellKnownSymbol$1 = wellKnownSymbol$5;
  
  var SPECIES = wellKnownSymbol$1('species');
  var $Array = Array;
  
  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return C === undefined ? $Array : C;
  };
  
  var arraySpeciesConstructor = arraySpeciesConstructor$1;
  
  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };
  
  var bind = functionBindContext;
  var uncurryThis = functionUncurryThis;
  var IndexedObject = indexedObject;
  var toObject = toObject$2;
  var lengthOfArrayLike = lengthOfArrayLike$2;
  var arraySpeciesCreate = arraySpeciesCreate$1;
  
  var push = uncurryThis([].push);
  
  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = IndexedObject(O);
      var boundFunction = bind(callbackfn, that);
      var length = lengthOfArrayLike(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };
  
  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod(7)
  };
  
  var objectDefineProperties = {};
  
  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;
  
  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };
  
  var DESCRIPTORS = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule = objectDefineProperty;
  var anObject$1 = anObject$4;
  var toIndexedObject = toIndexedObject$4;
  var objectKeys = objectKeys$1;
  
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$1(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
    return O;
  };
  
  var getBuiltIn = getBuiltIn$5;
  
  var html$1 = getBuiltIn('document', 'documentElement');
  
  /* global ActiveXObject -- old IE, WSH */
  
  var anObject = anObject$4;
  var definePropertiesModule = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey = sharedKey$2;
  
  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');
  
  var EmptyConstructor = function () { /* empty */ };
  
  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };
  
  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };
  
  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };
  
  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };
  
  hiddenKeys[IE_PROTO] = true;
  
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
  };
  
  var wellKnownSymbol = wellKnownSymbol$5;
  var create = objectCreate;
  var defineProperty = objectDefineProperty.f;
  
  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;
  
  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    defineProperty(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create(null)
    });
  }
  
  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$1 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };
  
  var $ = _export;
  var $find = arrayIteration.find;
  var addToUnscopables = addToUnscopables$1;
  
  var FIND = 'find';
  var SKIPS_HOLES = true;
  
  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });
  
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  $({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);
  
  var CONSTANT = {
    GLOBAL: {
      HIDE: '__react_tooltip_hide_event',
      REBUILD: '__react_tooltip_rebuild_event',
      SHOW: '__react_tooltip_show_event'
    }
  };
  
  /**
   * Static methods for react-tooltip
   */
  var dispatchGlobalEvent = function dispatchGlobalEvent(eventName, opts) {
    // Compatible with IE
    // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
    // @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
    var event;
    if (typeof window.CustomEvent === 'function') {
      event = new window.CustomEvent(eventName, {
        detail: opts
      });
    } else {
      event = document.createEvent('Event');
      event.initEvent(eventName, false, true, opts);
    }
    window.dispatchEvent(event);
  };
  function staticMethods (target) {
    /**
     * Hide all tooltip
     * @trigger ReactTooltip.hide()
     */
    target.hide = function (target) {
      dispatchGlobalEvent(CONSTANT.GLOBAL.HIDE, {
        target: target
      });
    };
  
    /**
     * Rebuild all tooltip
     * @trigger ReactTooltip.rebuild()
     */
    target.rebuild = function () {
      dispatchGlobalEvent(CONSTANT.GLOBAL.REBUILD);
    };
  
    /**
     * Show specific tooltip
     * @trigger ReactTooltip.show()
     */
    target.show = function (target) {
      dispatchGlobalEvent(CONSTANT.GLOBAL.SHOW, {
        target: target
      });
    };
    target.prototype.globalRebuild = function () {
      if (this.mount) {
        this.unbindListener();
        this.bindListener();
      }
    };
    target.prototype.globalShow = function (event) {
      if (this.mount) {
        var hasTarget = event && event.detail && event.detail.target && true || false;
        // Create a fake event, specific show will limit the type to `solid`
        // only `float` type cares e.clientX e.clientY
        this.showTooltip({
          currentTarget: hasTarget && event.detail.target
        }, true);
      }
    };
    target.prototype.globalHide = function (event) {
      if (this.mount) {
        var hasTarget = event && event.detail && event.detail.target && true || false;
        this.hideTooltip({
          currentTarget: hasTarget && event.detail.target
        }, hasTarget);
      }
    };
  }
  
  /**
   * Events that should be bound to the window
   */
  function windowListener (target) {
    target.prototype.bindWindowEvents = function (resizeHide) {
      // ReactTooltip.hide
      window.removeEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide);
      window.addEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide, false);
  
      // ReactTooltip.rebuild
      window.removeEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild);
      window.addEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild, false);
  
      // ReactTooltip.show
      window.removeEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow);
      window.addEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow, false);
  
      // Resize
      if (resizeHide) {
        window.removeEventListener('resize', this.onWindowResize);
        window.addEventListener('resize', this.onWindowResize, false);
      }
    };
    target.prototype.unbindWindowEvents = function () {
      window.removeEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide);
      window.removeEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild);
      window.removeEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow);
      window.removeEventListener('resize', this.onWindowResize);
    };
  
    /**
     * invoked by resize event of window
     */
    target.prototype.onWindowResize = function () {
      if (!this.mount) return;
      this.hideTooltip();
    };
  }
  
  /**
   * Custom events to control showing and hiding of tooltip
   *
   * @attributes
   * - `event` {String}
   * - `eventOff` {String}
   */
  
  var checkStatus = function checkStatus(dataEventOff, e) {
    var show = this.state.show;
    var id = this.props.id;
    var isCapture = this.isCapture(e.currentTarget);
    var currentItem = e.currentTarget.getAttribute('currentItem');
    if (!isCapture) e.stopPropagation();
    if (show && currentItem === 'true') {
      if (!dataEventOff) this.hideTooltip(e);
    } else {
      e.currentTarget.setAttribute('currentItem', 'true');
      setUntargetItems(e.currentTarget, this.getTargetArray(id));
      this.showTooltip(e);
    }
  };
  var setUntargetItems = function setUntargetItems(currentTarget, targetArray) {
    for (var i = 0; i < targetArray.length; i++) {
      if (currentTarget !== targetArray[i]) {
        targetArray[i].setAttribute('currentItem', 'false');
      } else {
        targetArray[i].setAttribute('currentItem', 'true');
      }
    }
  };
  var customListeners = {
    id: '9b69f92e-d3fe-498b-b1b4-c5e63a51b0cf',
    set: function set(target, event, listener) {
      if (this.id in target) {
        var map = target[this.id];
        map[event] = listener;
      } else {
        // this is workaround for WeakMap, which is not supported in older browsers, such as IE
        Object.defineProperty(target, this.id, {
          configurable: true,
          value: _defineProperty({}, event, listener)
        });
      }
    },
    get: function get(target, event) {
      var map = target[this.id];
      if (map !== undefined) {
        return map[event];
      }
    }
  };
  function customEvent (target) {
    target.prototype.isCustomEvent = function (ele) {
      var event = this.state.event;
      return event || !!ele.getAttribute('data-event');
    };
  
    /* Bind listener for custom event */
    target.prototype.customBindListener = function (ele) {
      var _this = this;
      var _this$state = this.state,
        event = _this$state.event,
        eventOff = _this$state.eventOff;
      var dataEvent = ele.getAttribute('data-event') || event;
      var dataEventOff = ele.getAttribute('data-event-off') || eventOff;
      dataEvent.split(' ').forEach(function (event) {
        ele.removeEventListener(event, customListeners.get(ele, event));
        var customListener = checkStatus.bind(_this, dataEventOff);
        customListeners.set(ele, event, customListener);
        ele.addEventListener(event, customListener, false);
      });
      if (dataEventOff) {
        dataEventOff.split(' ').forEach(function (event) {
          ele.removeEventListener(event, _this.hideTooltip);
          ele.addEventListener(event, _this.hideTooltip, false);
        });
      }
    };
  
    /* Unbind listener for custom event */
    target.prototype.customUnbindListener = function (ele) {
      var _this$state2 = this.state,
        event = _this$state2.event,
        eventOff = _this$state2.eventOff;
      var dataEvent = event || ele.getAttribute('data-event');
      var dataEventOff = eventOff || ele.getAttribute('data-event-off');
      ele.removeEventListener(dataEvent, customListeners.get(ele, event));
      if (dataEventOff) ele.removeEventListener(dataEventOff, this.hideTooltip);
    };
  }
  
  /**
   * Util method to judge if it should follow capture model
   */
  
  function isCapture (target) {
    target.prototype.isCapture = function (currentTarget) {
      return currentTarget && currentTarget.getAttribute('data-iscapture') === 'true' || this.props.isCapture || false;
    };
  }
  
  /**
   * Util method to get effect
   */
  
  function getEffect (target) {
    target.prototype.getEffect = function (currentTarget) {
      var dataEffect = currentTarget.getAttribute('data-effect');
      return dataEffect || this.props.effect || 'float';
    };
  }
  
  /**
   * Util method to get effect
   */
  var makeProxy = function makeProxy(e) {
    var proxy = {};
    for (var key in e) {
      if (typeof e[key] === 'function') {
        proxy[key] = e[key].bind(e);
      } else {
        proxy[key] = e[key];
      }
    }
    return proxy;
  };
  var bodyListener = function bodyListener(callback, options, e) {
    var _options$respectEffec = options.respectEffect,
      respectEffect = _options$respectEffec === void 0 ? false : _options$respectEffec,
      _options$customEvent = options.customEvent,
      customEvent = _options$customEvent === void 0 ? false : _options$customEvent;
    var id = this.props.id;
    var tip = null;
    var forId;
    var target = e.target;
    var lastTarget;
    // walk up parent chain until tip is found
    // there is no match if parent visible area is matched by mouse position, so some corner cases might not work as expected
    while (tip === null && target !== null) {
      lastTarget = target;
      tip = target.getAttribute('data-tip') || null;
      forId = target.getAttribute('data-for') || null;
      target = target.parentElement;
    }
    target = lastTarget || e.target;
    if (this.isCustomEvent(target) && !customEvent) {
      return;
    }
    var isTargetBelongsToTooltip = id == null && forId == null || forId === id;
    if (tip != null && (!respectEffect || this.getEffect(target) === 'float') && isTargetBelongsToTooltip) {
      var proxy = makeProxy(e);
      proxy.currentTarget = target;
      callback(proxy);
    }
  };
  var findCustomEvents = function findCustomEvents(targetArray, dataAttribute) {
    var events = {};
    targetArray.forEach(function (target) {
      var event = target.getAttribute(dataAttribute);
      if (event) event.split(' ').forEach(function (event) {
        return events[event] = true;
      });
    });
    return events;
  };
  var getBody = function getBody() {
    return document.getElementsByTagName('body')[0];
  };
  function bodyMode (target) {
    target.prototype.isBodyMode = function () {
      return !!this.props.bodyMode;
    };
    target.prototype.bindBodyListener = function (targetArray) {
      var _this = this;
      var _this$state = this.state,
        event = _this$state.event,
        eventOff = _this$state.eventOff,
        possibleCustomEvents = _this$state.possibleCustomEvents,
        possibleCustomEventsOff = _this$state.possibleCustomEventsOff;
      var body = getBody();
      var customEvents = findCustomEvents(targetArray, 'data-event');
      var customEventsOff = findCustomEvents(targetArray, 'data-event-off');
      if (event != null) customEvents[event] = true;
      if (eventOff != null) customEventsOff[eventOff] = true;
      possibleCustomEvents.split(' ').forEach(function (event) {
        return customEvents[event] = true;
      });
      possibleCustomEventsOff.split(' ').forEach(function (event) {
        return customEventsOff[event] = true;
      });
      this.unbindBodyListener(body);
      var listeners = this.bodyModeListeners = {};
      if (event == null) {
        listeners.mouseover = bodyListener.bind(this, this.showTooltip, {});
        listeners.mousemove = bodyListener.bind(this, this.updateTooltip, {
          respectEffect: true
        });
        listeners.mouseout = bodyListener.bind(this, this.hideTooltip, {});
      }
      for (var _event in customEvents) {
        listeners[_event] = bodyListener.bind(this, function (e) {
          var targetEventOff = e.currentTarget.getAttribute('data-event-off') || eventOff;
          checkStatus.call(_this, targetEventOff, e);
        }, {
          customEvent: true
        });
      }
      for (var _event2 in customEventsOff) {
        listeners[_event2] = bodyListener.bind(this, this.hideTooltip, {
          customEvent: true
        });
      }
      for (var _event3 in listeners) {
        body.addEventListener(_event3, listeners[_event3]);
      }
    };
    target.prototype.unbindBodyListener = function (body) {
      body = body || getBody();
      var listeners = this.bodyModeListeners;
      for (var event in listeners) {
        body.removeEventListener(event, listeners[event]);
      }
    };
  }
  
  /**
   * Tracking target removing from DOM.
   * It's necessary to hide tooltip when it's target disappears.
   * Otherwise, the tooltip would be shown forever until another target
   * is triggered.
   *
   * If MutationObserver is not available, this feature just doesn't work.
   */
  
  // https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
  var getMutationObserverClass = function getMutationObserverClass() {
    return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  };
  function trackRemoval (target) {
    target.prototype.bindRemovalTracker = function () {
      var _this = this;
      var MutationObserver = getMutationObserverClass();
      if (MutationObserver == null) return;
      var observer = new MutationObserver(function (mutations) {
        for (var m1 = 0; m1 < mutations.length; m1++) {
          var mutation = mutations[m1];
          for (var m2 = 0; m2 < mutation.removedNodes.length; m2++) {
            var element = mutation.removedNodes[m2];
            if (element === _this.state.currentTarget) {
              _this.hideTooltip();
              return;
            }
          }
        }
      });
      observer.observe(window.document, {
        childList: true,
        subtree: true
      });
      this.removalTracker = observer;
    };
    target.prototype.unbindRemovalTracker = function () {
      if (this.removalTracker) {
        this.removalTracker.disconnect();
        this.removalTracker = null;
      }
    };
  }
  
  /**
   * Calculate the position of tooltip
   *
   * @params
   * - `e` {Event} the event of current mouse
   * - `target` {Element} the currentTarget of the event
   * - `node` {DOM} the react-tooltip object
   * - `place` {String} top / right / bottom / left
   * - `effect` {String} float / solid
   * - `offset` {Object} the offset to default position
   *
   * @return {Object}
   * - `isNewState` {Bool} required
   * - `newState` {Object}
   * - `position` {Object} {left: {Number}, top: {Number}}
   */
  function getPosition (e, target, node, place, desiredPlace, effect, offset) {
    var _getDimensions = getDimensions(node),
      tipWidth = _getDimensions.width,
      tipHeight = _getDimensions.height;
    var _getDimensions2 = getDimensions(target),
      targetWidth = _getDimensions2.width,
      targetHeight = _getDimensions2.height;
    var _getCurrentOffset = getCurrentOffset(e, target, effect),
      mouseX = _getCurrentOffset.mouseX,
      mouseY = _getCurrentOffset.mouseY;
    var defaultOffset = getDefaultPosition(effect, targetWidth, targetHeight, tipWidth, tipHeight);
    var _calculateOffset = calculateOffset(offset),
      extraOffsetX = _calculateOffset.extraOffsetX,
      extraOffsetY = _calculateOffset.extraOffsetY;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var _getParent = getParent(node),
      parentTop = _getParent.parentTop,
      parentLeft = _getParent.parentLeft;
  
    // Get the edge offset of the tooltip
    var getTipOffsetLeft = function getTipOffsetLeft(place) {
      var offsetX = defaultOffset[place].l;
      return mouseX + offsetX + extraOffsetX;
    };
    var getTipOffsetRight = function getTipOffsetRight(place) {
      var offsetX = defaultOffset[place].r;
      return mouseX + offsetX + extraOffsetX;
    };
    var getTipOffsetTop = function getTipOffsetTop(place) {
      var offsetY = defaultOffset[place].t;
      return mouseY + offsetY + extraOffsetY;
    };
    var getTipOffsetBottom = function getTipOffsetBottom(place) {
      var offsetY = defaultOffset[place].b;
      return mouseY + offsetY + extraOffsetY;
    };
  
    //
    // Functions to test whether the tooltip's sides are inside
    // the client window for a given orientation p
    //
    //  _____________
    // |             | <-- Right side
    // | p = 'left'  |\
    // |             |/  |\
    // |_____________|   |_\  <-- Mouse
    //      / \           |
    //       |
    //       |
    //  Bottom side
    //
    var outsideLeft = function outsideLeft(p) {
      return getTipOffsetLeft(p) < 0;
    };
    var outsideRight = function outsideRight(p) {
      return getTipOffsetRight(p) > windowWidth;
    };
    var outsideTop = function outsideTop(p) {
      return getTipOffsetTop(p) < 0;
    };
    var outsideBottom = function outsideBottom(p) {
      return getTipOffsetBottom(p) > windowHeight;
    };
  
    // Check whether the tooltip with orientation p is completely inside the client window
    var outside = function outside(p) {
      return outsideLeft(p) || outsideRight(p) || outsideTop(p) || outsideBottom(p);
    };
    var inside = function inside(p) {
      return !outside(p);
    };
    var placeIsInside = {
      top: inside('top'),
      bottom: inside('bottom'),
      left: inside('left'),
      right: inside('right')
    };
    function choose() {
      var allPlaces = desiredPlace.split(',').concat(place, ['top', 'bottom', 'left', 'right']);
      var _iterator = _createForOfIteratorHelper(allPlaces),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var d = _step.value;
          if (placeIsInside[d]) return d;
        }
        // if nothing is inside, just use the old place.
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return place;
    }
    var chosen = choose();
    var isNewState = false;
    var newPlace;
    if (chosen && chosen !== place) {
      isNewState = true;
      newPlace = chosen;
    }
    if (isNewState) {
      return {
        isNewState: true,
        newState: {
          place: newPlace
        }
      };
    }
    return {
      isNewState: false,
      position: {
        left: parseInt(getTipOffsetLeft(place) - parentLeft, 10),
        top: parseInt(getTipOffsetTop(place) - parentTop, 10)
      }
    };
  }
  var getDimensions = function getDimensions(node) {
    var _node$getBoundingClie = node.getBoundingClientRect(),
      height = _node$getBoundingClie.height,
      width = _node$getBoundingClie.width;
    return {
      height: parseInt(height, 10),
      width: parseInt(width, 10)
    };
  };
  
  // Get current mouse offset
  var getCurrentOffset = function getCurrentOffset(e, currentTarget, effect) {
    var boundingClientRect = currentTarget.getBoundingClientRect();
    var targetTop = boundingClientRect.top;
    var targetLeft = boundingClientRect.left;
    var _getDimensions3 = getDimensions(currentTarget),
      targetWidth = _getDimensions3.width,
      targetHeight = _getDimensions3.height;
    if (effect === 'float') {
      return {
        mouseX: e.clientX,
        mouseY: e.clientY
      };
    }
    return {
      mouseX: targetLeft + targetWidth / 2,
      mouseY: targetTop + targetHeight / 2
    };
  };
  
  // List all possibility of tooltip final offset
  // This is useful in judging if it is necessary for tooltip to switch position when out of window
  var getDefaultPosition = function getDefaultPosition(effect, targetWidth, targetHeight, tipWidth, tipHeight) {
    var top;
    var right;
    var bottom;
    var left;
    var disToMouse = 3;
    var triangleHeight = 2;
    var cursorHeight = 12; // Optimize for float bottom only, cause the cursor will hide the tooltip
  
    if (effect === 'float') {
      top = {
        l: -(tipWidth / 2),
        r: tipWidth / 2,
        t: -(tipHeight + disToMouse + triangleHeight),
        b: -disToMouse
      };
      bottom = {
        l: -(tipWidth / 2),
        r: tipWidth / 2,
        t: disToMouse + cursorHeight,
        b: tipHeight + disToMouse + triangleHeight + cursorHeight
      };
      left = {
        l: -(tipWidth + disToMouse + triangleHeight),
        r: -disToMouse,
        t: -(tipHeight / 2),
        b: tipHeight / 2
      };
      right = {
        l: disToMouse,
        r: tipWidth + disToMouse + triangleHeight,
        t: -(tipHeight / 2),
        b: tipHeight / 2
      };
    } else if (effect === 'solid') {
      top = {
        l: -(tipWidth / 2),
        r: tipWidth / 2,
        t: -(targetHeight / 2 + tipHeight + triangleHeight),
        b: -(targetHeight / 2)
      };
      bottom = {
        l: -(tipWidth / 2),
        r: tipWidth / 2,
        t: targetHeight / 2,
        b: targetHeight / 2 + tipHeight + triangleHeight
      };
      left = {
        l: -(tipWidth + targetWidth / 2 + triangleHeight),
        r: -(targetWidth / 2),
        t: -(tipHeight / 2),
        b: tipHeight / 2
      };
      right = {
        l: targetWidth / 2,
        r: tipWidth + targetWidth / 2 + triangleHeight,
        t: -(tipHeight / 2),
        b: tipHeight / 2
      };
    }
    return {
      top: top,
      bottom: bottom,
      left: left,
      right: right
    };
  };
  
  // Consider additional offset into position calculation
  var calculateOffset = function calculateOffset(offset) {
    var extraOffsetX = 0;
    var extraOffsetY = 0;
    if (Object.prototype.toString.apply(offset) === '[object String]') {
      offset = JSON.parse(offset.toString().replace(/'/g, '"'));
    }
    for (var key in offset) {
      if (key === 'top') {
        extraOffsetY -= parseInt(offset[key], 10);
      } else if (key === 'bottom') {
        extraOffsetY += parseInt(offset[key], 10);
      } else if (key === 'left') {
        extraOffsetX -= parseInt(offset[key], 10);
      } else if (key === 'right') {
        extraOffsetX += parseInt(offset[key], 10);
      }
    }
    return {
      extraOffsetX: extraOffsetX,
      extraOffsetY: extraOffsetY
    };
  };
  
  // Get the offset of the parent elements
  var getParent = function getParent(currentTarget) {
    var currentParent = currentTarget;
    while (currentParent) {
      var computedStyle = window.getComputedStyle(currentParent);
      // transform and will-change: transform change the containing block
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_Block
      if (computedStyle.getPropertyValue('transform') !== 'none' || computedStyle.getPropertyValue('will-change') === 'transform') break;
      currentParent = currentParent.parentElement;
    }
    var parentTop = currentParent && currentParent.getBoundingClientRect().top || 0;
    var parentLeft = currentParent && currentParent.getBoundingClientRect().left || 0;
    return {
      parentTop: parentTop,
      parentLeft: parentLeft
    };
  };
  
  /**
   * To get the tooltip content
   * it may comes from data-tip or this.props.children
   * it should support multiline
   *
   * @params
   * - `tip` {String} value of data-tip
   * - `children` {ReactElement} this.props.children
   * - `multiline` {Any} could be Bool(true/false) or String('true'/'false')
   *
   * @return
   * - String or react component
   */
  function TipContent(tip, children, getContent, multiline) {
    if (children) return children;
    if (getContent !== undefined && getContent !== null) return getContent; // getContent can be 0, '', etc.
    if (getContent === null) return null; // Tip not exist and children is null or undefined
  
    var regexp = /<br\s*\/?>/;
    if (!multiline || multiline === 'false' || !regexp.test(tip)) {
      // No trim(), so that user can keep their input
      return tip;
    }
  
    // Multiline tooltip content
    return tip.split(regexp).map(function (d, i) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        key: i,
        className: "multi-line"
      }, d);
    });
  }
  
  /**
   * Support aria- and role in ReactTooltip
   *
   * @params props {Object}
   * @return {Object}
   */
  function parseAria(props) {
    var ariaObj = {};
    Object.keys(props).filter(function (prop) {
      // aria-xxx and role is acceptable
      return /(^aria-\w+$|^role$)/.test(prop);
    }).forEach(function (prop) {
      ariaObj[prop] = props[prop];
    });
    return ariaObj;
  }
  
  /**
   * Convert nodelist to array
   * @see https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/core/createArrayFromMixed.js#L24
   * NodeLists are functions in Safari
   */
  
  function nodeListToArray (nodeList) {
    var length = nodeList.length;
    if (nodeList.hasOwnProperty) {
      return Array.prototype.slice.call(nodeList);
    }
    return new Array(length).fill().map(function (index) {
      return nodeList[index];
    });
  }
  
  function generateUUID() {
    return 't' + (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])();
  }
  
  var baseCss = ".__react_component_tooltip {\n  border-radius: 3px;\n  display: inline-block;\n  font-size: 13px;\n  left: -999em;\n  opacity: 0;\n  position: fixed;\n  pointer-events: none;\n  transition: opacity 0.3s ease-out;\n  top: -999em;\n  visibility: hidden;\n  z-index: 999;\n}\n.__react_component_tooltip.allow_hover, .__react_component_tooltip.allow_click {\n  pointer-events: auto;\n}\n.__react_component_tooltip::before, .__react_component_tooltip::after {\n  content: \"\";\n  width: 0;\n  height: 0;\n  position: absolute;\n}\n.__react_component_tooltip.show {\n  opacity: 0.9;\n  margin-top: 0;\n  margin-left: 0;\n  visibility: visible;\n}\n.__react_component_tooltip.place-top::before {\n  bottom: 0;\n  left: 50%;\n  margin-left: -11px;\n}\n.__react_component_tooltip.place-bottom::before {\n  top: 0;\n  left: 50%;\n  margin-left: -11px;\n}\n.__react_component_tooltip.place-left::before {\n  right: 0;\n  top: 50%;\n  margin-top: -9px;\n}\n.__react_component_tooltip.place-right::before {\n  left: 0;\n  top: 50%;\n  margin-top: -9px;\n}\n.__react_component_tooltip .multi-line {\n  display: block;\n  padding: 2px 0;\n  text-align: center;\n}";
  
  /**
   * Default pop-up style values (text color, background color).
   */
  var defaultColors = {
    dark: {
      text: '#fff',
      background: '#222',
      border: 'transparent',
      arrow: '#222'
    },
    success: {
      text: '#fff',
      background: '#8DC572',
      border: 'transparent',
      arrow: '#8DC572'
    },
    warning: {
      text: '#fff',
      background: '#F0AD4E',
      border: 'transparent',
      arrow: '#F0AD4E'
    },
    error: {
      text: '#fff',
      background: '#BE6464',
      border: 'transparent',
      arrow: '#BE6464'
    },
    info: {
      text: '#fff',
      background: '#337AB7',
      border: 'transparent',
      arrow: '#337AB7'
    },
    light: {
      text: '#222',
      background: '#fff',
      border: 'transparent',
      arrow: '#fff'
    }
  };
  function getDefaultPopupColors(type) {
    return defaultColors[type] ? _objectSpread2({}, defaultColors[type]) : undefined;
  }
  var DEFAULT_PADDING = '8px 21px';
  var DEFAULT_RADIUS = {
    tooltip: 3,
    arrow: 0
  };
  
  /**
   * Generates the specific tooltip style for use on render.
   */
  function generateTooltipStyle(uuid, customColors, type, hasBorder, padding, radius) {
    return generateStyle(uuid, getPopupColors(customColors, type, hasBorder), padding, radius);
  }
  
  /**
   * Generates the tooltip style rules based on the element-specified "data-type" property.
   */
  function generateStyle(uuid, colors) {
    var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_PADDING;
    var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_RADIUS;
    var textColor = colors.text;
    var backgroundColor = colors.background;
    var borderColor = colors.border;
    var arrowColor = colors.arrow;
    var arrowRadius = radius.arrow;
    var tooltipRadius = radius.tooltip;
    return "\n  \t.".concat(uuid, " {\n\t    color: ").concat(textColor, ";\n\t    background: ").concat(backgroundColor, ";\n\t    border: 1px solid ").concat(borderColor, ";\n\t    border-radius: ").concat(tooltipRadius, "px;\n\t    padding: ").concat(padding, ";\n  \t}\n\n  \t.").concat(uuid, ".place-top {\n        margin-top: -10px;\n    }\n    .").concat(uuid, ".place-top::before {\n        content: \"\";\n        background-color: inherit;\n        position: absolute;\n        z-index: 2;\n        width: 18px;\n        height: 10px;\n    }\n    .").concat(uuid, ".place-top::after {\n        content: \"\";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ").concat(arrowRadius, "px;\n        border: 1px solid ").concat(borderColor, ";\n        background-color: ").concat(arrowColor, ";\n        z-index: 1;\n        bottom: -6px;\n        left: 50%;\n        margin-left: -8px;\n        transform: rotate(135deg);\n    }\n\n    .").concat(uuid, ".place-bottom {\n        margin-top: 10px;\n    }\n    .").concat(uuid, ".place-bottom::before {\n        content: \"\";\n        background-color: inherit;\n        position: absolute;\n        z-index: 2;\n        width: 18px;\n        height: 10px;\n    }\n    .").concat(uuid, ".place-bottom::after {\n        content: \"\";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ").concat(arrowRadius, "px;\n        border: 1px solid ").concat(borderColor, ";\n        background-color: ").concat(arrowColor, ";\n        z-index: 1;\n        top: -6px;\n        left: 50%;\n        margin-left: -8px;\n        transform: rotate(45deg);\n    }\n\n    .").concat(uuid, ".place-left {\n        margin-left: -10px;\n    }\n    .").concat(uuid, ".place-left::before {\n        content: \"\";\n        background-color: inherit;\n        position: absolute;\n        z-index: 2;\n        width: 10px;\n        height: 18px;\n    }\n    .").concat(uuid, ".place-left::after {\n        content: \"\";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ").concat(arrowRadius, "px;\n        border: 1px solid ").concat(borderColor, ";\n        background-color: ").concat(arrowColor, ";\n        z-index: 1;\n        right: -6px;\n        top: 50%;\n        margin-top: -6px;\n        transform: rotate(45deg);\n    }\n\n    .").concat(uuid, ".place-right {\n        margin-left: 10px;\n    }\n    .").concat(uuid, ".place-right::before {\n        content: \"\";\n        background-color: inherit;\n        position: absolute;\n        z-index: 2;\n        width: 10px;\n        height: 18px;\n    }\n    .").concat(uuid, ".place-right::after {\n        content: \"\";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ").concat(arrowRadius, "px;\n        border: 1px solid ").concat(borderColor, ";\n        background-color: ").concat(arrowColor, ";\n        z-index: 1;\n        left: -6px;\n        top: 50%;\n        margin-top: -6px;\n        transform: rotate(-135deg);\n    }\n  ");
  }
  function getPopupColors(customColors, type, hasBorder) {
    var textColor = customColors.text;
    var backgroundColor = customColors.background;
    var borderColor = customColors.border;
    var arrowColor = customColors.arrow ? customColors.arrow : customColors.background;
    var colors = getDefaultPopupColors(type);
    if (textColor) {
      colors.text = textColor;
    }
    if (backgroundColor) {
      colors.background = backgroundColor;
    }
    if (hasBorder) {
      if (borderColor) {
        colors.border = borderColor;
      } else {
        colors.border = type === 'light' ? 'black' : 'white';
      }
    }
    if (arrowColor) {
      colors.arrow = arrowColor;
    }
    return colors;
  }
  
  var _class, _class2;
  
  /* Polyfill */
  var ReactTooltip = staticMethods(_class = windowListener(_class = customEvent(_class = isCapture(_class = getEffect(_class = bodyMode(_class = trackRemoval(_class = (_class2 = /*#__PURE__*/function (_React$Component) {
    _inherits(ReactTooltip, _React$Component);
    var _super = _createSuper(ReactTooltip);
    function ReactTooltip(props) {
      var _this;
      _classCallCheck(this, ReactTooltip);
      _this = _super.call(this, props);
      _this.state = {
        uuid: props.uuid || generateUUID(),
        place: props.place || 'top',
        // Direction of tooltip
        desiredPlace: props.place || 'top',
        type: props.type || 'dark',
        // Color theme of tooltip
        effect: props.effect || 'float',
        // float or fixed
        show: false,
        border: false,
        borderClass: 'border',
        customColors: {},
        customRadius: {},
        offset: {},
        padding: props.padding,
        extraClass: '',
        html: false,
        delayHide: 0,
        delayShow: 0,
        event: props.event || null,
        eventOff: props.eventOff || null,
        currentEvent: null,
        // Current mouse event
        currentTarget: null,
        // Current target of mouse event
        ariaProps: parseAria(props),
        // aria- and role attributes
        isEmptyTip: false,
        disable: false,
        possibleCustomEvents: props.possibleCustomEvents || '',
        possibleCustomEventsOff: props.possibleCustomEventsOff || '',
        originTooltip: null,
        isMultiline: false
      };
      _this.bind(['showTooltip', 'updateTooltip', 'hideTooltip', 'hideTooltipOnScroll', 'getTooltipContent', 'globalRebuild', 'globalShow', 'globalHide', 'onWindowResize', 'mouseOnToolTip']);
      _this.mount = true;
      _this.delayShowLoop = null;
      _this.delayHideLoop = null;
      _this.delayReshow = null;
      _this.intervalUpdateContent = null;
      return _this;
    }
  
    /**
     * For unify the bind and unbind listener
     */
    _createClass(ReactTooltip, [{
      key: "bind",
      value: function bind(methodArray) {
        var _this2 = this;
        methodArray.forEach(function (method) {
          _this2[method] = _this2[method].bind(_this2);
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$props = this.props;
          _this$props.insecure;
          var resizeHide = _this$props.resizeHide;
        this.mount = true;
        this.bindListener(); // Bind listener for tooltip
        this.bindWindowEvents(resizeHide); // Bind global event for static method
        this.injectStyles(); // Inject styles for each DOM root having tooltip.
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.mount = false;
        this.clearTimer();
        this.unbindListener();
        this.removeScrollListener(this.state.currentTarget);
        this.unbindWindowEvents();
      }
  
      /* Look for the closest DOM root having tooltip and inject styles. */
    }, {
      key: "injectStyles",
      value: function injectStyles() {
        var tooltipRef = this.tooltipRef;
        if (!tooltipRef) {
          return;
        }
        var parentNode = tooltipRef.parentNode;
        while (parentNode.parentNode) {
          parentNode = parentNode.parentNode;
        }
        var domRoot;
        switch (parentNode.constructor.name) {
          case 'Document':
          case 'HTMLDocument':
          case undefined:
            domRoot = parentNode.head;
            break;
          case 'ShadowRoot':
          default:
            domRoot = parentNode;
            break;
        }
  
        // Prevent styles duplication.
        if (!domRoot.querySelector('style[data-react-tooltip]')) {
          var style = document.createElement('style');
          style.textContent = baseCss;
          style.setAttribute('data-react-tooltip', 'true');
          domRoot.appendChild(style);
        }
      }
  
      /**
       * Return if the mouse is on the tooltip.
       * @returns {boolean} true - mouse is on the tooltip
       */
    }, {
      key: "mouseOnToolTip",
      value: function mouseOnToolTip() {
        var show = this.state.show;
        if (show && this.tooltipRef) {
          /* old IE or Firefox work around */
          if (!this.tooltipRef.matches) {
            /* old IE work around */
            if (this.tooltipRef.msMatchesSelector) {
              this.tooltipRef.matches = this.tooltipRef.msMatchesSelector;
            } else {
              /* old Firefox work around */
              this.tooltipRef.matches = this.tooltipRef.mozMatchesSelector;
            }
          }
          return this.tooltipRef.matches(':hover');
        }
        return false;
      }
  
      /**
       * Pick out corresponded target elements
       */
    }, {
      key: "getTargetArray",
      value: function getTargetArray(id) {
        var targetArray = [];
        var selector;
        if (!id) {
          selector = '[data-tip]:not([data-for])';
        } else {
          var escaped = id.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          selector = "[data-tip][data-for=\"".concat(escaped, "\"]");
        }
  
        // Scan document for shadow DOM elements
        nodeListToArray(document.getElementsByTagName('*')).filter(function (element) {
          return element.shadowRoot;
        }).forEach(function (element) {
          targetArray = targetArray.concat(nodeListToArray(element.shadowRoot.querySelectorAll(selector)));
        });
        return targetArray.concat(nodeListToArray(document.querySelectorAll(selector)));
      }
  
      /**
       * Bind listener to the target elements
       * These listeners used to trigger showing or hiding the tooltip
       */
    }, {
      key: "bindListener",
      value: function bindListener() {
        var _this3 = this;
        var _this$props2 = this.props,
          id = _this$props2.id,
          globalEventOff = _this$props2.globalEventOff,
          isCapture = _this$props2.isCapture;
        var targetArray = this.getTargetArray(id);
        targetArray.forEach(function (target) {
          if (target.getAttribute('currentItem') === null) {
            target.setAttribute('currentItem', 'false');
          }
          _this3.unbindBasicListener(target);
          if (_this3.isCustomEvent(target)) {
            _this3.customUnbindListener(target);
          }
        });
        if (this.isBodyMode()) {
          this.bindBodyListener(targetArray);
        } else {
          targetArray.forEach(function (target) {
            var isCaptureMode = _this3.isCapture(target);
            var effect = _this3.getEffect(target);
            if (_this3.isCustomEvent(target)) {
              _this3.customBindListener(target);
              return;
            }
            target.addEventListener('mouseenter', _this3.showTooltip, isCaptureMode);
            target.addEventListener('focus', _this3.showTooltip, isCaptureMode);
            if (effect === 'float') {
              target.addEventListener('mousemove', _this3.updateTooltip, isCaptureMode);
            }
            target.addEventListener('mouseleave', _this3.hideTooltip, isCaptureMode);
            target.addEventListener('blur', _this3.hideTooltip, isCaptureMode);
          });
        }
  
        // Global event to hide tooltip
        if (globalEventOff) {
          window.removeEventListener(globalEventOff, this.hideTooltip);
          window.addEventListener(globalEventOff, this.hideTooltip, isCapture);
        }
  
        // Track removal of targetArray elements from DOM
        this.bindRemovalTracker();
      }
  
      /**
       * Unbind listeners on target elements
       */
    }, {
      key: "unbindListener",
      value: function unbindListener() {
        var _this4 = this;
        var _this$props3 = this.props,
          id = _this$props3.id,
          globalEventOff = _this$props3.globalEventOff;
        if (this.isBodyMode()) {
          this.unbindBodyListener();
        } else {
          var targetArray = this.getTargetArray(id);
          targetArray.forEach(function (target) {
            _this4.unbindBasicListener(target);
            if (_this4.isCustomEvent(target)) _this4.customUnbindListener(target);
          });
        }
        if (globalEventOff) window.removeEventListener(globalEventOff, this.hideTooltip);
        this.unbindRemovalTracker();
      }
  
      /**
       * Invoke this before bind listener and unmount the component
       * it is necessary to invoke this even when binding custom event
       * so that the tooltip can switch between custom and default listener
       */
    }, {
      key: "unbindBasicListener",
      value: function unbindBasicListener(target) {
        var isCaptureMode = this.isCapture(target);
        target.removeEventListener('mouseenter', this.showTooltip, isCaptureMode);
        target.removeEventListener('mousemove', this.updateTooltip, isCaptureMode);
        target.removeEventListener('mouseleave', this.hideTooltip, isCaptureMode);
      }
    }, {
      key: "getTooltipContent",
      value: function getTooltipContent() {
        var _this$props4 = this.props,
          getContent = _this$props4.getContent,
          children = _this$props4.children;
  
        // Generate tooltip content
        var content;
        if (getContent) {
          if (Array.isArray(getContent)) {
            content = getContent[0] && getContent[0](this.state.originTooltip);
          } else {
            content = getContent(this.state.originTooltip);
          }
        }
        return TipContent(this.state.originTooltip, children, content, this.state.isMultiline);
      }
    }, {
      key: "isEmptyTip",
      value: function isEmptyTip(placeholder) {
        return typeof placeholder === 'string' && placeholder === '' || placeholder === null;
      }
  
      /**
       * When mouse enter, show the tooltip
       */
    }, {
      key: "showTooltip",
      value: function showTooltip(e, isGlobalCall) {
        if (!this.tooltipRef) {
          return;
        }
        if (isGlobalCall) {
          // Don't trigger other elements belongs to other ReactTooltip
          var targetArray = this.getTargetArray(this.props.id);
          var isMyElement = targetArray.some(function (ele) {
            return ele === e.currentTarget;
          });
          if (!isMyElement) return;
        }
        // Get the tooltip content
        // calculate in this phrase so that tip width height can be detected
        var _this$props5 = this.props,
          multiline = _this$props5.multiline,
          getContent = _this$props5.getContent;
        var originTooltip = e.currentTarget.getAttribute('data-tip');
        var isMultiline = e.currentTarget.getAttribute('data-multiline') || multiline || false;
  
        // If it is focus event or called by ReactTooltip.show, switch to `solid` effect
        var switchToSolid = e instanceof window.FocusEvent || isGlobalCall;
  
        // if it needs to skip adding hide listener to scroll
        var scrollHide = true;
        if (e.currentTarget.getAttribute('data-scroll-hide')) {
          scrollHide = e.currentTarget.getAttribute('data-scroll-hide') === 'true';
        } else if (this.props.scrollHide != null) {
          scrollHide = this.props.scrollHide;
        }
  
        // adding aria-describedby to target to make tooltips read by screen readers
        if (e && e.currentTarget && e.currentTarget.setAttribute) {
          e.currentTarget.setAttribute('aria-describedby', this.props.id || this.state.uuid);
        }
  
        // Make sure the correct place is set
        var desiredPlace = e.currentTarget.getAttribute('data-place') || this.props.place || 'top';
        var effect = switchToSolid && 'solid' || this.getEffect(e.currentTarget);
        var offset = e.currentTarget.getAttribute('data-offset') || this.props.offset || {};
        var result = getPosition(e, e.currentTarget, this.tooltipRef, desiredPlace.split(',')[0], desiredPlace, effect, offset);
        if (result.position && this.props.overridePosition) {
          result.position = this.props.overridePosition(result.position, e, e.currentTarget, this.tooltipRef, desiredPlace, desiredPlace, effect, offset);
        }
        var place = result.isNewState ? result.newState.place : desiredPlace.split(',')[0];
  
        // To prevent previously created timers from triggering
        this.clearTimer();
        var target = e.currentTarget;
        var reshowDelay = this.state.show ? target.getAttribute('data-delay-update') || this.props.delayUpdate : 0;
        var self = this;
        var updateState = function updateState() {
          self.setState({
            originTooltip: originTooltip,
            isMultiline: isMultiline,
            desiredPlace: desiredPlace,
            place: place,
            type: target.getAttribute('data-type') || self.props.type || 'dark',
            customColors: {
              text: target.getAttribute('data-text-color') || self.props.textColor || null,
              background: target.getAttribute('data-background-color') || self.props.backgroundColor || null,
              border: target.getAttribute('data-border-color') || self.props.borderColor || null,
              arrow: target.getAttribute('data-arrow-color') || self.props.arrowColor || null
            },
            customRadius: {
              tooltip: target.getAttribute('data-tooltip-radius') || self.props.tooltipRadius || '3',
              arrow: target.getAttribute('data-arrow-radius') || self.props.arrowRadius || '0'
            },
            effect: effect,
            offset: offset,
            padding: target.getAttribute('data-padding') || self.props.padding,
            html: (target.getAttribute('data-html') ? target.getAttribute('data-html') === 'true' : self.props.html) || false,
            delayShow: target.getAttribute('data-delay-show') || self.props.delayShow || 0,
            delayHide: target.getAttribute('data-delay-hide') || self.props.delayHide || 0,
            delayUpdate: target.getAttribute('data-delay-update') || self.props.delayUpdate || 0,
            border: (target.getAttribute('data-border') ? target.getAttribute('data-border') === 'true' : self.props.border) || false,
            borderClass: target.getAttribute('data-border-class') || self.props.borderClass || 'border',
            extraClass: target.getAttribute('data-class') || self.props["class"] || self.props.className || '',
            disable: (target.getAttribute('data-tip-disable') ? target.getAttribute('data-tip-disable') === 'true' : self.props.disable) || false,
            currentTarget: target
          }, function () {
            if (scrollHide) {
              self.addScrollListener(self.state.currentTarget);
            }
            self.updateTooltip(e);
            if (getContent && Array.isArray(getContent)) {
              self.intervalUpdateContent = setInterval(function () {
                if (self.mount) {
                  var _getContent = self.props.getContent;
                  var placeholder = TipContent(originTooltip, '', _getContent[0](), isMultiline);
                  var isEmptyTip = self.isEmptyTip(placeholder);
                  self.setState({
                    isEmptyTip: isEmptyTip
                  });
                  self.updatePosition();
                }
              }, getContent[1]);
            }
          });
        };
  
        // If there is no delay call immediately, don't allow events to get in first.
        if (reshowDelay) {
          this.delayReshow = setTimeout(updateState, reshowDelay);
        } else {
          updateState();
        }
      }
  
      /**
       * When mouse hover, update tool tip
       */
    }, {
      key: "updateTooltip",
      value: function updateTooltip(e) {
        var _this5 = this;
        var _this$state = this.state,
          delayShow = _this$state.delayShow,
          disable = _this$state.disable;
        var _this$props6 = this.props,
          afterShow = _this$props6.afterShow,
          disableProp = _this$props6.disable;
        var placeholder = this.getTooltipContent();
        var eventTarget = e.currentTarget || e.target;
  
        // Check if the mouse is actually over the tooltip, if so don't hide the tooltip
        if (this.mouseOnToolTip()) {
          return;
        }
  
        // if the tooltip is empty, disable the tooltip
        if (this.isEmptyTip(placeholder) || disable || disableProp) {
          return;
        }
        var delayTime = !this.state.show ? parseInt(delayShow, 10) : 0;
        var updateState = function updateState() {
          if (Array.isArray(placeholder) && placeholder.length > 0 || placeholder) {
            var isInvisible = !_this5.state.show;
            _this5.setState({
              currentEvent: e,
              currentTarget: eventTarget,
              show: true
            }, function () {
              _this5.updatePosition(function () {
                if (isInvisible && afterShow) {
                  afterShow(e);
                }
              });
            });
          }
        };
        if (this.delayShowLoop) {
          clearTimeout(this.delayShowLoop);
        }
        if (delayTime) {
          this.delayShowLoop = setTimeout(updateState, delayTime);
        } else {
          this.delayShowLoop = null;
          updateState();
        }
      }
  
      /*
       * If we're mousing over the tooltip remove it when we leave.
       */
    }, {
      key: "listenForTooltipExit",
      value: function listenForTooltipExit() {
        var show = this.state.show;
        if (show && this.tooltipRef) {
          this.tooltipRef.addEventListener('mouseleave', this.hideTooltip);
        }
      }
    }, {
      key: "removeListenerForTooltipExit",
      value: function removeListenerForTooltipExit() {
        var show = this.state.show;
        if (show && this.tooltipRef) {
          this.tooltipRef.removeEventListener('mouseleave', this.hideTooltip);
        }
      }
  
      /**
       * When mouse leave, hide tooltip
       */
    }, {
      key: "hideTooltip",
      value: function hideTooltip(e, hasTarget) {
        var _this6 = this;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
          isScroll: false
        };
        var disable = this.state.disable;
        var isScroll = options.isScroll;
        var delayHide = isScroll ? 0 : this.state.delayHide;
        var _this$props7 = this.props,
          afterHide = _this$props7.afterHide,
          disableProp = _this$props7.disable;
        var placeholder = this.getTooltipContent();
        if (!this.mount) return;
        if (this.isEmptyTip(placeholder) || disable || disableProp) return; // if the tooltip is empty, disable the tooltip
        if (hasTarget) {
          // Don't trigger other elements belongs to other ReactTooltip
          var targetArray = this.getTargetArray(this.props.id);
          var isMyElement = targetArray.some(function (ele) {
            return ele === e.currentTarget;
          });
          if (!isMyElement || !this.state.show) return;
        }
  
        // clean up aria-describedby when hiding tooltip
        if (e && e.currentTarget && e.currentTarget.removeAttribute) {
          e.currentTarget.removeAttribute('aria-describedby');
        }
        var resetState = function resetState() {
          var isVisible = _this6.state.show;
          // Check if the mouse is actually over the tooltip, if so don't hide the tooltip
          if (_this6.mouseOnToolTip()) {
            _this6.listenForTooltipExit();
            return;
          }
          _this6.removeListenerForTooltipExit();
          _this6.setState({
            show: false
          }, function () {
            _this6.removeScrollListener(_this6.state.currentTarget);
            if (isVisible && afterHide) {
              afterHide(e);
            }
          });
        };
        this.clearTimer();
        if (delayHide) {
          this.delayHideLoop = setTimeout(resetState, parseInt(delayHide, 10));
        } else {
          resetState();
        }
      }
  
      /**
       * When scroll, hide tooltip
       */
    }, {
      key: "hideTooltipOnScroll",
      value: function hideTooltipOnScroll(event, hasTarget) {
        this.hideTooltip(event, hasTarget, {
          isScroll: true
        });
      }
  
      /**
       * Add scroll event listener when tooltip show
       * automatically hide the tooltip when scrolling
       */
    }, {
      key: "addScrollListener",
      value: function addScrollListener(currentTarget) {
        var isCaptureMode = this.isCapture(currentTarget);
        window.addEventListener('scroll', this.hideTooltipOnScroll, isCaptureMode);
      }
    }, {
      key: "removeScrollListener",
      value: function removeScrollListener(currentTarget) {
        var isCaptureMode = this.isCapture(currentTarget);
        window.removeEventListener('scroll', this.hideTooltipOnScroll, isCaptureMode);
      }
  
      // Calculation the position
    }, {
      key: "updatePosition",
      value: function updatePosition(callbackAfter) {
        var _this7 = this;
        var _this$state2 = this.state,
          currentEvent = _this$state2.currentEvent,
          currentTarget = _this$state2.currentTarget,
          place = _this$state2.place,
          desiredPlace = _this$state2.desiredPlace,
          effect = _this$state2.effect,
          offset = _this$state2.offset;
        var node = this.tooltipRef;
        var result = getPosition(currentEvent, currentTarget, node, place, desiredPlace, effect, offset);
        if (result.position && this.props.overridePosition) {
          result.position = this.props.overridePosition(result.position, currentEvent, currentTarget, node, place, desiredPlace, effect, offset);
        }
        if (result.isNewState) {
          // Switch to reverse placement
          return this.setState(result.newState, function () {
            _this7.updatePosition(callbackAfter);
          });
        }
        if (callbackAfter && typeof callbackAfter === 'function') {
          callbackAfter();
        }
  
        // Set tooltip position
        node.style.left = result.position.left + 'px';
        node.style.top = result.position.top + 'px';
      }
  
      /**
       * CLear all kinds of timeout of interval
       */
    }, {
      key: "clearTimer",
      value: function clearTimer() {
        if (this.delayShowLoop) {
          clearTimeout(this.delayShowLoop);
          this.delayShowLoop = null;
        }
        if (this.delayHideLoop) {
          clearTimeout(this.delayHideLoop);
          this.delayHideLoop = null;
        }
        if (this.delayReshow) {
          clearTimeout(this.delayReshow);
          this.delayReshow = null;
        }
        if (this.intervalUpdateContent) {
          clearInterval(this.intervalUpdateContent);
          this.intervalUpdateContent = null;
        }
      }
    }, {
      key: "hasCustomColors",
      value: function hasCustomColors() {
        var _this8 = this;
        return Boolean(Object.keys(this.state.customColors).find(function (color) {
          return color !== 'border' && _this8.state.customColors[color];
        }) || this.state.border && this.state.customColors['border']);
      }
    }, {
      key: "render",
      value: function render() {
        var _this9 = this;
        var _this$state3 = this.state,
          extraClass = _this$state3.extraClass,
          html = _this$state3.html,
          ariaProps = _this$state3.ariaProps,
          disable = _this$state3.disable,
          uuid = _this$state3.uuid;
        var content = this.getTooltipContent();
        var isEmptyTip = this.isEmptyTip(content);
        var style = generateTooltipStyle(this.state.uuid, this.state.customColors, this.state.type, this.state.border, this.state.padding, this.state.customRadius);
        var tooltipClass = '__react_component_tooltip' + " ".concat(this.state.uuid) + (this.state.show && !disable && !isEmptyTip ? ' show' : '') + (this.state.border ? ' ' + this.state.borderClass : '') + " place-".concat(this.state.place) + // top, bottom, left, right
        " type-".concat(this.hasCustomColors() ? 'custom' : this.state.type) + (
        // dark, success, warning, error, info, light, custom
        this.props.delayUpdate ? ' allow_hover' : '') + (this.props.clickable ? ' allow_click' : '');
        var Wrapper = this.props.wrapper;
        if (ReactTooltip.supportedWrappers.indexOf(Wrapper) < 0) {
          Wrapper = ReactTooltip.defaultProps.wrapper;
        }
        var wrapperClassName = [tooltipClass, extraClass].filter(Boolean).join(' ');
        if (html) {
          var htmlContent = "".concat(content, "\n<style aria-hidden=\"true\">").concat(style, "</style>");
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Wrapper, _extends({
            className: "".concat(wrapperClassName),
            id: this.props.id || uuid,
            ref: function ref(_ref) {
              return _this9.tooltipRef = _ref;
            }
          }, ariaProps, {
            "data-id": "tooltip",
            dangerouslySetInnerHTML: {
              __html: htmlContent
            }
          }));
        } else {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Wrapper, _extends({
            className: "".concat(wrapperClassName),
            id: this.props.id || uuid
          }, ariaProps, {
            ref: function ref(_ref2) {
              return _this9.tooltipRef = _ref2;
            },
            "data-id": "tooltip"
          }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("style", {
            dangerouslySetInnerHTML: {
              __html: style
            },
            "aria-hidden": "true"
          }), content);
        }
      }
    }], [{
      key: "propTypes",
      get: function get() {
        return {
          uuid: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().any),
          place: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          type: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          effect: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          offset: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
          padding: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          multiline: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
          border: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
          borderClass: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          textColor: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          backgroundColor: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          borderColor: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          arrowColor: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          arrowRadius: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          tooltipRadius: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          insecure: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
          "class": (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          html: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
          delayHide: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
          delayUpdate: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
          delayShow: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
          event: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          eventOff: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          isCapture: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
          globalEventOff: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          getContent: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().any),
          afterShow: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
          afterHide: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
          overridePosition: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
          disable: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
          scrollHide: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
          resizeHide: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
          wrapper: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          bodyMode: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
          possibleCustomEvents: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          possibleCustomEventsOff: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
          clickable: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool)
        };
      }
    }, {
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        var ariaProps = prevState.ariaProps;
        var newAriaProps = parseAria(nextProps);
        var isChanged = Object.keys(newAriaProps).some(function (props) {
          return newAriaProps[props] !== ariaProps[props];
        });
        if (!isChanged) {
          return null;
        }
        return _objectSpread2(_objectSpread2({}, prevState), {}, {
          ariaProps: newAriaProps
        });
      }
    }]);
    return ReactTooltip;
  }((react__WEBPACK_IMPORTED_MODULE_0___default().Component)), _defineProperty(_class2, "defaultProps", {
    insecure: true,
    resizeHide: true,
    wrapper: 'div',
    clickable: false
  }), _defineProperty(_class2, "supportedWrappers", ['div', 'span']), _defineProperty(_class2, "displayName", 'ReactTooltip'), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class;
  
  
  //# sourceMappingURL=index.es.js.map
  
  
  /***/ }),
  
  /***/ "./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js":
  /*!****************************************************************************************************!*\
    !*** ./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js ***!
    \****************************************************************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
  
  
  var index =  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect ;
  
  /* harmony default export */ __webpack_exports__["default"] = (index);
  
  
  /***/ }),
  
  /***/ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js":
  /*!***********************************************************!*\
    !*** ./node_modules/uuid/dist/esm-browser/bytesToUuid.js ***!
    \***********************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  var byteToHex = [];
  
  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }
  
  function bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  
    return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
  }
  
  /* harmony default export */ __webpack_exports__["default"] = (bytesToUuid);
  
  /***/ }),
  
  /***/ "./node_modules/uuid/dist/esm-browser/rng.js":
  /*!***************************************************!*\
    !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
    \***************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ rng; }
  /* harmony export */ });
  // Unique ID creation requires a high quality random # generator. In the browser we therefore
  // require the crypto API and do not support built-in fallback to lower quality random number
  // generators (like Math.random()).
  // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
  // find the complete implementation of crypto (msCrypto) on IE11.
  var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  
  function rng() {
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  
    return getRandomValues(rnds8);
  }
  
  /***/ }),
  
  /***/ "./node_modules/uuid/dist/esm-browser/v4.js":
  /*!**************************************************!*\
    !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
    \**************************************************/
  /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
  /* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");
  
  
  
  function v4(options, buf, offset) {
    var i = buf && offset || 0;
  
    if (typeof options == 'string') {
      buf = options === 'binary' ? new Array(16) : null;
      options = null;
    }
  
    options = options || {};
    var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
  
    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
    }
  
    return buf || (0,_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
  }
  
  /* harmony default export */ __webpack_exports__["default"] = (v4);
  
  /***/ }),
  
  /***/ "react":
  /*!************************!*\
    !*** external "React" ***!
    \************************/
  /***/ (function(module) {
  
  "use strict";
  module.exports = window["React"];
  
  /***/ }),
  
  /***/ "react-dom":
  /*!***************************!*\
    !*** external "ReactDOM" ***!
    \***************************/
  /***/ (function(module) {
  
  "use strict";
  module.exports = window["ReactDOM"];
  
  /***/ }),
  
  /***/ "@wordpress/components":
  /*!************************************!*\
    !*** external ["wp","components"] ***!
    \************************************/
  /***/ (function(module) {
  
  "use strict";
  module.exports = window["wp"]["components"];
  
  /***/ }),
  
  /***/ "@wordpress/element":
  /*!*********************************!*\
    !*** external ["wp","element"] ***!
    \*********************************/
  /***/ (function(module) {
  
  "use strict";
  module.exports = window["wp"]["element"];
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
    \*********************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _arrayLikeToArray; }
  /* harmony export */ });
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
    \*******************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _arrayWithHoles; }
  /* harmony export */ });
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
  /*!**********************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
    \**********************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _arrayWithoutHoles; }
  /* harmony export */ });
  /* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");
  
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
  /*!**************************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
    \**************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _assertThisInitialized; }
  /* harmony export */ });
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
    \*******************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _classCallCheck; }
  /* harmony export */ });
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
  /*!****************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
    \****************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _createClass; }
  /* harmony export */ });
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/createSuper.js":
  /*!****************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/createSuper.js ***!
    \****************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _createSuper; }
  /* harmony export */ });
  /* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
  /* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js");
  /* harmony import */ var _possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./possibleConstructorReturn.js */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
  
  
  
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = (0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return function _createSuperInternal() {
      var Super = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return (0,_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, result);
    };
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
    \*******************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _defineProperty; }
  /* harmony export */ });
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
  /*!************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
    \************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _extends; }
  /* harmony export */ });
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
    \*******************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _getPrototypeOf; }
  /* harmony export */ });
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
  /*!*************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
    \*************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _inherits; }
  /* harmony export */ });
  /* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");
  
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js":
  /*!*****************************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js ***!
    \*****************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _isNativeReflectConstruct; }
  /* harmony export */ });
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
  /*!********************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
    \********************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _iterableToArray; }
  /* harmony export */ });
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
  /*!*************************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
    \*************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _iterableToArrayLimit; }
  /* harmony export */ });
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
  /*!********************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
    \********************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _nonIterableRest; }
  /* harmony export */ });
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
  /*!**********************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
    \**********************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _nonIterableSpread; }
  /* harmony export */ });
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/objectSpread.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/objectSpread.js ***!
    \*****************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _objectSpread; }
  /* harmony export */ });
  /* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
  
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function (key) {
        (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);
      });
    }
    return target;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":
  /*!******************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js ***!
    \******************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _objectSpread2; }
  /* harmony export */ });
  /* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
  
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
  /*!****************************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
    \****************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _objectWithoutProperties; }
  /* harmony export */ });
  /* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
  
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = (0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
  /*!*********************************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
    \*********************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _objectWithoutPropertiesLoose; }
  /* harmony export */ });
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
  /*!******************************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
    \******************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _possibleConstructorReturn; }
  /* harmony export */ });
  /* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
  /* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
  
  
  function _possibleConstructorReturn(self, call) {
    if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
    \*******************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _setPrototypeOf; }
  /* harmony export */ });
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
  /*!******************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
    \******************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _slicedToArray; }
  /* harmony export */ });
  /* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
  /* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
  /* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
  /* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");
  
  
  
  
  function _slicedToArray(arr, i) {
    return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js":
  /*!**************************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js ***!
    \**************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _taggedTemplateLiteral; }
  /* harmony export */ });
  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
  /*!**********************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
    \**********************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _toConsumableArray; }
  /* harmony export */ });
  /* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
  /* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
  /* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
  /* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");
  
  
  
  
  function _toConsumableArray(arr) {
    return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
  /*!***********************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
    \***********************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _typeof; }
  /* harmony export */ });
  function _typeof(obj) {
    "@babel/helpers - typeof";
  
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
  /*!*******************************************************************************!*\
    !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
    \*******************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* binding */ _unsupportedIterableToArray; }
  /* harmony export */ });
  /* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");
  
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  }
  
  /***/ }),
  
  /***/ "./node_modules/@floating-ui/core/dist/floating-ui.core.browser.mjs":
  /*!**************************************************************************!*\
    !*** ./node_modules/@floating-ui/core/dist/floating-ui.core.browser.mjs ***!
    \**************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "arrow": function() { return /* binding */ arrow; },
  /* harmony export */   "autoPlacement": function() { return /* binding */ autoPlacement; },
  /* harmony export */   "computePosition": function() { return /* binding */ computePosition; },
  /* harmony export */   "detectOverflow": function() { return /* binding */ detectOverflow; },
  /* harmony export */   "flip": function() { return /* binding */ flip; },
  /* harmony export */   "hide": function() { return /* binding */ hide; },
  /* harmony export */   "inline": function() { return /* binding */ inline; },
  /* harmony export */   "limitShift": function() { return /* binding */ limitShift; },
  /* harmony export */   "offset": function() { return /* binding */ offset; },
  /* harmony export */   "rectToClientRect": function() { return /* binding */ rectToClientRect; },
  /* harmony export */   "shift": function() { return /* binding */ shift; },
  /* harmony export */   "size": function() { return /* binding */ size; }
  /* harmony export */ });
  function getSide(placement) {
    return placement.split('-')[0];
  }
  
  function getAlignment(placement) {
    return placement.split('-')[1];
  }
  
  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'x' : 'y';
  }
  
  function getLengthFromAxis(axis) {
    return axis === 'y' ? 'height' : 'width';
  }
  
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    const commonAlign = reference[length] / 2 - floating[length] / 2;
    const side = getSide(placement);
    const isVertical = mainAxis === 'x';
    let coords;
  
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
  
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
  
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
  
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
  
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
  
    switch (getAlignment(placement)) {
      case 'start':
        coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
  
      case 'end':
        coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
  
    return coords;
  }
  
  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain positioning strategy.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  
  const computePosition = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  
    {
      if (platform == null) {
        console.error(['Floating UI: `platform` property was not passed to config. If you', 'want to use Floating UI on the web, install @floating-ui/dom', 'instead of the /core package. Otherwise, you can create your own', '`platform`: https://floating-ui.com/docs/platform'].join(' '));
      }
  
      if (middleware.filter(_ref => {
        let {
          name
        } = _ref;
        return name === 'autoPlacement' || name === 'flip';
      }).length > 1) {
        throw new Error(['Floating UI: duplicate `flip` and/or `autoPlacement`', 'middleware detected. This will lead to an infinite loop. Ensure only', 'one of either has been passed to the `middleware` array.'].join(' '));
      }
    }
  
    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
  
    for (let i = 0; i < middleware.length; i++) {
      const {
        name,
        fn
      } = middleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = { ...middlewareData,
        [name]: { ...middlewareData[name],
          ...data
        }
      };
  
      {
        if (resetCount > 50) {
          console.warn(['Floating UI: The middleware lifecycle appears to be running in an', 'infinite loop. This is usually caused by a `reset` continually', 'being returned without a break condition.'].join(' '));
        }
      }
  
      if (reset && resetCount <= 50) {
        resetCount++;
  
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
  
          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
  
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
  
        i = -1;
        continue;
      }
    }
  
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  
  function getSideObjectFromPadding(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  
  function rectToClientRect(rect) {
    return { ...rect,
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    };
  }
  
  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  async function detectOverflow(middlewareArguments, options) {
    var _await$platform$isEle;
  
    if (options === void 0) {
      options = {};
    }
  
    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = middlewareArguments;
    const {
      boundary = 'clippingAncestors',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = options;
    const paddingObject = getSideObjectFromPadding(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform.getClippingRect({
      element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    }));
    const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect: elementContext === 'floating' ? { ...rects.floating,
        x,
        y
      } : rects.reference,
      offsetParent: await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating)),
      strategy
    }) : rects[elementContext]);
    return {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
  }
  
  const min = Math.min;
  const max = Math.max;
  
  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  
  /**
   * Positions an inner element of the floating element such that it is centered
   * to the reference element.
   * @see https://floating-ui.com/docs/arrow
   */
  const arrow = options => ({
    name: 'arrow',
    options,
  
    async fn(middlewareArguments) {
      // Since `element` is required, we don't Partial<> the type
      const {
        element,
        padding = 0
      } = options != null ? options : {};
      const {
        x,
        y,
        placement,
        rects,
        platform
      } = middlewareArguments;
  
      if (element == null) {
        {
          console.warn('Floating UI: No `element` was passed to the `arrow` middleware.');
        }
  
        return {};
      }
  
      const paddingObject = getSideObjectFromPadding(padding);
      const coords = {
        x,
        y
      };
      const axis = getMainAxisFromPlacement(placement);
      const alignment = getAlignment(placement);
      const length = getLengthFromAxis(axis);
      const arrowDimensions = await platform.getDimensions(element);
      const minProp = axis === 'y' ? 'top' : 'left';
      const maxProp = axis === 'y' ? 'bottom' : 'right';
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  
      if (clientSize === 0) {
        clientSize = rects.floating[length];
      }
  
      const centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the floating element if the center
      // point is outside the floating element's bounds
  
      const min = paddingObject[minProp];
      const max = clientSize - arrowDimensions[length] - paddingObject[maxProp];
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset = within(min, center, max); // Make sure that arrow points at the reference
  
      const alignmentPadding = alignment === 'start' ? paddingObject[minProp] : paddingObject[maxProp];
      const shouldAddOffset = alignmentPadding > 0 && center !== offset && rects.reference[length] <= rects.floating[length];
      const alignmentOffset = shouldAddOffset ? center < min ? min - center : max - center : 0;
      return {
        [axis]: coords[axis] - alignmentOffset,
        data: {
          [axis]: offset,
          centerOffset: center - offset
        }
      };
    }
  
  });
  
  const hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, matched => hash$1[matched]);
  }
  
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
  
    const alignment = getAlignment(placement);
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    let mainAlignmentSide = mainAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
  
    return {
      main: mainAlignmentSide,
      cross: getOppositePlacement(mainAlignmentSide)
    };
  }
  
  const hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, matched => hash[matched]);
  }
  
  const sides = ['top', 'right', 'bottom', 'left'];
  const allPlacements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-start", side + "-end"), []);
  
  function getPlacementList(alignment, autoAlignment, allowedPlacements) {
    const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
    return allowedPlacementsSortedByAlignment.filter(placement => {
      if (alignment) {
        return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
      }
  
      return true;
    });
  }
  
  /**
   * Automatically chooses the `placement` which has the most space available.
   * @see https://floating-ui.com/docs/autoPlacement
   */
  const autoPlacement = function (options) {
    if (options === void 0) {
      options = {};
    }
  
    return {
      name: 'autoPlacement',
      options,
  
      async fn(middlewareArguments) {
        var _middlewareData$autoP, _middlewareData$autoP2, _middlewareData$autoP3, _middlewareData$autoP4, _placementsSortedByLe;
  
        const {
          x,
          y,
          rects,
          middlewareData,
          placement,
          platform,
          elements
        } = middlewareArguments;
        const {
          alignment = null,
          allowedPlacements = allPlacements,
          autoAlignment = true,
          ...detectOverflowOptions
        } = options;
        const placements = getPlacementList(alignment, autoAlignment, allowedPlacements);
        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const currentIndex = (_middlewareData$autoP = (_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.index) != null ? _middlewareData$autoP : 0;
        const currentPlacement = placements[currentIndex];
  
        if (currentPlacement == null) {
          return {};
        }
  
        const {
          main,
          cross
        } = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))); // Make `computeCoords` start from the right place
  
        if (placement !== currentPlacement) {
          return {
            x,
            y,
            reset: {
              placement: placements[0]
            }
          };
        }
  
        const currentOverflows = [overflow[getSide(currentPlacement)], overflow[main], overflow[cross]];
        const allOverflows = [...((_middlewareData$autoP3 = (_middlewareData$autoP4 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP4.overflows) != null ? _middlewareData$autoP3 : []), {
          placement: currentPlacement,
          overflows: currentOverflows
        }];
        const nextPlacement = placements[currentIndex + 1]; // There are more placements to check
  
        if (nextPlacement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
  
        const placementsSortedByLeastOverflow = allOverflows.slice().sort((a, b) => a.overflows[0] - b.overflows[0]);
        const placementThatFitsOnAllSides = (_placementsSortedByLe = placementsSortedByLeastOverflow.find(_ref => {
          let {
            overflows
          } = _ref;
          return overflows.every(overflow => overflow <= 0);
        })) == null ? void 0 : _placementsSortedByLe.placement;
        const resetPlacement = placementThatFitsOnAllSides != null ? placementThatFitsOnAllSides : placementsSortedByLeastOverflow[0].placement;
  
        if (resetPlacement !== placement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: resetPlacement
            }
          };
        }
  
        return {};
      }
  
    };
  };
  
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  
  /**
   * Changes the placement of the floating element to one that will fit if the
   * initially specified `placement` does not.
   * @see https://floating-ui.com/docs/flip
   */
  const flip = function (options) {
    if (options === void 0) {
      options = {};
    }
  
    return {
      name: 'flip',
      options,
  
      async fn(middlewareArguments) {
        var _middlewareData$flip;
  
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform,
          elements
        } = middlewareArguments;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          flipAlignment = true,
          ...detectOverflowOptions
        } = options;
        const side = getSide(placement);
        const isBasePlacement = side === initialPlacement;
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
  
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
  
        if (checkCrossAxis) {
          const {
            main,
            cross
          } = getAlignmentSides(placement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));
          overflows.push(overflow[main], overflow[cross]);
        }
  
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }]; // One or more sides is overflowing
  
        if (!overflows.every(side => side <= 0)) {
          var _middlewareData$flip$, _middlewareData$flip2;
  
          const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) != null ? _middlewareData$flip$ : 0) + 1;
          const nextPlacement = placements[nextIndex];
  
          if (nextPlacement) {
            // Try next placement and re-run the lifecycle
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
  
          let resetPlacement = 'bottom';
  
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
  
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;
  
                if (placement) {
                  resetPlacement = placement;
                }
  
                break;
              }
  
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
  
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
  
        return {};
      }
  
    };
  };
  
  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }
  
  function isAnySideFullyClipped(overflow) {
    return sides.some(side => overflow[side] >= 0);
  }
  
  /**
   * Provides data to hide the floating element in applicable situations, such as
   * when it is not in the same clipping context as the reference element.
   * @see https://floating-ui.com/docs/hide
   */
  const hide = function (_temp) {
    let {
      strategy = 'referenceHidden',
      ...detectOverflowOptions
    } = _temp === void 0 ? {} : _temp;
    return {
      name: 'hide',
  
      async fn(middlewareArguments) {
        const {
          rects
        } = middlewareArguments;
  
        switch (strategy) {
          case 'referenceHidden':
            {
              const overflow = await detectOverflow(middlewareArguments, { ...detectOverflowOptions,
                elementContext: 'reference'
              });
              const offsets = getSideOffsets(overflow, rects.reference);
              return {
                data: {
                  referenceHiddenOffsets: offsets,
                  referenceHidden: isAnySideFullyClipped(offsets)
                }
              };
            }
  
          case 'escaped':
            {
              const overflow = await detectOverflow(middlewareArguments, { ...detectOverflowOptions,
                altBoundary: true
              });
              const offsets = getSideOffsets(overflow, rects.floating);
              return {
                data: {
                  escapedOffsets: offsets,
                  escaped: isAnySideFullyClipped(offsets)
                }
              };
            }
  
          default:
            {
              return {};
            }
        }
      }
  
    };
  };
  
  async function convertValueToCoords(middlewareArguments, value) {
    const {
      placement,
      platform,
      elements
    } = middlewareArguments;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getMainAxisFromPlacement(placement) === 'x';
    const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = typeof value === 'function' ? value(middlewareArguments) : value; // eslint-disable-next-line prefer-const
  
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === 'number' ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...rawValue
    };
  
    if (alignment && typeof alignmentAxis === 'number') {
      crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
    }
  
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  /**
   * Displaces the floating element from its reference element.
   * @see https://floating-ui.com/docs/offset
   */
  
  const offset = function (value) {
    if (value === void 0) {
      value = 0;
    }
  
    return {
      name: 'offset',
      options: value,
  
      async fn(middlewareArguments) {
        const {
          x,
          y
        } = middlewareArguments;
        const diffCoords = await convertValueToCoords(middlewareArguments, value);
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: diffCoords
        };
      }
  
    };
  };
  
  function getCrossAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }
  
  /**
   * Shifts the floating element in order to keep it in view when it will overflow
   * a clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift = function (options) {
    if (options === void 0) {
      options = {};
    }
  
    return {
      name: 'shift',
      options,
  
      async fn(middlewareArguments) {
        const {
          x,
          y,
          placement
        } = middlewareArguments;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          },
          ...detectOverflowOptions
        } = options;
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const mainAxis = getMainAxisFromPlacement(getSide(placement));
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
  
        if (checkMainAxis) {
          const minSide = mainAxis === 'y' ? 'top' : 'left';
          const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
          const min = mainAxisCoord + overflow[minSide];
          const max = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = within(min, mainAxisCoord, max);
        }
  
        if (checkCrossAxis) {
          const minSide = crossAxis === 'y' ? 'top' : 'left';
          const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
          const min = crossAxisCoord + overflow[minSide];
          const max = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = within(min, crossAxisCoord, max);
        }
  
        const limitedCoords = limiter.fn({ ...middlewareArguments,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return { ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y
          }
        };
      }
  
    };
  };
  
  /**
   * Built-in `limiter` that will stop `shift()` at a certain point.
   */
  const limitShift = function (options) {
    if (options === void 0) {
      options = {};
    }
  
    return {
      options,
  
      fn(middlewareArguments) {
        const {
          x,
          y,
          placement,
          rects,
          middlewareData
        } = middlewareArguments;
        const {
          offset = 0,
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true
        } = options;
        const coords = {
          x,
          y
        };
        const mainAxis = getMainAxisFromPlacement(placement);
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = typeof offset === 'function' ? offset(middlewareArguments) : offset;
        const computedOffset = typeof rawOffset === 'number' ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...rawOffset
        };
  
        if (checkMainAxis) {
          const len = mainAxis === 'y' ? 'height' : 'width';
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
  
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
  
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2, _middlewareData$offse3, _middlewareData$offse4;
  
          const len = mainAxis === 'y' ? 'width' : 'height';
          const isOriginSide = ['top', 'left'].includes(getSide(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? (_middlewareData$offse = (_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) != null ? _middlewareData$offse : 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : (_middlewareData$offse3 = (_middlewareData$offse4 = middlewareData.offset) == null ? void 0 : _middlewareData$offse4[crossAxis]) != null ? _middlewareData$offse3 : 0) - (isOriginSide ? computedOffset.crossAxis : 0);
  
          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }
  
        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }
  
    };
  };
  
  /**
   * Provides data to change the size of the floating element. For instance,
   * prevent it from overflowing its clipping boundary or match the width of the
   * reference element.
   * @see https://floating-ui.com/docs/size
   */
  const size = function (options) {
    if (options === void 0) {
      options = {};
    }
  
    return {
      name: 'size',
      options,
  
      async fn(middlewareArguments) {
        const {
          placement,
          rects,
          platform,
          elements
        } = middlewareArguments;
        const {
          apply = () => {},
          ...detectOverflowOptions
        } = options;
        const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        let heightSide;
        let widthSide;
  
        if (side === 'top' || side === 'bottom') {
          heightSide = side;
          widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
        } else {
          widthSide = side;
          heightSide = alignment === 'end' ? 'top' : 'bottom';
        }
  
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        const dimensions = {
          availableHeight: rects.floating.height - (['left', 'right'].includes(placement) ? 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom)) : overflow[heightSide]),
          availableWidth: rects.floating.width - (['top', 'bottom'].includes(placement) ? 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right)) : overflow[widthSide])
        };
        await apply({ ...middlewareArguments,
          ...dimensions
        });
        const nextDimensions = await platform.getDimensions(elements.floating);
  
        if (rects.floating.width !== nextDimensions.width || rects.floating.height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
  
        return {};
      }
  
    };
  };
  
  /**
   * Provides improved positioning for inline reference elements that can span
   * over multiple lines, such as hyperlinks or range selections.
   * @see https://floating-ui.com/docs/inline
   */
  const inline = function (options) {
    if (options === void 0) {
      options = {};
    }
  
    return {
      name: 'inline',
      options,
  
      async fn(middlewareArguments) {
        var _await$platform$getCl;
  
        const {
          placement,
          elements,
          rects,
          platform,
          strategy
        } = middlewareArguments; // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
        // ClientRect's bounds, despite the event listener being triggered. A
        // padding of 2 seems to handle this issue.
  
        const {
          padding = 2,
          x,
          y
        } = options;
        const fallback = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
          rect: rects.reference,
          offsetParent: await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating)),
          strategy
        }) : rects.reference);
        const clientRects = (_await$platform$getCl = await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) != null ? _await$platform$getCl : [];
        const paddingObject = getSideObjectFromPadding(padding);
  
        function getBoundingClientRect() {
          // There are two rects and they are disjoined
          if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
            var _clientRects$find;
  
            // Find the first rect in which the point is fully inside
            return (_clientRects$find = clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom)) != null ? _clientRects$find : fallback;
          } // There are 2 or more connected rects
  
  
          if (clientRects.length >= 2) {
            if (getMainAxisFromPlacement(placement) === 'x') {
              const firstRect = clientRects[0];
              const lastRect = clientRects[clientRects.length - 1];
              const isTop = getSide(placement) === 'top';
              const top = firstRect.top;
              const bottom = lastRect.bottom;
              const left = isTop ? firstRect.left : lastRect.left;
              const right = isTop ? firstRect.right : lastRect.right;
              const width = right - left;
              const height = bottom - top;
              return {
                top,
                bottom,
                left,
                right,
                width,
                height,
                x: left,
                y: top
              };
            }
  
            const isLeftSide = getSide(placement) === 'left';
            const maxRight = max(...clientRects.map(rect => rect.right));
            const minLeft = min(...clientRects.map(rect => rect.left));
            const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
            const top = measureRects[0].top;
            const bottom = measureRects[measureRects.length - 1].bottom;
            const left = minLeft;
            const right = maxRight;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
  
          return fallback;
        }
  
        const resetRects = await platform.getElementRects({
          reference: {
            getBoundingClientRect
          },
          floating: elements.floating,
          strategy
        });
  
        if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
          return {
            reset: {
              rects: resetRects
            }
          };
        }
  
        return {};
      }
  
    };
  };
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.mjs":
  /*!************************************************************************!*\
    !*** ./node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.mjs ***!
    \************************************************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "arrow": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.arrow; },
  /* harmony export */   "autoPlacement": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.autoPlacement; },
  /* harmony export */   "autoUpdate": function() { return /* binding */ autoUpdate; },
  /* harmony export */   "computePosition": function() { return /* binding */ computePosition; },
  /* harmony export */   "detectOverflow": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.detectOverflow; },
  /* harmony export */   "flip": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.flip; },
  /* harmony export */   "getOverflowAncestors": function() { return /* binding */ getOverflowAncestors; },
  /* harmony export */   "hide": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.hide; },
  /* harmony export */   "inline": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.inline; },
  /* harmony export */   "limitShift": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.limitShift; },
  /* harmony export */   "offset": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.offset; },
  /* harmony export */   "platform": function() { return /* binding */ platform; },
  /* harmony export */   "shift": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.shift; },
  /* harmony export */   "size": function() { return /* reexport safe */ _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.size; }
  /* harmony export */ });
  /* harmony import */ var _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/core */ "./node_modules/@floating-ui/core/dist/floating-ui.core.browser.mjs");
  
  
  
  function isWindow(value) {
    return value && value.document && value.location && value.alert && value.setInterval;
  }
  function getWindow(node) {
    if (node == null) {
      return window;
    }
  
    if (!isWindow(node)) {
      const ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }
  
    return node;
  }
  
  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }
  
  function getNodeName(node) {
    return isWindow(node) ? '' : node ? (node.nodeName || '').toLowerCase() : '';
  }
  
  function getUAString() {
    const uaData = navigator.userAgentData;
  
    if (uaData != null && uaData.brands) {
      return uaData.brands.map(item => item.brand + "/" + item.version).join(' ');
    }
  
    return navigator.userAgent;
  }
  
  function isHTMLElement(value) {
    return value instanceof getWindow(value).HTMLElement;
  }
  function isElement(value) {
    return value instanceof getWindow(value).Element;
  }
  function isNode(value) {
    return value instanceof getWindow(value).Node;
  }
  function isShadowRoot(node) {
    // Browsers without `ShadowRoot` support
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }
  
    const OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  function isOverflowElement(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle(element);
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    // TODO: Try and use feature detection here instead
    const isFirefox = /firefox/i.test(getUAString());
    const css = getComputedStyle(element); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  
    return css.transform !== 'none' || css.perspective !== 'none' || isFirefox && css.willChange === 'filter' || isFirefox && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective'].some(value => css.willChange.includes(value)) || ['paint', 'layout', 'strict', 'content'].some( // TS 4.1 compat
    value => {
      const contain = css.contain;
      return contain != null ? contain.includes(value) : false;
    });
  }
  function isLayoutViewport() {
    // Not Safari
    return !/^((?!chrome|android).)*safari/i.test(getUAString()); // Feature detection for this fails in various ways
    // • Always-visible scrollbar or not
    // • Width of <html>, etc.
    // const vV = win.visualViewport;
    // return vV ? Math.abs(win.innerWidth / vV.scale - vV.width) < 0.5 : true;
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }
  
  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  
  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;
  
    if (includeScale === void 0) {
      includeScale = false;
    }
  
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
  
    const clientRect = element.getBoundingClientRect();
    let scaleX = 1;
    let scaleY = 1;
  
    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }
  
    const win = isElement(element) ? getWindow(element) : window;
    const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    const x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scaleX;
    const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scaleY;
    const width = clientRect.width / scaleX;
    const height = clientRect.height / scaleY;
    return {
      width,
      height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x,
      y
    };
  }
  
  function getDocumentElement(node) {
    return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
  }
  
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
  
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  }
  
  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }
  
  function isScaled(element) {
    const rect = getBoundingClientRect(element);
    return round(rect.width) !== element.offsetWidth || round(rect.height) !== element.offsetHeight;
  }
  
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const rect = getBoundingClientRect(element, // @ts-ignore - checked above (TS 4.1 compat)
    isOffsetParentAnElement && isScaled(offsetParent), strategy === 'fixed');
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = {
      x: 0,
      y: 0
    };
  
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
  
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent, true);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
  
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }
  
  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
  
    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // @ts-ignore
      node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      node.parentNode || ( // DOM Element detected
      isShadowRoot(node) ? node.host : null) || // ShadowRoot detected
      getDocumentElement(node) // fallback
  
    );
  }
  
  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
      return null;
    }
  
    return element.offsetParent;
  }
  
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
  
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }
  
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        const parent = currentNode.parentNode;
        currentNode = isShadowRoot(parent) ? parent.host : parent;
      }
    }
  
    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  
  
  function getOffsetParent(element) {
    const window = getWindow(element);
    let offsetParent = getTrueOffsetParent(element);
  
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
  
    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
      return window;
    }
  
    return offsetParent || getContainingBlock(element) || window;
  }
  
  function getDimensions(element) {
    if (isHTMLElement(element)) {
      return {
        width: element.offsetWidth,
        height: element.offsetHeight
      };
    }
  
    const rect = getBoundingClientRect(element);
    return {
      width: rect.width,
      height: rect.height
    };
  }
  
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
  
    if (offsetParent === documentElement) {
      return rect;
    }
  
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = {
      x: 0,
      y: 0
    };
  
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
  
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent, true);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } // This doesn't appear to be need to be negated.
      // else if (documentElement) {
      //   offsets.x = getWindowScrollBarX(documentElement);
      // }
  
    }
  
    return { ...rect,
      x: rect.x - scroll.scrollLeft + offsets.x,
      y: rect.y - scroll.scrollTop + offsets.y
    };
  }
  
  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
  
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const layoutViewport = isLayoutViewport();
  
      if (layoutViewport || !layoutViewport && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
  
    return {
      width,
      height,
      x,
      y
    };
  }
  
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable
  
  function getDocumentRect(element) {
    var _element$ownerDocumen;
  
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
  
    if (getComputedStyle(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
  
    return {
      width,
      height,
      x,
      y
    };
  }
  
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
  
    if (isLastTraversableNode(parentNode)) {
      // @ts-ignore assume body is always available
      return node.ownerDocument.body;
    }
  
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
  
    return getNearestOverflowAncestor(parentNode);
  }
  
  function getOverflowAncestors(node, list) {
    var _node$ownerDocument;
  
    if (list === void 0) {
      list = [];
    }
  
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
    const win = getWindow(scrollableAncestor);
    const target = isBody ? [win].concat(win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []) : scrollableAncestor;
    const updatedList = list.concat(target);
    return isBody ? updatedList : // @ts-ignore: isBody tells us target will be an HTMLElement here
    updatedList.concat(getOverflowAncestors(target));
  }
  
  function contains(parent, child) {
    const rootNode = child.getRootNode == null ? void 0 : child.getRootNode(); // First, attempt with faster native method
  
    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
      let next = child;
  
      do {
        // use `===` replace node.isSameNode()
        if (next && parent === next) {
          return true;
        } // @ts-ignore: need a better way to handle this...
  
  
        next = next.parentNode || next.host;
      } while (next);
    }
  
    return false;
  }
  
  function getNearestParentCapableOfEscapingClipping(element, clippingAncestors) {
    let currentNode = element;
  
    while (currentNode && !isLastTraversableNode(currentNode) && // @ts-expect-error
    !clippingAncestors.includes(currentNode)) {
      if (isElement(currentNode) && ['absolute', 'fixed'].includes(getComputedStyle(currentNode).position)) {
        break;
      }
  
      const parentNode = getParentNode(currentNode);
      currentNode = isShadowRoot(parentNode) ? parentNode.host : parentNode;
    }
  
    return currentNode;
  }
  
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, false, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    return {
      top,
      left,
      x: left,
      y: top,
      right: left + element.clientWidth,
      bottom: top + element.clientHeight,
      width: element.clientWidth,
      height: element.clientHeight
    };
  }
  
  function getClientRectFromClippingAncestor(element, clippingParent, strategy) {
    if (clippingParent === 'viewport') {
      return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getViewportRect(element, strategy));
    }
  
    if (isElement(clippingParent)) {
      return getInnerBoundingClientRect(clippingParent, strategy);
    }
  
    return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getDocumentRect(getDocumentElement(element)));
  } // A "clipping ancestor" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`
  
  
  function getClippingAncestors(element) {
    const clippingAncestors = getOverflowAncestors(element);
    const nearestEscapableParent = getNearestParentCapableOfEscapingClipping(element, clippingAncestors);
    let clipperElement = null;
  
    if (nearestEscapableParent && isHTMLElement(nearestEscapableParent)) {
      const offsetParent = getOffsetParent(nearestEscapableParent);
  
      if (isOverflowElement(nearestEscapableParent)) {
        clipperElement = nearestEscapableParent;
      } else if (isHTMLElement(offsetParent)) {
        clipperElement = offsetParent;
      }
    }
  
    if (!isElement(clipperElement)) {
      return [];
    } // @ts-ignore isElement check ensures we return Array<Element>
  
  
    return clippingAncestors.filter(clippingAncestors => clipperElement && isElement(clippingAncestors) && contains(clippingAncestors, clipperElement) && getNodeName(clippingAncestors) !== 'body');
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors
  
  
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const mainClippingAncestors = boundary === 'clippingAncestors' ? getClippingAncestors(element) : [].concat(boundary);
    const clippingAncestors = [...mainClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  
  const platform = {
    getClippingRect,
    convertOffsetParentRelativeRectToViewportRelativeRect,
    isElement,
    getDimensions,
    getOffsetParent,
    getDocumentElement,
    getElementRects: _ref => {
      let {
        reference,
        floating,
        strategy
      } = _ref;
      return {
        reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
        floating: { ...getDimensions(floating),
          x: 0,
          y: 0
        }
      };
    },
    getClientRects: element => Array.from(element.getClientRects()),
    isRTL: element => getComputedStyle(element).direction === 'rtl'
  };
  
  /**
   * Automatically updates the position of the floating element when necessary.
   * @see https://floating-ui.com/docs/autoUpdate
   */
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
  
    const {
      ancestorScroll: _ancestorScroll = true,
      ancestorResize = true,
      elementResize = true,
      animationFrame = false
    } = options;
    const ancestorScroll = _ancestorScroll && !animationFrame;
    const ancestors = ancestorScroll || ancestorResize ? [...(isElement(reference) ? getOverflowAncestors(reference) : []), ...getOverflowAncestors(floating)] : [];
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.addEventListener('scroll', update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener('resize', update);
    });
    let observer = null;
  
    if (elementResize) {
      let initialUpdate = true;
      observer = new ResizeObserver(() => {
        if (!initialUpdate) {
          update();
        }
  
        initialUpdate = false;
      });
      isElement(reference) && !animationFrame && observer.observe(reference);
      observer.observe(floating);
    }
  
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  
    if (animationFrame) {
      frameLoop();
    }
  
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
  
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update();
      }
  
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
  
    update();
    return () => {
      var _observer;
  
      ancestors.forEach(ancestor => {
        ancestorScroll && ancestor.removeEventListener('scroll', update);
        ancestorResize && ancestor.removeEventListener('resize', update);
      });
      (_observer = observer) == null ? void 0 : _observer.disconnect();
      observer = null;
  
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  
  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain CSS positioning
   * strategy.
   */
  
  const computePosition = (reference, floating, options) => (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.computePosition)(reference, floating, {
    platform,
    ...options
  });
  
  
  
  
  /***/ }),
  
  /***/ "./node_modules/array-move/index.js":
  /*!******************************************!*\
    !*** ./node_modules/array-move/index.js ***!
    \******************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "arrayMoveImmutable": function() { return /* binding */ arrayMoveImmutable; },
  /* harmony export */   "arrayMoveMutable": function() { return /* binding */ arrayMoveMutable; }
  /* harmony export */ });
  function arrayMoveMutable(array, fromIndex, toIndex) {
    const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
  
    if (startIndex >= 0 && startIndex < array.length) {
      const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;
  
      const [item] = array.splice(fromIndex, 1);
      array.splice(endIndex, 0, item);
    }
  }
  
  function arrayMoveImmutable(array, fromIndex, toIndex) {
    array = [...array];
    arrayMoveMutable(array, fromIndex, toIndex);
    return array;
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/stylis/src/Enum.js":
  /*!*****************************************!*\
    !*** ./node_modules/stylis/src/Enum.js ***!
    \*****************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "CHARSET": function() { return /* binding */ CHARSET; },
  /* harmony export */   "COMMENT": function() { return /* binding */ COMMENT; },
  /* harmony export */   "COUNTER_STYLE": function() { return /* binding */ COUNTER_STYLE; },
  /* harmony export */   "DECLARATION": function() { return /* binding */ DECLARATION; },
  /* harmony export */   "DOCUMENT": function() { return /* binding */ DOCUMENT; },
  /* harmony export */   "FONT_FACE": function() { return /* binding */ FONT_FACE; },
  /* harmony export */   "FONT_FEATURE_VALUES": function() { return /* binding */ FONT_FEATURE_VALUES; },
  /* harmony export */   "IMPORT": function() { return /* binding */ IMPORT; },
  /* harmony export */   "KEYFRAMES": function() { return /* binding */ KEYFRAMES; },
  /* harmony export */   "MEDIA": function() { return /* binding */ MEDIA; },
  /* harmony export */   "MOZ": function() { return /* binding */ MOZ; },
  /* harmony export */   "MS": function() { return /* binding */ MS; },
  /* harmony export */   "NAMESPACE": function() { return /* binding */ NAMESPACE; },
  /* harmony export */   "PAGE": function() { return /* binding */ PAGE; },
  /* harmony export */   "RULESET": function() { return /* binding */ RULESET; },
  /* harmony export */   "SUPPORTS": function() { return /* binding */ SUPPORTS; },
  /* harmony export */   "VIEWPORT": function() { return /* binding */ VIEWPORT; },
  /* harmony export */   "WEBKIT": function() { return /* binding */ WEBKIT; }
  /* harmony export */ });
  var MS = '-ms-'
  var MOZ = '-moz-'
  var WEBKIT = '-webkit-'
  
  var COMMENT = 'comm'
  var RULESET = 'rule'
  var DECLARATION = 'decl'
  
  var PAGE = '@page'
  var MEDIA = '@media'
  var IMPORT = '@import'
  var CHARSET = '@charset'
  var VIEWPORT = '@viewport'
  var SUPPORTS = '@supports'
  var DOCUMENT = '@document'
  var NAMESPACE = '@namespace'
  var KEYFRAMES = '@keyframes'
  var FONT_FACE = '@font-face'
  var COUNTER_STYLE = '@counter-style'
  var FONT_FEATURE_VALUES = '@font-feature-values'
  
  
  /***/ }),
  
  /***/ "./node_modules/stylis/src/Middleware.js":
  /*!***********************************************!*\
    !*** ./node_modules/stylis/src/Middleware.js ***!
    \***********************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "middleware": function() { return /* binding */ middleware; },
  /* harmony export */   "namespace": function() { return /* binding */ namespace; },
  /* harmony export */   "prefixer": function() { return /* binding */ prefixer; },
  /* harmony export */   "rulesheet": function() { return /* binding */ rulesheet; }
  /* harmony export */ });
  /* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
  /* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
  /* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
  /* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/stylis/src/Serializer.js");
  /* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/stylis/src/Prefixer.js");
  
  
  
  
  
  
  /**
   * @param {function[]} collection
   * @return {function}
   */
  function middleware (collection) {
    var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)
  
    return function (element, index, children, callback) {
      var output = ''
  
      for (var i = 0; i < length; i++)
        output += collection[i](element, index, children, callback) || ''
  
      return output
    }
  }
  
  /**
   * @param {function} callback
   * @return {function}
   */
  function rulesheet (callback) {
    return function (element) {
      if (!element.root)
        if (element = element.return)
          callback(element)
    }
  }
  
  /**
   * @param {object} element
   * @param {number} index
   * @param {object[]} children
   * @param {function} callback
   */
  function prefixer (element, index, children, callback) {
    if (element.length > -1)
      if (!element.return)
        switch (element.type) {
          case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length, children)
            return
          case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
            return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {value: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT)})], callback)
          case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
            if (element.length)
              return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(element.props, function (value) {
                switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /(::plac\w+|:read-\w+)/)) {
                  // :read-(only|write)
                  case ':read-only': case ':read-write':
                    return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]})], callback)
                  // :placeholder
                  case '::placeholder':
                    return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
                      (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1')]}),
                      (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]}),
                      (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1')]})
                    ], callback)
                }
  
                return ''
              })
        }
  }
  
  /**
   * @param {object} element
   * @param {number} index
   * @param {object[]} children
   */
  function namespace (element) {
    switch (element.type) {
      case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
        element.props = element.props.map(function (value) {
          return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
            switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
              // \f
              case 12:
                return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
              // \0 ( + > ~
              case 0: case 40: case 43: case 62: case 126:
                return value
              // :
              case 58:
                if (children[++index] === 'global')
                  children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index], index = 1, -1)
              // \s
              case 32:
                return index === 1 ? '' : value
              default:
                switch (index) {
                  case 0: element = value
                    return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
                  case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
                    return index === 2 ? value + element + element : value + element
                  default:
                    return value
                }
            }
          })
        })
    }
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/stylis/src/Parser.js":
  /*!*******************************************!*\
    !*** ./node_modules/stylis/src/Parser.js ***!
    \*******************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "comment": function() { return /* binding */ comment; },
  /* harmony export */   "compile": function() { return /* binding */ compile; },
  /* harmony export */   "declaration": function() { return /* binding */ declaration; },
  /* harmony export */   "parse": function() { return /* binding */ parse; },
  /* harmony export */   "ruleset": function() { return /* binding */ ruleset; }
  /* harmony export */ });
  /* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
  /* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
  /* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
  
  
  
  
  /**
   * @param {string} value
   * @return {object[]}
   */
  function compile (value) {
    return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
  }
  
  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {string[]} rule
   * @param {string[]} rules
   * @param {string[]} rulesets
   * @param {number[]} pseudo
   * @param {number[]} points
   * @param {string[]} declarations
   * @return {object}
   */
  function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index = 0
    var offset = 0
    var length = pseudo
    var atrule = 0
    var property = 0
    var previous = 0
    var variable = 1
    var scanning = 1
    var ampersand = 1
    var character = 0
    var type = ''
    var props = rules
    var children = rulesets
    var reference = rule
    var characters = type
  
    while (scanning)
      switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
        // (
        case 40:
          if (previous != 108 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, length - 1) == 58) {
            if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character), '&', '&\f'), '&\f') != -1)
              ampersand = -1
            break
          }
        // " ' [
        case 34: case 39: case 91:
          characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
          break
        // \t \n \r \s
        case 9: case 10: case 13: case 32:
          characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
          break
        // \
        case 92:
          characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)() - 1, 7)
          continue
        // /
        case 47:
          switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
            case 42: case 47:
              ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent), declarations)
              break
            default:
              characters += '/'
          }
          break
        // {
        case 123 * variable:
          points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
        // } ; \0
        case 125 * variable: case 59: case 0:
          switch (character) {
            // \0 }
            case 0: case 125: scanning = 0
            // ;
            case 59 + offset:
              if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
                (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
              break
            // @ ;
            case 59: characters += ';'
            // { rule/at-rule
            default:
              ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)
  
              if (character === 123)
                if (offset === 0)
                  parse(characters, root, reference, reference, props, rulesets, length, points, children)
                else
                  switch (atrule === 99 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, 3) === 110 ? 100 : atrule) {
                    // d m s
                    case 100: case 109: case 115:
                      parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
                      break
                    default:
                      parse(characters, reference, reference, reference, [''], children, 0, points, children)
                  }
          }
  
          index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
          break
        // :
        case 58:
          length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
        default:
          if (variable < 1)
            if (character == 123)
              --variable
            else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.prev)() == 125)
              continue
  
          switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
            // &
            case 38:
              ampersand = offset > 0 ? 1 : (characters += '\f', -1)
              break
            // ,
            case 44:
              points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
              break
            // @
            case 64:
              // -
              if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
                characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())
  
              atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
              break
            // -
            case 45:
              if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
                variable = 0
          }
      }
  
    return rulesets
  }
  
  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {number} index
   * @param {number} offset
   * @param {string[]} rules
   * @param {number[]} points
   * @param {string} type
   * @param {string[]} props
   * @param {string[]} children
   * @param {number} length
   * @return {object}
   */
  function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
    var post = offset - 1
    var rule = offset === 0 ? rules : ['']
    var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)
  
    for (var i = 0, j = 0, k = 0; i < index; ++i)
      for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
        if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
          props[k++] = z
  
    return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length)
  }
  
  /**
   * @param {number} value
   * @param {object} root
   * @param {object?} parent
   * @return {object}
   */
  function comment (value, root, parent) {
    return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
  }
  
  /**
   * @param {string} value
   * @param {object} root
   * @param {object?} parent
   * @param {number} length
   * @return {object}
   */
  function declaration (value, root, parent, length) {
    return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/stylis/src/Prefixer.js":
  /*!*********************************************!*\
    !*** ./node_modules/stylis/src/Prefixer.js ***!
    \*********************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "prefix": function() { return /* binding */ prefix; }
  /* harmony export */ });
  /* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
  /* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
  
  
  
  /**
   * @param {string} value
   * @param {number} length
   * @param {object[]} children
   * @return {string}
   */
  function prefix (value, length, children) {
    switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
      // color-adjust
      case 5103:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value
      // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
      case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
      // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
      case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
      // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
      case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
      // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
      case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
      // tab-size
      case 4789:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + value
      // appearance, user-select, transform, hyphens, text-size-adjust
      case 5349: case 4246: case 4810: case 6968: case 2756:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
      // writing-mode
      case 5936:
        switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
          // vertical-l(r)
          case 114:
            return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
          // vertical-r(l)
          case 108:
            return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
          // horizontal(-)tb
          case 45:
            return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
          // default: fallthrough to below
        }
      // flex, flex-direction, scroll-snap-type, writing-mode
      case 6828: case 4268: case 2903:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
      // order
      case 6165:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
      // align-items
      case 5187:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
      // align-self
      case 5443:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/g, '') + (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /flex-|baseline/) ? _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-row-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/g, '') : '') + value
      // align-content
      case 4675:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/g, '') + value
      // flex-shrink
      case 5548:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
      // flex-basis
      case 5292:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
      // flex-grow
      case 6060:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
      // transition
      case 4554:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
      // cursor
      case 6187:
        return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
      // background, background-image
      case 5495: case 3959:
        return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
      // justify-content
      case 4968:
        return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
      // justify-self
      case 4200:
        if (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /flex-|baseline/)) return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-column-align' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, length) + value
        break
      // grid-template-(columns|rows)
      case 2592: case 3360:
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'template-', '') + value
      // grid-(row|column)-start
      case 4384: case 3616:
        if (children && children.some(function (element, index) { return length = index, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(element.props, /grid-\w+-end/) })) {
          return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value + (children = children[length].value), 'span') ? value : (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-start', '') + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-row-span:' + (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(children, 'span') ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(children, /\d+/) : +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(children, /\d+/) - +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /\d+/)) + ';')
        }
        return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-start', '') + value
      // grid-(row|column)-end
      case 4896: case 4128:
        return (children && children.some(function (element) { return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(element.props, /grid-\w+-start/) })) ? value : _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-end', '-span'), 'span ', '') + value
      // (margin|padding)-inline-(start|end)
      case 4095: case 3583: case 4068: case 2532:
        return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
      // (min|max)?(width|height|inline-size|block-size)
      case 8116: case 7059: case 5753: case 5535:
      case 5445: case 5701: case 4933: case 4677:
      case 5533: case 5789: case 5021: case 4765:
        // stretch, max-content, min-content, fill-available
        if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
          switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
            // (m)ax-content, (m)in-content
            case 109:
              // -
              if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 4) !== 45)
                break
            // (f)ill-available, (f)it-content
            case 102:
              return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
            // (s)tretch
            case 115:
              return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length, children) + value : value
          }
        break
      // grid-(column|row)
      case 5152: case 5920:
        return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + a + ':' + b + f) + (c ? (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
      // position: sticky
      case 4949:
        // stick(y)?
        if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 6) === 121)
          return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value
        break
      // display: (flex|inline-flex|grid|inline-grid)
      case 6444:
        switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 18 : 11)) {
          // (inline-)?fle(x)
          case 120:
            return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
          // (inline-)?gri(d)
          case 100:
            return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS) + value
        }
        break
      // scroll-margin, scroll-margin-(top|right|bottom|left)
      case 5719: case 2647: case 2135: case 3927: case 2391:
        return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'scroll-', 'scroll-snap-') + value
    }
  
    return value
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/stylis/src/Serializer.js":
  /*!***********************************************!*\
    !*** ./node_modules/stylis/src/Serializer.js ***!
    \***********************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "serialize": function() { return /* binding */ serialize; },
  /* harmony export */   "stringify": function() { return /* binding */ stringify; }
  /* harmony export */ });
  /* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
  /* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
  
  
  
  /**
   * @param {object[]} children
   * @param {function} callback
   * @return {string}
   */
  function serialize (children, callback) {
    var output = ''
    var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children)
  
    for (var i = 0; i < length; i++)
      output += callback(children[i], i, children, callback) || ''
  
    return output
  }
  
  /**
   * @param {object} element
   * @param {number} index
   * @param {object[]} children
   * @param {function} callback
   * @return {string}
   */
  function stringify (element, index, children, callback) {
    switch (element.type) {
      case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: return element.return = element.return || element.value
      case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.COMMENT: return ''
      case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
      case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET: element.value = element.props.join(',')
    }
  
    return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/stylis/src/Tokenizer.js":
  /*!**********************************************!*\
    !*** ./node_modules/stylis/src/Tokenizer.js ***!
    \**********************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "alloc": function() { return /* binding */ alloc; },
  /* harmony export */   "caret": function() { return /* binding */ caret; },
  /* harmony export */   "char": function() { return /* binding */ char; },
  /* harmony export */   "character": function() { return /* binding */ character; },
  /* harmony export */   "characters": function() { return /* binding */ characters; },
  /* harmony export */   "column": function() { return /* binding */ column; },
  /* harmony export */   "commenter": function() { return /* binding */ commenter; },
  /* harmony export */   "copy": function() { return /* binding */ copy; },
  /* harmony export */   "dealloc": function() { return /* binding */ dealloc; },
  /* harmony export */   "delimit": function() { return /* binding */ delimit; },
  /* harmony export */   "delimiter": function() { return /* binding */ delimiter; },
  /* harmony export */   "escaping": function() { return /* binding */ escaping; },
  /* harmony export */   "identifier": function() { return /* binding */ identifier; },
  /* harmony export */   "length": function() { return /* binding */ length; },
  /* harmony export */   "line": function() { return /* binding */ line; },
  /* harmony export */   "next": function() { return /* binding */ next; },
  /* harmony export */   "node": function() { return /* binding */ node; },
  /* harmony export */   "peek": function() { return /* binding */ peek; },
  /* harmony export */   "position": function() { return /* binding */ position; },
  /* harmony export */   "prev": function() { return /* binding */ prev; },
  /* harmony export */   "slice": function() { return /* binding */ slice; },
  /* harmony export */   "token": function() { return /* binding */ token; },
  /* harmony export */   "tokenize": function() { return /* binding */ tokenize; },
  /* harmony export */   "tokenizer": function() { return /* binding */ tokenizer; },
  /* harmony export */   "whitespace": function() { return /* binding */ whitespace; }
  /* harmony export */ });
  /* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
  
  
  var line = 1
  var column = 1
  var length = 0
  var position = 0
  var character = 0
  var characters = ''
  
  /**
   * @param {string} value
   * @param {object | null} root
   * @param {object | null} parent
   * @param {string} type
   * @param {string[] | string} props
   * @param {object[] | string} children
   * @param {number} length
   */
  function node (value, root, parent, type, props, children, length) {
    return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
  }
  
  /**
   * @param {object} root
   * @param {object} props
   * @return {object}
   */
  function copy (root, props) {
    return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
  }
  
  /**
   * @return {number}
   */
  function char () {
    return character
  }
  
  /**
   * @return {number}
   */
  function prev () {
    character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0
  
    if (column--, character === 10)
      column = 1, line--
  
    return character
  }
  
  /**
   * @return {number}
   */
  function next () {
    character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0
  
    if (column++, character === 10)
      column = 1, line++
  
    return character
  }
  
  /**
   * @return {number}
   */
  function peek () {
    return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
  }
  
  /**
   * @return {number}
   */
  function caret () {
    return position
  }
  
  /**
   * @param {number} begin
   * @param {number} end
   * @return {string}
   */
  function slice (begin, end) {
    return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
  }
  
  /**
   * @param {number} type
   * @return {number}
   */
  function token (type) {
    switch (type) {
      // \0 \t \n \r \s whitespace token
      case 0: case 9: case 10: case 13: case 32:
        return 5
      // ! + , / > @ ~ isolate token
      case 33: case 43: case 44: case 47: case 62: case 64: case 126:
      // ; { } breakpoint token
      case 59: case 123: case 125:
        return 4
      // : accompanied token
      case 58:
        return 3
      // " ' ( [ opening delimit token
      case 34: case 39: case 40: case 91:
        return 2
      // ) ] closing delimit token
      case 41: case 93:
        return 1
    }
  
    return 0
  }
  
  /**
   * @param {string} value
   * @return {any[]}
   */
  function alloc (value) {
    return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
  }
  
  /**
   * @param {any} value
   * @return {any}
   */
  function dealloc (value) {
    return characters = '', value
  }
  
  /**
   * @param {number} type
   * @return {string}
   */
  function delimit (type) {
    return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
  }
  
  /**
   * @param {string} value
   * @return {string[]}
   */
  function tokenize (value) {
    return dealloc(tokenizer(alloc(value)))
  }
  
  /**
   * @param {number} type
   * @return {string}
   */
  function whitespace (type) {
    while (character = peek())
      if (character < 33)
        next()
      else
        break
  
    return token(type) > 2 || token(character) > 3 ? '' : ' '
  }
  
  /**
   * @param {string[]} children
   * @return {string[]}
   */
  function tokenizer (children) {
    while (next())
      switch (token(character)) {
        case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
          break
        case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
          break
        default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
      }
  
    return children
  }
  
  /**
   * @param {number} index
   * @param {number} count
   * @return {string}
   */
  function escaping (index, count) {
    while (--count && next())
      // not 0-9 A-F a-f
      if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
        break
  
    return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
  }
  
  /**
   * @param {number} type
   * @return {number}
   */
  function delimiter (type) {
    while (next())
      switch (character) {
        // ] ) " '
        case type:
          return position
        // " '
        case 34: case 39:
          if (type !== 34 && type !== 39)
            delimiter(character)
          break
        // (
        case 40:
          if (type === 41)
            delimiter(type)
          break
        // \
        case 92:
          next()
          break
      }
  
    return position
  }
  
  /**
   * @param {number} type
   * @param {number} index
   * @return {number}
   */
  function commenter (type, index) {
    while (next())
      // //
      if (type + character === 47 + 10)
        break
      // /*
      else if (type + character === 42 + 42 && peek() === 47)
        break
  
    return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
  }
  
  /**
   * @param {number} index
   * @return {string}
   */
  function identifier (index) {
    while (!token(peek()))
      next()
  
    return slice(index, position)
  }
  
  
  /***/ }),
  
  /***/ "./node_modules/stylis/src/Utility.js":
  /*!********************************************!*\
    !*** ./node_modules/stylis/src/Utility.js ***!
    \********************************************/
  /***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "abs": function() { return /* binding */ abs; },
  /* harmony export */   "append": function() { return /* binding */ append; },
  /* harmony export */   "assign": function() { return /* binding */ assign; },
  /* harmony export */   "charat": function() { return /* binding */ charat; },
  /* harmony export */   "combine": function() { return /* binding */ combine; },
  /* harmony export */   "from": function() { return /* binding */ from; },
  /* harmony export */   "hash": function() { return /* binding */ hash; },
  /* harmony export */   "indexof": function() { return /* binding */ indexof; },
  /* harmony export */   "match": function() { return /* binding */ match; },
  /* harmony export */   "replace": function() { return /* binding */ replace; },
  /* harmony export */   "sizeof": function() { return /* binding */ sizeof; },
  /* harmony export */   "strlen": function() { return /* binding */ strlen; },
  /* harmony export */   "substr": function() { return /* binding */ substr; },
  /* harmony export */   "trim": function() { return /* binding */ trim; }
  /* harmony export */ });
  /**
   * @param {number}
   * @return {number}
   */
  var abs = Math.abs
  
  /**
   * @param {number}
   * @return {string}
   */
  var from = String.fromCharCode
  
  /**
   * @param {object}
   * @return {object}
   */
  var assign = Object.assign
  
  /**
   * @param {string} value
   * @param {number} length
   * @return {number}
   */
  function hash (value, length) {
    return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
  }
  
  /**
   * @param {string} value
   * @return {string}
   */
  function trim (value) {
    return value.trim()
  }
  
  /**
   * @param {string} value
   * @param {RegExp} pattern
   * @return {string?}
   */
  function match (value, pattern) {
    return (value = pattern.exec(value)) ? value[0] : value
  }
  
  /**
   * @param {string} value
   * @param {(string|RegExp)} pattern
   * @param {string} replacement
   * @return {string}
   */
  function replace (value, pattern, replacement) {
    return value.replace(pattern, replacement)
  }
  
  /**
   * @param {string} value
   * @param {string} search
   * @return {number}
   */
  function indexof (value, search) {
    return value.indexOf(search)
  }
  
  /**
   * @param {string} value
   * @param {number} index
   * @return {number}
   */
  function charat (value, index) {
    return value.charCodeAt(index) | 0
  }
  
  /**
   * @param {string} value
   * @param {number} begin
   * @param {number} end
   * @return {string}
   */
  function substr (value, begin, end) {
    return value.slice(begin, end)
  }
  
  /**
   * @param {string} value
   * @return {number}
   */
  function strlen (value) {
    return value.length
  }
  
  /**
   * @param {any[]} value
   * @return {number}
   */
  function sizeof (value) {
    return value.length
  }
  
  /**
   * @param {any} value
   * @param {any[]} array
   * @return {any}
   */
  function append (value, array) {
    return array.push(value), value
  }
  
  /**
   * @param {string[]} array
   * @param {function} callback
   * @return {string}
   */
  function combine (array, callback) {
    return array.map(callback).join('')
  }
  
  
  /***/ }),
  
  /***/ "../assets/googleFonts.json":
  /*!**********************************!*\
    !*** ../assets/googleFonts.json ***!
    \**********************************/
  /***/ (function(module) {
  
  "use strict";
  module.exports = JSON.parse('{"Roboto":{"category":"sans-serif","variants":{"normal":{"100":{"local":["\'Roboto Thin\'","\'Roboto-Thin\'"]},"300":{"local":["\'Roboto Light\'","\'Roboto-Light\'"]},"400":{"local":["\'Roboto\'","\'Roboto-Regular\'"]},"500":{"local":["\'Roboto Medium\'","\'Roboto-Medium\'"]},"700":{"local":["\'Roboto Bold\'","\'Roboto-Bold\'"]},"900":{"local":["\'Roboto Black\'","\'Roboto-Black\'"]}}}},"Jost":{"category":"sans-serif","variants":{"normal":{"100":{"local":[]},"200":{"local":[]},"300":{"local":[]},"400":{"local":[]},"500":{"local":[]},"600":{"local":[]},"700":{"local":[]},"800":{"local":[]},"900":{"local":[]}}}},"Inter":{"category":"sans-serif","variants":{"normal":{"100":{"local":[]},"200":{"local":[]},"300":{"local":[]},"400":{"local":[]},"500":{"local":[]},"600":{"local":[]},"700":{"local":[]},"800":{"local":[]},"900":{"local":[]}}}},"Playfair Display":{"category":"serif","variants":{"normal":{"400":{"local":[]},"500":{"local":[]},"600":{"local":[]},"700":{"local":[]},"800":{"local":[]},"900":{"local":[]}}}},"Public Sans":{"category":"sans-serif","variants":{"normal":{"100":{"local":[]},"200":{"local":[]},"300":{"local":[]},"400":{"local":[]},"500":{"local":[]},"600":{"local":[]},"700":{"local":[]},"800":{"local":[]},"900":{"local":[]}}}}}');
  
  /***/ })
  
  /******/ 	});
  /************************************************************************/
  /******/ 	// The module cache
  /******/ 	var __webpack_module_cache__ = {};
  /******/ 	
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/ 		// Check if module is in cache
  /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
  /******/ 		if (cachedModule !== undefined) {
  /******/ 			return cachedModule.exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = __webpack_module_cache__[moduleId] = {
  /******/ 			// no module.id needed
  /******/ 			// no module.loaded needed
  /******/ 			exports: {}
  /******/ 		};
  /******/ 	
  /******/ 		// Execute the module function
  /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  /******/ 	
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/ 	
  /************************************************************************/
  /******/ 	/* webpack/runtime/compat get default export */
  /******/ 	!function() {
  /******/ 		// getDefaultExport function for compatibility with non-harmony modules
  /******/ 		__webpack_require__.n = function(module) {
  /******/ 			var getter = module && module.__esModule ?
  /******/ 				function() { return module['default']; } :
  /******/ 				function() { return module; };
  /******/ 			__webpack_require__.d(getter, { a: getter });
  /******/ 			return getter;
  /******/ 		};
  /******/ 	}();
  /******/ 	
  /******/ 	/* webpack/runtime/define property getters */
  /******/ 	!function() {
  /******/ 		// define getter functions for harmony exports
  /******/ 		__webpack_require__.d = function(exports, definition) {
  /******/ 			for(var key in definition) {
  /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
  /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
  /******/ 				}
  /******/ 			}
  /******/ 		};
  /******/ 	}();
  /******/ 	
  /******/ 	/* webpack/runtime/global */
  /******/ 	!function() {
  /******/ 		__webpack_require__.g = (function() {
  /******/ 			if (typeof globalThis === 'object') return globalThis;
  /******/ 			try {
  /******/ 				return this || new Function('return this')();
  /******/ 			} catch (e) {
  /******/ 				if (typeof window === 'object') return window;
  /******/ 			}
  /******/ 		})();
  /******/ 	}();
  /******/ 	
  /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
  /******/ 	!function() {
  /******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
  /******/ 	}();
  /******/ 	
  /******/ 	/* webpack/runtime/make namespace object */
  /******/ 	!function() {
  /******/ 		// define __esModule on exports
  /******/ 		__webpack_require__.r = function(exports) {
  /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 			}
  /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 		};
  /******/ 	}();
  /******/ 	
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  !function() {
  "use strict";
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
  /* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
  /* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
  /* harmony import */ var _repeaterComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repeaterComponent */ "./src/repeaterComponent.js");
  /* harmony import */ var _borderComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./borderComponent */ "./src/borderComponent.js");
  /* harmony import */ var _sortComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sortComponent */ "./src/sortComponent.js");
  /* harmony import */ var _typographyComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./typographyComponent */ "./src/typographyComponent.js");
  /* harmony import */ var _boxShadowComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./boxShadowComponent */ "./src/boxShadowComponent.js");
  /* harmony import */ var _asyncPostsMultiSelect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./asyncPostsMultiSelect */ "./src/asyncPostsMultiSelect.js");
  /* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/index.es.js");
  /* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
  
  const {
    TabPanel,
    ColorPicker,
    GradientPicker,
    Card,
    CardBody,
    ToggleControl,
    ColorIndicator,
    ButtonGroup,
    Button,
    ResponsiveWrapper,
    RangeControl,
    CheckboxControl,
    Dropdown,
    SelectControl,
    Dashicon,
    TextControl
  } = wp.components;
  const {
    render,
    useState,
    useEffect
  } = wp.element;
  const {
    MediaUpload
  } = wp.blockEditor;
  const {
    __
  } = wp.i18n;
  const {
    escapeHTML
  } = wp.escapeHtml;
  const {
    customize
  } = wp;
  
  
  
  
  
  
  
  
  
  const NewsmaticUpsellWithPreview = props => {
    const [choices, setChoices] = useState(customize.settings.controls[props.setting].choices);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, choices && choices.map(function (choice, key) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: `upsell-inner-wrap ${choice.classes ? choice.classes : ''}`
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        class: "button-icon"
      }, choice.icon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        class: `up-icon ${choice.icon}`
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
        className: "upsell-button",
        href: choice.url,
        target: "__blank",
        variant: "primary",
        text: choice.label,
        isSmall: true
      })), choice.preview_url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        class: "upsell-preview-frame",
        src: choice.preview_url
      }));
    }));
  };
  const NewsmaticInfoBox = props => {
    const [choices, setChoices] = useState(customize.settings.controls[props.setting].choices);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "info-box-label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
      className: "info-box-icon",
      icon: "info"
    }), customize.settings.controls[props.setting].label), customize.settings.controls[props.setting].description && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "info-box-description"
    }, customize.settings.controls[props.setting].description), choices && choices.map(function (choice, key) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
        className: "info-box-button",
        href: choice.url,
        target: "__blank",
        variant: "primary",
        text: choice.label,
        isSmall: true
      });
    })));
  };
  const NewsmaticInfoBoxAction = props => {
    const [choices, setChoices] = useState(customize.settings.controls[props.setting].choices);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "info-box-label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
      className: "info-box-icon",
      icon: "info"
    }), customize.settings.controls[props.setting].label), customize.settings.controls[props.setting].description && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "info-box-description"
    }, customize.settings.controls[props.setting].description), choices && choices.map(function (choice, key) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
        className: "info-box-button",
        "data-action": choice.action,
        variant: "primary",
        text: choice.label,
        isSmall: true
      });
    })));
  };
  
  // Responsive multiselect tab control
  const NewsmaticResponsiveMultiselectTab = props => {
    const [tab, setTab] = useState(props.value);
    const [desktop, setDesktop] = useState(tab.desktop);
    const [tablet, setTablet] = useState(tab.tablet);
    const [mobile, setMobile] = useState(tab.mobile);
    useEffect(() => {
      let newTab = {
        desktop: desktop,
        tablet: tablet,
        mobile: mobile
      };
      setTab(newTab);
      customize.value(props.setting)(newTab);
    }, [desktop, tablet, mobile]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "customize-control-title"
    }, customize.settings.controls[props.setting].label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, {
      className: "control-inner"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      "data-tip": __(escapeHTML('show on desktop'), 'newsmatic'),
      variant: desktop ? 'primary' : 'secondary',
      onClick: () => setDesktop(!desktop)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicons dashicons-desktop"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      "data-tip": __(escapeHTML('show on tablet'), 'newsmatic'),
      variant: tablet ? 'primary' : 'secondary',
      onClick: () => setTablet(!tablet)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicons dashicons-tablet"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      "data-tip": __(escapeHTML('show on mobile'), 'newsmatic'),
      variant: mobile ? 'primary' : 'secondary',
      onClick: () => setMobile(!mobile)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicons dashicons-smartphone"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
      effect: "solid"
    }));
  };
  
  // Radio Tab control
  const NewsmaticRadioTab = props => {
    const [tab, setTab] = useState(props.value);
    const {
      choices
    } = customize.settings.controls[props.setting];
    useEffect(() => {
      customize.value(props.setting)(tab);
    }, [tab]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "customize-control-title"
    }, customize.settings.controls[props.setting].label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, {
      className: "control-inner"
    }, choices && choices.map(choice => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
        variant: tab == choice.value ? 'primary' : 'secondary',
        onClick: () => setTab(choice.value)
      }, choice.label);
    })));
  };
  
  // Radio Bubble control
  const NewsmaticRadioBubble = props => {
    const [bubble, setBubble] = useState(props.value);
    const {
      choices
    } = customize.settings.controls[props.setting];
    useEffect(() => {
      customize.value(props.setting)(bubble);
    }, [bubble]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, customize.settings.controls[props.setting].label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "customize-control-title"
    }, customize.settings.controls[props.setting].label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: choices.length > 2 ? `radio-bubbles column-4` : `radio-bubbles column-2`
    }, choices && choices.map(choice => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: bubble == choice.value ? 'radio-bubble isActive' : 'radio-bubble isItem',
        onClick: () => setBubble(choice.value)
      }, choice.label);
    })));
  };
  
  // Preset Gradient color picker
  const NewsmaticPresetGradientPicker = props => {
    const [preset, setPreset] = useState(props.value);
    const {
      variable
    } = customize.settings.controls[props.setting];
    const updateControl = currentPreset => {
      setPreset(currentPreset);
      customize.value(props.setting)(currentPreset);
    };
    useEffect(() => {
      const html = document.getElementsByTagName("html");
      let style = html[0].getAttribute("style");
      if (style != null) {
        style += variable + ":" + preset + ";";
      } else {
        style = variable + ":" + preset + ";";
      }
      html[0].setAttribute("style", style);
      customize.value(props.setting)(preset);
    }, [preset]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header-trigger"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, customize.settings.controls[props.setting].label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-end'
      },
      renderToggle: _ref => {
        let {
          isOpen,
          onToggle
        } = _ref;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
          className: (preset == null || preset == '') && "null-color",
          "data-tip": __(escapeHTML('Gradient'), 'newsmatic'),
          colorValue: preset,
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(GradientPicker, {
        value: preset,
        onChange: currentPreset => updateControl(currentPreset),
        __nextHasNoMargin: true,
        gradients: []
      }))
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
      effect: "solid"
    }))));
  };
  
  // Color Group control
  const NewsmaticColorGroup = props => {
    const [colorGroup, setColorGroup] = useState(props.value);
    const [color, setColor] = useState(props.value.solid);
    const [gradient, setGradient] = useState(props.value.gradient);
    const [type, setType] = useState(props.value.type);
    useEffect(() => {
      setColorGroup({
        type: type,
        solid: color,
        gradient: gradient
      });
      customize.value(props.setting)(JSON.stringify({
        type: type,
        solid: color,
        gradient: gradient
      }));
    }, [color, gradient]);
    const resetData = () => {
      setType(props.value.type);
      setColor(props.value.solid);
      setGradient(props.value.gradient);
    };
    function getBackground(color) {
      if (color == null) return;
      if (color.includes('preset')) {
        return 'var(' + color + ')';
      } else {
        return color;
      }
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header-trigger"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, customize.settings.controls[props.setting].label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "control-content-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "reset-button components-button is-secondary is-small",
      onClick: () => resetData()
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicon dashicons dashicons-image-rotate"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-end'
      },
      renderToggle: _ref2 => {
        let {
          isOpen,
          onToggle
        } = _ref2;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
          className: colorGroup[type] == null && "null-color",
          "data-tip": type,
          colorValue: getBackground(colorGroup[type]),
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TabPanel, {
        className: "newsmatic-group-tab-panel",
        activeClass: "active-tab",
        initialTabName: type,
        onSelect: tabName => setType(tabName),
        tabs: [{
          name: 'solid',
          title: 'Solid',
          className: 'tab-solid'
        }, {
          name: 'gradient',
          title: 'Gradient',
          className: 'tab-gradient'
        }]
      }, tab => {
        if (tab.name == "solid") {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "preset-colors"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
            className: "preset-colors-inner"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-1' && 'active',
            "data-tip": __(escapeHTML('color 1'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-1)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-1')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-2' && 'active',
            "data-tip": __(escapeHTML('color 2'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-2)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-2')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-3' && 'active',
            "data-tip": __(escapeHTML('color 3'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-3)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-3')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-4' && 'active',
            "data-tip": __(escapeHTML('color 4'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-4)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-4')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-5' && 'active',
            "data-tip": __(escapeHTML('color 5'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-5)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-5')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-6' && 'active',
            "data-tip": __(escapeHTML('color 6'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-6)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-6')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-7' && 'active',
            "data-tip": __(escapeHTML('color 7'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-7)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-7')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-8' && 'active',
            "data-tip": __(escapeHTML('color 8'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-8)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-8')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-9' && 'active',
            "data-tip": __(escapeHTML('color 9'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-9)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-9')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-10' && 'active',
            "data-tip": __(escapeHTML('color 10'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-10)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-10')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-11' && 'active',
            "data-tip": __(escapeHTML('color 11'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-11)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-11')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-12' && 'active',
            "data-tip": __(escapeHTML('color 12'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-12)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-12')
          }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
            color: color,
            onChange: setColor,
            enableAlpha: true
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
            type: "button",
            class: "components-button is-secondary is-small",
            onClick: () => setColor(null)
          }, __('Clear', 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
            effect: "solid"
          }));
        } else if (tab.name == "gradient") {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "preset-colors"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
            className: "preset-colors-inner"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-1' && 'active',
            "data-tip": __(escapeHTML('gradient 1'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-1)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-1')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-2' && 'active',
            "data-tip": __(escapeHTML('gradient 2'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-2)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-2')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-3' && 'active',
            "data-tip": __(escapeHTML('gradient 3'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-3)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-3')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-4' && 'active',
            "data-tip": __(escapeHTML('gradient 4'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-4)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-4')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-5' && 'active',
            "data-tip": __(escapeHTML('gradient 5'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-5)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-5')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-6' && 'active',
            "data-tip": __(escapeHTML('gradient 6'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-6)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-6')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-7' && 'active',
            "data-tip": __(escapeHTML('color 7'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-7)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-7')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-8' && 'active',
            "data-tip": __(escapeHTML('color 8'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-8)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-8')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-9' && 'active',
            "data-tip": __(escapeHTML('color 9'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-9)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-9')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-10' && 'active',
            "data-tip": __(escapeHTML('color 10'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-10)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-10')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-11' && 'active',
            "data-tip": __(escapeHTML('color 11'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-11)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-11')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-12' && 'active',
            "data-tip": __(escapeHTML('color 12'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-12)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-12')
          }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(GradientPicker, {
            value: gradient,
            onChange: currentGradient => setGradient(currentGradient),
            __nextHasNoMargin: true,
            gradients: []
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
            effect: "solid"
          }));
        }
      })
    }))));
  };
  
  // Toggle Button control
  const NewsmaticToggleButton = props => {
    const [toggle, setToggle] = useState(props.value);
    const updateControl = newToggle => {
      setToggle(newToggle);
      customize.value(props.setting)(newToggle);
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
      elevation: 2,
      isRounded: false,
      isBorderless: true,
      size: "small"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
      label: customize.settings.controls[props.setting].label,
      help: toggle ? 'Currently enabled.' : 'Currently disabled.',
      checked: toggle,
      onChange: newToggle => updateControl(newToggle)
    }), customize.settings.controls[props.setting].description && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "description customize-control-description"
    }, customize.settings.controls[props.setting].description)));
  };
  
  // Simple Toggle Button control
  const NewsmaticSimpleToggleButton = props => {
    const [toggle, setToggle] = useState(props.value);
    const updateControl = newToggle => {
      setToggle(newToggle);
      customize.value(props.setting)(newToggle);
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
      label: customize.settings.controls[props.setting].label,
      checked: toggle,
      onChange: newToggle => updateControl(newToggle)
    });
  };
  
  // Preset Color Picker control
  const NewsmaticPresetColorPicker = props => {
    const [preset, setPreset] = useState(props.value);
    const {
      variable
    } = customize.settings.controls[props.setting];
    useEffect(() => {
      const html = document.getElementsByTagName("html");
      let style = html[0].getAttribute("style");
      if (style != null) {
        style += variable + ":" + preset + ";";
      } else {
        style = variable + ":" + preset + ";";
      }
      html[0].setAttribute("style", style);
      customize.value(props.setting)(preset);
    }, [preset]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header-trigger"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, customize.settings.controls[props.setting].label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "control-content-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-end'
      },
      renderToggle: _ref3 => {
        let {
          isOpen,
          onToggle
        } = _ref3;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
          "data-tip": __(escapeHTML('preset'), 'newsmatic'),
          colorValue: preset,
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
        color: preset,
        onChange: newPreset => setPreset(newPreset),
        enableAlpha: true
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
        effect: "solid"
      }))
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
      effect: "solid"
    }))));
  };
  
  // Color Picker control
  const NewsmaticColorPicker = props => {
    const [color, setColor] = useState(props.value);
    useEffect(() => {
      customize.value(props.setting)(color);
    }, [color]);
    const updateControl = newColor => {
      setColor(newColor);
    };
    const resetData = () => {
      setColor(props.value);
    };
    function getBackground(color) {
      if (color == null) return;
      if (color.includes('preset')) {
        return 'var(' + color + ')';
      } else {
        return color;
      }
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header-trigger"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, customize.settings.controls[props.setting].label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "control-content-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "reset-button components-button is-secondary is-small",
      onClick: () => resetData()
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicon dashicons dashicons-image-rotate"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-end'
      },
      renderToggle: _ref4 => {
        let {
          isOpen,
          onToggle
        } = _ref4;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
          className: color == null && "null-color",
          "data-tip": __(escapeHTML('initial'), 'newsmatic'),
          colorValue: getBackground(color),
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "preset-colors"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
        className: "preset-colors-inner"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-1' && 'active',
        "data-tip": __(escapeHTML('color 1'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-1)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-1')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-2' && 'active',
        "data-tip": __(escapeHTML('color 2'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-2)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-2')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-3' && 'active',
        "data-tip": __(escapeHTML('color 3'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-3)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-3')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-4' && 'active',
        "data-tip": __(escapeHTML('color 4'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-4)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-4')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-5' && 'active',
        "data-tip": __(escapeHTML('color 5'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-5)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-5')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-6' && 'active',
        "data-tip": __(escapeHTML('color 6'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-6)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-6')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-7' && 'active',
        "data-tip": __(escapeHTML('color 7'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-7)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-7')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-8' && 'active',
        "data-tip": __(escapeHTML('color 8'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-8)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-8')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-9' && 'active',
        "data-tip": __(escapeHTML('color 9'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-9)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-9')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-10' && 'active',
        "data-tip": __(escapeHTML('color 10'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-10)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-10')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-11' && 'active',
        "data-tip": __(escapeHTML('color 11'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-11)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-11')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-12' && 'active',
        "data-tip": __(escapeHTML('color 12'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-12)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-12')
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
        color: color,
        onChange: newColor => updateControl(newColor),
        enableAlpha: true
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
        effect: "solid"
      }))
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
      effect: "solid"
    }))));
  };
  
  // Color and image field Group control
  const NewsmaticColorImageGroup = props => {
    const [controlValue, setControlValue] = useState(props.value);
    const [styles, setStyles] = useState();
    const [color, setColor] = useState(props.value.solid);
    const [gradient, setGradient] = useState(props.value.gradient);
    const [image, setImage] = useState(props.value.image);
    const [position, setPosition] = useState(props.value.position);
    const [attachment, setAttachment] = useState(props.value.attachment);
    const [repeat, setRepeat] = useState(props.value.repeat);
    const [size, setSize] = useState(props.value.size);
    const [type, setType] = useState(props.value.type);
    const [imageSettings, setImageSettings] = useState(false);
    useEffect(() => {
      setControlValue({
        type: type,
        solid: color,
        gradient: gradient,
        image: image
      });
    }, [color, gradient, image]);
    useEffect(() => {
      const newStyles = type == 'image' ? "#fff" : getBackground(controlValue[type]);
      setStyles(newStyles);
    }, [controlValue]);
    useEffect(() => {
      customize.value(props.setting)(JSON.stringify({
        type: type,
        solid: color,
        gradient: gradient,
        image: image,
        position: position,
        attachment: attachment,
        repeat: repeat,
        size: size
      }));
    }, [color, gradient, image, position, attachment, repeat, size]);
    const removeMedia = () => {
      setImage({
        media_id: 0,
        media_url: ''
      });
    };
    function getBackground(newPreFormatColor) {
      if (newPreFormatColor == null) return;
      if (newPreFormatColor.includes('preset')) {
        return 'var(' + newPreFormatColor + ')';
      } else {
        return newPreFormatColor;
      }
    }
    const onSelectMedia = media => {
      setImage({
        media_id: media.id,
        media_url: media.url
      });
    };
    const resetData = () => {
      setType(props.value.type);
      setColor(props.value.solid);
      setGradient(props.value.gradient);
      setImage(props.value.image);
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header-trigger"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, customize.settings.controls[props.setting].label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "control-content-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "reset-button components-button is-secondary is-small",
      onClick: () => resetData()
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicon dashicons dashicons-image-rotate"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-end'
      },
      renderToggle: _ref5 => {
        let {
          isOpen,
          onToggle
        } = _ref5;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
          className: controlValue[type] == null ? "null-color" : type == "image" ? "dashicons dashicons-format-image" : type,
          "data-tip": type,
          style: {
            background: styles
          },
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TabPanel, {
        className: "newsmatic-group-tab-panel",
        activeClass: "active-tab",
        initialTabName: type,
        onSelect: tabName => setType(tabName),
        tabs: [{
          name: 'solid',
          title: __('Solid', 'newsmatic'),
          className: 'tab-solid'
        }, {
          name: 'gradient',
          title: __('Gradient', 'newsmatic'),
          className: 'tab-gradient'
        }, {
          name: 'image',
          title: __('Image', 'newsmatic'),
          className: 'tab-image'
        }]
      }, tab => {
        if (tab.name == "solid") {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "preset-colors"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
            className: "preset-colors-inner"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-1' && 'active',
            "data-tip": __(escapeHTML('color 1'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-1)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-1')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-2' && 'active',
            "data-tip": __(escapeHTML('color 2'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-2)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-2')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-3' && 'active',
            "data-tip": __(escapeHTML('color 3'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-3)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-3')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-4' && 'active',
            "data-tip": __(escapeHTML('color 4'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-4)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-4')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-5' && 'active',
            "data-tip": __(escapeHTML('color 5'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-5)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-5')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-6' && 'active',
            "data-tip": __(escapeHTML('color 6'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-6)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-6')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-7' && 'active',
            "data-tip": __(escapeHTML('color 7'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-7)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-7')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-8' && 'active',
            "data-tip": __(escapeHTML('color 8'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-8)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-8')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-9' && 'active',
            "data-tip": __(escapeHTML('color 9'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-9)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-9')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-10' && 'active',
            "data-tip": __(escapeHTML('color 10'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-10)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-10')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-11' && 'active',
            "data-tip": __(escapeHTML('color 11'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-11)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-11')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: color == '--newsmatic-global-preset-color-12' && 'active',
            "data-tip": __(escapeHTML('color 12'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-color-12)'
            },
            onClick: () => setColor('--newsmatic-global-preset-color-12')
          }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
            color: color,
            onChange: setColor,
            enableAlpha: true
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
            type: "button",
            className: "components-button is-secondary is-small",
            onClick: () => setColor(null)
          }, __('Clear', 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
            effect: "solid"
          }));
        } else if (tab.name == "gradient") {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "preset-colors"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
            className: "preset-colors-inner"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-1' && 'active',
            "data-tip": __(escapeHTML('gradient 1'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-1)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-1')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-2' && 'active',
            "data-tip": __(escapeHTML('gradient 2'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-2)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-2')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-3' && 'active',
            "data-tip": __(escapeHTML('gradient 3'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-3)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-3')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-4' && 'active',
            "data-tip": __(escapeHTML('gradient 4'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-4)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-4')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-5' && 'active',
            "data-tip": __(escapeHTML('gradient 5'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-5)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-5')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-6' && 'active',
            "data-tip": __(escapeHTML('gradient 6'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-6)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-6')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-7' && 'active',
            "data-tip": __(escapeHTML('color 7'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-7)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-7')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-8' && 'active',
            "data-tip": __(escapeHTML('color 8'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-8)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-8')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-9' && 'active',
            "data-tip": __(escapeHTML('color 9'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-9)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-9')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-10' && 'active',
            "data-tip": __(escapeHTML('color 10'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-10)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-10')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-11' && 'active',
            "data-tip": __(escapeHTML('color 11'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-11)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-11')
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
            className: gradient == '--newsmatic-global-preset-gradient-color-12' && 'active',
            "data-tip": __(escapeHTML('color 12'), 'newsmatic'),
            style: {
              background: 'var(--newsmatic-global-preset-gradient-color-12)'
            },
            onClick: () => setGradient('--newsmatic-global-preset-gradient-color-12')
          }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(GradientPicker, {
            value: gradient,
            onChange: currentGradient => setGradient(currentGradient),
            __nextHasNoMargin: true,
            gradients: []
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
            effect: "solid"
          }));
        } else if (tab.name == "image") {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "editor-post-featured-image"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
            onSelect: onSelectMedia,
            value: image.media_id,
            allowedTypes: ['image'],
            render: _ref6 => {
              let {
                open
              } = _ref6;
              return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
                className: image.media_id == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview',
                onClick: open
              }, image.media_id == 0 && __('Choose an image', 'newsmatic'), image != undefined && image.media_id != 0 && image.media_url != '' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ResponsiveWrapper, {
                naturalWidth: 200,
                naturalHeight: 200
              }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
                src: image.media_url
              })));
            }
          }), image.media_id != 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
            title: __('Replace image', 'newsmatic'),
            value: image.media_id,
            onSelect: onSelectMedia,
            allowedTypes: ['image'],
            render: _ref7 => {
              let {
                open
              } = _ref7;
              return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
                onClick: open,
                variant: "secondary",
                isLarge: true
              }, __('Replace image', 'newsmatic'));
            }
          }), image.media_id != 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            onClick: removeMedia,
            isLink: true,
            isDestructive: true
          }, __('Remove image', 'newsmatic'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "more-settings"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            variant: "tertiary",
            isSmall: true,
            iconPosition: "right",
            icon: imageSettings ? 'arrow-up-alt' : 'arrow-down-alt',
            onClick: () => setImageSettings(!imageSettings)
          }, imageSettings ? __('Show less settings!', 'newsmatic') : __('Show more settings!', 'newsmatic')), imageSettings && image.media_id != 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
            label: __('Background Position', 'newsmatic'),
            value: position,
            options: [{
              label: 'Left Top',
              value: 'left top'
            }, {
              label: 'Left Center',
              value: 'left center'
            }, {
              label: 'Left Bottom',
              value: 'left bottom'
            }, {
              label: 'Right Top',
              value: 'right top'
            }, {
              label: 'Right Center',
              value: 'right center'
            }, {
              label: 'Right Bottom',
              value: 'right bottom'
            }, {
              label: 'Center Top',
              value: 'center top'
            }, {
              label: 'Center Center',
              value: 'center center'
            }, {
              label: 'Center Bottom',
              value: 'center bottom'
            }],
            onChange: newPosition => setPosition(newPosition)
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
            label: __('Background Repeat', 'newsmatic'),
            value: repeat,
            options: [{
              label: 'No Repeat',
              value: 'no-repeat'
            }, {
              label: 'Repeat All',
              value: 'repeat'
            }, {
              label: 'Repeat Horizontally',
              value: 'repeat-x'
            }, {
              label: 'Repeat Vertically',
              value: 'repeat-y'
            }],
            onChange: newRepeat => setRepeat(newRepeat)
          }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "components-truncate components-text components-input-control__label"
          }, __('Background Attachment', 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            variant: attachment == 'fixed' ? 'primary' : 'secondary',
            onClick: () => setAttachment('fixed')
          }, __('Fixed', 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            variant: attachment == 'scroll' ? 'primary' : 'secondary',
            onClick: () => setAttachment('scroll')
          }, __('Scroll', 'newsmatic')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "components-truncate components-text components-input-control__label"
          }, __('Background Size', 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            variant: size == 'auto' ? 'primary' : 'secondary',
            onClick: () => setSize('auto')
          }, __('Auto', 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            variant: size == 'cover' ? 'primary' : 'secondary',
            onClick: () => setSize('cover')
          }, __('Cover', 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
            variant: size == 'contain' ? 'primary' : 'secondary',
            onClick: () => setSize('contain')
          }, __('Contain', 'newsmatic')))))));
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
      effect: "solid"
    }));
  };
  
  // Range control
  const NewsmaticRange = props => {
    const [range, setRange] = useState(props.value);
    const [initialValue] = useState(props.value);
    const updateControl = newRange => {
      setRange(newRange);
      customize.value(props.setting)(newRange);
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: customize.settings.controls[props.setting].label,
      description: customize.settings.controls[props.setting].description,
      value: range,
      allowReset: customize.settings.controls[props.setting].input_attrs.reset,
      onChange: newRange => updateControl(newRange),
      min: customize.settings.controls[props.setting].input_attrs.min,
      max: customize.settings.controls[props.setting].input_attrs.max,
      step: customize.settings.controls[props.setting].input_attrs.step,
      resetFallbackValue: initialValue
    });
  };
  
  // Responsive Control
  const NewsmaticResponsiveBox = props => {
    const [icon, setIcon] = useState('desktop');
    const [value, setValue] = useState(props.value);
    const updateControl = newBox => {
      let newValue = value;
      newValue[icon] = newBox;
      setValue(JSON.parse(JSON.stringify(newValue)));
      customize.value(props.setting)(JSON.parse(JSON.stringify(newValue)));
    };
    const updateIcon = newIcon => {
      const footer = document.getElementById("customize-footer-actions");
      if (newIcon == 'tablet') {
        setIcon('tablet');
        footer.getElementsByClassName("preview-tablet")[0].click();
      }
      if (newIcon == 'smartphone') {
        setIcon('smartphone');
        footer.getElementsByClassName("preview-mobile")[0].click();
      }
      if (newIcon == 'desktop') {
        setIcon('desktop');
        footer.getElementsByClassName("preview-desktop")[0].click();
      }
    };
    const triggerDevice = device => {
      if (device == 'mobile') {
        setIcon('smartphone');
      } else {
        setIcon(device);
      }
    };
    useEffect(() => {
      const resFooter = document.getElementById("customize-footer-actions");
      const resFooterClass = resFooter.getElementsByClassName("devices-wrapper");
      const buttons = resFooterClass[0].getElementsByTagName("button");
      for (const button of buttons) {
        button.addEventListener("click", function () {
          const currentDevice = button.getAttribute("data-device");
          triggerDevice(currentDevice);
        });
      }
    }, []);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "responsive-icons"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
      className: `responsive-trigger ${icon == 'desktop' && "isActive"}`,
      "data-tip": __(escapeHTML('Desktop'), 'newsmatic'),
      icon: "desktop",
      onClick: () => updateIcon("desktop")
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
      className: `responsive-trigger ${icon == 'tablet' && "isActive"}`,
      "data-tip": __(escapeHTML('Tablet'), 'newsmatic'),
      icon: "tablet",
      onClick: () => updateIcon("tablet")
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
      className: `responsive-trigger ${icon == 'smartphone' && "isActive"}`,
      "data-tip": __(escapeHTML('Mobile'), 'newsmatic'),
      icon: "smartphone",
      onClick: () => updateIcon("smartphone")
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
      label: customize.settings.controls[props.setting].label,
      allowReset: false,
      values: value[icon],
      onChange: newBox => updateControl(newBox)
    }));
  };
  
  // Responsive Range Control
  const NewsmaticRangeResponsive = props => {
    const [icon, setIcon] = useState('desktop');
    const [range, setRange] = useState(props.value);
    const [initialRange] = useState(props.value);
    const updateControl = newBox => {
      range[icon] = newBox;
      setRange(JSON.parse(JSON.stringify(range)));
      customize.value(props.setting)(range);
    };
    const updateIcon = newIcon => {
      const footer = document.getElementById("customize-footer-actions");
      if (newIcon == 'tablet') {
        setIcon('tablet');
        footer.getElementsByClassName("preview-tablet")[0].click();
      }
      if (newIcon == 'smartphone') {
        setIcon('smartphone');
        footer.getElementsByClassName("preview-mobile")[0].click();
      }
      if (newIcon == 'desktop') {
        setIcon('desktop');
        footer.getElementsByClassName("preview-desktop")[0].click();
      }
    };
    const triggerDevice = device => {
      if (device == 'mobile') {
        setIcon('smartphone');
      } else {
        setIcon(device);
      }
    };
    useEffect(() => {
      const resFooter = document.getElementById("customize-footer-actions");
      const resFooterClass = resFooter.getElementsByClassName("devices-wrapper");
      const buttons = resFooterClass[0].getElementsByTagName("button");
      for (const button of buttons) {
        button.addEventListener("click", function () {
          const currentDevice = button.getAttribute("data-device");
          triggerDevice(currentDevice);
        });
      }
    }, []);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "responsive-icons"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
      className: `responsive-trigger ${icon == 'desktop' && "isActive"}`,
      "data-tip": __(escapeHTML('Desktop'), 'newsmatic'),
      icon: "desktop",
      onClick: () => updateIcon("desktop")
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
      className: `responsive-trigger ${icon == 'tablet' && "isActive"}`,
      "data-tip": __(escapeHTML('Tablet'), 'newsmatic'),
      icon: "tablet",
      onClick: () => updateIcon("tablet")
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dashicon, {
      className: `responsive-trigger ${icon == 'smartphone' && "isActive"}`,
      "data-tip": __(escapeHTML('Mobile'), 'newsmatic'),
      icon: "smartphone",
      onClick: () => updateIcon("smartphone")
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: customize.settings.controls[props.setting].label,
      description: customize.settings.controls[props.setting].description,
      value: range[icon],
      allowReset: customize.settings.controls[props.setting].input_attrs.reset,
      onChange: newRange => updateControl(newRange),
      min: customize.settings.controls[props.setting].input_attrs.min,
      max: customize.settings.controls[props.setting].input_attrs.max,
      step: customize.settings.controls[props.setting].input_attrs.step,
      resetFallbackValue: initialRange[icon]
    }));
  };
  
  // Multiselect category control
  const NewsmaticMultiselect = props => {
    const [multiselect, setMultiselect] = useState(JSON.parse(props.value));
    const {
      choices
    } = customize.settings.controls[props.setting];
    useEffect(() => {
      customize.value(props.setting)(JSON.stringify(multiselect));
    }, [multiselect]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, choices && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_9__["default"], {
      isMulti: true,
      inputId: "newsmatic-search-in-select",
      isSearchable: true,
      heading: customize.settings.controls[props.setting].label,
      placeholder: __(escapeHTML('Type to search . . '), 'newsmatic'),
      value: multiselect,
      options: choices,
      onChange: newMultiselect => setMultiselect(newMultiselect)
    }));
  };
  
  // Checkbox control
  const NewsmaticCheckbox = props => {
    const [checkbox, setCheckbox] = useState(props.value);
    const updateControl = newCheckbox => {
      setCheckbox(newCheckbox);
      customize.value(props.setting)(newCheckbox);
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
      label: customize.settings.controls[props.setting].label,
      help: customize.settings.controls[props.setting].description,
      checked: checkbox,
      onChange: newCheckbox => updateControl(newCheckbox)
    });
  };
  
  // Color Group control
  const NewsmaticColorGroupPicker = props => {
    const [color, setColor] = useState(props.value.color);
    const [hover, setHover] = useState(props.value.hover);
    useEffect(() => {
      customize.value(props.setting)({
        color: color,
        hover: hover
      });
    }, [color, hover]);
    const resetData = () => {
      setColor(props.value.color);
      setHover(props.value.hover);
    };
    function getBackground(color) {
      if (color == null) return;
      if (color.includes('preset')) {
        return 'var(' + color + ')';
      } else {
        return color;
      }
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "control-header-trigger color-group-inner-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, customize.settings.controls[props.setting].label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "control-content-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "reset-button components-button is-secondary is-small",
      onClick: () => resetData()
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicon dashicons dashicons-image-rotate"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-end'
      },
      renderToggle: _ref8 => {
        let {
          isOpen,
          onToggle
        } = _ref8;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
          className: color == null && "null-color",
          "data-tip": __(escapeHTML('initial'), 'newsmatic'),
          colorValue: getBackground(color),
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "preset-colors"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
        className: "preset-colors-inner"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-1' && 'active',
        "data-tip": __(escapeHTML('color 1'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-1)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-1')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-2' && 'active',
        "data-tip": __(escapeHTML('color 2'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-2)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-2')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-3' && 'active',
        "data-tip": __(escapeHTML('color 3'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-3)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-3')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-4' && 'active',
        "data-tip": __(escapeHTML('color 4'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-4)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-4')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-5' && 'active',
        "data-tip": __(escapeHTML('color 5'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-5)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-5')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-6' && 'active',
        "data-tip": __(escapeHTML('color 6'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-6)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-6')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-7' && 'active',
        "data-tip": __(escapeHTML('color 7'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-7)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-7')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-8' && 'active',
        "data-tip": __(escapeHTML('color 8'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-8)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-8')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-9' && 'active',
        "data-tip": __(escapeHTML('color 9'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-9)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-9')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-10' && 'active',
        "data-tip": __(escapeHTML('color 10'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-10)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-10')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-11' && 'active',
        "data-tip": __(escapeHTML('color 11'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-11)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-11')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: color == '--newsmatic-global-preset-color-12' && 'active',
        "data-tip": __(escapeHTML('color 12'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-12)'
        },
        onClick: () => setColor('--newsmatic-global-preset-color-12')
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
        color: color,
        onChange: newColor => setColor(newColor),
        enableAlpha: true
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        type: "button",
        class: "components-button is-secondary is-small",
        onClick: () => setColor(null)
      }, __('Clear', 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
        effect: "solid"
      }))
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'bottom-end'
      },
      renderToggle: _ref9 => {
        let {
          isOpen,
          onToggle
        } = _ref9;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
          className: hover == null && "null-color",
          "data-tip": __(escapeHTML('hover'), 'newsmatic'),
          colorValue: getBackground(hover),
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "preset-colors"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
        className: "preset-colors-inner"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-1' && 'active',
        "data-tip": __(escapeHTML('color 1'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-1)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-1')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-2' && 'active',
        "data-tip": __(escapeHTML('color 2'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-2)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-2')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-3' && 'active',
        "data-tip": __(escapeHTML('color 3'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-3)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-3')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-4' && 'active',
        "data-tip": __(escapeHTML('color 4'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-4)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-4')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-5' && 'active',
        "data-tip": __(escapeHTML('color 5'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-5)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-5')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-6' && 'active',
        "data-tip": __(escapeHTML('color 6'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-6)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-6')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-7' && 'active',
        "data-tip": __(escapeHTML('color 7'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-7)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-7')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-8' && 'active',
        "data-tip": __(escapeHTML('color 8'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-8)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-8')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-9' && 'active',
        "data-tip": __(escapeHTML('color 9'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-9)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-9')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-10' && 'active',
        "data-tip": __(escapeHTML('color 10'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-10)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-10')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-11' && 'active',
        "data-tip": __(escapeHTML('color 11'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-11)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-11')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: hover == '--newsmatic-global-preset-color-12' && 'active',
        "data-tip": __(escapeHTML('color 12'), 'newsmatic'),
        style: {
          background: 'var(--newsmatic-global-preset-color-12)'
        },
        onClick: () => setHover('--newsmatic-global-preset-color-12')
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
        color: hover,
        onChange: newHoverColor => setHover(newHoverColor),
        enableAlpha: true
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        type: "button",
        class: "components-button is-secondary is-small",
        onClick: () => setHover(null)
      }, __('Clear', 'newsmatic')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
        effect: "solid"
      }))
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tooltip__WEBPACK_IMPORTED_MODULE_8__["default"], {
      effect: "solid"
    }))));
  };
  
  // section tab control
  const NewsmaticSectionTab = props => {
    const {
      value,
      setting
    } = props;
    const {
      choices
    } = customize.settings.controls[props.setting];
    useEffect(() => {
      onTabChange(value);
    });
    function onTabChange(tabName) {
      var sectionName = wp.customize.control(setting).section();
      var controlsName = wp.customize.section(sectionName).controls();
      for (var i = 0; i < controlsName.length; i++) {
        if (!controlsName[i].params.tab) controlsName[i].params.tab = 'general';
        if (controlsName[i].id == 'header_textcolor') controlsName[i].params.tab = 'design';
        if (i > 0 && controlsName[i].params.tab) {
          if (tabName == controlsName[i].params.tab && controlsName[i].params.active) {
            controlsName[i].container[0].removeAttribute("style");
          } else {
            controlsName[i].container[0].setAttribute("style", "display:none");
          }
        }
      }
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TabPanel, {
      activeClass: "active-tab",
      initialTabName: value,
      onSelect: tabName => onTabChange(tabName),
      tabs: choices
    }, tab => {
      return;
    });
  };
  const NewsmaticIconText = props => {
    const [icon, setIcon] = useState(props.value.icon);
    const [text, setText] = useState(props.value.text);
    const [choiceIcons, setChoiceIcons] = useState(customize.control(props.setting).params.icons);
    useEffect(() => {
      customize.value(props.setting)({
        icon: icon,
        text: text
      });
    }, [icon, text]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "field-main"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "customize-control-title"
    }, customize.settings.controls[props.setting].label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "field-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Dropdown, {
      popoverProps: {
        resize: false,
        noArrow: false,
        flip: false,
        placement: 'top-start'
      },
      className: "icon-field",
      renderToggle: _ref10 => {
        let {
          isOpen,
          onToggle
        } = _ref10;
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          class: icon,
          onClick: onToggle,
          "aria-expanded": isOpen
        });
      },
      renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "icon-picker-modal"
      }, choiceIcons && choiceIcons.map(choiceIcon => {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          className: choiceIcon,
          onClick: () => setIcon(choiceIcon)
        });
      }))
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      className: "text-field",
      value: text,
      onChange: newText => setText(newText)
    })));
  };
  
  // Render components to html
  customize.bind('ready', function () {
    // render color group control component
    const colorGroupControls = document.getElementsByClassName("customize-color-group-control");
    for (let colorGroupControl of colorGroupControls) {
      const setting = colorGroupControl.getAttribute('data-setting');
      const settingValue = JSON.parse(customize.settings.settings[setting].value);
      if (colorGroupControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticColorGroup, {
          value: settingValue,
          setting: setting
        }), colorGroupControl);
      }
    }
  
    // render toggle button control
    const toggleButtonControls = document.getElementsByClassName("customize-toggle-button-control");
    for (let toggleButtonControl of toggleButtonControls) {
      const setting = toggleButtonControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (toggleButtonControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticToggleButton, {
          value: settingValue,
          setting: setting
        }), toggleButtonControl);
      }
    }
  
    // render toggle button control
    const simpleToggleButtonControls = document.getElementsByClassName("customize-simple-toggle-control");
    for (let simpleToggleButtonControl of simpleToggleButtonControls) {
      const setting = simpleToggleButtonControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (simpleToggleButtonControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticSimpleToggleButton, {
          value: settingValue,
          setting: setting
        }), simpleToggleButtonControl);
      }
    }
  
    // radio-tab control component
    const radioTabControls = document.getElementsByClassName("customize-radio-tab-control");
    for (let radioTabControl of radioTabControls) {
      const setting = radioTabControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (radioTabControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticRadioTab, {
          value: settingValue,
          setting: setting
        }), radioTabControl);
      }
    }
  
    // radio-bubble control component
    const radioBubbleControls = document.getElementsByClassName("customize-radio-bubble-control");
    for (let radioBubbleControl of radioBubbleControls) {
      const setting = radioBubbleControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (radioBubbleControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticRadioBubble, {
          value: settingValue,
          setting: setting
        }), radioBubbleControl);
      }
    }
  
    // responsive multi select tab control component
    const responsiveMultiselectTabControls = document.getElementsByClassName("customize-responsive-multiselect-tab-control");
    for (let responsiveMultiselectTabControl of responsiveMultiselectTabControls) {
      const setting = responsiveMultiselectTabControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (responsiveMultiselectTabControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticResponsiveMultiselectTab, {
          value: settingValue,
          setting: setting
        }), responsiveMultiselectTabControl);
      }
    }
  
    // render color picker control component
    const colorPickerControls = document.getElementsByClassName("customize-color-picker-control");
    for (let colorPickerControl of colorPickerControls) {
      const setting = colorPickerControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (colorPickerControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticColorPicker, {
          value: settingValue,
          setting: setting
        }), colorPickerControl);
      }
    }
  
    // render preset color picker control component
    const presetColorPickerControls = document.getElementsByClassName("customize-preset-color-picker-control");
    for (let presetColorPickerControl of presetColorPickerControls) {
      const setting = presetColorPickerControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (presetColorPickerControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticPresetColorPicker, {
          value: settingValue,
          setting: setting
        }), presetColorPickerControl);
      }
    }
  
    // render preset gradient picker control component
    const presetGradientPickerControls = document.getElementsByClassName("customize-preset-gradient-picker-control");
    for (let presetGradientPickerControl of presetGradientPickerControls) {
      const setting = presetGradientPickerControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (presetGradientPickerControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticPresetGradientPicker, {
          value: settingValue,
          setting: setting
        }), presetGradientPickerControl);
      }
    }
  
    // render colors with image group control component
    const colorImageGroupControls = document.getElementsByClassName("customize-color-image-group-control");
    for (let colorImageGroupControl of colorImageGroupControls) {
      const setting = colorImageGroupControl.getAttribute('data-setting');
      const settingValue = JSON.parse(customize.settings.settings[setting].value);
      if (colorImageGroupControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticColorImageGroup, {
          value: settingValue,
          setting: setting
        }), colorImageGroupControl);
      }
    }
  
    // render range control component
    const rangeControls = document.getElementsByClassName("customize-range-control");
    for (let rangeControl of rangeControls) {
      const setting = rangeControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (rangeControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticRange, {
          value: settingValue,
          setting: setting
        }), rangeControl);
      }
    }
  
    // render responsive range control component
    const responsiveRangeControls = document.getElementsByClassName("customize-responsive-range-control");
    for (let responsiveRangeControl of responsiveRangeControls) {
      const setting = responsiveRangeControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (responsiveRangeControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticRangeResponsive, {
          value: settingValue,
          setting: setting
        }), responsiveRangeControl);
      }
    }
  
    // render responsive box control component
    const responsiveBoxControls = document.getElementsByClassName("customize-responsive-box-control");
    for (let responsiveBoxControl of responsiveBoxControls) {
      const setting = responsiveBoxControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (responsiveBoxControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticResponsiveBox, {
          value: settingValue,
          setting: setting
        }), responsiveBoxControl);
      }
    }
  
    // render multicheckbox control component
    const multiselectControls = document.getElementsByClassName("customize-multiselect-control");
    for (let multiselectControl of multiselectControls) {
      const setting = multiselectControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (multiselectControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticMultiselect, {
          value: settingValue,
          setting: setting
        }), multiselectControl);
      }
    }
  
    // render posts multicheckbox control component
    const postsMultiselectControls = document.getElementsByClassName("customize-posts-multiselect-control");
    for (let postsMultiselectControl of postsMultiselectControls) {
      const setting = postsMultiselectControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (postsMultiselectControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_asyncPostsMultiSelect__WEBPACK_IMPORTED_MODULE_7__.NewsmaticPostsMultiselect, {
          value: settingValue,
          setting: setting
        }), postsMultiselectControl);
      }
    }
  
    // render checkbox control component
    const checkboxControls = document.getElementsByClassName("customize-checkbox-control");
    for (let checkboxControl of checkboxControls) {
      const setting = checkboxControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (checkboxControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticCheckbox, {
          value: settingValue,
          setting: setting
        }), checkboxControl);
      }
    }
  
    // render block repeater control component
    const blockRepeaterControls = document.getElementsByClassName("customize-block-repeater-control");
    for (let blockRepeaterControl of blockRepeaterControls) {
      const setting = blockRepeaterControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (blockRepeaterControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_repeaterComponent__WEBPACK_IMPORTED_MODULE_2__.NewsmaticBlockRepeater, {
          value: settingValue,
          setting: setting
        }), blockRepeaterControl);
      }
    }
  
    // render block item sortable control component
    const itemSortableControls = document.getElementsByClassName("customize-item-sortable-control");
    for (let itemSortableControl of itemSortableControls) {
      const setting = itemSortableControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (itemSortableControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_sortComponent__WEBPACK_IMPORTED_MODULE_4__.NewsmaticItemSort, {
          value: settingValue,
          setting: setting
        }), itemSortableControl);
      }
    }
  
    // render block typography control component
    const typographyControls = document.getElementsByClassName("customize-typography-control");
    for (let typographyControl of typographyControls) {
      const setting = typographyControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (typographyControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_typographyComponent__WEBPACK_IMPORTED_MODULE_5__.NewsmaticTypography, {
          value: settingValue,
          setting: setting
        }), typographyControl);
      }
    }
  
    // render block box shadow control component
    const boxShadowControls = document.getElementsByClassName("customize-box-shadow-control");
    for (let boxShadowControl of boxShadowControls) {
      const setting = boxShadowControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (boxShadowControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_boxShadowComponent__WEBPACK_IMPORTED_MODULE_6__.NewsmaticBoxShadow, {
          value: settingValue,
          setting: setting
        }), boxShadowControl);
      }
    }
  
    // render color group color an hover color picker control component
    const colorGroupPickerControls = document.getElementsByClassName("customize-color-group-picker-control");
    for (let colorGroupPickerControl of colorGroupPickerControls) {
      const setting = colorGroupPickerControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (colorGroupPickerControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticColorGroupPicker, {
          value: settingValue,
          setting: setting
        }), colorGroupPickerControl);
      }
    }
  
    // render section tab control component
    const sectionTabControls = document.getElementsByClassName("customize-section-tab-control");
    for (let sectionTabControl of sectionTabControls) {
      const setting = sectionTabControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (sectionTabControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticSectionTab, {
          value: settingValue,
          setting: setting
        }), sectionTabControl);
      }
    }
  
    // render icon-text control component
    const iconTextControls = document.getElementsByClassName("customize-icon-text-control");
    for (let iconTextControl of iconTextControls) {
      const setting = iconTextControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (iconTextControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticIconText, {
          value: settingValue,
          setting: setting
        }), iconTextControl);
      }
    }
  
    // render border control component
    const borderControls = document.getElementsByClassName("customize-border-control");
    for (let borderControl of borderControls) {
      const setting = borderControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (borderControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_borderComponent__WEBPACK_IMPORTED_MODULE_3__.NewsmaticBorder, {
          value: settingValue,
          setting: setting
        }), borderControl);
      }
    }
  
    // render upsell control
    const upsellControls = document.getElementsByClassName("customize-upsell-control");
    for (let upsellControl of upsellControls) {
      const setting = upsellControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (upsellControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticUpsellWithPreview, {
          value: settingValue,
          setting: setting
        }), upsellControl);
      }
    }
  
    // render info box control
    const infoBoxControls = document.getElementsByClassName("customize-info-box-control");
    for (let infoBoxControl of infoBoxControls) {
      const setting = infoBoxControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (infoBoxControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticInfoBox, {
          value: settingValue,
          setting: setting
        }), infoBoxControl);
      }
    }
  
    // render info box control
    const infoBoxActionControls = document.getElementsByClassName("customize-info-box-action-control");
    for (let infoBoxActionControl of infoBoxActionControls) {
      const setting = infoBoxActionControl.getAttribute('data-setting');
      const settingValue = customize.settings.settings[setting].value;
      if (infoBoxActionControl) {
        render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NewsmaticInfoBoxAction, {
          value: settingValue,
          setting: setting
        }), infoBoxActionControl);
      }
    }
  
    ///  Handle the user interface 
    const sectionsArray = ['newsmatic_full_width_section', 'newsmatic_leftc_rights_section', 'newsmatic_lefts_rightc_section', 'newsmatic_bottom_full_width_section'];
    sectionsArray.forEach(function (section) {
      customize.section(section).expanded.bind(function (isExpanded) {
        if (isExpanded) {
          wp.customize.control('homepage_content_order').section(section);
          wp.customize.control('newsmatic_request_layouts_up').section(section);
        } else {
          wp.customize.control('homepage_content_order').section('newsmatic_front_sections_reorder_section');
          wp.customize.control('newsmatic_request_layouts_up').section('newsmatic_front_sections_reorder_section');
        }
      });
    });
  
    // on main banner section expanded
    customize.section('newsmatic_main_banner_section').expanded.bind(function (isExpanded) {
      if (isExpanded) {
        wp.customize.control('newsmatic_request_layouts_up').section('newsmatic_main_banner_section');
      } else {
        wp.customize.control('newsmatic_request_layouts_up').section('newsmatic_front_sections_reorder_section');
      }
    });
  
    // on blog/archive section expanded
    customize.section('newsmatic_blog_archive_section').expanded.bind(function (isExpanded) {
      if (isExpanded) {
        wp.customize.control('newsmatic_request_layouts_up').section('newsmatic_blog_archive_section');
      } else {
        wp.customize.control('newsmatic_request_layouts_up').section('newsmatic_front_sections_reorder_section');
      }
    });
  });
  }();
  /******/ })()
  ;
  //# sourceMappingURL=index.js.map