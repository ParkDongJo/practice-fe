import { useState, useEffect, useCallback } from 'react'

export default function LoginForm() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const validate = useCallback(() => {
        let emailError = '';
        let passwordError = '';

        if (!values.email) {
            emailError = '아이디를 입력해주세요.';
        }
        if (!values.password) {
            passwordError = '비밀번호를 입력해주세요.';
        }
        return {
            email: emailError,
            password: passwordError
        }
    }, [values]);

    const handleChange = e => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        setTouched({
            email: true,
            password: true,
        })

        const errors = validate();
        setErrors({
            email: errors.email,
            password: errors.password
        });
        const datas = JSON.stringify(values, null, 2);
        console.log(datas);

        // setEmail('');
        // setPassword('');
    }

    const handleBlur = e => {
        console.log('handleBlur', touched, e.target.name);
        setTouched((prev) => ({
            ...prev,
            [e.target.name]: true,
        }))
    }

    useEffect(() => {
        const errors = validate();
        setErrors({
            email: errors.email,
            password: errors.password
        });
    }, [validate])

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="email"
                placeholder="아이디"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}/>
            {touched.email && errors.email && <span>{errors.email}</span>}
            <input 
                type="password"
                name="password"
                placeholder="비밀번호"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}/>
            {touched.password && errors.password && <span>{errors.password}</span>}
            <button type="submit">로그인</button>
        </form>
    )
}