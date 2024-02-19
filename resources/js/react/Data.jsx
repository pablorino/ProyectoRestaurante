import { BiMap } from "react-icons/bi";
import { CiBurger } from "react-icons/ci";
import { GiBowlOfRice, GiCakeSlice } from "react-icons/gi";
import { FaIceCream } from "react-icons/fa";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { MdExplore, MdContactPage } from "react-icons/md";


import recipe1 from "./assets/recipe1.jpg";
import recipe2 from "./assets/recipe2.jpg";
import recipe3 from "./assets/recipe3.jpg";
import recipe4 from "./assets/recipe4.jpg";
import recipe5 from "./assets/recipe5.jpg";
import recipe6 from "./assets/recipe6.jpg";

import payment1 from "./assets/payment1.png";
import payment2 from "./assets/payment2.png";
import payment3 from "./assets/payment3.png";
import payment4 from "./assets/payment4.png";



export const heroIcons = [
  <CiBurger />,
  <FaIceCream />,
  <GiCakeSlice />,
  <GiBowlOfRice />,
];

export const recipes = [
  {
    id: 1,
    image: recipe1,
    name: "Arroz vietnamita",
    price: "$20",
    description: "Arroz vietnamita es un plato delicioso que combina arroz fragante con sabores únicos de la cocina vietnamita. ¡Una experiencia culinaria que no querrás perderte!"
  },
  {
    id: 2,
    image: recipe2,
    name: "Pasta boloñesa",
    price: "$13",
    description: "La pasta boloñesa es un clásico italiano que combina una salsa rica y sabrosa de carne con pasta al dente. Un plato reconfortante que satisface los antojos de pasta."
  },
  {
    id: 3,
    image: recipe3,
    name: "Espaguetis a la marinera",
    price: "$17",
    description: "Espaguetis a la marinera es una opción deliciosa para los amantes del marisco. La combinación de pasta, salsa marinera y mariscos frescos crea una explosión de sabores en cada bocado."
  },
  {
    id: 4,
    image: recipe4,
    name: "Pollo en salsa picante",
    price: "$22",
    description: "El pollo en salsa picante es una opción audaz para aquellos que disfrutan de un toque de picante en sus platos. Jugoso pollo cocido a la perfección con una salsa picante que deleitará tu paladar."
  },
  {
    id: 5,
    image: recipe5,
    name: "Nuestro ramen",
    price: "$14",
    description: "Nuestro ramen es una deliciosa mezcla de fideos, caldo aromático y ingredientes frescos. Un tazón reconfortante que te transportará a la auténtica experiencia de la cocina asiática."
  },
  {
    id: 6,
    image: recipe6,
    name: "Combo chino",
    price: "$20",
    description: "El combo chino es una selección variada de platos chinos auténticos. Desde entrantes hasta platos principales, este combo te ofrece una experiencia completa de la diversidad culinaria china."
  },
];

export const footerSocials = [<BsFacebook />, <BsInstagram />, <BsTwitter />];
export const footerContacts = [
  {
    id: 1,
    icon: <HiOutlinePhone />,
    text: "+957-044-665",
  },
  {
    id: 2,
    icon: <HiOutlineMail />,
    text: "rinosZone@gmail.com",
  },
  {
    id: 3,
    icon: <BiMap />,
    text: "Av. del Gran Capitán, 37",
  },
];

export const mainMenu = [
  {
    id: 1,
    href: "home",
    text: "Home",
    icon: <AiFillHome />,
  },
  {
    id: 2,
    href: "about",
    text: "About",
    icon: <MdExplore />,
  },
  {
    id: 3,
    href: "recipe",
    text: "Recipe",
    icon: <GiBowlOfRice />,
  },
  {
    id: 4,
    href: "contact",
    text: "Contact",
    icon: <MdContactPage />,
  },
];

export const explores = ["Drinks", "Burger", "Salad", "Breakfast", "Dinner"];

export const payements = [payment1, payment2, payment3, payment4];
