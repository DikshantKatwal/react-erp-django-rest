/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { useStoreMutation,  useUpdateMutation, useFetchLanguageMutation } from "../../../../services/employeeLanguage/EmployeeLanguage.ts";
import { useLocation } from "react-router-dom";
interface EmployeeLanguageFormProps {
    closeModal: () => void;
    refetchData: () => void;
    language?: any;
}
interface GeneralInterface{
    id?: number;
    name?: string;
    alpha_3?: string;
}


const EmployeeLanguageForm: React.FC<EmployeeLanguageFormProps> = ({ language, closeModal, refetchData }) => {
    const [store_language] = useStoreMutation()
    const [update_language] = useUpdateMutation();
    const [alllanguages, setAllLanguages] = useState<GeneralInterface[]>([]);
    const location = useLocation();
    const employee = location.state?.employee;
    const [selectedlanguage, setSelectedLanguage] = useState('');
    const [read, setRead] = useState('');
    const [write, setWrite] = useState('');
    const [speak, setSpeak] = useState('');
    const fluencyOptions = [
        { value: 'Fluent', label: 'Fluent' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Good', label: 'Good' }
    ];

    const [fetchlaguagesAPI] = useFetchLanguageMutation();

    const fetchData = useCallback(() => {
        fetchlaguagesAPI({})
            .unwrap()
            .then((response) => setAllLanguages(response))
            .catch((error) => console.error("Failed to fetch clients", error));
    }, [fetchlaguagesAPI]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    useEffect(() => {
        if (language) {
            setSelectedLanguage(language.language || '');
            setRead(language.read || '');
            setWrite(language.write || '');
            setSpeak(language.speak || '');
        } else {
            setSelectedLanguage('');
            setRead('');
            setWrite('');
            setSpeak('');
        }
    }, [language]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            language: selectedlanguage,
            read,
            write,
            speak
        };
        if (language) {
            data.id = language.id;

            update_language(data).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle update failure if necessary
            });
        } else {
            data.employee = employee.id;
            store_language(data).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle store failure if necessary
            });
        }
    };

    return (
        <form id="Renewal_Form" onSubmit={handleSubmit}>
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group half-width">
                                <label>Language</label>
                                <select name="language" value={selectedlanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                                    <option value="">Select Language</option>
                                    {alllanguages.map(lang => (
                                            <option key={lang[1]} value={lang[1]}>{lang[1]}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Read:</label>
                                <select value={read} onChange={(e) => setRead(e.target.value)}>
                                <option value="">Select Fluency</option>
                                    {fluencyOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Write:</label>
                                <select value={write} onChange={(e) => setWrite(e.target.value)}>
                                <option value="">Select Fluency</option>
                                    {fluencyOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Speak:</label>
                                <select value={speak} onChange={(e) => setSpeak(e.target.value)}>
                                <option value="">Select Fluency</option>
                                    {fluencyOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-action">
                    <input type="submit" className="co-btn type-full" value="Submit" />
                </div>
            </div>
        </form>
    )
}

export default EmployeeLanguageForm

