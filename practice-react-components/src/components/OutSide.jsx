import { useRef, useState } from "react";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutSide";

export default function OutSide() {
    const innerRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    useClickOutside(innerRef, () => {
        setIsOpen(false);
    }, [innerRef]);

    return (
        <Outter>
            <h1>OutSide</h1>
            <InnerContainer ref={innerRef}>
                <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
                {isOpen && (<Inner>
                    Click outside of this box
                </Inner>)}
            </InnerContainer>
        </Outter>
    )
}

const Outter = styled.div`
    width: 100%;
    height: 600px;
    padding: 20px;
    border: 1px solid black;
`;
const InnerContainer = styled.div`
    width: 100%;
    height: 400px;
    padding: 20px;
    border: 1px solid blue;
`;
const Inner = styled.div`
    width: 300px;
    height: 300px;
    padding: 20px;
    border: 1px solid red;
`;
