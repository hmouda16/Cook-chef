import styles from "./RecipeForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { ApiContext } from "../../../../context/ApiContext";

function RecipeForm() {

    const BASE_URL_API = useContext(ApiContext);

    const defaultValues = {
        title: "",
        image: "",
    };

    const recipeSchema = yup.object({
        title: yup.string()
        .required("Veuillez renseigner le titre de la recette")
        .min(10, "Le titre de la recette doit contenir au moins 10 caractères"),
        image: yup
        .string()
        .required("Veuillez renseigner l'image de la recette")
        .url("L'image de la recette doit contenir une url valide"),
    })

    const {formState: {errors, isSubmitted},
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        }= useForm({
        defaultValues,
        resolver: yupResolver(recipeSchema),
    });

    async function submit(values) {
        try {
            clearErrors();
            const response = await fetch(`${BASE_URL_API}/recipes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),   
            })
            if (response.ok) {
                reset(defaultValues);
            } else {
                setError("generic", {
                    type: "server",
                    message: "Une erreur est survenue",
                });
            }
        } catch (error) {
            setError("generic", {
                type: "server",
                message: "Une erreur est survenue",
            })
        }
        
    }
    
    return (
        <form onSubmit={handleSubmit(submit)} className={`d-flex flex-column card p-20 ${styles.recipeForm}`}>
            <h2 className="mb-20">Ajouter une recette</h2>
            <div className="d-flex flex-column mb-20">
                <label htmlFor="">Titre de la recette</label>
                <input {...register("title")} type="text" />
                { errors.title && <p className="form-error">{errors.title.message}</p>}
            </div>
             <div className="d-flex flex-column mb-20">
                <label htmlFor="">Image pour la recette</label>
                <input {...register("image")} type="text" />
                { errors.image && <p className="form-error">{errors.image.message}</p>}
            </div>
            { errors.generic && <p className="form-error">{errors.generic.message}</p>}
            <div>
                <button disabled={isSubmitted} className="btn btn-primary">Sauvegarder</button>
            </div>

        </form>
    );
}

export default RecipeForm;