import heroImage from '@assets/stock_images/doctor_holding_medic_55ff35f7.jpg';
import painReliefImage from '@assets/stock_images/pain_relief_medicine_d2647b75.jpg';
import antibioticsImage from '@assets/stock_images/antibiotics_pills_or_59eebcce.jpg';
import allergyImage from '@assets/stock_images/allergy_sneeze_or_me_5f5c2ed4.jpg';
import vitaminsImage from '@assets/stock_images/vitamins_supplements_c4ec7750.jpg';
import firstAidImage from '@assets/stock_images/first_aid_kit_c8baff9b.jpg';
import orthopedicsImage from '@assets/stock_images/orthopedics_knee_pai_afa4e59b.jpg';
import babyCareImage from '@assets/stock_images/baby_and_child_care__67a578bc.jpg';
import diabetesImage from '@assets/stock_images/diabetes_glucometer__b08b77ed.jpg';
import labTestImage from '@assets/stock_images/lab_test_blood_sampl_ace20133.jpg';

export const assets = {
  hero: heroImage,
  lab: labTestImage,
};

export const categories = [
  { id: 1, name: "Pain Relief", image: painReliefImage, slug: "pain-relief" },
  { id: 2, name: "Antibiotics", image: antibioticsImage, slug: "antibiotics" },
  { id: 3, name: "Allergy", image: allergyImage, slug: "allergy" },
  { id: 4, name: "Vitamins", image: vitaminsImage, slug: "vitamins" },
  { id: 5, name: "First Aid", image: firstAidImage, slug: "first-aid" },
  { id: 6, name: "Orthopedics", image: orthopedicsImage, slug: "orthopedics" },
  { id: 7, name: "Baby & Child Care", image: babyCareImage, slug: "baby-child" },
  { id: 8, name: "Diabetes", image: diabetesImage, slug: "diabetes" },
];

export const medicines = [
  { id: 101, name: "Aspirin 325mg", category: "Pain Relief", price: 25.00, discount: 10, description: "14 tablets", image: painReliefImage },
  { id: 102, name: "Amoxicillin 500mg", category: "Antibiotics", price: 45.00, discount: 5, description: "10 capsules", image: antibioticsImage },
  { id: 103, name: "Cetirizine 10mg", category: "Allergy", price: 18.00, discount: 0, description: "15 tablets", image: allergyImage },
  { id: 104, name: "Multivitamin Complex", category: "Vitamins", price: 120.00, discount: 15, description: "60 tablets", image: vitaminsImage },
  { id: 105, name: "Bandages Pack", category: "First Aid", price: 30.00, discount: 0, description: "Pack of 20", image: firstAidImage },
  { id: 106, name: "Knee Support", category: "Orthopedics", price: 350.00, discount: 20, description: "Size M", image: orthopedicsImage },
  { id: 107, name: "Baby Lotion", category: "Baby & Child Care", price: 180.00, discount: 10, description: "200ml", image: babyCareImage },
  { id: 108, name: "Glucometer Strips", category: "Diabetes", price: 450.00, discount: 5, description: "50 strips", image: diabetesImage },
  { id: 109, name: "Ibuprofen 400mg", category: "Pain Relief", price: 35.00, discount: 10, description: "10 tablets", image: painReliefImage },
  { id: 110, name: "Vitamin C 500mg", category: "Vitamins", price: 80.00, discount: 10, description: "30 tablets", image: vitaminsImage },
];

export const labTests = [
  { id: 201, name: "Complete Blood Count", category: "Haematology", price: 400, description: "Includes Haemoglobin, RBC, WBC, Platelets", image: labTestImage },
  { id: 202, name: "Diabetes Screening", category: "Diabetes", price: 350, description: "HbA1c and Fasting Blood Sugar", image: diabetesImage },
  { id: 203, name: "Thyroid Profile", category: "Hormones", price: 600, description: "T3, T4, TSH", image: labTestImage },
  { id: 204, name: "Liver Function Test", category: "Liver", price: 800, description: "SGOT, SGPT, Bilirubin", image: labTestImage },
  { id: 205, name: "Full Body Checkup", category: "Health Package", price: 1500, description: "70+ Tests included", image: heroImage },
  { id: 206, name: "Vitamin D Test", category: "Vitamins", price: 900, description: "25-OH Vitamin D Total", image: vitaminsImage },
];

export const testimonials = [
  { id: 1, name: "Neha Singh", city: "Gurgaon", rating: 5, text: "I used to wait hours for my medicines from other apps. With KwikMedi, it's hassle-free. I get updates in real time and the delivery is always on time." },
  { id: 2, name: "Arjun Kumar", city: "Gurgaon", rating: 5, text: "What I love most is the accuracy. The pharmacist verified my prescription before dispatch, which gave me confidence that I was getting the right medicines." },
  { id: 3, name: "Priya Rai", city: "Delhi NCR", rating: 4, text: "Booked a full body checkup through KwikMedi. The phlebo arrived at home on time, was professional, and I got my reports within 12 hours. Excellent experience!" },
];
