'use strict';

import {foodlist} from './data.js';

class App {

   constructor() {
      this.data = foodlist.food;
      this._initEvents();
      this.choiceList = [];
      this.ingridienList = {};
      this.numberOfItems = 0;
   }

   _initEvents() {
      let
         that = this;

      this._renderFoodList();
      this._renderDays();
      this._sortable();
      $('#days').on('keyup', function() {
         that._renderDays();
         that._sortable();
      });
      $('.deleteButton').on('click', function() {
         that._deleteItem(event);
      });

   }

   // Выводим список всех блюд
   _renderFoodList() {
      this.data.forEach(function(item, i, allFoodList) {
         $('.' + item.type).append(`<li data-id="` + i + `" class="collection-item grey-text text-darken-4">` + item.name + `<span class="deleteButton">x</span></li>`);
      });
   }

   // Зарендерим дни
   _renderDays() {
      let
         currentNumber = $(".tourDay").length,
         numberOfDays = $('#days').val(),
         i;
      function dayContent(number) {
         return `
         <li class="tourDay day`+ number + `">
            <div class="dayMainTitle light-green lighten-3 collapsible-header active">
               <i class="material-icons keyboard_arrow_right">keyboard_arrow_right</i>
               <i class="material-icons keyboard_arrow_down">keyboard_arrow_down</i>
               День ` + number + `
            </div>
            <div class="collapsible-body">
               <div class="daySubTitle">Завтрак</div>
               <ul class="meal meal1"></ul>
               <div class="daySubTitle">Обед</div>
               <ul class="meal meal2"></ul>
               <div class="daySubTitle">Ужин</div>
               <ul class="meal meal3"></ul>
            </div>
         </li>
         `;
      };

      if (numberOfDays > currentNumber) {
         for (i = currentNumber + 1; i <= numberOfDays; i++) {
            $('.choicelist').append(dayContent(i));
            $('.choicelist').collapsible('open', 0);
         }
      }
      else if (numberOfDays < currentNumber) {
         // TODO: удаление из списка ингридиентов, с удаленного дня
         for (i = currentNumber; i > numberOfDays; i--) {
            $('.day' + i).remove();
         }
      }
      else {
         $('.choicelist').append(dayContent(1));
         $('.choicelist').collapsible('open', 0);
      }
   }

   // Добавим drag&drop для списков
   _sortable() {
      // TODO: сохранение в local storage https://github.com/RubaXa/Sortable#store
      let
         that = this,
         optsFoodlist = {
            animation: 200,
            group: {
               name: 'shared',
               pull: 'clone',
               put: false,
               revertClone: true
            },
            sort: false,
            onStart: function () {
               $('.choicelist').addClass('markTarget');
            },
            onEnd: function () {
               $('.choicelist').removeClass('markTarget');
            }
         },
         optsChoiceList = {
            group: {
               name: 'shared',
               pull: true,
               put: true,
               revertClone: false
            },
            onAdd: function (event) {
               if (!!event.from.className.indexOf('meal')) {
                  event.item.setAttribute('id', that.numberOfItems);
                  that.numberOfItems++;
                  that._onDragStop(event);
               }
            }
         },
         numberOfDays = $('#days').val();

      $('.food').sortable(optsFoodlist);
      for (let day = 1; day <= numberOfDays; day++) {
         for (let meal = 1; meal <= 3; meal++) {
            $('.day' + day + ' .meal' + meal).sortable(optsChoiceList);
         }
      }
   }

   // Выбор блюда
   _onDragStop(event, ui) {
      let
         targetId = event.item.dataset.id,
         numberOfPeople = $('#people').val(),
         newItem = $.extend(true, {}, this.data[targetId]);

      newItem.id = Number(event.item.id);
      newItem.numberOfPeople = numberOfPeople;
      this.choiceList.push(newItem);

      this.ingridienList = this.combine(newItem, this.ingridienList);
      $('.productlist').empty();
      $.each(this.ingridienList, function(key, value) {
         $('.productlist').append(key + ': ' + value + '<br />');
      });
   }


   _deleteItem(event) {
      let deletedItemId = event.target.parentNode.attributes.id.value;
      for (let i = 0; i < this.choiceList.length; i++) {
      	if (this.choiceList[i].id === Number(deletedItemId)) {
            event.target.parentElement.remove()
            this.deleteIngridientsFromList(this.choiceList[i], this.ingridienList);
      		this.choiceList.splice(i, 1);
      	}
      }

      $('.productlist').empty();
      $.each(this.ingridienList, function(key, value) {
         $('.productlist').append(key + ': ' + value + '<br />');
      });
   }

   // Складываем ингридиенты двух блюд
   combine(object1, object2) {
      let
         menu = {},
         key;

      if (object1 !== undefined) {
         for(key in object1.ingridients) {
            if(object2[key] == undefined){
               menu[key] = object1.ingridients[key] * object1.numberOfPeople;
            } else {
               menu[key] = parseFloat(object1.ingridients[key] * object1.numberOfPeople) + parseFloat(object2[key]);
            };
         };
         for(key in object2) {
            if(object1.ingridients[key] == undefined){
               menu[key] = object2[key];
            } else {
               menu[key] = parseFloat(object1.ingridients[key] * object1.numberOfPeople) + parseFloat(object2[key]);
            };
         };
      } else {
         menu = {};
      }

      return menu;
   }

   // Удаляем ингридиенты из списка
   deleteIngridientsFromList(object1, allIngridients) {
      var numberOfPeople = object1.numberOfPeople;

      $.each(object1.ingridients, function(index, value) {
          $.each(allIngridients, function(index1, value1) {
          	if(index == index1) {
      			allIngridients[index1] = value1 - value * numberOfPeople;
               if (allIngridients[index1] == 0) {
                  delete allIngridients[index1];
               }
      		}
      	});
      });

      $('.productlist').empty();
      $.each(this.ingridienList, function(key, value) {
         $('.productlist').append(key + ': ' + value + '<br />');
      });
   }

}

let app = new App;
