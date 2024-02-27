import { useState, useMemo } from "react"
import debouce from "./libs/debouce"

const promiseFun = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return "abcd" === value;
};

export default function DebounceTest() {
    const [check, setCheck] = useState(false);
    const [value, setValue] = useState('');
    
    const handleChange = async (e) => {
        const result = await promiseFun(e.target.value);
        setValue(e.target.value);
        setCheck(result);
    };
    
    const debouncedOnChange = useMemo(
        () => debouce(handleChange, 300)
    ,[])

    return (
        <div>
            <h2>중복 문자열 "abcd"</h2>
            <h3>check : {check ? "true" : "false"}</h3>
            <h3>Debounced value: {value}</h3>
            <input type="text" onChange={debouncedOnChange} />
            <hr />
            <button disabled={check}>BUTTON</button>
        </div>
    );
}
