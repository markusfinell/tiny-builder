/** FUNCTIONS **/

/**
 * Create HTML element
 * @param {string} html HTML string
 * @returns {HTMLElement}
 */
function createElement( html ) {
	let template = document.createElement( 'template' );
	template.innerHTML = html;

	return template.content.firstChild;
}

/** TINY BUILDER **/

const tb = {
	components: [],
	builder: null
};

function getComponentBy( prop, value ) {
	return tb.components.filter( component => {
		return component[prop] === value;
	})[0];
};

function getComponentFields( fields ) {
	return '';
}

function getComponentSettings( component ) {
	if ( 'fields' in component ) {
		return `<div class="tb-component-settings">
			<button onclick="openSettings(this)">Edit</button>
			<div class="tb-component-fields"></div>
		</div>`;
	}
}

function getComponentActions( component ) {
	if ( 'subComponents' in component ) {
		return `<div class="tb-component-actions">
			${ component.subComponents.map( subComponentId => {
				let subComponent = getComponentBy( 'id', subComponentId );
				return `<button>Add ${subComponent.name}</button>`;
			} )}
		</div>`;
	}

	return '';
}

function addComponentTemplates( components ) {
	
}

function getComponentTemplate( component ) {
	return `<div class="tb-component tb-component-${component.id}">
		${getComponentFields( component )}
		<div class="tb-component-content"></div>
		${getComponentActions( component )}
	</div>`;
}

/**
 * Initialize tinyBuilder
 * @param {array} 		components 
 * @param {HTMLElement} builderElement
 */
function tinyBuilder( components, builder ) {
	tb.builder = builder;
	tb.components = components;

	tb.components = tb.components.map( component => {
		component.template = getComponentTemplate( component );
		return component;
	} );

	console.log( tb.components );
}



/*

function getRootComponents(components) {
	return components.filter((component) => {
		let isRoot = true;

		for (cmpt in components) {
			if (components[cmpt].id === component.id) {
				continue;
			}

			if ('subComponents' in components[cmpt] && components[cmpt].subComponents.indexOf(component.id) !== -1) {
				isRoot = false;
			}
		}

		return isRoot;
	});
}



const getField = (field) => {
	let output = '<div class="field">';
	output += '<label>' + field.label + '</label>';
	// output += '<input type="' + field.type + '">"';
	output += '</div>';
};

const rootComponents = getRootComponents(components);
const pageBuilder = document.querySelector('#page-builder');
const componentTemplates = {};

for (let key in components) {
	let component = components[key];
	let template = '<div class="component ' + component.id + '">';
	template += '<div class="content"></div>';

	if ('fields' in component) {
		template += '<div class="settings">';
		template += '<button onclick="openFields(this)">Edit</button>';
		template += '<div class="fields">';

		for (key in component.fields) {
			template += getField(component.fields[key]);
		}

		template += '</div></div>';
		console.log(component.fields);
	}

	if ('subComponents' in component) {
		template += '<div class="actions">';
		if (component.subComponents.length > 1) {
			template += '<button onclick="openAdd(this)">Add</button>';
		}
		template += '<div class="actions-buttons' + (component.subComponents.length > 1 ? ' closed' : '') + '">';
		for (let key in component.subComponents) {
			let subComponentId = component.subComponents[key];
			let subComponent = getComponentBy('id', subComponentId);

			template += "<button onclick='add(this, \"" + subComponent.id + "\")'>Add " + subComponent.name + "</button>";
		}
		template += '</div></div>';
	}

	template += '</div>';

	componentTemplates[component.id] = template;
}

for (let component in rootComponents) {
	let addComponentBtn = createElement("<button onclick='add(this, \"" + rootComponents[component].id + "\")'>Add " + rootComponents[component].name + "</button>");
	pageBuilder.querySelector('.actions').append(addComponentBtn);
}

const add = (el, componentId) => {
	el.closest('.actions').parentElement.querySelector('.content').append(createElement(componentTemplates[componentId]));
};

const openAdd = el => {
	el.parentElement.querySelector('.actions-buttons').classList.remove('closed');
	el.parentElement.querySelector('.actions-buttons').classList.add('open');
};

pageBuilder.addEventListener('click', (ev) => {
	let actionsButtons = pageBuilder.querySelector('.actions-buttons.open');
	let onclick = ev.target.getAttribute('onclick');
	if (actionsButtons && (!onclick || onclick.indexOf('openAdd') !== 0)) {
		actionsButtons.classList.remove('open');
		actionsButtons.classList.add('closed');
	}
});
*/