/* Task Description */
/* 
 Create a function constructor for Person. Each Person must have:
 *	properties `firstname`, `lastname` and `age`
 *	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
 *	age must always be a number in the range 0 150
 *	the setter of age can receive a convertible-to-number value
 *	if any of the above is not met, throw Error
 *	property `fullname`
 *	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
 *	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
 *	it must parse it and set `firstname` and `lastname`
 *	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
 *	all methods and properties must be attached to the prototype of the Person
 *	all methods and property setters must return this, if they are not supposed to return other value
 *	enables method-chaining
 */

function solve() {
    var Person = (function () {
        function Person(fname, lname, age) {
            function checkNames() {
                var regexp = /^[a-zA-Z]{3,20}$/;

                return (regexp.test(fname) && regexp.test(lname));
            }

            if (!checkNames() || age < 0 || age > 150) {
                throw new Error();
            }

            this.firstname = fname;
            this.lastname = lname;
            this.age = age;
        }

        Person.prototype.introduce = function () {
            return 'Hello! My name is ' + this.firstname + ' ' + this.lastname + ' and I am ' + this.age + '-years-old';
        };

        Object.defineProperty(Person.prototype, 'fullname', {
            get: function() {
                return this.firstname + ' ' + this.lastname;
            },
            set: function(value) {
                this.firstname = value.split(' ')[0];
                this.lastname = value.split(' ')[1];
            }
        });

        return Person;
    }());
    return Person;
}

module.exports = solve;