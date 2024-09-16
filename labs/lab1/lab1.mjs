import { v4 as uuidv4} from "uuid";

'use strict';

/**
 * Reflection question 1
 * In JavaScript, we don't need to store properties with the value false because 
 * the absence of a property is effectively treated as undefined, which is falsy in condition checks. 
 * This reduces memory usage and improves code readability, 
 * as undefined or missing properties will behave like false in logical operations without explicitly storing them.
 */

import inventory from './inventory.mjs';
//console.log('\n=== beginning of printout ================================')
//console.log('inventory:', inventory);



console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
//names
 // .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  //.forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
 // console.log(name);
}

/**
 * Reflection question 2
 * 
 * -Enumerable properties are properties of an object that kan be listed in loops like (for .. in). 
 * All user-defined object properties are enumerabl
 * 
 * -Own properties belong directly to the object, not properties that the object inherit from its prototype
 * 
 * Object.keys() only returns the objects own enumerable properties. It does not include inherited properties
 * The forEach() loops over the array of keys provided by Object.keys(). Since Object.keys() only returns the object's own properties, 
 * forEach() will not iterate over properties from the object's prototype or non-enumerable properties.
 * 
 * for...in iterates over all enumerable properties, including the object's own properties and inherited enumerable properties from the prototype chain.
 * 
 * ANSWERE: They will give different outputs if the object has inherited enumerable properties
 * Example:
 * 
 *  const inventory = { apples: 10, bananas: 5 };
    Object.prototype.oranges = 20;  // Inherited property

    const names = Object.keys(inventory);
    names.forEach(name => console.log(name)); // Outputs: apples, bananas

    for (const name in inventory) {
      console.log(name); // Outputs: apples, bananas, oranges (inherited)
    }
 * 
 * 
 * -Enumerable properties are properties of an object that kan be listed in loops like (for .. in). 
 * All user-defined object properties are enumerabl
 * 
 * -Own properties belong directly to the object, not properties that the object inherit from its prototype
 * 
 * Object.keys() only returns the objects own enumerable properties. It does not include inherited properties
 * The forEach() loops over the array of keys provided by Object.keys(). Since Object.keys() only returns the object's own properties, 
 * forEach() will not iterate over properties from the object's prototype or non-enumerable properties.
 * 
 * for...in iterates over all enumerable properties, including the object's own properties and inherited enumerable properties from the prototype chain.
 * 
 * ANSWERE: They will give different outputs if the object has inherited enumerable properties
 * Example:
 * 
 *  const inventory = { apples: 10, bananas: 5 };
    Object.prototype.oranges = 20;  // Inherited property

    const names = Object.keys(inventory);
    names.forEach(name => console.log(name)); // Outputs: apples, bananas

    for (const name in inventory) {
      console.log(name); // Outputs: apples, bananas, oranges (inherited)
    }
 * 
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  return Object.entries(inv)  // Omvandla objekt till en array med nyckel-värde-par
    .filter(([key, value]) => value[prop])  // Filtrera på ingredienser där 'prop' finns
    .map(([key, value]) => `<option value="${key}" key="${key}">${key}, ${value.price} kr</option>`);  // Omvandla till HTML <option>
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  static #instantCounter=0;

  constructor(existingSalad) {
    

    if(existingSalad instanceof Salad)
      {
        this.selectedIngredients=JSON.parse(JSON.stringify(existingSalad.selectedIngredients));
        //this.ingridientList = {...salad.ingridientList}
      } 
      else{
        this.selectedIngredients={};
      }
      this.uuid=uuidv4();
      this.id = 'salad_' + Salad.#instantCounter++;
  }
  add(name, properties) { 
    this.selectedIngredients[name]=properties;
    return this;
  }
  remove(name) { 
    delete this.selectedIngredients[name];
    return this;
  }

  static parse(json){
    /* Försök att parse json, ifall det går igenom betyder att json argumentet är korrekt skriven (syntax) och kan bli parsad (omvandlad) till en JSON object */
    let parsed;
    try {
      parsed = JSON.parse(json); //omvandlar till ett js object
   } catch (error) {
     throw new Error("Not a valid JSON argument");
   }
      //const parsed= JSON.parse(json);

      if (Array.isArray(parsed)) {
        return parsed.map(item => {
          const newSalad = new Salad();
          newSalad.selectedIngredients = { ...item.selectedIngredients };
         // newSalad.uuid = item.uuid;
          return newSalad;
        });
    }else{
      const newSalad = new Salad(parsed);
      newSalad.selectedIngredients={ ...parsed.selectedIngredients};
      //newSalad.uuid = item.uuid;
      return newSalad;

    }
  
  
  }
}

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice=function(){

  return Object.values(this.selectedIngredients)
        .reduce((total,ingredient)=> total + (ingredient.price || 0), 0);
}
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');

