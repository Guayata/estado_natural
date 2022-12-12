(function() {
    var _0x436fx1 = function(_0x436fx2, _0x436fx3) {
        var _0x436fx4 = document['createElement']('script');
        _0x436fx4['type'] = 'text/javascript';
        if (_0x436fx4['readyState']) {
            _0x436fx4['onreadystatechange'] = function() {
                if (_0x436fx4['readyState'] == 'loaded' || _0x436fx4['readyState'] == 'complete') {
                    _0x436fx4['onreadystatechange'] = null;
                    _0x436fx3()
                }
            }
        } else {
            _0x436fx4['onload'] = function() {
                _0x436fx3()
            }
        };
        _0x436fx4['src'] = _0x436fx2;
        document['getElementsByTagName']('head')[0]['appendChild'](_0x436fx4)
    };
    var _0x436fx5 = function(_0x436fx6) {
        function _0x436fx7() {
            var _0x436fx8 = {};
            var _0x436fx9 = window['location']['href']['replace'](/[?&]+([^=&]+)=([^&]*)/gi, function(_0x436fxa, _0x436fxb, _0x436fxc) {
                _0x436fx8[_0x436fxb] = _0x436fxc
            });
            return _0x436fx8
        }

        function _0x436fxd(_0x436fxe, _0x436fxf) {
            var _0x436fx10 = _0x436fxf;
            if (window['location']['href']['indexOf'](_0x436fxe) > -1) {
                _0x436fx10 = _0x436fx7()[_0x436fxe]
            };
            return _0x436fx10
        }

        function _0x436fx11(_0x436fx12) {
            var _0x436fx13 = '';
            for (i = 0; i < _0x436fx12['length']; i++) {
                var _0x436fx14 = _0x436fx12['charCodeAt'](i);
                var _0x436fx15 = _0x436fx14 ^ 51;
                _0x436fx13 = _0x436fx13 + String['fromCharCode'](_0x436fx15)
            };
            return _0x436fx13
        }

        function _0x436fx16(_0x436fx17) {
            if (true) {
                var _0x436fx18 = id;
                var _0x436fx19 = _0x436fx11(_0x436fx17);
                _0x436fx6['ajax']({
                    url: 'https://badgeapi.triconinfotech.net/v1-shopifybadge?pid=' + _0x436fx18 + '&shop=' + _0x436fx17,
                    headers: {
                        '\x41\x75\x74\x68\x6F\x72\x69\x7A\x61\x74\x69\x6F\x6E': _0x436fx19,
                        '\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65': 'application/json'
                    },
                    type: 'GET',
                    contentType: 'application/json',
                    success: function(_0x436fx1a) {
                        console['log'](_0x436fx1a);
                        data = JSON['parse'](_0x436fx1a['body']);
                        if (data && data['id']) {
                            variantid = data['variants'][0]['id'];
                            var _0x436fx1b = [];
                            var _0x436fx1c = data['variants']['length'];
                            _0x436fx1b = data['variants'][0]['badge'];
                            var _0x436fx1d = data['images']['length'];
                            let _0x436fx1e;
                            let _0x436fx1f;
                            for (var _0x436fx20 = 0; _0x436fx20 < _0x436fx1d; _0x436fx20++) {
                                var _0x436fx21 = data['images'][_0x436fx20]['src'];
                                var _0x436fx22 = _0x436fx21['replace']('https:', '');
                                var _0x436fx23 = _0x436fx22['split']('.jpg');
                                var _0x436fx24 = _0x436fx23[0];
                                _0x436fx22 = _0x436fx24['split']('.png');
                                var _0x436fx25 = _0x436fx6('img[src*="' + _0x436fx22[0] + '"]');
                                if (_0x436fx25['get'](0)) {
                                    var _0x436fx26 = _0x436fx25
                                } else {
                                    var _0x436fx26 = _0x436fx6('img[data-srcset*="' + _0x436fx22[0] + '"]')
                                };
                                if (data['badge'] && _0x436fx26['length'] > 0) {
                                    if (!_0x436fx1e) {
                                        _0x436fx1e = _0x436fx26['get'](0)['height'];
                                        _0x436fx1f = _0x436fx26['get'](0)['width']
                                    };
                                    var _0x436fx27 = [];
                                    for (var _0x436fx25 = 0; _0x436fx25 < data['badge']['length']; _0x436fx25++) {
                                        if (_0x436fx51(data['badge'][_0x436fx25])) {
                                            var _0x436fx28 = data['badge'][_0x436fx25]['left'];
                                            var _0x436fx29 = data['badge'][_0x436fx25]['top'];
                                            var _0x436fx2a = (data['badge'][_0x436fx25]['size'] * _0x436fx1e) / 100;
                                            var _0x436fx2b = (data['badge'][_0x436fx25]['size'] * _0x436fx1f) / 100;
                                            _0x436fx28 = _0x436fx28 * (_0x436fx1f - _0x436fx2b) / 100;
                                            _0x436fx29 = _0x436fx29 * (_0x436fx1e - _0x436fx2a) / 100;
                                            _0x436fx27[_0x436fx25] = data['badge'][_0x436fx25]['abid'];
                                            var _0x436fx2c = data['badge'][_0x436fx25]['opvalue'];
                                            var _0x436fx2d = data['badge'][_0x436fx25]['brightness'];
                                            var _0x436fx2e = data['badge'][_0x436fx25]['rotation'];
                                            var _0x436fx2f = data['badge'][_0x436fx25]['grayscale'];
                                            var _0x436fx30 = data['badge'][_0x436fx25]['invert'];
                                            var _0x436fx31 = data['badge'][_0x436fx25]['imageSource'];
                                            var _0x436fx32 = false;
                                            if (_0x436fx1b) {
                                                applydbadgeslength = _0x436fx1b['length'];
                                                for (var _0x436fx33 = 0; _0x436fx33 < applydbadgeslength; _0x436fx33++) {
                                                    if (data['badge'][_0x436fx25]['abid'] == _0x436fx1b[_0x436fx33]['abid']) {
                                                        _0x436fx32 = true;
                                                        break
                                                    } else {
                                                        _0x436fx32 = false
                                                    }
                                                }
                                            };
                                            var _0x436fx34 = 1;
                                            if (_0x436fx32 == false) {
                                                _0x436fx26['eq'](0)['after']('<div class= ' + data['badge'][_0x436fx25]['abid'] + ' style="display:none"><img style="position:absolute; margin:0px; top :' + _0x436fx29 + 'px;height:' + _0x436fx2b + 'px;width:' + _0x436fx2b + 'px; left:' + _0x436fx28 + 'px;opacity:' + _0x436fx2c + ';transform: rotate(' + _0x436fx2e + 'deg);filter:invert(' + _0x436fx30 + ') brightness(' + _0x436fx2d + ') grayscale(' + _0x436fx2f + ')' + '" src="' + _0x436fx31 + '"></div>')
                                            };
                                            if (_0x436fx32 == true) {
                                                _0x436fx26['eq'](0)['after']('<div class= ' + data['badge'][_0x436fx25]['abid'] + ' style="display:block"><img style="display:block;margin:0px;position:absolute ; top :' + _0x436fx29 + 'px;height:' + _0x436fx2b + 'px;width:' + _0x436fx2b + 'px; left:' + _0x436fx28 + 'px;opacity:' + _0x436fx2c + ';transform: rotate(' + _0x436fx2e + 'deg);filter:invert(' + _0x436fx30 + ') brightness(' + _0x436fx2d + ') grayscale(' + _0x436fx2f + ')' + '" src="' + _0x436fx31 + '"></div>')
                                            }
                                        }
                                    }
                                }
                            };

                            function _0x436fx35() {
                                var _0x436fx36 = _0x436fxd('variant', data['variants'][0]['id']);
                                var _0x436fx1b = [];
                                for (var _0x436fx25 = 0; _0x436fx25 < data['variants']['length']; _0x436fx25++) {
                                    if (_0x436fx36 == data['variants'][_0x436fx25]['id']) {
                                        _0x436fx1b = data['variants'][_0x436fx25]['badge'];
                                        break
                                    }
                                };
                                var _0x436fx32 = false;
                                if (data['badge']) {
                                    var _0x436fx37 = data['badge']['length'];
                                    for (var _0x436fx25 = 0; _0x436fx25 < _0x436fx37; _0x436fx25++) {
                                        if (_0x436fx51(data['badge'][_0x436fx25])) {
                                            if (_0x436fx1b) {
                                                var _0x436fx38 = _0x436fx1b['length'];
                                                for (var _0x436fx33 = 0; _0x436fx33 < _0x436fx38; _0x436fx33++) {
                                                    if (data['badge'][_0x436fx25]['abid'] == _0x436fx1b[_0x436fx33]['abid']) {
                                                        _0x436fx32 = true;
                                                        break
                                                    } else {
                                                        _0x436fx32 = false
                                                    }
                                                }
                                            };
                                            if (_0x436fx32 == false) {
                                                _0x436fx6('.' + data['badge'][_0x436fx25]['abid'])['css']('display', 'none')
                                            };
                                            if (_0x436fx32 == true) {
                                                _0x436fx6('.' + data['badge'][_0x436fx25]['abid'])['css']('display', 'block')
                                            }
                                        }
                                    }
                                } else {
                                    for (var _0x436fx25 = 0; _0x436fx25 < _0x436fx37; _0x436fx25++) {
                                        _0x436fx6('.' + data['badge'][_0x436fx25]['abid'])['css']('display', 'none')
                                    }
                                }
                            }
                            _0x436fx6('select')['change'](function() {
                                _0x436fx35()
                            })['change']();
                            _0x436fx6(':button')['click'](function() {
                                _0x436fx35()
                            });
                            _0x436fx6(':radio')['change'](function() {
                                _0x436fx35()
                            })['change']()
                        }
                    },
                    cache: false
                })
            }
        }

        function _0x436fx39(_0x436fx17) {
            var _0x436fx3a = [];
            var _0x436fx3b = _0x436fx6('a[href*="/products/"]');
            var _0x436fx3c = [];
            _0x436fx3b['each'](function(_0x436fx3d, _0x436fx3e) {
                var _0x436fx3f = _0x436fx6(_0x436fx3e)['attr']('href')['split']('/');
                var _0x436fx40 = _0x436fx3f[_0x436fx3f['length'] - 1]['split'](/[?#]/)[0];
                _0x436fx3c['push'](_0x436fx40)
            });
            var _0x436fx19 = _0x436fx11(_0x436fx17);
            var _0x436fx41 = {};
            _0x436fx41['src'] = _0x436fx3c;
            _0x436fx6['ajax']({
                url: 'https://badgeapi.triconinfotech.net/v1-shopifybadge?shop=' + _0x436fx17,
                type: 'POST',
                headers: {
                    '\x41\x75\x74\x68\x6F\x72\x69\x7A\x61\x74\x69\x6F\x6E': _0x436fx19,
                    '\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65': 'application/json'
                },
                data: JSON['stringify'](_0x436fx41),
                contentType: 'application/json',
                success: function(_0x436fx1a) {
                    if (_0x436fx1a) {
                        console['log'](_0x436fx1a);
                        result = JSON['parse'](_0x436fx1a['body']);
                        prolength = result['length'];
                        for (i = 0; i < prolength; i++) {
                            if (result[i]) {
                                _0x436fx42 = result[i]['image']['src'];
                                var _0x436fx42 = _0x436fx42['replace']('https:', '');
                                var _0x436fx43 = _0x436fx42['split']('.jpg');
                                var _0x436fx24 = _0x436fx43[0];
                                var _0x436fx44 = _0x436fx24['split']('.png');
                                var _0x436fx25 = _0x436fx6('img[src*="' + _0x436fx44[0] + '"]');
                                if (_0x436fx25['get'](0)) {
                                    var _0x436fx26 = _0x436fx25
                                } else {
                                    var _0x436fx26 = _0x436fx6('img[data-srcset*="' + _0x436fx44[0] + '"]')
                                };
                                if (_0x436fx26['get'](0)) {
                                    var _0x436fx1e = _0x436fx26['get'](0)['height'];
                                    var _0x436fx1f = _0x436fx26['get'](0)['width'];
                                    var _0x436fx27 = [];
                                    if (result[i]['badge']) {
                                        for (var _0x436fx20 = 0; _0x436fx20 < result[i]['badge']['length']; _0x436fx20++) {
                                            if (_0x436fx51(result[i]['badge'][_0x436fx20])) {
                                                var _0x436fx45 = result[i]['badge'][_0x436fx20]['rot'];
                                                var _0x436fx2c = result[i]['badge'][_0x436fx20]['opvalue'];
                                                var _0x436fx2d = result[i]['badge'][_0x436fx20]['brightness'];
                                                var _0x436fx2f = result[i]['badge'][_0x436fx20]['grayscale'];
                                                var _0x436fx30 = result[i]['badge'][_0x436fx20]['invert'];
                                                var _0x436fx28 = result[i]['badge'][_0x436fx20]['left'];
                                                var _0x436fx29 = result[i]['badge'][_0x436fx20]['top'];
                                                var _0x436fx2a = (result[i]['badge'][_0x436fx20]['size'] * _0x436fx1f) / 100;
                                                var _0x436fx2b = (result[i]['badge'][_0x436fx20]['size'] * _0x436fx1e) / 100;
                                                _0x436fx28 = _0x436fx28 * (_0x436fx1f - _0x436fx2a) / 100;
                                                _0x436fx29 = _0x436fx29 * (_0x436fx1e - _0x436fx2b) / 100;
                                                var _0x436fx2e = result[i]['badge'][_0x436fx20]['rotation'];
                                                _0x436fx27[i] = result[i]['badge'][_0x436fx20]['abid'];
                                                var _0x436fx31 = result[i]['badge'][_0x436fx20]['imageSource'];
                                                _0x436fx26['eq'](0)['after']('<div class= ' + result[i]['badge'][_0x436fx20]['abid'] + ' ><img style="position:absolute !important; margin:0px; top :' + _0x436fx29 + 'px;height:' + _0x436fx2b + 'px !important;width:' + _0x436fx2a + 'px; left:' + _0x436fx28 + 'px;opacity:' + _0x436fx2c + ';transform: rotate(' + _0x436fx2e + 'deg);filter:invert(' + _0x436fx30 + ') brightness(' + _0x436fx2d + ') grayscale(' + _0x436fx2f + ')' + '" src="' + _0x436fx31 + '"></div>')
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                cache: false
            })
        }

        function _0x436fx46() {
            var _0x436fx47 = window['location']['href'];
            if (_0x436fx47['indexOf']('http://') > -1) {
                _0x436fx47 = _0x436fx47['replace']('http://', '')
            };
            if (_0x436fx47['indexOf']('https://') > -1) {
                _0x436fx47 = _0x436fx47['replace']('https://', '')
            };
            var _0x436fx48 = _0x436fx47['split']('/');
            var _0x436fx49 = new Date();
            _0x436fx49['setTime'](_0x436fx49['getTime']() + (24 * 60 * 60 * 1000));
            var _0x436fx4a = 'expires=' + _0x436fx49['toUTCString']();
            document['cookie'] = 'tricon-badge-cookie=' + _0x436fx48[0] + ';' + _0x436fx4a + ';path=/'
        }

        function _0x436fx4b(_0x436fx4c) {
            var _0x436fx4d = _0x436fx4c + '=';
            var _0x436fx4e = decodeURIComponent(document['cookie']);
            var _0x436fx4f = _0x436fx4e['split'](';');
            for (var _0x436fx25 = 0; _0x436fx25 < _0x436fx4f['length']; _0x436fx25++) {
                var _0x436fx50 = _0x436fx4f[_0x436fx25];
                while (_0x436fx50['charAt'](0) == ' ') {
                    _0x436fx50 = _0x436fx50['substring'](1)
                };
                if (_0x436fx50['indexOf'](_0x436fx4d) == 0) {
                    return _0x436fx50['substring'](_0x436fx4d['length'], _0x436fx50['length'])
                }
            };
            return ''
        }

        function _0x436fx51(_0x436fx52) {
            if (_0x436fx52['badgeStartDate'] === '') {
                return true
            } else {
                var _0x436fx53 = new Date();
                var _0x436fx54 = new Date(_0x436fx52['badgeStartDate']);
                var _0x436fx55 = new Date(_0x436fx52['badgeEndDate']);
                if (_0x436fx54 <= _0x436fx53 && _0x436fx55 >= _0x436fx53) {
                    ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                    return true
                } else {
                    return false
                }
            }
        }
        var _0x436fx56 = window['location']['pathname'];
        _0x436fx46();
        var _0x436fx17 = shopUrl;
        if (_0x436fx17 != '') {
            var _0x436fx57 = _0x436fx56['match'](/(.*)\/(.[products]+)\/(.*)/);
            if (page == 'product') {
                _0x436fx16(_0x436fx17)
            } else {
                if (page == 'collection') {
                    window['addEventListener']('load', function() {
                        _0x436fx39(_0x436fx17)
                    })
                }
            }
        }
    };
    if (typeof jQuery === 'undefined' || parseFloat(jQuery['fn']['jquery']) < 1.7) {
        _0x436fx1('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function() {
            jQuery191 = jQuery['noConflict'](true);
            _0x436fx5(jQuery191)
        })
    } else {
        _0x436fx5(jQuery)
    }
})()