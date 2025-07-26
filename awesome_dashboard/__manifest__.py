# -*- coding: utf-8 -*-
{
	'name': "Awesome Dashboard",

	'summary': """
        Starting module for "Discover the JS framework, chapter 2: Build a dashboard"
    """,

	'description': """
        Starting module for "Discover the JS framework, chapter 2: Build a dashboard"
    """,

	'author': "Odoo",
	'website': "https://www.odoo.com/",
	'category': 'Tutorials/AwesomeDashboard',
	'version': '0.1',
	'application': True,
	'installable': True,
	'depends': ['base', 'web', 'mail', 'crm'],

	'data': [
		'views/views.xml',
	],
	'assets': {
		'web.assets_backend': [
			'awesome_dashboard/static/src/**/*',
			('remove', 'awesome_dashboard/static/src/dashboard/**/*'),
			# 'awesome_dashboard/static/src/dashboard_action.js',
			# 'awesome_dashboard/static/src/dashboard_loader.js',
		],
		'awesome_dashboard.dashboard': [
			'awesome_dashboard/static/src/dashboard/**/**',

		],
	},
	# {
	#
	#     'web.assets_backend': [
	#         'awesome_dashboard/static/src/**/*',
	#     ],
	#     'awesome_dashboard.dashboard': [
	#        'web.core/lazy_component',
	# 	    'awesome_dashboard/static/src/dashboard_loader.js',
	# 	    'awesome_dashboard/static/src/dashboard_action.js'
	#     ]
	# },
	'license': 'AGPL-3'
}
