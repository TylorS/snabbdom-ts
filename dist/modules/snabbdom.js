(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('index', ['exports'], factory) :
    (factory((global.index = global.index || {})));
}(this, (function (exports) { 'use strict';

var booleanAttrs = [
    'allowfullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'compact', 'controls', 'declare',
    'default', 'defaultchecked', 'defaultmuted', 'defaultselected', 'defer', 'disabled', 'draggable',
    'enabled', 'formnovalidate', 'hidden', 'indeterminate', 'inert', 'ismap', 'itemscope', 'loop', 'multiple',
    'muted', 'nohref', 'noresize', 'noshade', 'novalidate', 'nowrap', 'open', 'pauseonexit', 'readonly',
    'required', 'reversed', 'scoped', 'seamless', 'selected', 'sortable', 'spellcheck', 'translate',
    'truespeed', 'typemustmatch', 'visible'
];
var booleanAttrsDict = {};
for (var i = 0, len = booleanAttrs.length; i < len; i++) {
    booleanAttrsDict[booleanAttrs[i]] = true;
}
function updateAttrs(oldVnode, vnode) {
    var key;
    var cur;
    var old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data && oldVnode.data.attrs || {};
    var attrs = vnode.data && vnode.data.attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        cur = attrs[key];
        old = oldAttrs[key];
        if (old !== cur) {
            // TODO: add support to namespaced attributes (setAttributeNS)
            if (!cur && booleanAttrsDict[key]) {
                elm.removeAttribute(key);
            }
            else {
                elm.setAttribute(key, cur);
            }
        }
    }
    //remove removed attributes
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
var AttrsModule = {
    update: updateAttrs,
    create: updateAttrs,
};

function updateClass(oldVnode, vnode) {
    var cur;
    var name;
    var elm = vnode.elm;
    var oldClass = oldVnode.data && oldVnode.data.class || {};
    var klass = vnode.data && vnode.data.class || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            if (cur) {
                elm.classList.add(name);
            }
            else {
                elm.classList.remove(name);
            }
        }
    }
}
var ClassModule = {
    create: updateClass,
    update: updateClass
};

function updateDataset(oldVnode, vnode) {
    var elm = vnode.elm;
    var oldDataset = oldVnode.data && oldVnode.data.dataset || {};
    var dataset = vnode.data && vnode.data.dataset || {};
    var key;
    for (key in oldDataset) {
        if (!dataset[key]) {
            delete elm.dataset[key];
        }
    }
    for (key in dataset) {
        if (oldDataset[key] !== dataset[key]) {
            elm.dataset[key] = dataset[key];
        }
    }
}
var DatasetModule = {
    create: updateDataset,
    update: updateDataset,
};

var is = {
    array: Array.isArray,
    primitive: function (x) {
        return typeof x === 'string' || typeof x === 'number';
    }
};

function arrInvoker(arr) {
    return function () {
        if (!arr.length)
            return;
        // Special case when length is two, for performance
        arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
    };
}
function fnInvoker(o) {
    return function (ev) {
        if (o.fn === null)
            return;
        o.fn(ev);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var name;
    var cur;
    var old;
    var elm = vnode.elm;
    var oldOn = oldVnode.data && oldVnode.data.on;
    var on = vnode.data && vnode.data.on;
    if (!on && !oldOn)
        return;
    on = on || {};
    oldOn = oldOn || {};
    for (name in on) {
        cur = on[name];
        old = oldOn[name];
        if (old === undefined) {
            if (is.array(cur)) {
                elm.addEventListener(name, arrInvoker(cur));
            }
            else {
                cur = { fn: cur };
                on[name] = cur;
                elm.addEventListener(name, fnInvoker(cur));
            }
        }
        else if (is.array(old)) {
            // Deliberately modify old array since it's captured in closure created with `arrInvoker`
            old.length = cur.length;
            for (var i = 0; i < old.length; ++i)
                old[i] = cur[i];
            on[name] = old;
        }
        else {
            old.fn = cur;
            on[name] = old;
        }
    }
    if (oldOn) {
        for (name in oldOn) {
            if (on[name] === undefined) {
                old = oldOn[name];
                if (is.array(old)) {
                    old.length = 0;
                }
                else {
                    old.fn = null;
                }
            }
        }
    }
}
var EventListenerModule = {
    create: updateEventListeners,
    update: updateEventListeners
};

var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function getTextNodeRect(textNode) {
    var rect = null;
    if (document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(textNode);
        if (range.getBoundingClientRect) {
            rect = range.getBoundingClientRect();
        }
    }
    return rect;
}
function calcTransformOrigin(isTextNode, textRect, boundingRect) {
    if (isTextNode) {
        if (textRect) {
            //calculate pixels to center of text from left edge of bounding box
            var relativeCenterX = textRect.left + textRect.width / 2 - boundingRect.left;
            var relativeCenterY = textRect.top + textRect.height / 2 - boundingRect.top;
            return relativeCenterX + 'px ' + relativeCenterY + 'px';
        }
    }
    return '0 0'; //top left
}
function getTextDx(oldTextRect, newTextRect) {
    if (oldTextRect && newTextRect) {
        return ((oldTextRect.left + oldTextRect.width / 2) - (newTextRect.left + newTextRect.width / 2));
    }
    return 0;
}
function getTextDy(oldTextRect, newTextRect) {
    if (oldTextRect && newTextRect) {
        return ((oldTextRect.top + oldTextRect.height / 2) - (newTextRect.top + newTextRect.height / 2));
    }
    return 0;
}
function isTextElement(elm) {
    return elm.childNodes.length === 1 && elm.childNodes[0].nodeType === 3;
}
var removed;
var created;
function pre() {
    removed = {};
    created = [];
}
function create(_, vnode) {
    var hero = vnode.data && vnode.data.hero;
    if (hero && hero.id) {
        created.push(hero.id);
        created.push(vnode);
    }
}
function destroy(vnode) {
    var hero = vnode.data && vnode.data.hero;
    if (hero && hero.id) {
        var elm = vnode.elm;
        vnode.isTextNode = isTextElement(elm); //is this a text node?
        vnode.boundingRect = elm.getBoundingClientRect(); //save the bounding rectangle to a new property on the vnode
        vnode.textRect = vnode.isTextNode ? getTextNodeRect(elm.childNodes[0]) : null; //save bounding rect of inner text node
        var computedStyle = window.getComputedStyle(elm); //get current styles (includes inherited properties)
        vnode.savedStyle = JSON.parse(JSON.stringify(computedStyle)); //save a copy of computed style values
        removed[hero.id] = vnode;
    }
}
function post() {
    var i;
    var id;
    var newElm;
    var oldVnode;
    var oldElm;
    var hRatio;
    var wRatio;
    var oldRect;
    var newRect;
    var dx;
    var dy;
    var origTransform;
    var origTransition;
    var newStyle;
    var oldStyle;
    var newComputedStyle;
    var isTextNode;
    var newTextRect;
    var oldTextRect;
    for (i = 0; i < created.length; i += 2) {
        id = created[i];
        newElm = created[i + 1].elm;
        oldVnode = removed[id];
        if (oldVnode) {
            isTextNode = oldVnode.isTextNode && isTextElement(newElm); //Are old & new both text?
            newStyle = newElm.style;
            newComputedStyle = window.getComputedStyle(newElm); //get full computed style for new element
            oldElm = oldVnode.elm;
            oldStyle = oldElm.style;
            //Overall element bounding boxes
            newRect = newElm.getBoundingClientRect();
            oldRect = oldVnode.boundingRect; //previously saved bounding rect
            //Text node bounding boxes & distances
            if (isTextNode) {
                newTextRect = getTextNodeRect(newElm.childNodes[0]);
                oldTextRect = oldVnode.textRect;
                dx = getTextDx(oldTextRect, newTextRect);
                dy = getTextDy(oldTextRect, newTextRect);
            }
            else {
                //Calculate distances between old & new positions
                dx = oldRect.left - newRect.left;
                dy = oldRect.top - newRect.top;
            }
            hRatio = newRect.height / (Math.max(oldRect.height, 1));
            wRatio = isTextNode ? hRatio : newRect.width / (Math.max(oldRect.width, 1)); //text scales based on hRatio
            // Animate new element
            origTransform = newStyle.transform;
            origTransition = newStyle.transition;
            if (newComputedStyle.display === 'inline')
                newStyle.display = 'inline-block'; //this does not appear to have any negative side effects
            newStyle.transition = origTransition + 'transform 0s';
            newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
            newStyle.opacity = '0';
            newStyle.transform = origTransform + 'translate(' + dx + 'px, ' + dy + 'px) ' +
                'scale(' + 1 / wRatio + ', ' + 1 / hRatio + ')';
            setNextFrame(newStyle, 'transition', origTransition);
            setNextFrame(newStyle, 'transform', origTransform);
            setNextFrame(newStyle, 'opacity', '1');
            // Animate old element
            for (var key in oldVnode.savedStyle) {
                if (typeof key === 'number' && parseInt(key) !== key) {
                    var ms = key.substring(0, 2) === 'ms';
                    var moz = key.substring(0, 3) === 'moz';
                    var webkit = key.substring(0, 6) === 'webkit';
                    if (!ms && !moz && !webkit)
                        oldStyle[key] = oldVnode.savedStyle[key];
                }
            }
            oldStyle.position = 'absolute';
            oldStyle.top = oldRect.top + 'px'; //start at existing position
            oldStyle.left = oldRect.left + 'px';
            oldStyle.width = oldRect.width + 'px'; //Needed for elements who were sized relative to their parents
            oldStyle.height = oldRect.height + 'px'; //Needed for elements who were sized relative to their parents
            oldStyle.margin = 0; //Margin on hero element leads to incorrect positioning
            oldStyle.transformOrigin = calcTransformOrigin(isTextNode, oldTextRect, oldRect);
            oldStyle.transform = '';
            oldStyle.opacity = '1';
            document.body.appendChild(oldElm);
            // scale must be on far right for translate to be correct
            setNextFrame(oldStyle, 'transform', 'translate(' + -dx + 'px, ' + -dy + 'px) scale(' + wRatio + ', ' + hRatio + ')');
            setNextFrame(oldStyle, 'opacity', '0');
            oldElm.addEventListener('transitionend', function (ev) {
                if (ev.propertyName === 'transform')
                    document.body.removeChild(ev.target);
            });
        }
    }
    removed = {};
    created = [];
}
var HeroModule = {
    pre: pre,
    create: create,
    destroy: destroy,
    post: post
};

function updateProps(oldVnode, vnode) {
    if (!oldVnode.data && !vnode.data)
        return;
    var key;
    var cur;
    var old;
    var elm = vnode.elm;
    var oldProps = oldVnode.data && oldVnode.data.props || {};
    var props = vnode.data && vnode.data.props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
var PropsModule = {
    create: updateProps,
    update: updateProps
};

var raf$1 = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame$1 = function nextFrame(fn) { raf$1(function () { raf$1(fn); }); };
function setNextFrame$1(obj, prop, val) {
    nextFrame$1(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    if (!vnode.data && !oldVnode.data)
        return;
    var cur;
    var name;
    var elm = vnode.elm;
    var oldStyle = oldVnode.data && oldVnode.data.style || {};
    var style = vnode.data && vnode.data.style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            elm.style[name] = '';
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed') {
            for (name in style.delayed) {
                cur = style.delayed[name];
                if (!oldHasDel || cur !== oldStyle.delayed[name]) {
                    setNextFrame$1(elm.style, name, cur);
                }
            }
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            elm.style[name] = cur;
        }
    }
}
function applyDestroyStyle(vnode) {
    var style;
    var name;
    var elm = vnode.elm;
    var s = vnode.data && vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode && vnode.data && vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    var name;
    var elm = vnode.elm;
    if (!elm)
        return;
    var i = 0;
    var compStyle;
    var style = s.remove;
    var amount = 0;
    var applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
var StyleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};

exports.AttrsModule = AttrsModule;
exports.ClassModule = ClassModule;
exports.DatasetModule = DatasetModule;
exports.EventListenerModule = EventListenerModule;
exports.HeroModule = HeroModule;
exports.PropsModule = PropsModule;
exports.StyleModule = StyleModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=snabbdom.js.map
