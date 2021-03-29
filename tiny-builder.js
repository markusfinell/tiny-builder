function getComponentBy( prop, value, components) {
	return components.filter( component => {
		return component[prop] === value;
	})[0];
};

function getComponentFields( fields ) {
	return '';
}

function getComponentSettings( component ) {
	if ( 'fields' in component ) {
		return `<div class="component-settings">
			<button onclick="openSettings(this)">Edit</button>
			<div class="component-fields"></div>
		</div>`;
	}
}

function getComponentActions( component, components ) {
	if ( 'subComponents' in component ) {
		return `<div class="component-actions">
			${ component.subComponents.map( subComponentId => {
				const subComponent = getComponentBy( 'id', subComponentId, components );
				return `<button onclick="addComponent(this, '${subComponentId}', '${component.id}')">Add ${subComponent.name}</button>`;
			} ).join('') }
		</div>`;
	}
	
	return '';
}

function getDefaultContent( component, components ) {
 if ( 'defaultContent' in component ) {
  return component.defaultContent.map( componentId => {
   return getComponentTemplate( getComponentBy( 'id', componentId, components ), components );
  });
 }
 
 return '';
}

function getComponentTemplate( component, components ) {
 return `<div class="tb-component ${component.id}-component">
		<div class="${component.id}-content">
		 ${getDefaultContent( component, components )}
		</div>
		${getComponentActions( component, components )}
		<button class="delete-component" onclick="deleteComponent(this)" title="Delete ${component.name}">x</button>
	</div>`;
}

function getRootComponents(components) {
	return components.filter(component => {
		return component?.root;
	});
}

function getBuilderActions(components) {
 return `<div class="builder-actions">
  ${getRootComponents(components).map(component => {
   return `<button onclick="addComponent(this, '${component.id}', 'builder')">Add ${component.name}</button>`;
  })}
 </div>`;
}

function getComponentTemplates(components) {
 return components.map(component => {
  return `<template id="${component.id}-template">
   ${getComponentTemplate(component, components)}
  </template>`;
 }).join('');
}

function tinyBuilder(components) {
 return `<div id="tiny-builder" class="builder-component">
  <div class="builder-content"></div>
  ${getBuilderActions(components)}
  ${getComponentTemplates(components)}
 </div>`;
}

function addComponent(el, componentId, parentId) {
 const componentTemplate = document.getElementById(componentId+'-template').innerHTML;
 const parentEl = el.closest( '.' + parentId + '-component' );
 const contentEl = parentEl.querySelector('.'+parentId+'-content');
 contentEl.innerHTML += componentTemplate;
 
 return componentTemplate;
}

function deleteComponent(el){
 el.closest('.tb-component').remove();
}