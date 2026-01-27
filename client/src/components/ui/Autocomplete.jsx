import { useState, useRef, useEffect } from 'react';
import { JOB_TITLES } from '../../services/jobTitles';
import { cn } from '../../utils/cn';

const Autocomplete = ({ value, onChange, placeholder, required, name, label }) => {
    const [query, setQuery] = useState(value || '');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        setQuery(value || ''); // Sync internal state with prop
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleInputChange = (e) => {
        const userInput = e.target.value;
        setQuery(userInput);
        onChange(userInput); // Propagate change up

        if (userInput.length > 0) {
            const filtered = JOB_TITLES.filter((item) =>
                item.toLowerCase().includes(userInput.toLowerCase())
            );
            setFilteredItems(filtered);
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const handleSelect = (item) => {
        setQuery(item);
        onChange(item); // Propagate selections
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium leading-6 text-slate-900 mb-2">
                    {label}
                </label>
            )}
            <input
                type="text"
                name={name}
                id={name}
                className={cn(
                    'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',

                )}
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
                onFocus={() => {
                    if (query.length > 0) setIsOpen(true);
                }}
                required={required}
                autoComplete="off"
            />
            {isOpen && filteredItems.length > 0 && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredItems.map((item, index) => (
                        <li
                            key={index}
                            className="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-blue-50 text-slate-900"
                            onClick={() => handleSelect(item)}
                        >
                            <span className="block truncate">{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
