/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation, useAdtobsMutation } from "../../../../services/holiday/Holiday";


interface HolidayFormProps {
    closeModal: () => void;
    refetchData: () => void;
    holiday?: any;
}

const HolidayForm: React.FC<HolidayFormProps> = ({ holiday, closeModal, refetchData }) => {
    const [store_holiday] = useStoreMutation()
    const [update_holiday] = useUpdateMutation();
    const [ad_to_bs] = useAdtobsMutation();
    const [title, setTitle] = useState('');
    const [fiscal_year, setFiscalYear] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [date_np, setDateNp] = useState('');
    const [date_en, setDateEn] = useState('');
    const [date_np_to, setDateNpTO] = useState('');
    const [date_en_to, setDateEnTo] = useState('');
    const [gender, setGender] = useState('');
    useEffect(() => {
        if (holiday) {
            setTitle(holiday.title || '');
            setFiscalYear(holiday.fiscal_year || '');
            setDescription(holiday.description || '');
            setStatus(holiday.status || 'false');
            setDateNp(holiday.date_np || '');
            setDateEn(holiday.date_en || '');
            setDateNpTO(holiday.date_np_to || '');
            setDateEnTo(holiday.date_en_to || '');
            setGender(holiday.gender || '');
        } else {
            setTitle('');
            setFiscalYear('');
            setDescription('');
            setStatus('');
            setDateNp('');
            setDateEn('');
            setDateNpTO('');
            setDateEnTo('');
            setGender('');
        }
    }, [holiday]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (holiday) {
            update_holiday({ id: holiday.id, title, fiscal_year,description,status,date_np, date_en, date_np_to, date_en_to,gender }).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }else{
            store_holiday({ title, fiscal_year,description,status,date_np, date_en, date_np_to, date_en_to,gender }).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle login failure if necessary
            });
        }
    };

    
    const FromhandleDate = () => {
        ad_to_bs({
            date: date_en
        })
          .then((response: any) => {
            // setDateNp(response.data);
            setDateNp(response.data.bs_date)
          })
          .catch((error: any) => {
            console.error("Failed to fetch date", error);
          });
      };

      const TohandleDate = () => {
        ad_to_bs({
            date: date_en_to
        })
          .then((response: any) => {
            // setDateNp(response.data);
            setDateNpTO(response.data.bs_date)
          })
          .catch((error: any) => {
            console.error("Failed to fetch date", error);
          });
      };

    return (
        <form id="Holiday_Form" onSubmit={handleSubmit}>
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>Title</label>
                                <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}  id="title" type="text"  />
                            </div>

                            <div className="form-group">
                                    <label>Description</label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description}/>
                            </div>
                            <div className="form-group half-width">
                                                <label>From Date(AD)</label>
                                                <input type="date" name="from_date_en" value={date_en} onChange={(e) => setDateEn(e.target.value)} />
                                                <a  onClick={FromhandleDate}>AD to BS</a>
                            </div>
                            <div className="form-group half-width">
                                    <label>From Date(BS)</label>
                                    <input name="date_np" value={date_np} id="from_date_np" type="text" readOnly />
                                    
                            </div>

                            <div className="form-group half-width">
                                                <label>To Date(AD)</label>
                                                <input type="date" name="to_date_en" value={date_en_to} onChange={(e) => setDateEnTo(e.target.value)} />
                                                <a  onClick={TohandleDate}>AD to BS</a>
                            </div>
                            <div className="form-group half-width">
                                    <label>To Date(BS)</label>
                                    <input name="date_np" value={date_np_to} id="to_date_np" type="text" readOnly />
                            </div>

                            <div className="form-group half-width">
                                                <label>Status</label>
                                                <select name="status" value={status.toString()} onChange={(e) => setStatus(e.target.value)} >
                                                    <option value="">Select Status</option>
                                                    <option value="true">Active</option>
                                                    <option value="false">In-Active</option>
                                                </select>
                                            </div>
                            <div className="form-group half-width">
                                <label>Gender</label>
                                <select name="status" value={gender} onChange={(e) => setGender(e.target.value)} >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Both">Both</option>
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

export default HolidayForm

