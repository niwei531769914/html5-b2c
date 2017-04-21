requirejs.config({
    shim: {
        'zepto': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'underscore.string': {
            deps: ['underscore'],
            exports: '_.str'
        },
        'zepto.cookie': {
            deps: ['zepto']
        },
        'store': {
            exports: 'store'
        }
    },

    paths: {
        'zepto': 'scripts/vendor/zepto',
        'can': 'scripts/vendor/can.zepto',
        'store': 'bower_components/store/store',
        'underscore': 'bower_components/underscore/underscore',
        'md5': 'bower_components/blueimp-md5/js/md5.min',
        'underscore.string': 'bower_components/underscore.string/dist/underscore.string',
        "moment": "bower_components/momentjs/min/moment.min",
        'fastclick': 'bower_components/fastclick/lib/fastclick',
        "text": "../bower_components/text/text",
        'zepto.cookie': 'scripts/vendor/zepto.cookie',
        "jweixin": "scripts/vendor/jweixin-1.0.0",

        'lehu.h5.business.config': 'scripts/lehu.h5.business.config',
        'lehu.h5.framework.comm': 'scripts/framework/lehu.h5.framework.comm',
        'lehu.h5.framework.global': 'scripts/framework/lehu.h5.framework.global',
        'lehu.h5.api': 'scripts/api/lehu.h5.api',

        "lehu.hybrid": "scripts/util/lehu.hybrid",
        "lehu.bridge": "scripts/util/lehu.bridge",
        "lehu.helpers": "scripts/util/lehu.helpers",
        "lehu.util": "scripts/util/lehu.util.fn",
        "lehu.env.switcher": "scripts/util/lehu.env.switcher",

        "lehu.h5.widget.message": "scripts/widget/lehu.h5.widget.message",
        "template_widget_message": "templates/widget/lehu.h5.widget.message.mustache"
    }
})