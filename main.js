'use strict';

import {foodlist} from './data.js';

class App {

   constructor() {
      this.data = foodlist.food;
      this._initEvents();
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
   }

   // Выводим список всех блюд
   _renderFoodList() {
      this.data.forEach(function(item, i, allFoodList) {
         $( '.' + item.type ).append( `<li data-id="` + i + `" class="collection-item grey-text text-darken-4">` + item.name + `</li>` );
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
            <div class="dayMainTitle light-green lighten-3 collapsible-header active">День ` + number + `</div>
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
         targetMenu = this.data[targetId].ingridients,
         ingridients = $('.hiddenlist').text(),
         numberOfPeople = $('#people').val(),
         output = {};

      if (ingridients != '') {
         output = JSON.parse( ingridients );
      }

      $('.hiddenlist').text( JSON.stringify( this.combine(targetMenu, output) ) );

      $('.productlist').empty();
      $.each( this.combine(targetMenu, output), function( key, value ) {
        $('.productlist').append( key + ': ' + value * numberOfPeople + '<br />' );
      });
   }

   // Складываем ингридиенты двух блюд
   combine(object1, object2) {
      let
         menu = {},
         key;

      for(key in object1){
         if(object2[key] == undefined){
            menu[key] = object1[key];
         } else {
            menu[key] = parseFloat(object1[key]) + parseFloat(object2[key]);
         };
      };
      for(key in object2){
         if(object1[key] == undefined){
            menu[key] = object2[key];
         } else {
            menu[key] = parseFloat(object1[key]) + parseFloat(object2[key]);
         };
      };

      return menu;
   }

}

let app = new App;
