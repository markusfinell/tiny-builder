const components = [
	{
		id: 'section',
		name: 'Section',
		subComponents: [ 'row' ]
	},
	{
		id: 'row',
		name: 'Row',
		subComponents: [ 'section', 'column' ]
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

const builder = document.getElementById( 'tiny-builder' );

tinyBuilder( components, builder );