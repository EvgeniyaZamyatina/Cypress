describe('Автотесты на покупку нового аватара', function () { // Название коллекции тестов

    it('E2E на покупку нового аватара', function () {
         cy.visit('https://pokemonbattle.ru/login');  // Зайти на сайт 
         cy.get('#k_email').type('USER_LOGIN'); // Найти поле почта и ввести верную почту
         cy.get('#k_password').type('USER_PASSWORD'); // Найти поле пароль и ввести верный пароль
         cy.get('.MuiButton-root').click(); // Найти кнопку Войти и нажать на нее
         cy.wait(2000); // ждем 2 секунды

         cy.get('a.header_card_trainer').click(); // Найти иконку своего тренера в правом углу и кликнуть на нее
         cy.get('.k_mobile > :nth-child(5)').click(); // Найти кнопку Смена аватара и нажать на нее
         
         cy.get('.available > .shop__button').first().click(); // Найти кнопку аватара и нажать на нее

         cy.get('.payment_form_card_form > :nth-child(2) > .style_1_base_input').type('4111111111111111'); // Вводим номер карты
         cy.get(':nth-child(1) > .style_1_base_input').type('10/25'); // Вводим срок карты
         cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type('125'); // Вводим cvv карты
         cy.get('.payment_form_card_form_input_last > .style_1_base_input').type('ivanov ivan'); // Вводим имя владельца карты
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // Найти кнопку оплатить и нажать на нее
         cy.wait(2000); // ждем 2 секунды

         cy.get('input.style_1_base_input').type('56456'); // Вводим код подтверждения
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();
         cy.get('.payment_status_top_title').contains('Покупка прошла успешно').should('be.visible'); // Проверить, код отправлен и вижу текст 

     })
 }) 