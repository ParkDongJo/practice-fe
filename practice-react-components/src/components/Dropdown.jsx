import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Dropdown() {
    const dropDownRef = useRef();
    const [phoneIdentify, setPhoneIdentify] = useState('');
    const phoneList = ['010', '011', '017', '019'];
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e) => {
        setIsOpen(!isOpen);
    }
    const handleClickValue = (value) => {
        setPhoneIdentify(value);
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = e => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setIsOpen(!isOpen);
            }
        };

        if (isOpen) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [isOpen, dropDownRef]);

    return(
        <Layout ref={dropDownRef}>
            <Input
                onClick={handleClick}
                type='button'
                value={phoneIdentify}
            />
            {isOpen && 
                <ul>
                    {phoneList.map((value, index) => (
                        <li key={value}>
                            <button type="button" onClick={handleClickValue}>{value}</button>
                        </li>
                    ))}
                </ul>
            }
        </Layout>
    )
}

const Layout = styled.div`
    width: 300px;
    height: 160px;
    background-color: yellow;
`;
const Input = styled.input`
    width: 100%;
    height: 30px;
    background-color: blue;
`;
