'use strict';

const wrapReg = document.querySelector('.wrap-registration');
const wrapAuto = document.querySelector('.wrap-autorisation');


const formReg = document.getElementById(`form-registration`);
const formAuto = document.getElementById('form-autorisation');


const linkReg = document.querySelector('.registration-link');
const linkAuto = document.querySelector('.autorization-link');


const emailReg = document.getElementById(`email-registration`);

const submitReg = document.getElementById(`submit-registration`);
const submitAuto = document.getElementById(`submit-autorisation`);

const checkboxReg = document.querySelector('.form-checkbox__reg');
const checkboxAuto = document.querySelector('.form-checkbox__auto');


linkReg.addEventListener('click', () => {
   wrapReg.style.display = 'block';
   wrapAuto.style.display = 'none';
})
linkAuto.addEventListener('click', () => {
   wrapReg.style.display = 'none';
   wrapAuto.style.display = 'block';
})



submitReg.addEventListener('click', (e) => {
   e.preventDefault();

   let countNotValidateImputs = 0;

   let userData = {};

   const arrInputsForms = document.querySelectorAll(`[groupe="validate"]`);

   arrInputsForms.forEach(inputFormReg => {

      const input = inputFormReg.querySelector("input");
      const label = inputFormReg.querySelector("label");
      const img = inputFormReg.querySelector("span");
      const errorText = inputFormReg.querySelector(".warning");

      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailValid = re.test(String(input.value).toLowerCase());


      switch (input.type) {
         case 'email':
            if (input.value === '') {
               label.classList.add('label__color');
               input.classList.add('form-input_error');
               img.classList.add('label__color');
               errorText.style.opacity = `1`;
               countNotValidateImputs++
            } else if (!emailValid) {
               label.classList.add('label__color');
               input.classList.add('form-input_error');
               img.classList.add('label__color');
               errorText.style.opacity = `1`;
               errorText.textContent = "Email невалидный";
               countNotValidateImputs++
            } else {
               label.classList.remove('label__color');
               input.classList.remove('form-input_error');
               img.classList.remove('label__color');
               errorText.style.opacity = `0`;
               userData.email = input.value;
            }
            break;
         case 'password':
            if (input.value.length === 0) {
               label.classList.add('label__color');
               input.classList.add('form-input_error');
               img.classList.add('label__color');
               errorText.style.opacity = `1`;
               countNotValidateImputs++
            } else if (input.value.length > 0 && input.value.length < 8) {
               label.classList.add('label__color');
               input.classList.add('form-input_error');
               img.classList.add('label__color');
               errorText.style.opacity = `1`;
               errorText.textContent = "Пароль должен содержать как минимум 8 символов";
               countNotValidateImputs++
            } else {
               label.classList.remove('label__color');
               input.classList.remove('form-input_error');
               img.classList.remove('label__color');
               errorText.style.opacity = `0`;
               userData.password = input.value;
            }
            break;
         case 'checkbox':
            if (!input.checked) {
               checkboxReg.classList.add('colored');
               img.classList.add('label__color');
               errorText.style.opacity = `1`;
               countNotValidateImputs++
            } else {
               checkboxReg.classList.remove('colored');
               img.classList.remove('label__color');
               errorText.style.opacity = `0`;
            }
            break;
      }
   });

   if (countNotValidateImputs === 0) {

      if (localStorage.getItem('userData')) {
         console.log(userData);
         let arrUsers = JSON.parse(localStorage.getItem('userData'));
         arrUsers.push({
            'email': userData.email,
            'password': userData.password
         })

         localStorage.setItem('userData', JSON.stringify(arrUsers));
         alert('Регистрация прошла успешно! Теперь авторизируйтесь.');

      } else {
         localStorage.setItem('userData', JSON.stringify([{
            'email': userData.email,
            'password': userData.password
         }]));
         alert('Регистрация прошла успешно! Теперь авторизируйтесь.');
      }
   }
})



submitAuto.addEventListener('click', (e) => {
   e.preventDefault();

   let countNotValidateImputs = 0;

   let userAutoData = {};

   const arrInputsForms = document.querySelectorAll(`[groupe="validate-auto"]`);

   arrInputsForms.forEach(inputFormAuto => {
      const input = inputFormAuto.querySelector("input");
      const label = inputFormAuto.querySelector("label");
      const img = inputFormAuto.querySelector("span");
      const errorText = inputFormAuto.querySelector(".warning");

      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailValid = re.test(String(input.value).toLowerCase());

      switch (input.type) {
         case 'email':
            if (input.value === '') {
               label.classList.add('label__color');
               input.classList.add('form-input_error');
               img.classList.add('label__color');
               errorText.style.opacity = `1`;
               countNotValidateImputs++
            } else if (!emailValid) {
               label.classList.add('label__color');
               input.classList.add('form-input_error');
               img.classList.add('label__color');
               countNotValidateImputs++
            } else {
               label.classList.remove('label__color');
               input.classList.remove('form-input_error');
               img.classList.remove('label__color');
               errorText.style.opacity = `0`;
               userAutoData.email = input.value;
            }
            break;
         case 'password':
            if (input.value.length === 0) {
               label.classList.add('label__color');
               input.classList.add('form-input_error');
               img.classList.add('label__color');
               errorText.style.opacity = `1`;
               countNotValidateImputs++
            } else if (input.value.length > 0 && input.value.length < 8) {
               label.classList.add('label__color');
               input.classList.add('form-input_error');
               img.classList.add('label__color');
               errorText.style.opacity = `1`;
               errorText.textContent = "Логин или Пароль невереный";
               countNotValidateImputs++
            } else {
               label.classList.remove('label__color');
               input.classList.remove('form-input_error');
               img.classList.remove('label__color');
               errorText.style.opacity = `0`;
               userAutoData.password = input.value;
            }
            break;
         case 'checkbox':
            if (!input.checked) {
               checkboxReg.classList.add('colored');
               img.classList.add('label__color');
               errorText.style.opacity = `1`;
               countNotValidateImputs++
            } else {
               checkboxReg.classList.remove('colored');
               img.classList.remove('label__color');
               errorText.style.opacity = `0`;
            }
            break;
      }
   });

   if (countNotValidateImputs === 0) {

      let usersLocal = JSON.parse(localStorage.getItem('userData'));
      console.log(usersLocal);
      usersLocal.filter((userLocal) => {
         if ((userLocal.email === userAutoData.email) && (userLocal.password === userAutoData.password)) {
            alert('Авторизация прошла успешно!');
         } else {
            alert('Пожалуйста, зарегистрируйтесь!');
         }
      })
   }
})