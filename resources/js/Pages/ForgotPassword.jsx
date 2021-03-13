import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { styles } from "../styles";
import { InertiaLink } from "@inertiajs/inertia-react";
import swal from "sweetalert";
const ForgotPassword = ({ errors, message }) => {
    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    const [values, setValues] = React.useState({
        email: "",
        
    });
    const [error] = React.useState({
       
        email: "",
        
    });
    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
        switch (key) {
          
            case "email":
                error.email =
                    value === ""
                        ? "email tidak boleh kosong"
                        : regExp.test(value)
                        ? ""
                        : "Format email invalid";
                break;
            
            
        }
    };

    const buttonDisabled = () => {
        
        if (
            values.name === "" || 
            regExp.test(values.email) === false
           
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
       
        Inertia.post(route('password.email'), formData, {
            onSuccess: () => {
                swal(
                    "Good job!",
                    "Silahkan periksan email anda",
                    "success"
                );
            },
        });
    };
   
    return (
        <React.Fragment>
            <div className="flex h-screen border  ">
                <div id="page1" className={`w-4/5 flex items-center order-1 px-20`}>
                    <div className=" w-full">
                        <h1 className="text-4xl font-bold mb-3 capitalize">forgot Password</h1>
                        <p className="text-gray-500 font-lg  mb-10">Log in with your data that entered during <br/>your registration</p>
                        <div>{errors?.message}</div>
                        <form onSubmit={handleSubmit} >
                        <div>
                        <label className={styles.classNameLabel} htmlFor="email">
                            email
                        </label>
                        <input
                            type="text"
                            className={styles.classNameInput}
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="example@example.com"
                        />
                        {errors.email && (
                            <div className={styles.classNameAlert}>
                                {errors.email}
                            </div>
                        )}
                        <div className={styles.classNameAlert}>
                            {error.email}
                        </div>
                    </div>
                    
                            <div>
                                <button
                                    type="submit"
                                    disabled={buttonDisabled()}
                                    className={styles.classNameButton(
                                        `${
                                            buttonDisabled()
                                                ? "bg-purple-300"
                                                : "bg-purple-700"
                                        }`
                                    )}
                                    
                                >
                                    ForgotPassword
                                </button>
                            </div>
                            <div className="text-center mt-3">
                          
                            <InertiaLink href={route('login')}><p className="font-semibold mb-2 text-purple-700">Back to Login</p></InertiaLink>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="page2" className={`h-full w-full bg-purple-700 order-2`}>
                   
                   
                </div>
            </div>
        </React.Fragment>
    );
};

export default ForgotPassword;
