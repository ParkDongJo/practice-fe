import useWindowDimensions from "../hooks/useWindowDimensions";

export default function Dimension() {
    const { width, height } = useWindowDimensions();

    return (
        <div>
            <h1>Dimension</h1>
            <p>Width: {width}</p>
            <p>Height: {height}</p>
        </div>
    )
}
