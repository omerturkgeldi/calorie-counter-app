import * as yup from 'yup'

let productValidations = yup.object().shape({
    barcodeNo: yup.string().min(8, 'Barkod numarası 8 basamaktan az olamaz!').required("Barkod numarası girmek zorunludur!"),
    productName: yup.string().required("Ürün ismi girmek zorunludur!"),
    kcal: yup.number().min(0, "Kalori değeri 0'dan küçük olamaz!").required("Kalori girmek zorunludur!"),
    carb: yup.number().min(0, "Karbonhidrat değeri 0'dan küçük olamaz!"),
    protein: yup.number().min(0, "Protein değeri 0'dan küçük olamaz!"),
    fat: yup.number().min(0, "Yağ değeri 0'dan küçük olamaz!"),
    portionSize: yup.number().min(0, "Porsiyon Miktarı 0'dan küçük olamaz!"),
});

let foodValidations = yup.object().shape({
    foodName: yup.string().required("Yemek ismi girmek zorunludur!"),
    kcal: yup.number().min(0, "Kalori değeri 0'dan küçük olamaz!").required("Kalori girmek zorunludur!"),
    carb: yup.number().min(0, "Karbonhidrat değeri 0'dan küçük olamaz!"),
    protein: yup.number().min(0, "Protein değeri 0'dan küçük olamaz!"),
    fat: yup.number().min(0, "Yağ değeri 0'dan küçük olamaz!"),
});

export default { productValidations, foodValidations };
