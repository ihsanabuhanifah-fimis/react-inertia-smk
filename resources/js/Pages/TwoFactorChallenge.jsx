import React from "react";

import { styles } from "../styles";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
const TwoFactorChallenge = () => {
    const [codeEnable, setCodeEnable] = React.useState(true)
    const [code, setCode] = React.useState("");
    const [recovery_code, setRecovery_code] = React.useState("");
    const submit = (e) => {
        e.preventDefault();
        const payload = {
            code: code,
        };
        console.log(payload);
        Inertia.post(route("two-factor.login"), payload);
    };
    const submit2 = (e) => {
        e.preventDefault();
        const payload = {
            recovery_code: recovery_code,
        };
        console.log(payload);
        Inertia.post("/two-factor-challenge", payload, {
            onError: () => {
                console.log("erro");
            },
            onSuccess: () => {
                console.log("ok");
            },
        });
    };
    return (
        <React.Fragment>
            <div className="flex h-screen border  ">
                <div
                    id="page1"
                    className={`w-4/5 flex items-center order-1  px-20`}
                >
                    <div className=" w-full">
                        {codeEnable ? (<form onSubmit={submit}>
                            <label className={styles.classNameLabel} htmlFor="code">enter yout code</label>
                            <input
                                onChange={(e) => {
                                    setCode(e.target.value);
                                }}
                                value={code}
                                className={styles.classNameInput}
                                type="text"
                                placeholder="enter your code"
                            />
                            <button
                                className={styles.classNameButton(
                                    "bg-purple-700"
                                )}
                            >
                                Login
                            </button>
                        </form>) : ( <form onSubmit={submit2}>
                            <label className={styles.classNameLabel} htmlFor="code">enter your recovert code</label>
                            <input
                                onChange={(e) => {
                                    setRecovery_code(e.target.value);
                                }}
                                value={recovery_code}
                                id="code"
                                className={styles.classNameInput}
                                type="text"
                                placeholder="enter your recovery code"
                            />
                            <button
                                type="submit"
                                className={styles.classNameButton(
                                    "bg-purple-700"
                                )}
                            >
                                Login
                            </button>
                        </form>)}
                        
                       
                         <button onClick={()=> {
                             setCodeEnable(!codeEnable)
                         }} className="capitalize underline focus:outline-none">
                             {codeEnable ? 'use Recovery Code' : 'use Code'}
                         </button>

                    </div>
                    
                </div>
               
                <div
                    id="page2"
                    className={`h-full w-full bg-purple-700 order-2`}
                ></div>
            </div>
        </React.Fragment>
    );
};

export default TwoFactorChallenge;
