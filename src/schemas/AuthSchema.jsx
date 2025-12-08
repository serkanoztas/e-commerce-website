import * as yup from 'yup';

export const AuthSchema = yup.object().shape({
    email: yup.string().email("geçerli Email adresi giriniz").required("Email adresi zorunlu"),
    name: yup.string().required("İsim kısmı zorunlu"),
    password: yup.string().required("şifre alanı zorunlu"),

})