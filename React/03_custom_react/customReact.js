function customRender(reactElement, container) {
    const domElement = document.createElement(reactElement.type);
    const props = reactElement.props || {};
    const children = reactElement.children;

    Object.keys(props).forEach(key => {
        domElement.setAttribute(key, props[key]);
    });

    if (typeof children === 'string' || typeof children === 'number') {
        const textNode = document.createTextNode(children);
        domElement.appendChild(textNode);
    } else if (Array.isArray(children)) {
        children.forEach(child => customRender(child, domElement));
    }

    container.appendChild(domElement);
}

const reactElementAnchor = {
    type: 'a',
    props: {
        href: 'https://www.google.com',  
        target: '_blank'
    },
    children: 'Google'
};

const reactElementDiv = {
    type: 'div',
    props: {
        className: 'container'
    },
    children: [
        {
            type: 'h1',
            props: {},
            children: 'Hello World'
        },
        {
            type: 'p',
            props: {},
            children: 'This is a custom React-like render function.'
        }
    ]
};

const mainContainer = document.querySelector('#root');
customRender(reactElementAnchor, mainContainer);
customRender(reactElementDiv, mainContainer);
