import React from "react";

import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { styles } from "../styles";
import { InertiaLink } from "@inertiajs/inertia-react";
import Modal from "../components/Modals"
import axios from "axios";

const TwoFactorAuth = (props) => {
    const [password, setPassword] = React.useState('')
    
    console.log(props);
   
    return (
        <div>
            <Helmet>
                <title>Two Factor auth</title>
            </Helmet>

           <div className="mb-5 font-bold">
               Your Two actor Authentocatoin : {props.user.two_factor_secret === null ? (<span className="bg-red-500 px-4 py-2 rounded-sm font-bold text-white">Disable</span>) : (<span className="bg-green-500 px-4 py-2 rounded-sm font-bold text-white">Enable</span>)} 
           </div>
           
           {props.user.two_factor_secret !== null ? "" : (<div> <div className="flex flex-col justify-center mt-10 mb-4">
                <div className="items-center">
                    {props.qrCode && (
                        <span dangerouslySetInnerHTML={{ __html: props.qrCode }} />
                    )}
                </div>
                <div className="items-center">
                    <p className="text-xl">Your Recovery Code</p>
                    <ol>
                        {props.recovery.map((code) => (
                            <li key={code}>{code}</li>
                        ))}
                    </ol>
                </div>
            </div></div>)}

            {props.user.two_factor_secret === null ? (
                <InertiaLink
                    className={styles.classNameButton("bg-green-400")}
                    href="/user/two-factor-authentication"
                    method="post"
                    as="button"
                    type="button"
                >
                    Enable
                </InertiaLink>
            ) : (
                <InertiaLink
                    className={styles.classNameButton("bg-red-400")}
                    href="/user/two-factor-authentication"
                    method="delete"
                    as="button"
                    type="button"
                >
                    Disable
                </InertiaLink>
            )}

            <div className="absolute z-10 w-full h-full">
                {props.password_confirm ? (<form>
                    <input value={password} onChange={(e)=> {
                        setPassword(e.target.value)
                    }} className={styles.classNameInput} type="text"/>
                  <InertiaLink
                    className={styles.classNameButton("bg-red-400")}
                    href="/user/confirm-password"
                    method="post"
                    data={{password : password}}
                    as="button"
                    type="button"
                >
                    Disable
                </InertiaLink>
                </form>) : null}

                
            </div>
        </div>
    );
};
TwoFactorAuth.layout = (page) => (
    <Layout user={page.props.user} children={page} />
);
export default TwoFactorAuth;
