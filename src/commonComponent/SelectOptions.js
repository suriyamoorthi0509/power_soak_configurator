export default function SelectOptions(props) {
    const { data, noSelect, desc } = { ...props };

    return (
        <>
           {!noSelect && <option value="">Select</option>} 
            {data && data.map((element, index) => (
                <option key={index} value={element.value}>
                    {element.desc}
                </option>
            ))}
        </>
    );
}