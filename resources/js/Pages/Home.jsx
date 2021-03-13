import React from "react";
import Layout from "../components/Layout";
import {Helmet} from "react-helmet"
const Home = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>Home</title>

            </Helmet>
           
                <h1>Selamat Belajar Inertia JS</h1>
           
        </React.Fragment>
    );
};
Home.layout = page => <Layout user={page.props.user} children={page}/>
export default Home;
