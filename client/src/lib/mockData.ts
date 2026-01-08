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

import {
  Pill,
  Droplets,
  Bandage,
  Stethoscope,
} from "lucide-react";

/* =======================
   CATEGORIES (SAME NAMES)
   ======================= */
   export const categories = [
  {
    id: "PHARMACEUTICAL MEDICINE",
    name: "Pharmaceutical Medicine",
    image: "/categories/pharmaceutical-medicines.png",
    slug: "pharma"
  },
  {
    id: "IV FLUIDS & SOLUTIONS",
    name: "IV Fluids & Solutions",
    image: "/categories/iv-fluids-solutions.png",
    slug: "iv-fluids"
  },
  {
    id: "MEDICAL CONSUMABLES & DISPOSABLES",
    name: "Medical Consumables",
     image: "/categories/medical-consumables-disposables.png",
    slug: "consumables"
  },
  {
    id: "SURGICAL & DIAGNOSTIC PRODUCTS",
    name: "Surgical & Diagnostic",
    image: "/categories/surgical-diagnostic-products.png",
    slug: "surgical"
  }
];

/* =======================
   MEDICINES (SAMPLE DATA)
   ======================= */
export const medicines = [
  {
    id: "pharma-1",
    name: "Paracetamol 500mg Tablets",
    category: "PHARMACEUTICAL MEDICINE",
    description: "Analgesic and antipyretic for pain relief and fever",
    price: 45,
    discount: 10,
    image: "https://images.unsplash.com/photo-1585399822294-7d8b21a39309?w=300",
  },
  {
    id: "pharma-2",
    name: "Azithromycin 500mg Tablets",
    category: "PHARMACEUTICAL MEDICINE",
    description: "Macrolide antibiotic for infections",
    price: 135,
    discount: 15,
    image: "https://images.unsplash.com/photo-1585399822294-7d8b21a39309?w=300",
  },
  {
    id: "iv-1",
    name: "Normal Saline 500ml",
    category: "IV FLUIDS & SOLUTIONS",
    description: "0.9% sodium chloride IV fluid",
    price: 65,
    discount: 5,
    image: "https://images.unsplash.com/photo-1612872087726-e7f06072b2d9?w=300",
  },
  {
    id: "consumables-1",
    name: "Disposable Syringes (Pack of 10)",
    category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Sterile disposable syringes",
    price: 85,
    discount: 15,
    image: "https://images.unsplash.com/photo-1586345086576-72e5fb0c5bbd?w=300",
  },
  {
    id: "surgical-1",
    name: "Digital BP Monitor",
    category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Automatic blood pressure monitor",
    price: 2499,
    discount: 20,
    image: "https://images.unsplash.com/photo-1582683892064-b18d9d6f1a71?w=300",
  },
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
