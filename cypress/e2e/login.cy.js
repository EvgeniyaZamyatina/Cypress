import * as data from "../helpers/default_data.json" // const data = require('../helpers/default_data.json');
import * as main_page from "../locators/main_page.json"; // импорт локаторов главной страницы 
import * as recovery_password_page from "../locators/recovery_password_page.json" // импорт локаторов страницы востановления пароля
import * as result_page from "../locators/result_page.json" // импорт локаторов страницы результатов 


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зайти на сайт https://login.qa.studio
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Найти кнопку Забыли пароль и проверить ее цвет
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.title).should('be.visible'); // Проверит, что Текст на странице виден пользователю
        cy.get(result_page.close).should('be.visible'); // Проверит, что на Тексте имеется элемент крестик и виден пользователю 
           });

// Автотест 1
    it('Верный логин и верный пароль', () => {
        cy.get(main_page.email).type(data.login); // Найти поле логин и ввести верный логин
        cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести верный пароль
        cy.get(main_page.login_button).click(); // Найти кнопку Войти и нажать на нее
        cy.wait(2000);
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверить, что авторизация прошла успешно и вижу текст
    })

// Автотест 2
    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Найти поле логин и ввести верный логин
        cy.get(main_page.password).type('iLoveqastudio12'); // Найти поле пароль и ввести НЕВЕРНЫЙ пароль
        cy.get(main_page.login_button).click(); // Найти кнопку Войти и нажать на нее
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить, что авторизация не прошла и вижу текст ошибки
    })

// Автотест 3
    it('НЕВерный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolnikov.rus'); // Найти поле логин и ввести НЕВЕРНЫЙ логин
        cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести верный пароль
        cy.get(main_page.login_button).click(); // Найти кнопку Войти и нажать на нее
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить, что авторизация не прошла и вижу текст ошибки
    })

// Автотест 4
    it('Нет @ в логин и верный пароль', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Найти поле логин и ввести НЕВЕРНЫЙ логин
        cy.get(main_page.password).type(data.password); // Найти поле пароль и ввести верный пароль
        cy.get(main_page.login_button).click(); // Найти кнопку Войти и нажать на нее
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверить, что авторизация не прошла и вижу текст ошибки
    })

// Автотест 5
       it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Найти поле логин и ввести НЕВЕРНЫЙ логин
        cy.get(main_page.password).type('iLoveqastudio1'); // Найти поле пароль и ввести верный пароль
        cy.get(main_page.login_button).click(); // Найти кнопку Войти и нажать на нее
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверить, что авторизация прошла успешно и вижу текст 
    })

// Автотест 6
       it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Найти кнопку Забыли пароль? и нажать на нее
        cy.get(recovery_password_page.email).type(data.login); // Найти поле почты и ввести верную почту
        cy.get(recovery_password_page.close).should('be.visible'); // Проверит, что на Тексте имеется элемент крестик и виден пользователю 
        cy.get(recovery_password_page.send_button).click(); // Найти кнопку Отправить код  и нажать на нее
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверить, код отправлен и вижу текст 
    })

})