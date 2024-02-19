import React from "react";
import { recipes } from "../Data";

const Recipe = () => {
    return (
        <div className="section" id="recipe">
            <div className="flex flex-col items-center">
                <div className="text-3xl text-center font-bold mb-16">
                    Los más vendidos
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16 bg-gray-50">
                    {recipes.map((recipe) => {
                        return (
                            <div
                                className=" p-4 shadow-lg hover:shadow transition-all duration-300 cursor-pointer"
                                key={recipe.id}
                            >
                                <img src={recipe.image} alt="" className="rounded-lg mb-4" />
                                <div className="mb-4">
                                    <div className="md:text-xl text-[1rem] font-semibold">
                                        {recipe.name}
                                    </div>
                                </div>
                                <p className="text-[0.85rem] opacity-70 mb-4">
                                    {recipe.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-semibold">{recipe.price}</span>
                                    <span className="cursor-pointer p-3 btn">Add to Cart</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="btn cursor-pointer">View All Recipes</div>
            </div>
        </div>
    );
};

export default Recipe;