import { h } from './h';
function hh(tagName) {
    return function helper(selector, data, children) {
        return isSelector(selector)
            ? h(tagName + selector, data, children)
            : h(tagName, selector, data);
    };
}
function isValidString(param) {
    return typeof param === 'string' && param.length > 0;
}
function isSelector(param) {
    return isValidString(param) && (param[0] === '.' || param[0] === '#');
}
export var a = hh('a');
export var abbr = hh('abbr');
export var acronym = hh('acronym');
export var address = hh('address');
export var applet = hh('applet');
export var area = hh('area');
export var article = hh('article');
export var aside = hh('aside');
export var audio = hh('audio');
export var b = hh('b');
export var base = hh('base');
export var basefont = hh('basefont');
export var bdi = hh('bdi');
export var bdo = hh('bdo');
export var bgsound = hh('bgsound');
export var big = hh('big');
export var blink = hh('blink');
export var blockquote = hh('blockquote');
export var body = hh('body');
export var br = hh('br');
export var button = hh('button');
export var canvas = hh('canvas');
export var caption = hh('caption');
export var center = hh('center');
export var cite = hh('cite');
export var code = hh('code');
export var col = hh('col');
export var colgroup = hh('colgroup');
export var command = hh('command');
export var content = hh('content');
export var data = hh('data');
export var datalist = hh('datalist');
export var dd = hh('dd');
export var del = hh('del');
export var details = hh('details');
export var dfn = hh('dfn');
export var dialog = hh('dialog');
export var dir = hh('dir');
export var div = hh('div');
export var dl = hh('dl');
export var dt = hh('dt');
export var element = hh('element');
export var em = hh('em');
export var embed = hh('embed');
export var fieldset = hh('fieldset');
export var figcaption = hh('figcaption');
export var figure = hh('figure');
export var font = hh('font');
export var footer = hh('footer');
export var form = hh('form');
export var frame = hh('frame');
export var frameset = hh('frameset');
export var h1 = hh('h1');
export var h2 = hh('h2');
export var h3 = hh('h3');
export var h4 = hh('h4');
export var h5 = hh('h5');
export var h6 = hh('h6');
export var head = hh('head');
export var header = hh('header');
export var hgroup = hh('hgroup');
export var hr = hh('hr');
export var html = hh('html');
export var ins = hh('ins');
export var isindex = hh('isindex');
export var kbd = hh('kbd');
export var keygen = hh('keygen');
export var label = hh('label');
export var legend = hh('legend');
export var li = hh('li');
export var link = hh('link');
export var listing = hh('listing');
export var main = hh('main');
export var map = hh('map');
export var mark = hh('mark');
export var marquee = hh('marquee');
export var math = hh('math');
export var menu = hh('menu');
export var menuitem = hh('menuitem');
export var meta = hh('meta');
export var meter = hh('meter');
export var multicol = hh('multicol');
export var nav = hh('nav');
export var nextid = hh('nextid');
export var nobr = hh('nobr');
export var noembed = hh('noembed');
export var noframes = hh('noframes');
export var noscript = hh('noscript');
export var object = hh('object');
export var ol = hh('ol');
export var optgroup = hh('optgroup');
export var option = hh('option');
export var output = hh('output');
export var p = hh('p');
export var param = hh('param');
export var picture = hh('picture');
export var plaintext = hh('plaintext');
export var pre = hh('pre');
export var progress = hh('progress');
export var q = hh('q');
export var rb = hh('rb');
export var rbc = hh('rbc');
export var rp = hh('rp');
export var rt = hh('rt');
export var rtc = hh('rtc');
export var ruby = hh('ruby');
export var s = hh('s');
export var samp = hh('samp');
export var script = hh('script');
export var section = hh('section');
export var select = hh('select');
export var shadow = hh('shadow');
export var small = hh('small');
export var source = hh('source');
export var spacer = hh('spacer');
export var span = hh('span');
export var strike = hh('strike');
export var strong = hh('strong');
export var style = hh('style');
export var sub = hh('sub');
export var summary = hh('summary');
export var sup = hh('sup');
export var table = hh('table');
export var tbody = hh('tbody');
export var td = hh('td');
export var template = hh('template');
export var textarea = hh('textarea');
export var tfoot = hh('tfoot');
export var th = hh('th');
export var tr = hh('tr');
export var track = hh('track');
export var tt = hh('tt');
export var u = hh('u');
export var ul = hh('ul');
export var video = hh('video');
export var wbr = hh('wbr');
export var xmp = hh('xmp');
//# sourceMappingURL=hyperscript.js.map