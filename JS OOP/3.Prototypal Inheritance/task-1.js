/* Task Description */
/*
 * Create an object domElement, that has the following properties and methods:
 * use prototypal inheritance, without function constructors
 * method init() that gets the domElement type
 * i.e. `Object.create(domElement).init('div')`
 * property type that is the type of the domElement
 * a valid type is any non-empty string that contains only Latin letters and digits
 * property innerHTML of type string
 * gets the domElement, parsed as valid HTML
 * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
 * property content of type string
 * sets the content of the element
 * works only if there are no children
 * property attributes
 * each attribute has name and value
 * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
 * property children
 * each child is a domElement or a string
 * property parent
 * parent is a domElement
 * method appendChild(domElement / string)
 * appends to the end of children list
 * method addAttribute(name, value)
 * throw Error if type is not valid
 * // method removeAttribute(attribute)
 */


/* Example
 var meta = Object.create(domElement)
 .init('meta')
 .addAttribute('charset', 'utf-8');
 var head = Object.create(domElement)
 .init('head')
 .appendChild(meta)
 var div = Object.create(domElement)
 .init('div')
 .addAttribute('style', 'font-size: 42px');
 div.content = 'Hello, world!';
 var body = Object.create(domElement)
 .init('body')
 .appendChild(div)
 .addAttribute('id', 'cuki')
 .addAttribute('bgcolor', '#012345');
 var root = Object.create(domElement)
 .init('html')
 .appendChild(head)
 .appendChild(body);
 console.log(root.innerHTML);
 Outputs:
 <html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
 */


function solve() {
    var domElement = (function () {
        var domElement = {
            init: function (type) {
                if (!validType(type)) {
                    throw new Error();
                }

                this.type = type;
                this.attributes = {};
                this.content = '';
                this.children = [];
                return this;
            },
            appendChild: function (child) {
                if (typeof child === 'string') {
                    this.content += child;
                } else {
                    child.parent = this;
                    this.children.push(child);
                }

                return this;
            },
            addAttribute: function (name, value) {
                if (!validAttribute(name)) {
                    throw new Error();
                }

                this.attributes[name] = value;

                return this;
            },
            get innerHTML() {
                var innerResult = '';

                if (this.children.length === 0) {
                    return '<' + this.type + parseAttributes(this.attributes) + '>' + this.content + '</' + this.type + '>';
                } else {
                    this.children.forEach(function (item) {
                        innerResult += item.innerHTML;
                    });

                    return '<' + this.type + parseAttributes(this.attributes) + '>' + innerResult + '</' + this.type + '>';
                }
            }
        };

        Object.defineProperty(domElement, 'content', {
            get: function () {
                return this._content;
            },
            set: function (value) {
                this._content = value;
            }
        });

        function parseAttributes(obj) {
            var result = ' ';

            Object.keys(obj)
                .sort()
                .forEach(function (attr) {
                    result += attr + '="' + obj[attr] + '" ';
                });

            return result.trimRight();
        }

        function validType(type) {
            var regexp = /^[a-zA-Z0-9]+$/g;

            return regexp.test(type) && typeof type === 'string' && type !== '';
        }

        function validAttribute(attribute) {
            var regexp = /^[a-zA-Z0-9-]+$/g;

            return regexp.test(attribute) && typeof attribute === 'string' && attribute !== '';
        }

        return domElement;
    }());

    return domElement;
}

module.exports = solve;