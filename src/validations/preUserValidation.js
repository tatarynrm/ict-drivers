import * as Yup from 'yup'

export const validatePreUserCreate = Yup.object({
    company:Yup.string().required(`Вкажіть назву компанії або код ЄДРПОУ`).max(40,'Забагато символів'),
    email: Yup.string().required('Вкажіть E-mail').max(60,'Забагато символів').email('Неприпустимий формат e-mail'),
    pwd: Yup.string().required('Вкажіть пароль').min(7,'Занадто слабкий пароль').max(60,'Забагато символів') ,
    name:Yup.string().required(`Вкажіть ім'я`).max(20,'Забагато символів'),
    last_name:Yup.string().required(`Вкажіть по-батькові`).max(20,'Забагато символів'),
    surname:Yup.string().required(`Вкажіть прізвище`).max(20,'Забагато символів'),
    phone_number: Yup.string().matches(/^[0-9]{10}$/, "Номер телефону повинен складатися з 10 цифр").required(`Обов'язкове поле`),
})