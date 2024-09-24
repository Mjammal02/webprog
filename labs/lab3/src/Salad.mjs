import { v4 as uuidv4} from "uuid";

'use strict';

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  static #instantCounter=0;

  constructor(existingSalad) {
    
    this.uuid=uuidv4();
    this.id = 'salad_' + Salad.#instantCounter++;
    if(existingSalad instanceof Salad)
      {
        //this.selectedIngredients=JSON.parse(JSON.stringify(existingSalad.selectedIngredients));
        this.selectedIngredients = {...existingSalad.ingridientList}
      } 
      else{
        this.selectedIngredients={};
      }
      
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
          newSalad.uuid = parsed.uuid;
          return newSalad;
        });
    }else{
      const newSalad = new Salad(parsed);
      newSalad.selectedIngredients={ ...parsed.selectedIngredients};
      newSalad.uuid = parsed.uuid;
      return newSalad;

    }
  
  }
}

Salad.prototype.getPrice=function(){

  return Object.values(this.selectedIngredients)
        .reduce((total,ingredient)=> total + (ingredient.price || 0), 0);
}

Salad.prototype.count = function(property){
  return  Object.values(this.selectedIngredients).filter(hi => hi[property] ===true).length;
}

export default Salad