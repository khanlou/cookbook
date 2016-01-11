var IngredientBinder = function(lineItemNode) {
  this.lineItemNode = lineItemNode;
  this.textNode = lineItemNode.firstChild
  this.parser = new IngredientParser(this.textNode.textContent);
  
  this.scale = function(scalingFactor) {
    this.textNode.textContent = this.parser.amount.scale(scalingFactor);
  }.bind(this);
};

var ingredientsElement = document.getElementById('ingredients');
var ingredientLineItems = ingredients.children[0].children;

var ingredientParsers = [];
for (var i = 0; i < ingredientLineItems.length; i++) {
  var ingredientLineItem = ingredientLineItems[i];
  ingredientParsers.push(new IngredientBinder(ingredientLineItem));
}

var tangle = new Tangle(document.getElementById('scaler'), {
  initialize: function() { this.scalingFactor = 1; },
  update: function() {
    ingredientParsers.forEach(function(ingredientParser) {
      ingredientParser.scale(this.scalingFactor);
    }.bind(this))
  },
});
