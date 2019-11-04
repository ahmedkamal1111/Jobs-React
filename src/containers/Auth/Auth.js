import React from 'react';
import Layout from '../../components/Layout/Layout';
import Nav from '../../components/Nav/Nav';
import Navbar from '../../components/Navbar/Navbar';
import './Auth.css';

const auth = props => {
    
    return (
        <section className="auth">
            <Layout
                header={
                    <Navbar>
                        <Nav />
                    </Navbar>
                }
            >
            
                { props.children } 
            </Layout>
        </section>
    );
}

export default auth;