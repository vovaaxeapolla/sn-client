import './Auth.sass';
import Signin from './Signin';
import Signup from './Signup';
import Reset from './Reset';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Auth = () => {
    const [current, setCurrent] = useState<'signup' | 'signin' | 'reset'>('signin');
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, []);

    const pages = {
        signup: < Signup setPage={setCurrent} />,
        signin: <Signin setPage={setCurrent} />,
        reset: <Reset setPage={setCurrent} />
    }

    return (
        <div className="Auth">
            {pages[current]}
        </div>
    );
}

export default Auth;