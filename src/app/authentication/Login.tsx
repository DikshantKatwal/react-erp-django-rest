import { useEffect, useState } from 'react';
import background_pattern from '../../../public/assets/img/pattern/pattern_login.jpg';
import { useLoginMutation } from '../../services/authentication/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Login = () => {
    const [ login ] = useLoginMutation();
    const location = useLocation();
    const username = location.state?.email;

    const navigate = useNavigate();
    const [email, setEmail] = useState(username);
    const [password, setPassword] = useState('');
    const { isLoading, error_message, isAuthenticated } = useSelector((state: RootState) => state.authSlice);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
        document.body.classList.add('home-page');
        return () => {
            document.body.classList.remove('home-page');
        };
    }, [isAuthenticated, navigate]);;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, password }).unwrap().then(() => {
            navigate('/admin'); 
        }).catch(() => {
            
        });
    };

    return (
        <div id="content-wrapper">
            <div id="login-page" style={{ backgroundImage: `url(${background_pattern})` }}>
                <section className="login-section">
                    <div className="custom-container">
                        <div className="login-container">
                            <div className="title">
                                <h3>Sign In</h3>
                            </div>
                            <form  method="post"  onSubmit={handleSubmit} >
                                <div className="common-form">
                                    <div className="fields">
                                        <div className="form-group-wrapper">
                                            <div className="form-group-item">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  id="id_username" placeholder="Eg. niroj@imagiocreations.com" required />
                                                </div>
                                                <div className="form-group type-password">
                                                    <label>Password</label>
                                                    <div className="form-inner">
                                                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Eg. ********"  required />
                                                        <div className="password-toggle">
                                                            <i className="fas fa-eye" aria-hidden="true"></i>
                                                            <i className="fas fa-eye-slash" aria-hidden="true"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-action">
                                        <input type="submit" value="Login" className="co-btn type-full" />
                                    </div>
                                    <div className="note-container">
                                        <a href="#">Forgotten Password?</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="copyright-section">
                    <div className="custom-container">
                        <div className="section-content">
                            <p>
                                © 2018 -  All Rights Reserved. <br />
                                Crafted by <a href="https://imagiocreations.com" target="_blank">Imagio Creations</a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}


export default Login