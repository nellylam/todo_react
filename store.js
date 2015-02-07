var items = []

var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged')
}

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id
  })[0]
},

ListStore = {

  getItems: function() {
    return items
  },

  loadItems: function() {
    var loadRequest = $.ajax({
      type: 'GET',
      url: "https://listalous.herokuapp.com/lists/nellylam/"
    })
    .done(function(dataFromServer){
      items = dataFromServer.items;
      notifyComponents(); // notified the components that it was time to re-render themselves
    });
  },
  addItem: function(itemDescription) {
    var creationRequest = $.ajax({
      type: 'POST',
      url: "http://listalous.herokuapp.com/lists/nellylam/items",
      data: { description: itemDescription, completed: false }
    })
    creationRequest.done(function(itemDataFromServer){
      items.push(itemDataFromServer)
      notifyComponents()
    });
  },
  toggleCompleteness: function(itemId) {
    var item = findItemById(itemId)
    var currentCompletedValue = item.completed

    var updateRequest = $.ajax({
      type: 'PUT',
      url: "https://listalous.herokuapp.com/lists/nellylam/items/" + itemId,
      data: { completed: !currentCompletedValue }
    })
    .done(function(itemData){
      item.completed = itemData.completed
      notifyComponents()
    })
  }
}