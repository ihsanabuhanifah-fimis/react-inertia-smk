import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { styles } from "../styles";
import { InertiaLink } from "@inertiajs/inertia-react";
const Login = ({ errors, message }) => {
    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    const [values, setValues] = React.useState({
        email: "",
        password: "",
    });
    const [error] = React.useState({
       
        email: "",
        password: "",
      
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
            case "password":
                error.password =
                    value === ""
                        ? "Password tidak boleh kosong"
                        : value.length < 8
                        ? "Password minimal 8 karakter"
                        : "";
                break;
            
        }
    };

    const buttonDisabled = () => {
        
        if (
            values.name === "" || 
            regExp.test(values.email) === false ||
           
         
            values.password === "" || 
            values.password.length < 8
           
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
       
        Inertia.post('/login', formData, {
            onSuccess: () => {
                swal(
                    "Good job!",
                    "Alhamdulilah user berhasil ditambahkan",
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
                        <h1 className="text-4xl font-bold mb-3">Log In.</h1>
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
                        <label
                            className={styles.classNameLabel}
                            htmlFor="password"
                        >
                            password
                        </label>
                        <input
                            type="text"
                            className={styles.classNameInput}
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="At Lease 8 Characters ...."
                        />
                        {errors.password && (
                            <div className={styles.classNameAlert}>
                                {errors.password}
                            </div>
                        )}
                        <div className={styles.classNameAlert}>
                            {error.password}
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
                                    Login
                                </button>
                            </div>
                            <div className="text-center mt-3">
                            <p className="font-semibold mb-2">  Dont't have an account?<InertiaLink href={route('register')}  className="text-purple-700"> Sign Up</InertiaLink></p>
                            <InertiaLink href={route('password.request')}><p className="font-semibold mb-2 text-purple-700">Forgot Password?</p></InertiaLink>
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

export default Login;
