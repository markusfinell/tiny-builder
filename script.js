const components = [
	{
		id: 'section',
		name: 'Section',
		subComponents: [ 'row' ],
		root: true,
		defaultContent: [ 'row' ]
	},
	{
		id: 'row',
		name: 'Row',
		subComponents: [ 'column' ],
		defaultContent: [ 'column' ]
	},
	{
		id: 'column',
		name: 'Column',
		subComponents: [ 'module' ]
	},
	{
		id: 'module',
		name: 'Module',
		types: [
			{
				id: 'text',
				name: 'Text',
			},
			{
				id: 'image',
				name: 'Image'
			}
		]
	}
];

document.getElementById( 'builder' ).innerHTML = tinyBuilder(components);