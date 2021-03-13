import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { styles } from "../styles";
import swal from "sweetalert";
import { InertiaLink } from "@inertiajs/inertia-react";
const parsePage = (path) => path.split('/')
const ResetPassword = ({ errors, message, request }) => {
    const url = parsePage(window.location.pathname)
    console.log(url);
    const [values, setValues] = React.useState({
        token: url[2],
        email: request.email,
        password: "",
        password_confirmation: "",
    });
    const [error] = React.useState({
      
        email: "",
        password: "",
        password_confirmation: "",
    });

    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
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
                        ? "Nama tidak boleh kosong"
                        : value.length < 8
                        ? "Password minimal 8 karakter"
                        : "";
                break;
            case "password_confirmation":
                error.password_confirmation =
                    value === ""
                        ? "Nama tidak boleh kosong"
                        : value.length < 8
                        ? "Password Confrimation minimal 8 karakter"
                        : "";
                break;
        }
    };
    const buttonDisabled = () => {
        if (
           
            values.email === "" ||
            values.password === "" ||
            values.password_confirmation === ""
        ) {
            return true;
        } else if (values.password !== values.password_confirmation) {
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
       
        Inertia.post(route('password.update'), formData, {
            onSuccess: () => {
                swal(
                    "Good job!",
                    "Alhamdulilah password berhasild i reset, silahkan login",
                    "success"
                );
            },
        });
    };

    return (
        <React.Fragment>
            <div className="flex h-screen border  ">
                <div
                    id="page1"
                    className={`w-4/5 flex items-center order-2 px-20`}
                >
                    <div className=" w-full">
                        <h1 className="text-4xl font-bold mb-3">ResetPassword.</h1>
                        <p className="text-gray-500 font-lg  mb-10">
                            Please ResetPassword here
                        </p>
                        <div>{errors?.message}</div>
                        <form onSubmit={handleSubmit}>
                            
                            <div>
                                <label
                                    className={styles.classNameLabel}
                                    htmlFor="email"
                                >
                                    email
                                </label>
                                <input
                                    type="text"
                                    className={styles.classNameInput}
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Email ...."
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
                                    placeholder="Password ...."
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
                                <label
                                    className={styles.classNameLabel}
                                    htmlFor="password_confirmation"
                                >
                                    password confirmation
                                </label>
                                <input
                                    type="text"
                                    className={styles.classNameInput}
                                    id="password_confirmation"
                                    value={values.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Password Confirmation ...."
                                />
                                {errors.password_confirmation && (
                                    <div className={styles.classNameAlert}>
                                        {errors.password_confirmation}
                                    </div>
                                )}
                                <div className={styles.classNameAlert}>
                                    {error.password_confirmation}
                                </div>
                                <div className={styles.classNameAlert}>
                                    {values.password !==
                                    values.password_confirmation
                                        ? "Password dan Password Confirmation tidak sama"
                                        : ""}
                                </div>
                            </div>
                            <div>
                                <button
                                    disabled={buttonDisabled()}
                                    className={styles.classNameButton(
                                        `${
                                            buttonDisabled()
                                                ? "bg-purple-300"
                                                : "bg-purple-700"
                                        }`
                                    )}
                                    type="submit"
                                >
                                    ResetPassword
                                </button>
                            </div>
                            <div className="text-center mt-3">
                                <InertiaLink
                                    href={route("login")}
                                    className="text-purple-700 font-semibold mb-2"
                                >
                                    Back to Login
                                </InertiaLink>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    id="page2"
                    className={`h-full w-full bg-purple-700 order-1`}
                ></div>
            </div>
        </React.Fragment>
    );
};

export default ResetPassword;
