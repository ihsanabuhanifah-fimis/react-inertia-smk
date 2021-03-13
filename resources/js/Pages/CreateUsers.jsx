import React from "react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import { Inertia } from "@inertiajs/inertia";
import swal from "sweetalert";
import Avatar from "../../../public/images/avatar.jpg";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
const CreateUsers = ({ errors, editUsers }) => {
    console.log(errors);
    console.log(editUsers);
    const imageRef = React.useRef();
    const [image, setImage] = React.useState(base_url + "/" + editUsers?.image || "");
    const [values, setValues] = React.useState({
        name: editUsers?.name || "",
        email: editUsers?.email || "",
        password: "",
        password_confirmation: "",
    });

    const [error] = React.useState({
        name: "",
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
            case "name":
                error.name = value === "" ? "Nama tidak boleh kosong" : "";
                break;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        formData.append("image", imageRef.current.files[0]);
        Inertia.post(route("users.store"), formData, {
            onSuccess: () => {
                swal(
                    "Good job!",
                    "Alhamdulilah user berhasil ditambahkan",
                    "success"
                );
            },
        });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", editUsers.id)
        for (let key in values) {
            formData.append(key, values[key]);
        }
        formData.append("image", imageRef.current.files[0]);
        formData.append("_method" , "put")
        Inertia.post(route("users.update", editUsers.id), formData, {
            onSuccess: () => {
                swal(
                    "Good job!",
                    "Alhamdulilah user berhasil ditambahkan",
                    "success"
                );
            },
        });
    };
    const styles = {
        classNameInput:
            "border py-2 w-full px-2 mb-3 bg-gray-200 focus:bg-blue-400",
        classNameLabel: "text-md text-gray-300 mb-2 font-semibold uppercase",
        classNameAlert: "text-sm text-red-600 font-bold",
    };

    const buttonDisabled = () => {
        if (
            values.name === "" ||
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

    const buttonDisabledUpdate = () => {
        if (
            values.name === "" ||
            values.email === ""
           
        ) {
            return true;
        }  else {
            return false;
        }
    };

  
    const handleUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Create Users</title>
            </Helmet>

            <div>
                <div>
                    <h1 className="text-center text-2xl font-bold mb-3">
                        {editUsers
                            ? "Form Update Users"
                            : "Form Registrasi Users"}
                    </h1>
                </div>
                <div>
                    <SimpleReactLightbox>
                        <SRLWrapper>
                            <img
                                className="w-32 h-32 mx-auto border border-black overflow-hidden rounded-full"
                                src={image === "" ? Avatar : image}
                                alt="avatar.png"
                            />
                        </SRLWrapper>
                    </SimpleReactLightbox>
                </div>
                <form
                    onSubmit={editUsers ? handleUpdate : handleSubmit}
                    action="post"
                    encType="multipart/form-data"
                >
                    <div>
                        <label className={styles.classNameLabel} htmlFor="name">
                            name
                        </label>
                        <input
                            type="text"
                            className={styles.classNameInput}
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Name ...."
                        />
                        {errors.name && (
                            <div className={styles.classNameAlert}>
                                {errors.name}
                            </div>
                        )}
                        <div className={styles.classNameAlert}>
                            {error.name}
                        </div>
                    </div>
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
                    {editUsers ? (
                        ""
                    ) : (
                        <div>
                            {" "}
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
                        </div>
                    )}
                    <div>
                        <label
                            className={styles.classNameLabel}
                            htmlFor="image"
                        >
                            image
                        </label>
                        <input
                            type="file"
                            className={styles.classNameInput}
                            id="image"
                            ref={imageRef}
                            onChange={handleUpload}
                        />
                        {errors.image && (
                            <div className={styles.classNameAlert}>
                                {errors.image}
                            </div>
                        )}
                        <div className={styles.classNameAlert}>
                            {error.image}
                        </div>
                    </div>
                    <div>
                        <button
                            className={`w-full ${
                                (editUsers ? buttonDisabledUpdate() : buttonDisabled()) ? "bg-blue-200" : "bg-blue-500"
                            } text-white text-lg font-semibold py-1 mt-2`}
                            type="submit"
                            disabled={editUsers ? buttonDisabledUpdate() : buttonDisabled()}
                        >
                           {editUsers ? "update" :'register'}
                        </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};
CreateUsers.layout = (page) => <Layout children={page} />;
export default CreateUsers;
