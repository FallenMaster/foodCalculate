/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return foodlist; });


let foodlist = {
      'food': [

         // Каши
         {
            'name': 'Рисовая каша',
            'type': 'porrige',
            'ingridients': {
               'рис': 75,
               'вода': 300,
               'молоко сухое': 20,
               'сухофрукты': 10,
               'сгущенка': 20,
               'соль': 2
            }
         },
         {
            'name': 'Гречневая каша',
            'type': 'porrige',
            'ingridients': {
               'гречка': 100,
               'молоко сухое': 10,
               'сгущенка': 20,
               'сахар': 10,
               'соль': 2
            }
         },
         {
            'name': 'Пшенная каша',
            'type': 'porrige',
            'ingridients': {
               'пшено': 80,
               'молоко сухое': 40,
               'сахар': 10,
               'соль': 2
            }
         },
         {
            'name': 'Манная каша',
            'type': 'porrige',
            'ingridients': {
               'манка': 70,
               'молоко сухое': 20,
               'сахар': 10,
               'соль': 2
            }
         },
         {
            'name': 'Овсяная каша',
            'type': 'porrige',
            'ingridients': {
               'овсяные хлопья': 70,
               'молоко сухое': 40,
               'соль': 2,
               'сахар': 10
            }
         },


         // Супы
         {
            'name': 'Рыбный суп',
            'type': 'soup',
            'ingridients': {
               'рыба': 60,
               'картошка': 50,
               'морковь': 50,
               'соль': 10
            }
         },


         // Напитки
         {
            'name': 'Чай рассыпной',
            'type': 'drink',
            'ingridients': {
               'чай листовой': 5,
               'сахар': 20
            }
         },
         {
            'name': 'Чай пакетированный',
            'type': 'drink',
            'ingridients': {
               'пакетик чая': 1,
               'сахар': 20
            }
         },
         {
            'name': 'Кофе',
            'type': 'drink',
            'ingridients': {
               'кофе растворимый': 5,
               'молоко сухое': 20,
               'сахар': 20
            }
         },
         {
            'name': 'Какао',
            'type': 'drink',
            'ingridients': {
               'какао порошок': 10,
               'молоко сухое': 10,
               'сахар': 10
            }
         },
         {
            'name': 'Кисель',
            'type': 'drink',
            'ingridients': {
               'кисель сухой': 50,
               'сахар': 30
            }
         }
      ]
};




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_js__ = __webpack_require__(0);




class App {

   constructor() {
      this.data = __WEBPACK_IMPORTED_MODULE_0__data_js__["a" /* foodlist */].food;
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


/***/ })
/******/ ]);