Salad.prototype.count = function(property){
  return  Object.values(this.selectedIngredients).filter(hi => hi[property] ===true).length;
}

// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
/*
1*In , classes are essentially syntactic sugar over constructor functions. 
When you create a class, you're really creating a function behind the scenes, 
and JavaScript sets up the prototype-based inheritance system to manage shared properties and methods.

-Classes define objects and their behaviors (methods) that are shared among instances.
-Inherited properties are represented via the prototype chain. Each object has an internal link to its prototype ([[Prototype]]), 
which is an object. When you access a property on an object, JavaScript checks the object itself first, and if the property isn't found,
it moves up the chain to the object's prototype, continuing up the chain until it reaches Object.prototype or null.

2*Prototype Chain: This is the chain of objects that JavaScript follows when looking for properties. Every object has a prototype (via [[Prototype]]), 
and when a property is not found on the object itself, JavaScript looks at the object's prototype, 
then its prototype’s prototype, and so on, until it reaches Object.prototype.

3*
-Functions have a prototype property. This includes constructor functions and ES6 classes.
Normal objects (instances of classes or functions) do not have a prototype property, 
but they have a [[Prototype]] (an internal reference to the constructor's prototype).

-Prototype Property: Only functions (and thus classes) have a prototype property. 
This property is an object that stores shared methods and properties for instances created from that function or class. 
Instance objects do not have a prototype property, but they do have an internal reference ([[Prototype]]) to their constructor's prototype object.

4*
To access the next object in the prototype chain, you use the method Object.getPrototypeOf(obj).
*/

console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad.__proto__);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad))); // Varför den blir false?
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad)+'\n');
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy)+'\n');
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy)+'\n');
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

class GourmetSalad extends Salad{
  constructor(){
    super();
  }

  add(name, properties, size=1){
    if(this.selectedIngredients[name]){
      this.selectedIngredients[name].size+=size;

    }else{
      let propertiesWithSize ={ ...properties, size:size};
      this.selectedIngredients[name]=propertiesWithSize;
    }
    return this; 

  }
  getPrice(){
  return Object.values(this.selectedIngredients)
        .reduce((total,ingredient)=> total + ingredient.price *ingredient.size, 0);
  }
}

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);


/**
 * Reflection question 4
 * Static properties are stored directly on the constructor function or class itself, not on the instances or their prototypes.
 * 
 * Static properties are stored directly on the constructor function or class itself, not on the instances or their prototypes.
 * 
 */
/**
 * Reflection question 5
 * Yes, you can make the id property read-only using Object.defineProperty() or the getter approach.
 *  writable: false, // Gör id read-only
 * Yes, you can make the id property read-only using Object.defineProperty() or the getter approach.
 *  writable: false, // Gör id read-only
 */
/**
 * Reflection question 6
 * Yes, starting with ES2020, JavaScript introduced private properties using a # symbol before the property name. 
 * These properties are only accessible within the class definition and are not accessible from outside.
 * Yes, starting with ES2020, JavaScript introduced private properties using a # symbol before the property name. 
 * These properties are only accessible within the class definition and are not accessible from outside.
 */
