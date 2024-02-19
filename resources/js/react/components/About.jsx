import React from "react";
import { FaArrowRight } from "react-icons/fa";
import pasta from "../assets/pasta.png";
import chef from "../assets/chefPablo.png";

const About = () => {
    return (
        <div className="section" id="about">
            <div className="grid md:grid-cols-2 items-center mb-10">
                <div className="flex flex-col justify-center items-start gap-6">
                    <div className="sm:text-3xl text-xl font-bold mb-6">
                        Comidas de todo el mundo
                    </div>
                    <p className="text-sm opacity-70">             
                    Disfrute de una experiencia culinaria única en nuestro restaurante, donde fusionamos la auténtica esencia de la comida estadounidense con la delicadeza de platos orientales como el Pad Thai. Nuestro menú diverso y delicioso le ofrece la oportunidad de explorar sabores que van desde hamburguesas suculentas hasta exquisitas opciones asiáticas, brindándole un festín gastronómico que satisfará todos los paladares. Sumérjase en la fusión perfecta de lo occidental y lo oriental en cada bocado.
                    </p>
                    <div className="btn">
                        <a href="" className="text-white text-[0.85rem]">
                            Sigue explorando
                        </a>
                        <FaArrowRight className="text-white" />
                    </div>
                </div>
                <div className="md:row-start-1">
                    <img src={pasta} alt="" />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="">
                    <div className="sm:text-3xl text-xl font-bold mb-6">
                    Nuestro equipo de chefs registrados y profesionales culinarios con habilidades especializadas proporciona servicios de cocina a domicilio.
                    </div>
                    <p className="text-sm opacity-70">                      
                        Desde la propia página web le invitamos a reservar una mesa para disfrutar de nuestra experiencia gastronómica excepcional. Garantizamos un ambiente acogedor y platos exquisitamente preparados para que su visita sea inolvidable.
                    </p>
                </div>
                <div className="">
                    <img src={chef} alt="" />
                </div>
            </div>
        </div>
    );
};

export default About;